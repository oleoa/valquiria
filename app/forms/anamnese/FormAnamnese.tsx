"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Textarea from "@/components/Textarea";
import { cn } from "@/lib/cn";
import { enviarFormulario, type RespostaFormulario } from "@/lib/forms/enviar";

/*
 * Anamnese — Orientação Parental (form interno bespoke, padrão de app/forms/analise-temperamento).
 * Reproduz o formulário de anamnese da apostila de Orientação Parental (págs. 11–23): dados da
 * família, gestação/parto, alimentação, comportamento, saúde, sono, hábitos, relacionamento e o
 * teste de adversidades vividas até os 18 anos (10 perguntas Sim/Não com pontuação automática).
 * Coleta as respostas, chama a action compartilhada `enviarFormulario` e, SÓ após sucesso,
 * navega para o /obrigado. Nada de e-mail aqui — o envio mora em lib/forms/enviar.ts.
 */

// Classes reaproveitadas — mesmas dos outros forms; foco/seta de select já são globais.
const CAMPO =
  "w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none";
const CARD =
  "rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-5 md:p-6";
// Enunciado da pergunta: normal-case, peso médio (frases longas — não cabe rótulo em caixa alta).
const ENUNCIADO =
  "mb-4 block text-base font-medium leading-snug text-[var(--color-va-silver-mute)] md:text-lg";
// Rótulo curto (caixa alta) dos campos dentro de um grupo — mesmo estilo do form Raio X.
const ROTULO =
  "mb-2 block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase";
// Cada opção de escolha única é uma linha clicável (radio nativo com accent on-brand).
const OPCAO =
  "flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-sm text-[var(--color-va-text)] transition-colors hover:border-[var(--color-va-border-up)] md:text-base";

/*
 * Modelo das perguntas. `label` é a pergunta enviada no e-mail/banco; nos grupos, cada campo
 * tem o seu `label` próprio (enviado) e um `rotulo` curto (exibido em caixa alta no card).
 *
 * Atenção à extração de contato (lib/forms/salvar.ts): ela casa /nome/i, /e-?mail/i e
 * /telefone/i nas perguntas, PREFERINDO as que mencionam "mãe" (é com ela que a Valquiria
 * trata) — por isso os filhos são rotulados "Filho 1" (sem "nome"). O contato extraído
 * para o painel é o da mãe; o do pai é o fallback se o da mãe estiver vazio.
 */
type Campo = {
  name: string;
  /** Pergunta enviada no e-mail/banco. */
  label: string;
  /** Rótulo curto exibido no campo. */
  rotulo: string;
  obrigatorio?: boolean;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "numeric";
};

type Pergunta =
  | {
      tipo: "texto";
      name: string;
      label: string;
      // `multilinha` troca o <input> por um <textarea> auto-crescente (respostas abertas).
      multilinha?: boolean;
      // Perguntas são obrigatórias por padrão; `obrigatorio: false` libera (resposta vazia é filtrada).
      obrigatorio?: boolean;
    }
  | {
      tipo: "opcoes";
      name: string;
      label: string;
      opcoes: string[];
      obrigatorio?: boolean;
      // `multipla` troca os radios por checkboxes: a pessoa pode marcar mais de uma
      // opção e as marcadas são enviadas numa só resposta, separadas por vírgula.
      multipla?: boolean;
    }
  | {
      tipo: "grupo";
      name: string;
      label: string;
      descricao?: string;
      // Cada linha vira um grid de campos lado a lado (empilha no mobile).
      linhas: Campo[][];
    };

type Secao = {
  id: string;
  titulo: string;
  /** Linha logo abaixo do título — o assunto da seção, em destaque. */
  subtitulo?: string;
  descricao?: string;
  perguntas: Pergunta[];
};

/** Monta as 4 linhas de Nome + Idade dos filhos (só a primeira é obrigatória). */
function linhasFilhos(): Campo[][] {
  return [1, 2, 3, 4].map((n) => [
    {
      name: `filho${n}`,
      label: `Filho ${n}`,
      rotulo: `Filho ${n}`,
      obrigatorio: n === 1,
    },
    {
      name: `filho${n}Idade`,
      label: `Idade do filho ${n}`,
      rotulo: "Idade",
      obrigatorio: n === 1,
    },
  ]);
}

/** Monta as 6 linhas de Nome + Idade + Relação da composição familiar (só a primeira é obrigatória). */
function linhasComposicao(): Campo[][] {
  return [1, 2, 3, 4, 5, 6].map((n) => [
    {
      name: `pessoa${n}`,
      label: `Pessoa ${n} — nome`,
      rotulo: `Pessoa ${n}`,
      obrigatorio: n === 1,
    },
    {
      name: `pessoa${n}Idade`,
      label: `Pessoa ${n} — idade`,
      rotulo: "Idade",
      obrigatorio: n === 1,
    },
    {
      name: `pessoa${n}Relacao`,
      label: `Pessoa ${n} — relação familiar`,
      rotulo: "Relação familiar",
      obrigatorio: n === 1,
    },
  ]);
}

// Perguntas do teste de adversidades (usadas também na soma automática da pontuação).
const ACE_NAMES = [
  "ace1",
  "ace2",
  "ace3",
  "ace4",
  "ace5",
  "ace6",
  "ace7",
  "ace8",
  "ace9",
  "ace10",
];

const SECOES: Secao[] = [
  {
    id: "anamnese",
    titulo: "Anamnese",
    descricao:
      "Vamos começar pelos dados da família: os filhos e os responsáveis.",
    perguntas: [
      {
        tipo: "grupo",
        name: "filhos",
        label: "Nome e idade dos filhos",
        descricao:
          "Preencha uma linha por filho; deixe em branco as que não usar.",
        linhas: linhasFilhos(),
      },
      {
        tipo: "grupo",
        name: "pai",
        label: "Dados do pai",
        linhas: [
          [
            {
              name: "paiNome",
              label: "Nome do pai",
              rotulo: "Nome",
              obrigatorio: true,
              autoComplete: "name",
            },
          ],
          [
            {
              name: "paiIdade",
              label: "Idade do pai",
              rotulo: "Idade",
              obrigatorio: true,
              inputMode: "numeric",
            },
            {
              name: "paiTelefone",
              label: "Telefone do pai",
              rotulo: "Telefone",
              obrigatorio: true,
              type: "tel",
            },
          ],
          [
            {
              name: "paiEmail",
              label: "E-mail do pai",
              rotulo: "E-mail",
              obrigatorio: true,
              type: "email",
              autoComplete: "email",
            },
            {
              name: "paiProfissao",
              label: "Profissão do pai",
              rotulo: "Profissão",
              obrigatorio: true,
            },
          ],
        ],
      },
      {
        tipo: "grupo",
        name: "mae",
        label: "Dados da mãe",
        linhas: [
          [
            {
              name: "maeNome",
              label: "Nome da mãe",
              rotulo: "Nome",
              obrigatorio: true,
              autoComplete: "name",
            },
          ],
          [
            {
              name: "maeIdade",
              label: "Idade da mãe",
              rotulo: "Idade",
              obrigatorio: true,
              inputMode: "numeric",
            },
            {
              name: "maeTelefone",
              label: "Telefone da mãe",
              rotulo: "Telefone",
              obrigatorio: true,
              type: "tel",
            },
          ],
          [
            {
              name: "maeEmail",
              label: "E-mail da mãe",
              rotulo: "E-mail",
              obrigatorio: true,
              type: "email",
              autoComplete: "email",
            },
            {
              name: "maeProfissao",
              label: "Profissão da mãe",
              rotulo: "Profissão",
              obrigatorio: true,
            },
          ],
        ],
      },
    ],
  },
  {
    id: "composicao-familiar",
    titulo: "Composição familiar",
    perguntas: [
      {
        tipo: "grupo",
        name: "composicao",
        label: "Cite abaixo todas as pessoas que compõem a família:",
        descricao:
          "Preencha uma linha por pessoa; deixe em branco as que não usar.",
        linhas: linhasComposicao(),
      },
      {
        tipo: "texto",
        name: "paisCasados",
        label: "Os pais são casados ou separados?",
      },
      {
        tipo: "opcoes",
        name: "relacionamentoPais",
        label: "Como é o relacionamento entre os pais?",
        opcoes: ["Excelente", "Bom", "Ruim", "Disfuncional"],
      },
      {
        tipo: "opcoes",
        name: "questoesJudiciais",
        label:
          "Existem questões judiciais ligadas ao divórcio e que podem estar impactando o comportamento dos filhos?",
        opcoes: ["Sim", "Não"],
      },
    ],
  },
  {
    id: "identificacao-problema",
    titulo: "Identificação do problema",
    perguntas: [
      {
        tipo: "texto",
        name: "pontosDesafiadores",
        label: "Enumere os pontos desafiadores na relação com seu filho(a):",
        multilinha: true,
      },
    ],
  },
  {
    id: "concepcao",
    titulo: "Concepção",
    perguntas: [
      {
        tipo: "opcoes",
        name: "concepcao",
        label: "Concepção:",
        opcoes: ["Filho natural", "Filho adotivo"],
      },
      {
        tipo: "grupo",
        name: "idadePaisEpoca",
        label: "Idade dos pais na época:",
        linhas: [
          [
            {
              name: "idadePaiEpoca",
              label: "Idade do pai na época",
              rotulo: "Pai",
              obrigatorio: true,
              inputMode: "numeric",
            },
            {
              name: "idadeMaeEpoca",
              label: "Idade da mãe na época",
              rotulo: "Mãe",
              obrigatorio: true,
              inputMode: "numeric",
            },
          ],
        ],
      },
      {
        tipo: "texto",
        name: "gravidezDesejada",
        label: "Gravidez foi desejada ou casual?",
      },
      {
        tipo: "texto",
        name: "gestacoesAnteriores",
        label: "Número de gestações anteriores?",
      },
      {
        tipo: "grupo",
        name: "abortos",
        label: "Abortos?",
        descricao: "Se houve, informe quantos. Deixe em branco se não se aplica.",
        linhas: [
          [
            {
              name: "abortosTotal",
              label: "Abortos",
              rotulo: "Abortos",
              inputMode: "numeric",
            },
            {
              name: "abortosNaturais",
              label: "Abortos naturais",
              rotulo: "Naturais",
              inputMode: "numeric",
            },
            {
              name: "abortosProvocados",
              label: "Abortos provocados",
              rotulo: "Provocados",
              inputMode: "numeric",
            },
          ],
        ],
      },
    ],
  },
  {
    id: "parto",
    titulo: "Parto",
    perguntas: [
      {
        tipo: "opcoes",
        name: "parto",
        label: "Parto:",
        opcoes: ["Normal", "Induzido", "Cesárea", "Fórceps"],
      },
      {
        tipo: "texto",
        name: "complicacaoParto",
        label: "Teve algum tipo de complicação? Qual?",
        multilinha: true,
      },
      {
        tipo: "texto",
        name: "complicacaoBebe",
        label: "Em relação ao bebê, houve algum tipo de complicação? Qual?",
        multilinha: true,
      },
    ],
  },
  {
    id: "alimentacao",
    titulo: "Alimentação",
    perguntas: [
      {
        tipo: "grupo",
        name: "amamentacao",
        label: "Amamentação",
        linhas: [
          [
            {
              name: "mamouPeito",
              label: "Mamou no peito?",
              rotulo: "Mamou no peito?",
              obrigatorio: true,
            },
            {
              name: "mamouPeitoTempo",
              label: "Mamou no peito — tempo",
              rotulo: "Tempo",
            },
          ],
          [
            {
              name: "mamouMamadeira",
              label: "Mamou na mamadeira?",
              rotulo: "Mamou na mamadeira?",
              obrigatorio: true,
            },
            {
              name: "mamouMamadeiraTempo",
              label: "Mamou na mamadeira — por quanto tempo",
              rotulo: "Por quanto tempo?",
            },
          ],
        ],
      },
      {
        tipo: "opcoes",
        name: "rotinaRefeicoes",
        label: "Hoje tem hora e rotina para as refeições?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "refeicoesMesa",
        label: "Faz as refeições sentado à mesa com a família?",
        opcoes: ["Sim", "Não", "Às vezes"],
      },
      {
        tipo: "texto",
        name: "comeComTela",
        label: "Come usando algum tipo de tela?",
      },
    ],
  },
  {
    id: "comportamento",
    titulo: "Comportamento",
    perguntas: [
      {
        tipo: "texto",
        name: "comportamentosDesafiadores",
        label: "A criança apresenta comportamentos desafiadores? Quais?",
        multilinha: true,
      },
      {
        tipo: "texto",
        name: "comoReage",
        label: "Como você reage nessas situações?",
        multilinha: true,
      },
      {
        tipo: "texto",
        name: "sentimentosDespertados",
        label: "Quais sentimentos estas atitudes das crianças despertam em você?",
        multilinha: true,
      },
      {
        tipo: "opcoes",
        name: "tempoQualidade",
        label:
          "Existe um tempo de qualidade dedicado à criança, que envolva brincadeiras, contação de histórias ou outras atividades lúdicas e recreativas que gerem vínculo e conexão?",
        opcoes: ["Sim", "Raramente", "Nunca"],
      },
      {
        tipo: "texto",
        name: "frequenciaTempoJuntos",
        label: "Com qual frequência acontece esse tempo juntos?",
      },
      {
        tipo: "opcoes",
        name: "espacoParaErros",
        label:
          "Existe espaço para erros? (Responda com sinceridade se seus filhos podem cometer erros sem receber castigos ou ameaças)",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "lidaComErros",
        label: "Como você lida com os erros dos seus filhos?",
        // Múltipla escolha: dá para marcar mais de uma forma de lidar.
        multipla: true,
        opcoes: [
          "Com castigos",
          "Com ameaças",
          "Com tapas e surras",
          "Com diálogo e conexão",
          "Com foco em solução",
          "Ensino a pensar e a tomar melhores decisões",
        ],
      },
      {
        tipo: "opcoes",
        name: "seConsidera",
        label: "Você se considera um pai ou mãe:",
        opcoes: [
          "Permissivo",
          "Superprotetor",
          "Autoritário",
          "Agressivo",
          "Firme e respeitoso",
        ],
      },
    ],
  },
  {
    id: "saude-crianca",
    titulo: "Saúde da criança",
    perguntas: [
      {
        tipo: "texto",
        name: "medicacao",
        label: "Faz uso de medicação? Qual? Por quê?",
        multilinha: true,
      },
      {
        tipo: "texto",
        name: "tratamentoSaude",
        label: "Faz algum tratamento de saúde? Há quanto tempo?",
        multilinha: true,
      },
    ],
  },
  {
    id: "sono",
    titulo: "Sono",
    perguntas: [
      {
        tipo: "texto",
        name: "ondeDorme",
        label:
          "Onde a criança costuma dormir? Tem seu próprio quarto ou dorme com os pais?",
        multilinha: true,
      },
      {
        tipo: "texto",
        name: "medoDormirSozinha",
        label: "Tem medo de dormir sozinha?",
      },
      {
        tipo: "opcoes",
        name: "rotinaSono",
        label: "A criança segue um horário de rotina para dormir e para acordar?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "qualidadeSono",
        label: "Qualidade do sono:",
        // Múltipla escolha: o sono pode ser agitado e com ranger de dentes, por exemplo.
        multipla: true,
        opcoes: ["Tranquilo", "Agitado", "Range dentes", "Enurese"],
      },
      {
        tipo: "texto",
        name: "habitosEspeciais",
        label:
          "Hábitos especiais (presença de alguém, objetos, embalo, chupeta, chupa dedo, etc.)",
        multilinha: true,
      },
    ],
  },
  {
    id: "habitos",
    titulo: "Hábitos",
    perguntas: [
      { tipo: "texto", name: "roiUnha", label: "Rói unha?" },
      { tipo: "texto", name: "tiquesNervosos", label: "Tem tiques nervosos?" },
    ],
  },
  {
    id: "relacionamento",
    titulo: "Relacionamento",
    perguntas: [
      {
        tipo: "opcoes",
        name: "socializa",
        label: "A criança socializa ou brinca com outras crianças?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "usaTelas",
        label: "A criança usa telas?",
        opcoes: ["Sim", "Não"],
      },
      {
        // Só se aplica quando a criança usa telas — por isso não é obrigatória.
        tipo: "opcoes",
        name: "tempoTelas",
        label: "Por quanto tempo? (se a criança usa telas)",
        opcoes: [
          "Até 2 horas por dia",
          "Até 6 horas por dia",
          "Mais de 6 horas por dia",
        ],
        obrigatorio: false,
      },
      {
        tipo: "opcoes",
        name: "disponiveisAntesDormir",
        label:
          "Antes da criança dormir, você ou os cuidadores se encontram emocionalmente disponíveis para deixá-la calma e segura?",
        opcoes: ["Sim", "Não", "Às vezes"],
      },
      {
        tipo: "opcoes",
        name: "frequentaEscola",
        label: "A criança frequenta a escola?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "texto",
        name: "relacaoEscola",
        label: "Como é a relação na escola com colegas e professores?",
        multilinha: true,
      },
      {
        tipo: "texto",
        name: "relacaoFamilia",
        label: "Como é a relação da criança na família, com os pais e irmãos?",
        multilinha: true,
      },
    ],
  },
  {
    id: "adversidades",
    titulo: "Sobre você",
    subtitulo: "Adversidades vividas dos zero aos 18 anos",
    descricao:
      "Tão importante quanto conhecer o comportamento dos seus filhos é compreender melhor o seu. Responda considerando as experiências vividas desde o início da sua vida até os seus 18 anos. A pontuação é somada automaticamente.",
    perguntas: [
      {
        tipo: "opcoes",
        name: "ace1",
        label:
          "Um dos pais ou outro adulto da casa, com frequência ou muita frequência, xingou, insultou, colocou você para baixo ou o humilhou? Ou agiu de uma maneira que o deixou com medo de se machucar fisicamente?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace2",
        label:
          "Um dos pais ou outro adulto da casa, com frequência ou muita frequência, empurrou, agarrou, esbofeteou ou jogou algo em você? Ou já bateu em você com tanta força que ficou com marcas ou se machucou?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace3",
        label:
          "Algum adulto ou pessoa pelo menos cinco anos mais velha do que você tocou ou acariciou seu corpo de forma sexual? Ou tentou realmente ter relação sexual com você?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace4",
        label:
          "Você sentiu, com frequência ou muita frequência, que ninguém em sua família o amava ou achava que você era importante ou especial? Ou sua família não cuidou um do outro, não se sentiu próxima ou não se apoiou?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace5",
        label:
          "Você sentiu muitas vezes que não tinha o suficiente para comer, tinha que usar roupas sujas e não tinha ninguém para o proteger? Ou seus pais estavam muito bêbados ou drogados para cuidar de você ou o levar ao médico se precisasse?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace6",
        label: "Seus pais se separaram ou divorciaram?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace7",
        label:
          "Sua mãe ou madrasta, frequentemente ou muitas vezes, foi agarrada, esbofeteada ou teve objetos atirados nela? Ou foi chutada, mordida, golpeada com o punho ou com algo duro? Ou já apanhou repetidamente por pelo menos alguns minutos, ou foi ameaçada com uma arma ou faca?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace8",
        label: "Seu pai ou mãe era alcoólatra ou usava drogas?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace9",
        label:
          "Pai ou mãe estava deprimido ou doente mental, ou um membro da família tentou suicídio?",
        opcoes: ["Sim", "Não"],
      },
      {
        tipo: "opcoes",
        name: "ace10",
        label: "Pai ou mãe foi para a prisão?",
        opcoes: ["Sim", "Não"],
      },
    ],
  },
];

export default function FormAnamnese() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const dados = new FormData(e.currentTarget);

    // Monta as respostas na ordem das seções, marcando quais são obrigatórias.
    // Para radios, FormData.get devolve a opção marcada (ou null → "" → falha na validação).
    const coletadas: Array<RespostaFormulario & { obrigatoria: boolean }> = [];

    for (const secao of SECOES) {
      for (const p of secao.perguntas) {
        if (p.tipo === "grupo") {
          for (const linha of p.linhas) {
            for (const campo of linha) {
              coletadas.push({
                pergunta: campo.label,
                resposta: String(dados.get(campo.name) ?? "").trim(),
                obrigatoria: campo.obrigatorio ?? false,
              });
            }
          }
        } else if (p.tipo === "opcoes" && p.multipla) {
          // Checkboxes: junta todas as marcadas numa resposta só.
          coletadas.push({
            pergunta: p.label,
            resposta: dados
              .getAll(p.name)
              .map((v) => String(v).trim())
              .filter(Boolean)
              .join(", "),
            obrigatoria: p.obrigatorio ?? true,
          });
        } else {
          coletadas.push({
            pergunta: p.label,
            resposta: String(dados.get(p.name) ?? "").trim(),
            obrigatoria: p.obrigatorio ?? true,
          });
        }
      }
    }

    if (coletadas.some((r) => r.obrigatoria && !r.resposta)) {
      setErro("Por favor, responda todas as perguntas obrigatórias.");
      return;
    }

    // Campos opcionais em branco ficam de fora do e-mail/banco.
    const respostas: RespostaFormulario[] = coletadas
      .filter((r) => r.resposta)
      .map(({ pergunta, resposta }) => ({ pergunta, resposta }));

    // Pontuação automática do teste de adversidades: soma dos "Sim".
    const pontuacao = ACE_NAMES.filter(
      (name) => String(dados.get(name) ?? "") === "Sim",
    ).length;
    respostas.push({
      pergunta: "Pontuação do teste de adversidades (soma das respostas Sim)",
      resposta: String(pontuacao),
    });

    setEnviando(true);
    const resultado = await enviarFormulario({
      formId: "anamnese",
      titulo: "Anamnese — Orientação Parental",
      respostas,
    });

    if (resultado.ok) {
      // Redirect SÓ após o envio dar certo.
      router.push("/forms/anamnese/obrigado");
    } else {
      setErro(resultado.erro);
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={aoEnviar}
      noValidate
      className="mx-auto flex w-full max-w-xl flex-col gap-5 text-left"
    >
      {SECOES.map((secao) => (
        <section
          key={secao.id}
          aria-labelledby={`secao-${secao.id}`}
          className="flex flex-col gap-5"
        >
          {/* Cabeçalho da seção — espelha os títulos da apostila. */}
          <div className="mt-6 first:mt-0">
            <h2
              id={`secao-${secao.id}`}
              className="text-[0.72rem] font-medium tracking-[0.22em] text-[var(--color-va-blue)] uppercase"
            >
              {secao.titulo}
            </h2>
            {secao.subtitulo && (
              <p className="mt-2 text-base font-medium leading-snug text-[var(--color-va-text)] md:text-lg">
                {secao.subtitulo}
              </p>
            )}
            {secao.descricao && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-va-silver-mute)]">
                {secao.descricao}
              </p>
            )}
          </div>

          {secao.perguntas.map((p) => {
            if (p.tipo === "texto") {
              return (
                <div key={p.name} className={CARD}>
                  <label htmlFor={p.name} className={ENUNCIADO}>
                    {p.label}
                  </label>
                  {p.multilinha ? (
                    <Textarea
                      id={p.name}
                      name={p.name}
                      required={p.obrigatorio ?? true}
                      autoComplete="off"
                      className={CAMPO}
                    />
                  ) : (
                    <input
                      id={p.name}
                      name={p.name}
                      type="text"
                      required={p.obrigatorio ?? true}
                      autoComplete="off"
                      className={CAMPO}
                    />
                  )}
                </div>
              );
            }

            if (p.tipo === "grupo") {
              return (
                <div
                  key={p.name}
                  role="group"
                  aria-labelledby={`${p.name}-titulo`}
                  className={CARD}
                >
                  <p
                    id={`${p.name}-titulo`}
                    className={cn(ENUNCIADO, p.descricao && "mb-1")}
                  >
                    {p.label}
                  </p>
                  {p.descricao && (
                    <p className="mb-4 text-sm text-[var(--color-va-silver-mute)]/80">
                      {p.descricao}
                    </p>
                  )}
                  <div className="flex flex-col gap-4">
                    {p.linhas.map((linha, i) => (
                      <div
                        key={i}
                        className={cn(
                          "grid grid-cols-1 gap-3",
                          linha.length === 2 && "sm:grid-cols-2",
                          linha.length === 3 && "sm:grid-cols-3",
                        )}
                      >
                        {linha.map((campo) => (
                          <div key={campo.name}>
                            <label htmlFor={campo.name} className={ROTULO}>
                              {campo.rotulo}
                            </label>
                            <input
                              id={campo.name}
                              name={campo.name}
                              type={campo.type ?? "text"}
                              inputMode={campo.inputMode}
                              required={campo.obrigatorio ?? false}
                              autoComplete={campo.autoComplete ?? "off"}
                              className={CAMPO}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={p.name}
                role={p.multipla ? "group" : "radiogroup"}
                aria-labelledby={`${p.name}-titulo`}
                className={CARD}
              >
                <p id={`${p.name}-titulo`} className={ENUNCIADO}>
                  {p.label}
                </p>
                {p.multipla && (
                  <p className="-mt-2 mb-4 text-sm text-[var(--color-va-silver-mute)]/80">
                    Pode marcar mais de uma opção.
                  </p>
                )}
                <div className="flex flex-col gap-3">
                  {p.opcoes.map((opcao) => (
                    <label key={opcao} className={OPCAO}>
                      {/* Checkbox não leva `required` (exigiria marcar todas) —
                          a obrigatoriedade é validada no envio. */}
                      <input
                        type={p.multipla ? "checkbox" : "radio"}
                        name={p.name}
                        value={opcao}
                        required={p.multipla ? undefined : (p.obrigatorio ?? true)}
                        className={cn(
                          "h-4 w-4 shrink-0 accent-[var(--color-va-blue)]",
                          p.multipla && "rounded-sm",
                        )}
                      />
                      <span>{opcao}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      ))}

      {erro && (
        <p
          role="alert"
          className="rounded-xl border border-[var(--color-va-border-up)] bg-[var(--color-va-bg)] px-4 py-3 text-sm text-[var(--color-va-silver)]"
        >
          {erro}
        </p>
      )}

      {/* Botão submit — mesmo visual azul-pílula do CtaButton, mas type="submit" com estado. */}
      <button
        type="submit"
        disabled={enviando}
        aria-busy={enviando}
        className="group relative mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-va-blue)] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_10px_30px_-12px_rgba(47,88,120,0.35)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:bg-[var(--color-va-blue-light)] hover:shadow-[0_18px_40px_-12px_rgba(47,88,120,0.45)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 md:text-base"
      >
        <span>{enviando ? "Enviando…" : "Enviar respostas"}</span>
        {!enviando && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        )}
      </button>
    </form>
  );
}

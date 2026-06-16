"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { enviarFormulario, type RespostaFormulario } from "@/lib/forms/enviar";

/*
 * Análise de Temperamento — form interno bespoke (cópia do padrão de app/forms/raio-x).
 * Replica o formulário do Notion: 26 perguntas (abertas + escolha única) na mesma ordem.
 * Coleta as respostas, chama a action compartilhada `enviarFormulario` e, SÓ após sucesso,
 * navega para o /obrigado. Nada de e-mail aqui — o envio mora em lib/forms/enviar.ts.
 */

// Classes reaproveitadas — mesmas dos outros forms; foco/seta de select já são globais.
const CAMPO =
  "w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none";
// Cada pergunta vive no seu próprio card (reproduz a cara do Notion).
const CARD =
  "rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-5 md:p-6";
// Enunciado da pergunta: normal-case, peso médio (frases longas — não cabe ROTULO em caixa alta).
// Cor no tom mais claro (silver-mute), padronizada com o ROTULO do Raio X.
const ENUNCIADO =
  "mb-4 block text-base font-medium leading-snug text-[var(--color-va-silver-mute)] md:text-lg";
// Cada opção de escolha única é uma linha clicável (radio nativo com accent on-brand).
const OPCAO =
  "flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-sm text-[var(--color-va-text)] transition-colors hover:border-[var(--color-va-border-up)] md:text-base";

/*
 * As 26 perguntas da Análise de Temperamento, na ordem do formulário original do Notion.
 * Conteúdo hardcoded deste form (não é sistema dinâmico). `name` = chave no FormData;
 * `label` = pergunta exibida e enviada no e-mail. `tipo "texto"` = resposta aberta (1 linha);
 * `tipo "opcoes"` = escolha única (radios). Todas são obrigatórias (têm `*` no Notion).
 */
type Pergunta =
  | { tipo: "texto"; name: string; label: string; autoComplete?: string }
  | { tipo: "telefone"; name: string; label: string }
  | { tipo: "opcoes"; name: string; label: string; opcoes: string[] };

/*
 * Países do seletor de DDI do campo de telefone. `codigo` é o DDI (usado como value
 * do <select> e na composição da resposta) — mantenha os códigos únicos, senão o
 * defaultValue fica ambíguo. Brasil é o padrão. Lista curada (público majoritariamente
 * BR + alguns destinos comuns); adicione mais conforme a necessidade.
 */
const PAISES = [
  { nome: "Brasil", codigo: "+55", flag: "🇧🇷" },
  { nome: "Portugal", codigo: "+351", flag: "🇵🇹" },
  { nome: "Estados Unidos", codigo: "+1", flag: "🇺🇸" },
  { nome: "Argentina", codigo: "+54", flag: "🇦🇷" },
  { nome: "Uruguai", codigo: "+598", flag: "🇺🇾" },
  { nome: "Paraguai", codigo: "+595", flag: "🇵🇾" },
  { nome: "Chile", codigo: "+56", flag: "🇨🇱" },
  { nome: "Colômbia", codigo: "+57", flag: "🇨🇴" },
  { nome: "Espanha", codigo: "+34", flag: "🇪🇸" },
  { nome: "Reino Unido", codigo: "+44", flag: "🇬🇧" },
  { nome: "França", codigo: "+33", flag: "🇫🇷" },
  { nome: "Itália", codigo: "+39", flag: "🇮🇹" },
  { nome: "Alemanha", codigo: "+49", flag: "🇩🇪" },
  { nome: "México", codigo: "+52", flag: "🇲🇽" },
  { nome: "Japão", codigo: "+81", flag: "🇯🇵" },
  { nome: "Austrália", codigo: "+61", flag: "🇦🇺" },
];

const PERGUNTAS: Pergunta[] = [
  { tipo: "texto", name: "nome", label: "Seu nome completo", autoComplete: "name" },
  { tipo: "texto", name: "email", label: "Qual o seu email?", autoComplete: "email" },
  { tipo: "telefone", name: "telefone", label: "Qual o seu telefone?" },
  {
    tipo: "texto",
    name: "escolaComportamento",
    label:
      "Na escola como era seu comportamento? Quais sentimentos você se recorda de sentir?",
  },
  {
    tipo: "texto",
    name: "decisao",
    label:
      "Como é pra você quando precisa tomar uma decisão? O que sente? Qual maior conflito?",
  },
  {
    tipo: "texto",
    name: "amigos",
    label:
      "Você é uma pessoa de muitos amigos? O quanto é importante pra você nutrir amizades?",
  },
  {
    tipo: "texto",
    name: "relacaoPais",
    label: "Como era seu relacionamento com seus pais?",
  },
  {
    tipo: "texto",
    name: "dizerNao",
    label: "Você tem dificuldade em dizer não? Porque?",
  },
  {
    tipo: "opcoes",
    name: "maiorMedo",
    label: "Qual seu maior medo?",
    opcoes: [
      "Medo de não ter resultado",
      "Medo de ser reprovada",
      "Medo de nada dar certo e eu não sair do lugar",
      "Medo de ser ridícula e passar vergonha",
    ],
  },
  {
    tipo: "texto",
    name: "fatosInfancia",
    label: "Me conta 3 fatos marcantes da sua infância",
  },
  {
    tipo: "texto",
    name: "festasAniversario",
    label: "Na infância você gostava de festas de aniversário?",
  },
  {
    tipo: "texto",
    name: "admira",
    label: "O que você mais admira em uma pessoa? Qual qualidade? Porque?",
  },
  {
    tipo: "texto",
    name: "rotina",
    label:
      "Você gosta de rotina ou se sente presa com uma rotina? Me explique sua resposta.",
  },
  {
    tipo: "texto",
    name: "grupoDesconhecido",
    label:
      "Em um grupo desconhecido, você consegue se enturmar com facilidade ou tem dificuldade? Sempre foi assim?",
  },
  {
    tipo: "texto",
    name: "respondona",
    label: "Você era uma criança respondona?",
  },
  {
    tipo: "texto",
    name: "paisRigidos",
    label: "Seus pais eram rígidos ou flexíveis?",
  },
  {
    tipo: "texto",
    name: "relaxar",
    label: "Depois de um dia estressante o que te faz relaxar?",
  },
  {
    tipo: "texto",
    name: "rapidezExcelencia",
    label: "Entre a rapidez e a excelência, qual você escolhe?",
  },
  {
    tipo: "texto",
    name: "flexivelRigida",
    label: "Você se considera uma pessoa flexível ou rígida? Explique o motivo.",
  },
  {
    tipo: "opcoes",
    name: "maisFeliz",
    label: "O que te faz mais feliz?",
    opcoes: ["Estar com pessoas que eu gosto", "Ficar sozinha em silêncio"],
  },
  {
    tipo: "opcoes",
    name: "irrita",
    label: "O que mais te irrita em uma pessoa",
    opcoes: [
      "Lerdeza",
      "Quem não me escuta",
      "Pessoas abusadas",
      "Falta de empatia e respeito pelo outro",
    ],
  },
  {
    tipo: "opcoes",
    name: "furouFila",
    label: "Alguém furou a fila, o que você faz?",
    opcoes: [
      "Não faço nada (evito ficar arrumando brigas)",
      "Fico com raiva e dependendo eu chamo atenção da pessoa",
      "Eu acho isso errado mas jamais iria falar com a pessoa ou me manifestar",
    ],
  },
  {
    tipo: "opcoes",
    name: "compraCara",
    label:
      "Você precisa fazer a compra de algo caro que você precisa e quer muito, sua postura é:",
    opcoes: [
      "Pesquiso preço e custo benefício, demoro um pouco para decidir",
      "Levo o que é mais popular e que as pessoas mais usam",
      "Pesquiso um pouco mas decido no mesmo dia",
    ],
  },
  {
    tipo: "opcoes",
    name: "maisResultados",
    label: "Você quer mais resultados porque",
    opcoes: [
      "isso faz com que me sinta poderosa",
      "isso faz com que eu me sinta aceita",
      "isso faz com que eu me sinta capaz",
    ],
  },
  {
    tipo: "opcoes",
    name: "naoEstaBem",
    label: "Quando você não está bem",
    opcoes: [
      "Preciso falar a respeito, quando falo me escuto e consigo me entender",
      "Preciso processar o que está acontecendo comigo",
      "Eu entendo o que está acontecendo comigo, mas gosto de ficar quieta",
    ],
  },
  {
    tipo: "texto",
    name: "notaBaixa",
    label: "Na infância, como você reagia a uma nota baixa?",
  },
  {
    tipo: "texto",
    name: "brincava",
    label: "Na infância você brincava do que?",
  },
  {
    tipo: "opcoes",
    name: "escolaCrianca",
    label: "Você na escola era uma criança que…",
    opcoes: [
      "sentava na frente comportada e fazia o dever de casa porque isso era o certo",
      "sentava no fundo conversava e achava a melhor parte da escola o intervalo e a educação física",
      "ficava quieta respeitava os professores senão meus pais iriam brigar comigo",
    ],
  },
];

export default function FormAnaliseTemperamento() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const dados = new FormData(e.currentTarget);

    // Monta as respostas na ordem das perguntas e valida que nenhuma ficou vazia.
    // Para radios, FormData.get devolve a opção marcada (ou null → "" → falha na validação).
    const respostas: RespostaFormulario[] = PERGUNTAS.map((p) => {
      // Telefone tem 3 inputs (DDI + DDD + número) — compõe "+55 (11) 99999-9999".
      if (p.tipo === "telefone") {
        const pais = String(dados.get("telefonePais") ?? "").trim();
        const ddd = String(dados.get("telefoneDdd") ?? "").trim();
        const numero = String(dados.get("telefoneNumero") ?? "").trim();
        return {
          pergunta: p.label,
          resposta: ddd && numero ? `${pais} (${ddd}) ${numero}` : "",
        };
      }
      return {
        pergunta: p.label,
        resposta: String(dados.get(p.name) ?? "").trim(),
      };
    });

    if (respostas.some((r) => !r.resposta)) {
      setErro("Por favor, responda todas as perguntas.");
      return;
    }

    setEnviando(true);
    const resultado = await enviarFormulario({
      formId: "analise-temperamento",
      titulo: "Análise de Temperamento",
      respostas,
    });

    if (resultado.ok) {
      // Redirect SÓ após o envio dar certo.
      router.push("/forms/analise-temperamento/obrigado");
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
      {PERGUNTAS.map((p) => {
        if (p.tipo === "texto") {
          return (
            <div key={p.name} className={CARD}>
              <label htmlFor={p.name} className={ENUNCIADO}>
                {p.label}
              </label>
              <input
                id={p.name}
                name={p.name}
                type="text"
                required
                autoComplete={p.autoComplete ?? "off"}
                className={CAMPO}
              />
            </div>
          );
        }

        if (p.tipo === "telefone") {
          return (
            <div
              key={p.name}
              role="group"
              aria-labelledby={`${p.name}-titulo`}
              className={CARD}
            >
              <p id={`${p.name}-titulo`} className={ENUNCIADO}>
                {p.label}
              </p>
              {/* DDI (seletor de país) + DDD + número; empilha no mobile. */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1.5fr)]">
                <select
                  name="telefonePais"
                  defaultValue="+55"
                  aria-label="País"
                  className={CAMPO}
                >
                  {PAISES.map((pais) => (
                    <option key={pais.codigo} value={pais.codigo}>
                      {pais.flag} {pais.nome} ({pais.codigo})
                    </option>
                  ))}
                </select>
                <input
                  name="telefoneDdd"
                  type="tel"
                  inputMode="numeric"
                  required
                  placeholder="DDD"
                  aria-label="DDD"
                  className={CAMPO}
                />
                <input
                  name="telefoneNumero"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel-national"
                  placeholder="Número"
                  aria-label="Número de telefone"
                  className={CAMPO}
                />
              </div>
            </div>
          );
        }

        return (
          <div
            key={p.name}
            role="radiogroup"
            aria-labelledby={`${p.name}-titulo`}
            className={CARD}
          >
            <p id={`${p.name}-titulo`} className={ENUNCIADO}>
              {p.label}
            </p>
            <div className="flex flex-col gap-3">
              {p.opcoes.map((opcao) => (
                <label key={opcao} className={OPCAO}>
                  <input
                    type="radio"
                    name={p.name}
                    value={opcao}
                    required
                    className="h-4 w-4 shrink-0 accent-[var(--color-va-blue)]"
                  />
                  <span>{opcao}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

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

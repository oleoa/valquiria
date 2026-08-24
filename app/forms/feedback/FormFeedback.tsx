"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import Textarea from "@/components/Textarea";
import { cn } from "@/lib/cn";
import { enviarFormulario, type RespostaFormulario } from "@/lib/forms/enviar";

/*
 * Feedback da jornada (form interno bespoke).
 *
 * Diferente dos outros formulários do site, este roda no formato do Big Five: primeiro a
 * abertura, a pessoa clica em "Começar" e então responde UMA pergunta por tela, avançando
 * até o fim. Por isso o estado das respostas é controlado (um Record name → valor) em vez
 * de FormData: as telas anteriores são desmontadas e perderiam o valor.
 *
 * Só as perguntas 2 (nota) e 3 (o que marcou) são obrigatórias — a ideia é não desanimar
 * quem está com pressa. Ao final, chama a action compartilhada `enviarFormulario` e, SÓ
 * depois do sucesso, navega para o /obrigado. Nada de e-mail aqui.
 */

/* ------------------------------------------------------------------ */
/*  MODELO DAS PERGUNTAS                                                */
/* ------------------------------------------------------------------ */

type Opcao = {
  valor: string;
  /** Abre um campo de texto ao lado da opção (ex.: "Outro" → qual?). */
  complemento?: { name: string; placeholder: string };
};

type Campo = {
  name: string;
  rotulo: string;
  type?: "text" | "email";
  autoComplete?: string;
  placeholder?: string;
};

type Pergunta = {
  name: string;
  /** Enunciado — é também o texto enviado no e-mail/banco. */
  label: string;
  /** Linha de apoio abaixo do enunciado. */
  ajuda?: string;
  /** Perguntas são opcionais por padrão neste form; só duas são obrigatórias. */
  obrigatoria?: boolean;
} & (
  | { tipo: "texto"; placeholder?: string }
  | { tipo: "opcoes"; opcoes: Opcao[] }
  | { tipo: "escala"; rotuloMin: string; rotuloMax: string }
  // Passo de fechamento: não é uma das 8 perguntas, e sim a identificação opcional
  // (sem ela, o "sim, com meu nome" da pergunta 7 não teria como ser usado).
  | { tipo: "contato"; campos: Campo[] }
);

const PERGUNTAS: Pergunta[] = [
  {
    tipo: "opcoes",
    name: "origem",
    label: "Como você chegou até aqui?",
    opcoes: [
      { valor: "Indicação" },
      { valor: "Instagram" },
      { valor: "Já era cliente" },
      {
        valor: "Outro",
        complemento: { name: "origemOutro", placeholder: "Conta pra mim…" },
      },
    ],
  },
  {
    tipo: "escala",
    name: "recomendacao",
    label:
      "De 0 a 10, o quanto você recomendaria essa jornada para alguém que você gosta?",
    obrigatoria: true,
    rotuloMin: "Não recomendaria",
    rotuloMax: "Recomendaria sem pensar",
  },
  {
    tipo: "texto",
    name: "marcou",
    label: "O que mais te marcou ou te ajudou durante o processo?",
    obrigatoria: true,
    placeholder: "Pode escrever do jeito que vier…",
  },
  {
    tipo: "texto",
    name: "pratica",
    label: "Qual prática você mais usou (ou pretende continuar usando)?",
    ajuda: "Vale qualquer coisa do relatório que tenha entrado na sua rotina.",
    placeholder: "Ex.: a pausa antes de responder, o registro do dia…",
  },
  {
    tipo: "texto",
    name: "faltou",
    label:
      "Teve algo que você esperava e não aconteceu, ou que poderia ter sido diferente?",
    ajuda: "Pode ser sincera. É aqui que eu mais aprendo.",
    placeholder: "Se não teve, é só seguir para a próxima.",
  },
  {
    tipo: "texto",
    name: "antesDepois",
    label: "Como você se sentia antes de começar, e como se sente agora?",
    placeholder: "Antes eu… hoje eu…",
  },
  {
    tipo: "opcoes",
    name: "depoimento",
    label: "Posso usar um trecho da sua resposta como depoimento?",
    opcoes: [
      { valor: "Sim, com meu nome" },
      { valor: "Sim, sem meu nome" },
      { valor: "Prefiro que não" },
    ],
  },
  {
    tipo: "texto",
    name: "extra",
    label: "Quer deixar mais alguma coisa?",
    ajuda: "Opcional — o espaço é seu.",
    placeholder: "Qualquer coisa que ficou para dizer.",
  },
  {
    tipo: "contato",
    name: "contato",
    label: "Para eu saber quem escreveu.",
    ajuda:
      "Opcional. Só preciso disso se você autorizou o depoimento com o seu nome.",
    campos: [
      {
        name: "nome",
        rotulo: "Seu nome",
        autoComplete: "name",
        placeholder: "Como você quer ser chamada",
      },
      {
        name: "email",
        rotulo: "Seu e-mail",
        type: "email",
        autoComplete: "email",
        placeholder: "para eu conseguir te responder",
      },
    ],
  },
];

/** Quantas telas são, de fato, perguntas numeradas (o passo de contato não conta). */
const TOTAL_PERGUNTAS = PERGUNTAS.filter((p) => p.tipo !== "contato").length;

/* ------------------------------------------------------------------ */
/*  ESTILOS COMPARTILHADOS                                              */
/* ------------------------------------------------------------------ */

const CAMPO =
  "w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none";
const ROTULO =
  "mb-2 block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase";
const ENUNCIADO =
  "font-[family-name:var(--font-cormorant)] text-3xl leading-[1.12] font-light text-[var(--color-va-text)] md:text-4xl";
const BOTAO_PRIMARIO =
  "group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-va-blue)] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_10px_30px_-12px_rgba(47,88,120,0.35)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:bg-[var(--color-va-blue-light)] hover:shadow-[0_18px_40px_-12px_rgba(47,88,120,0.45)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 md:text-base";
// Cada tela entra com o mesmo fade-up do resto do site (keyframes em app/styles.css).
const ENTRADA =
  "motion-safe:animate-[vaFadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]";

const NOTAS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* ------------------------------------------------------------------ */
/*  COMPONENTE                                                          */
/* ------------------------------------------------------------------ */

export default function FormFeedback() {
  const router = useRouter();
  // -1 é a abertura; 0…n-1 são as telas de pergunta.
  const [etapa, setEtapa] = useState(-1);
  const [valores, setValores] = useState<Record<string, string>>({});
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  // Escolha única avança sozinha depois de um instante; o timer é cancelado se a
  // pessoa mudar de tela antes disso (ex.: clicou numa opção e voltou correndo).
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelarAvancoAuto() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function definir(name: string, valor: string) {
    setValores((atuais) => ({ ...atuais, [name]: valor }));
    setErro(null);
  }

  function irPara(proxima: number) {
    cancelarAvancoAuto();
    setErro(null);
    setEtapa(proxima);
    // Volta ao topo do bloco — telas curtas depois de telas longas não ficam
    // com a pergunta fora da vista.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Valida a tela atual e avança (ou envia, se for a última). */
  function aoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pergunta = PERGUNTAS[etapa];
    if (!pergunta) return;

    if (pergunta.obrigatoria && !valores[pergunta.name]?.trim()) {
      setErro(
        pergunta.tipo === "escala"
          ? "Escolha uma nota de 0 a 10 para continuar."
          : "Esta resposta é importante para mim. Escreva com as suas palavras.",
      );
      return;
    }

    if (etapa < PERGUNTAS.length - 1) {
      irPara(etapa + 1);
      return;
    }
    void enviar();
  }

  async function enviar() {
    cancelarAvancoAuto();
    setErro(null);
    setEnviando(true);

    // Monta as respostas na ordem das perguntas, deixando de fora as que ficaram em branco.
    const respostas: RespostaFormulario[] = [];
    for (const p of PERGUNTAS) {
      if (p.tipo === "contato") {
        for (const campo of p.campos) {
          const valor = valores[campo.name]?.trim();
          if (valor) respostas.push({ pergunta: campo.rotulo, resposta: valor });
        }
        continue;
      }

      const valor = valores[p.name]?.trim();
      if (!valor) continue;

      // "Outro" leva junto o texto digitado ao lado.
      let resposta = valor;
      if (p.tipo === "opcoes") {
        const escolhida = p.opcoes.find((o) => o.valor === valor);
        const extra = escolhida?.complemento
          ? valores[escolhida.complemento.name]?.trim()
          : "";
        if (extra) resposta = `${valor}: ${extra}`;
      }
      respostas.push({ pergunta: p.label, resposta });
    }

    const resultado = await enviarFormulario({
      formId: "feedback",
      titulo: "Feedback da jornada",
      respostas,
    });

    if (resultado.ok) {
      // Redirect SÓ após o envio dar certo.
      router.push("/forms/feedback/obrigado");
    } else {
      setErro(resultado.erro);
      setEnviando(false);
    }
  }

  /* ---------------------------- Abertura ---------------------------- */

  if (etapa === -1) {
    return (
      <div className={cn("mx-auto max-w-2xl text-center", ENTRADA)}>
        <Eyebrow>Formulário · Feedback</Eyebrow>

        <h1 className="mx-auto font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] font-light text-[var(--color-va-text)] md:text-6xl">
          Seu feedback sobre a{" "}
          <span className="italic text-[var(--color-va-silver)]">jornada.</span>
        </h1>

        <p className="mt-8 text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
          Foi um prazer estar com você nessa jornada.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-va-silver)] md:text-xl">
          Ficarei feliz em ler o seu feedback. Leva só uns 3 minutinhos, e suas
          respostas me ajudam a cuidar cada vez melhor de quem chega depois de
          você.
        </p>

        <button
          type="button"
          onClick={() => irPara(0)}
          className={cn(BOTAO_PRIMARIO, "mt-12")}
        >
          <span>Começar</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </button>

        <p className="mt-6 text-sm text-[var(--color-va-silver-mute)]">
          {TOTAL_PERGUNTAS} perguntas, uma de cada vez. Só duas são obrigatórias.
        </p>
      </div>
    );
  }

  /* -------------------------- Uma pergunta -------------------------- */

  const pergunta = PERGUNTAS[etapa];
  const ultima = etapa === PERGUNTAS.length - 1;
  const numero = pergunta.tipo === "contato" ? null : etapa + 1;
  const progresso = ((etapa + 1) / PERGUNTAS.length) * 100;
  const idEnunciado = `pergunta-${pergunta.name}`;

  return (
    <form
      onSubmit={aoSubmeter}
      noValidate
      className="mx-auto w-full max-w-xl text-left"
    >
      {/* -------- Progresso -------- */}
      <div className="mb-10">
        <div className="mb-3 flex items-baseline justify-between text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase">
          <span>
            {numero ? `Pergunta ${numero} de ${TOTAL_PERGUNTAS}` : "Para finalizar"}
          </span>
          {!pergunta.obrigatoria && <span>Opcional</span>}
        </div>
        <div
          className="h-px w-full bg-[var(--color-va-border)]"
          role="progressbar"
          aria-valuenow={Math.round(progresso)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do formulário"
        >
          <div
            className="h-px bg-[var(--color-va-blue)] transition-[width] duration-500 ease-out"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* -------- Pergunta (a `key` remonta o bloco e refaz o fade-up) -------- */}
      <div key={pergunta.name} className={ENTRADA}>
        {/* h1 porque, na tela da pergunta, o enunciado é o título da vez
            (a abertura já foi desmontada). */}
        <h1 id={idEnunciado} className={ENUNCIADO}>
          {pergunta.label}
        </h1>
        {pergunta.ajuda && (
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-va-silver-mute)] md:text-base">
            {pergunta.ajuda}
          </p>
        )}

        <div className="mt-8">
          {pergunta.tipo === "texto" && (
            <Textarea
              // `key` + autoFocus: cada tela abre com o cursor já no campo.
              autoFocus
              aria-labelledby={idEnunciado}
              value={valores[pergunta.name] ?? ""}
              onChange={(e) => definir(pergunta.name, e.target.value)}
              placeholder={pergunta.placeholder}
              className="min-h-40"
            />
          )}

          {pergunta.tipo === "opcoes" && (
            <div
              role="radiogroup"
              aria-labelledby={idEnunciado}
              className="flex flex-col gap-3"
            >
              {pergunta.opcoes.map((opcao) => {
                const marcada = valores[pergunta.name] === opcao.valor;
                const complemento = opcao.complemento;
                return (
                  <div key={opcao.valor}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={marcada}
                      onClick={() => {
                        definir(pergunta.name, opcao.valor);
                        cancelarAvancoAuto();
                        // Opção com campo extra espera a pessoa escrever antes de avançar.
                        if (!complemento && !ultima) {
                          timerRef.current = setTimeout(
                            () => irPara(etapa + 1),
                            320,
                          );
                        }
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left text-sm transition-all duration-200 md:text-base",
                        marcada
                          ? "border-[var(--color-va-blue)] bg-[var(--color-va-blue)]/8 text-[var(--color-va-text)]"
                          : "border-[var(--color-va-border)] bg-[var(--color-va-bg)] text-[var(--color-va-silver)] hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)]",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                          marcada
                            ? "border-[var(--color-va-blue)]"
                            : "border-[var(--color-va-border-up)]",
                        )}
                      >
                        {marcada && (
                          <span className="h-2 w-2 rounded-full bg-[var(--color-va-blue)]" />
                        )}
                      </span>
                      <span>{opcao.valor}</span>
                    </button>

                    {complemento && marcada && (
                      <input
                        autoFocus
                        type="text"
                        aria-label={`${opcao.valor} — qual?`}
                        value={valores[complemento.name] ?? ""}
                        onChange={(e) =>
                          definir(complemento.name, e.target.value)
                        }
                        placeholder={complemento.placeholder}
                        className={cn(CAMPO, "mt-3")}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {pergunta.tipo === "escala" && (
            <div role="radiogroup" aria-labelledby={idEnunciado}>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
                {NOTAS.map((nota) => {
                  const marcada = valores[pergunta.name] === String(nota);
                  return (
                    <button
                      key={nota}
                      type="button"
                      role="radio"
                      aria-checked={marcada}
                      aria-label={`Nota ${nota}`}
                      onClick={() => {
                        definir(pergunta.name, String(nota));
                        cancelarAvancoAuto();
                        if (!ultima) {
                          timerRef.current = setTimeout(
                            () => irPara(etapa + 1),
                            320,
                          );
                        }
                      }}
                      className={cn(
                        "flex h-12 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-200",
                        marcada
                          ? "border-[var(--color-va-blue)] bg-[var(--color-va-blue)] text-white"
                          : "border-[var(--color-va-border)] bg-[var(--color-va-bg)] text-[var(--color-va-silver)] hover:border-[var(--color-va-border-up)] hover:text-[var(--color-va-text)]",
                      )}
                    >
                      {nota}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between text-xs text-[var(--color-va-silver-mute)]">
                <span>{pergunta.rotuloMin}</span>
                <span>{pergunta.rotuloMax}</span>
              </div>
            </div>
          )}

          {pergunta.tipo === "contato" && (
            <div className="flex flex-col gap-4">
              {pergunta.campos.map((campo, i) => (
                <div key={campo.name}>
                  <label htmlFor={campo.name} className={ROTULO}>
                    {campo.rotulo}
                  </label>
                  <input
                    id={campo.name}
                    autoFocus={i === 0}
                    type={campo.type ?? "text"}
                    autoComplete={campo.autoComplete ?? "off"}
                    value={valores[campo.name] ?? ""}
                    onChange={(e) => definir(campo.name, e.target.value)}
                    placeholder={campo.placeholder}
                    className={CAMPO}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {erro && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-[var(--color-va-border-up)] bg-[var(--color-va-bg)] px-4 py-3 text-sm text-[var(--color-va-silver)]"
        >
          {erro}
        </p>
      )}

      {/* -------- Navegação -------- */}
      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => irPara(etapa - 1)}
          disabled={enviando}
          className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm text-[var(--color-va-silver-mute)] transition-colors hover:text-[var(--color-va-text)] disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          <span>Voltar</span>
        </button>

        <button type="submit" disabled={enviando} aria-busy={enviando} className={BOTAO_PRIMARIO}>
          <span>
            {enviando ? "Enviando…" : ultima ? "Enviar respostas" : "Continuar"}
          </span>
          {!enviando && (
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </form>
  );
}

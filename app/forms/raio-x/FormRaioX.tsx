"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { enviarFormulario, type RespostaFormulario } from "@/lib/forms/enviar";

/*
 * Questionário Raio X — form interno bespoke (cópia do padrão de app/forms/exemplo).
 * Coleta nome, e-mail e telefone + as perguntas de autoconhecimento, chama a action
 * compartilhada `enviarFormulario` e, SÓ após sucesso, navega para o /obrigado.
 */

// Classes reaproveitadas pelos campos — fundo escuro, borda sutil, foco já é global.
const CAMPO =
  "w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none";
const ROTULO =
  "mb-2 block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase";

/*
 * As perguntas do Raio X, na ordem do questionário original (precedidas de nome,
 * e-mail e telefone) — conteúdo hardcoded deste form (não é sistema dinâmico
 * compartilhado; só evita repetir blocos iguais). `name` é a chave no FormData;
 * `label` é a pergunta exibida e enviada no e-mail. `tipo "telefone"` segue o mesmo
 * modelo da Análise de Temperamento (DDI + DDD + número).
 */
type Pergunta =
  | { tipo?: "texto"; name: string; label: string; type?: string; autoComplete?: string }
  | { tipo: "telefone"; name: string; label: string };

/*
 * Países do seletor de DDI do campo de telefone (mesma lista da Análise de Temperamento).
 * `codigo` é o DDI (value do <select> e usado na composição da resposta) — mantenha os
 * códigos únicos, senão o defaultValue fica ambíguo. Brasil é o padrão.
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
  { name: "nome", label: "Seu nome", autoComplete: "name" },
  { name: "email", label: "Seu e-mail", type: "email", autoComplete: "email" },
  { tipo: "telefone", name: "telefone", label: "Seu telefone" },
  { name: "busca", label: "O que você busca?" },
  { name: "relacaoPais", label: "Como é sua relação com seus pais?" },
  { name: "descrevaMae", label: "Descreva sua mãe" },
  { name: "descrevaPai", label: "Descreva seu pai" },
  { name: "saude", label: "Você tem algum problema de saúde? Qual?" },
  {
    name: "dor",
    label:
      "Existe alguma dor frequente no seu corpo? Exemplo: enxaqueca, dores no estômago?",
  },
  { name: "odeia", label: "O que você mais odeia?" },
  {
    name: "pessoaDificil",
    label:
      "Existe alguma pessoa que você tem dificuldade de lidar no seu dia a dia? Me explica porque:",
  },
  { name: "seDescreve", label: "Como você se descreve?" },
  { name: "objetivo", label: "Defina seu objetivo em uma frase" },
  { name: "pontoFraco", label: "Qual seu ponto mais fraco?" },
  { name: "pontoForte", label: "Qual seu ponto mais forte?" },
  { name: "dificuldade", label: "Sua maior dificuldade hoje?" },
  {
    name: "ansiedade",
    label: "Existe algum momento do dia que você fica mais ansiosa, estressada?",
  },
  { name: "felizes", label: "Me conta 3 acontecimentos felizes da sua vida" },
  { name: "tristes", label: "Me conta 3 acontecimentos tristes da sua vida" },
  {
    name: "orgulho",
    label: "Olhando pra sua jornada, do que mais sente orgulho?",
  },
  { name: "feliz", label: "O que te faz feliz?" },
  { name: "admira", label: "O que mais admira em alguém?" },
];

export default function FormRaioX() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const dados = new FormData(e.currentTarget);

    // Monta as respostas na ordem das perguntas e valida que nenhuma ficou vazia.
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
      formId: "raio-x",
      titulo: "Questionário Raio X",
      respostas,
    });

    if (resultado.ok) {
      // Redirect SÓ após o envio dar certo.
      router.push("/forms/raio-x/obrigado");
    } else {
      setErro(resultado.erro);
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={aoEnviar}
      noValidate
      className="mx-auto flex w-full max-w-xl flex-col gap-7 rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 text-left md:p-8"
    >
      {PERGUNTAS.map((p) => {
        if (p.tipo === "telefone") {
          return (
            <div
              key={p.name}
              role="group"
              aria-labelledby={`${p.name}-titulo`}
            >
              <p id={`${p.name}-titulo`} className={ROTULO}>
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
          <div key={p.name}>
            <label htmlFor={p.name} className={ROTULO}>
              {p.label}
            </label>
            <input
              id={p.name}
              name={p.name}
              type={p.type ?? "text"}
              required
              autoComplete={p.autoComplete ?? "off"}
              className={CAMPO}
            />
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { enviarFormulario } from "@/lib/forms/enviar";

/*
 * Formulário de EXEMPLO (descartável) — demonstra o padrão dos forms internos:
 * coleta as respostas, chama a action compartilhada `enviarFormulario` e, SÓ após
 * sucesso, navega para a página de obrigado. Cada form real é uma cópia bespoke deste.
 */

// Classes reaproveitadas pelos campos — fundo escuro, borda sutil, foco já é global.
const CAMPO =
  "w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none";
const ROTULO =
  "mb-2 block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase";

export default function FormExemplo() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get("nome") ?? "").trim();
    const email = String(dados.get("email") ?? "").trim();
    const desafio = String(dados.get("desafio") ?? "").trim();
    const frequencia = String(dados.get("frequencia") ?? "").trim();

    if (!nome || !desafio || !frequencia) {
      setErro("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setEnviando(true);
    const resultado = await enviarFormulario({
      formId: "exemplo",
      titulo: "Formulário de exemplo",
      respostas: [
        { pergunta: "Nome", resposta: nome },
        { pergunta: "E-mail para contato", resposta: email },
        { pergunta: "Qual o seu maior desafio comportamental hoje?", resposta: desafio },
        { pergunta: "Com que frequência você sente isso?", resposta: frequencia },
      ],
    });

    if (resultado.ok) {
      // Redirect SÓ após o envio dar certo.
      router.push("/forms/exemplo/obrigado");
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
      <div>
        <label htmlFor="nome" className={ROTULO}>
          Nome <span aria-hidden="true">*</span>
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          placeholder="Como você se chama?"
          className={CAMPO}
        />
      </div>

      <div>
        <label htmlFor="email" className={ROTULO}>
          E-mail para contato
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com (opcional)"
          className={CAMPO}
        />
      </div>

      <div>
        <label htmlFor="desafio" className={ROTULO}>
          Qual o seu maior desafio comportamental hoje?{" "}
          <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="desafio"
          name="desafio"
          required
          rows={5}
          placeholder="Escreva com as suas palavras — não precisa caprichar."
          className={`${CAMPO} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="frequencia" className={ROTULO}>
          Com que frequência você sente isso?{" "}
          <span aria-hidden="true">*</span>
        </label>
        <select
          id="frequencia"
          name="frequencia"
          required
          defaultValue=""
          className={CAMPO}
        >
          <option value="" disabled>
            Selecione…
          </option>
          <option value="Diariamente">Diariamente</option>
          <option value="Algumas vezes na semana">Algumas vezes na semana</option>
          <option value="Raramente">Raramente</option>
        </select>
      </div>

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

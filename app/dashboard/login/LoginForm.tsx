"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { entrar } from "@/lib/auth/acoes";

/*
 * Formulário de login da área interna. Chama a Server Action `entrar` e, SÓ após sucesso, navega
 * para o destino (`next`, já sanitizado no server). Em erro, mostra a mensagem e reabilita o botão
 * — mesmo padrão dos formulários do site (app/forms/*).
 */

const CAMPO =
  "w-full rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] px-4 py-3 text-[var(--color-va-text)] placeholder:text-[var(--color-va-silver-mute)]/60 transition-colors hover:border-[var(--color-va-border-up)] focus:border-[var(--color-va-blue-light)] focus:outline-none";
const ROTULO =
  "mb-2 block text-[0.72rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase";

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const dados = new FormData(e.currentTarget);
    const senha = String(dados.get("senha") ?? "");

    if (!senha) {
      setErro("Por favor, informe a senha.");
      return;
    }

    setEnviando(true);
    const resultado = await entrar(senha);

    if (resultado.ok) {
      // Navega SÓ após o login dar certo. O cookie já foi setado pela action.
      router.push(next);
      router.refresh();
    } else {
      setErro(resultado.erro);
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={aoEnviar}
      noValidate
      className="mx-auto flex w-full max-w-sm flex-col gap-7 rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-6 text-left md:p-8"
    >
      <div>
        <label htmlFor="senha" className={ROTULO}>
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="••••••••"
          className={CAMPO}
        />
      </div>

      {erro && (
        <p
          role="alert"
          className="rounded-xl border border-[var(--color-va-border-up)] bg-[var(--color-va-bg)] px-4 py-3 text-sm text-[var(--color-va-silver)]"
        >
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        aria-busy={enviando}
        className="group relative mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-va-blue)] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_10px_30px_-12px_rgba(47,88,120,0.35)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:bg-[var(--color-va-blue-light)] hover:shadow-[0_18px_40px_-12px_rgba(47,88,120,0.45)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 md:text-base"
      >
        <span>{enviando ? "Entrando…" : "Entrar"}</span>
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

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

/*
 * Linha da tabela de respostas (desktop). A linha inteira leva ao detalhe via
 * router.push; o nome é um <Link> real (teclado, middle-click, semântica) e o
 * mailto: interrompe a propagação para não abrir o detalhe junto.
 */

const CELULA = "px-4 py-3 align-middle";

export default function LinhaSubmissao({
  id,
  nome,
  email,
  tituloFormulario,
  dataFormatada,
  totalRespostas,
}: {
  id: string;
  nome: string | null;
  email: string | null;
  tituloFormulario: string;
  dataFormatada: string;
  totalRespostas: number;
}) {
  const router = useRouter();
  const href = `/dashboard/respostas/${id}`;

  return (
    <tr
      onClick={() => router.push(href)}
      className="cursor-pointer border-b border-[var(--color-va-border)] transition-colors last:border-b-0 hover:bg-[var(--color-va-bg)]"
    >
      <td className={CELULA}>
        <Link
          href={href}
          className="font-medium text-[var(--color-va-text)] transition-colors hover:text-[var(--color-va-blue)]"
          onClick={(e) => e.stopPropagation()}
        >
          {nome || "Sem nome informado"}
        </Link>
      </td>
      <td className={`${CELULA} text-[var(--color-va-silver)]`}>
        {email ? (
          <a
            href={`mailto:${email}`}
            onClick={(e) => e.stopPropagation()}
            className="break-all transition-colors hover:text-[var(--color-va-text)]"
          >
            {email}
          </a>
        ) : (
          <span className="text-[var(--color-va-silver-mute)]">—</span>
        )}
      </td>
      <td className={CELULA}>
        <span className="rounded-full border border-[var(--color-va-border)] px-2.5 py-0.5 text-[0.7rem] tracking-wide whitespace-nowrap text-[var(--color-va-silver-mute)]">
          {tituloFormulario}
        </span>
      </td>
      <td className={`${CELULA} whitespace-nowrap text-[var(--color-va-silver)]`}>
        <time>{dataFormatada}</time>
      </td>
      <td className={`${CELULA} text-right text-[var(--color-va-silver)]`}>
        {totalRespostas}
      </td>
      <td className={`${CELULA} w-10`}>
        <ChevronRight
          className="h-4 w-4 text-[var(--color-va-silver-mute)]"
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </td>
    </tr>
  );
}

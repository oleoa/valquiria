import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Submissao } from "@/lib/forms/consultar";
import { formatarDataHora } from "@/lib/forms/datas";
import LinhaSubmissao from "./LinhaSubmissao";

/*
 * Lista das submissões: tabela densa no desktop e lista empilhada no mobile.
 * Server Component — formata as datas aqui e passa só o necessário para a linha
 * (client), sem serializar as respostas completas.
 */

const CABECALHO =
  "px-4 py-3 text-left text-[0.68rem] font-medium tracking-[0.18em] text-[var(--color-va-silver-mute)] uppercase";

export default function TabelaRespostas({
  submissoes,
}: {
  submissoes: Submissao[];
}) {
  return (
    <>
      {/* Desktop: tabela */}
      <div className="mt-8 hidden overflow-hidden rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-va-border)]">
              <th scope="col" className={CABECALHO}>
                Nome
              </th>
              <th scope="col" className={CABECALHO}>
                E-mail
              </th>
              <th scope="col" className={CABECALHO}>
                Formulário
              </th>
              <th scope="col" className={CABECALHO}>
                Data
              </th>
              <th scope="col" className={`${CABECALHO} text-right`}>
                Respostas
              </th>
              <th scope="col" className="w-10 px-4 py-3">
                <span className="sr-only">Abrir</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {submissoes.map((s) => (
              <LinhaSubmissao
                key={s.id}
                id={s.id}
                nome={s.nome}
                email={s.email}
                tituloFormulario={s.titulo}
                dataFormatada={formatarDataHora(s.criadoEm)}
                totalRespostas={s.respostas.length}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: lista empilhada */}
      <ul className="mt-8 flex flex-col gap-3 md:hidden">
        {submissoes.map((s) => (
          <li key={s.id}>
            <Link
              href={`/dashboard/respostas/${s.id}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-va-border)] bg-[var(--color-va-bg-soft)] p-4 transition-colors hover:border-[var(--color-va-border-up)]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--color-va-text)]">
                  {s.nome || "Sem nome informado"}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-va-silver-mute)]">
                  <span className="rounded-full border border-[var(--color-va-border)] px-2 py-0.5 tracking-wide">
                    {s.titulo}
                  </span>
                  <time>{formatarDataHora(s.criadoEm)}</time>
                </p>
              </div>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-[var(--color-va-silver-mute)]"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

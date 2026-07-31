import CabecalhoArea from "./CabecalhoArea";
import RodapeArea from "../RodapeArea";

/*
 * Casca compartilhada das páginas protegidas da área interna (painel, respostas e
 * detalhe). O login fica fora do grupo (interna) e mantém a casca própria.
 */

export default function LayoutInterno({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CabecalhoArea />
      <main className="relative">{children}</main>
      <RodapeArea />
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  /** Atraso em milissegundos antes de iniciar a animação após entrar na viewport. */
  delay?: number;
  /** Classe extra opcional para o wrapper. */
  className?: string;
  /** Tag do wrapper. Default: div. */
  as?: "div" | "section" | "li" | "article";
};

/**
 * Envolve filhos com um fade-up suave disparado quando entram na viewport.
 * Anima apenas uma vez (a transformação não se reseta no scroll de volta).
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respeita usuários com prefers-reduced-motion: mostra direto, sem animação.
    // setState é deferido (rAF) para não rodar síncrono no corpo do effect.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = window.setTimeout(() => setVisible(true), delay);
          observer.disconnect();
          return () => window.clearTimeout(t);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  const classes = `va-reveal ${visible ? "va-reveal--visible" : ""} ${className}`.trim();

  // Tag aceita div/section/li/article — todos extendem HTMLElement, então o cast é seguro.
  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={classes}>
      {children}
    </Component>
  );
}

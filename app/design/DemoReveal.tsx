"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/*
 * Demo da cascata de entrada: quatro blocos que repetem o fade-up do hero
 * (delays 0/120/280/420) quantas vezes a visitante quiser. Reusa as classes
 * globais .va-reveal/.va-reveal--visible do styles.css — nada de CSS novo.
 * O RevealOnScroll de verdade anima uma única vez (por design); aqui a demo
 * controla as classes direto para permitir o replay.
 */

const DELAYS = [0, 120, 280, 420];

export default function DemoReveal() {
  const [visivel, setVisivel] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Primeira entrada automática; limpa os timeouts pendentes ao desmontar.
  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 200);
    return () => {
      clearTimeout(t);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  function repetir() {
    // Com prefers-reduced-motion o CSS já entra sem transição — o replay
    // vira só um pisca-e-volta inofensivo.
    timeoutsRef.current.forEach(clearTimeout);
    setVisivel(false);
    timeoutsRef.current = [
      setTimeout(() => setVisivel(true), 60),
    ];
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        {DELAYS.map((delay, i) => (
          <div
            key={delay}
            className={`va-reveal ${visivel ? "va-reveal--visible" : ""} rounded-2xl border border-[var(--color-va-border)] bg-[var(--color-va-bg)] p-5 text-center`}
            style={{ transitionDelay: visivel ? `${delay}ms` : "0ms" }}
          >
            <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-va-text)]">
              {i + 1}
            </p>
            <p className="mt-1 font-mono text-[0.7rem] text-[var(--color-va-silver-mute)]">
              {delay} ms
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={repetir}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-va-border-up)] px-6 py-3 text-sm font-medium text-[var(--color-va-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-va-silver-mute)] hover:bg-[var(--color-va-blue)]/[0.06]"
      >
        <RotateCcw className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
        Repetir a entrada
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faq-data";

/** Acordeão de perguntas frequentes. Os itens vêm por prop (ver lib/faq-data.ts). */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="flex flex-col divide-y divide-[var(--color-va-border)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <li key={item.q} className="va-faq-item py-2" data-open={isOpen}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`va-faq-a-${i}`}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-[var(--color-va-text)]"
            >
              <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--color-va-text)] md:text-3xl">
                {item.q}
              </span>
              <ChevronDown
                className="va-faq-chevron h-5 w-5 flex-shrink-0 text-[var(--color-va-silver-mute)] group-hover:text-[var(--color-va-silver)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>

            <div id={`va-faq-a-${i}`} className="va-faq-answer" role="region">
              <div>
                <p className="pb-6 pr-10 text-base leading-relaxed text-[var(--color-va-silver)] md:text-lg">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** CTA primário azul-aço. Liga para um destino externo (http) ou âncora interna. */
export default function CtaButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-va-blue)] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_10px_30px_-12px_rgba(47,88,120,0.35)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:bg-[var(--color-va-blue-light)] hover:shadow-[0_18px_40px_-12px_rgba(47,88,120,0.45)] md:text-base",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    </a>
  );
}

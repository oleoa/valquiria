/** Label pequeno uppercase (eyebrow das seções). */
export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3 text-[0.7rem] font-medium tracking-[0.25em] text-[var(--color-va-silver-mute)] uppercase">
      <span className="h-px w-8 bg-[var(--color-va-border-up)]" />
      <span>{children}</span>
      <span className="h-px w-8 bg-[var(--color-va-border-up)]" />
    </div>
  );
}

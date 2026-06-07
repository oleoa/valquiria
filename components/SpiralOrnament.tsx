/** Espiral abstrata decorativa (eco da logo). */
export default function SpiralOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      {/* Concentrismo sutil + traço de espiral logarítmica */}
      {Array.from({ length: 6 }).map((_, i) => {
        const r = 90 - i * 14;
        return <circle key={i} cx="100" cy="100" r={r} />;
      })}
      <path d="M100 10 C 155 25, 175 80, 100 100 C 60 110, 50 75, 100 60 C 130 52, 138 80, 110 90" />
    </svg>
  );
}

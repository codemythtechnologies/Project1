type LogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`w-9 h-9 flex items-center justify-center border font-serif italic text-lg flex-shrink-0 ${
          isLight ? 'border-[var(--ivory)] text-[var(--ivory)]' : 'border-[var(--ink)] text-[var(--ink)]'
        }`}
      >
        R
      </span>
      <div className="leading-tight">
        <div className={`font-serif text-[15px] tracking-tight ${isLight ? 'text-[var(--ivory)]' : 'text-[var(--ink)]'}`}>
          Renaissance
        </div>
        <div
          className={`text-[9px] uppercase tracking-[0.22em] ${
            isLight ? 'text-[var(--ivory)]/60' : 'text-[var(--muted)]'
          }`}
        >
          Management Consultants
        </div>
      </div>
    </div>
  );
}

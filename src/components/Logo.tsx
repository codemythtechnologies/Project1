type LogoProps = {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
};

export default function Logo({ className = '', showText = true, variant = 'dark' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const subColor = variant === 'light' ? 'text-brand-200' : 'text-brand-600';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#33a8f5" />
            <stop offset="0.5" stopColor="#1d87da" />
            <stop offset="1" stopColor="#186cb0" />
          </linearGradient>
          <linearGradient id="logoGradAccent" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* Rounded square base */}
        <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#logoGrad)" />
        {/* Inner highlight ring */}
        <rect x="2" y="2" width="44" height="44" rx="12" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        {/* R letter - abstract */}
        <path
          d="M16 14h8.5c3.3 0 5.8 2.3 5.8 5.5 0 2.2-1.2 3.9-3.1 4.7L31.5 34h-4.2l-3.5-9.2H19.5V34H16V14zm3.5 3v5.2h4.8c1.5 0 2.6-1 2.6-2.6 0-1.5-1.1-2.6-2.6-2.6H19.5z"
          fill="white"
        />
        {/* Accent dot - represents a candidate placed */}
        <circle cx="33" cy="15" r="4" fill="url(#logoGradAccent)" />
        <circle cx="33" cy="15" r="4" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
        {/* Connecting arc from R to dot */}
        <path
          d="M28 16.5c1.3-0.8 2.8-1.2 4.2-1"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
      </svg>
      {showText && (
        <div className="leading-tight">
          <div className={`font-display text-base font-extrabold tracking-tight ${textColor}`}>
            Renaissance
          </div>
          <div className={`text-[10px] font-semibold tracking-[0.15em] uppercase ${subColor}`}>
            Management Consultants
          </div>
        </div>
      )}
    </div>
  );
}

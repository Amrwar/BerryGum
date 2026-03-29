export default function ServicesIllustration() {
  return (
    <svg
      viewBox="0 0 336 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-auto mx-auto"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="si-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e0a5e" />
          <stop offset="100%" stopColor="#9b20a0" />
        </linearGradient>
        <linearGradient id="si-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9b20a0" />
          <stop offset="100%" stopColor="#e0007a" />
        </linearGradient>
        <linearGradient id="si-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#9b20a0" />
        </linearGradient>
        <linearGradient id="si-d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0007a" />
          <stop offset="100%" stopColor="#f43f8b" />
        </linearGradient>
        <filter id="si-card-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1e0a5e" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* ── 1: Clinic / Cross ── */}
      <rect x="0" y="0" width="72" height="72" rx="16" fill="url(#si-a)" filter="url(#si-card-shadow)" />
      <rect x="33" y="22" width="6" height="28" rx="3" fill="white" />
      <rect x="22" y="33" width="28" height="6" rx="3" fill="white" />

      {/* ── 2: Restaurant / Fork & knife ── */}
      <rect x="88" y="0" width="72" height="72" rx="16" fill="url(#si-b)" filter="url(#si-card-shadow)" />
      <line x1="118" y1="22" x2="118" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="114" y1="22" x2="114" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="122" y1="22" x2="122" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M114 30 Q118 34 122 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="134" y1="22" x2="134" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M134 22 Q140 28 134 36" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── 3: E-commerce / Bag ── */}
      <rect x="176" y="0" width="72" height="72" rx="16" fill="url(#si-c)" filter="url(#si-card-shadow)" />
      <rect x="198" y="32" width="28" height="22" rx="4" stroke="white" strokeWidth="3" />
      <path d="M204 32 Q204 24 212 24 Q220 24 220 32" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="207" cy="38" r="2" fill="white" />
      <circle cx="217" cy="38" r="2" fill="white" />

      {/* ── 4: Corporate / Building ── */}
      <rect x="264" y="0" width="72" height="72" rx="16" fill="url(#si-d)" filter="url(#si-card-shadow)" />
      <rect x="288" y="24" width="16" height="20" rx="2" stroke="white" strokeWidth="2.5" />
      <rect x="308" y="30" width="12" height="14" rx="2" stroke="white" strokeWidth="2.5" />
      <line x1="285" y1="44" x2="323" y2="44" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="292" y="28" width="4" height="4" rx="1" fill="white" />
      <rect x="299" y="28" width="4" height="4" rx="1" fill="white" />
      <rect x="311" y="34" width="4" height="4" rx="1" fill="white" />
    </svg>
  );
}

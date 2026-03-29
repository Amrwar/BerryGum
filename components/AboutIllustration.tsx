export default function AboutIllustration() {
  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ab-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e0a5e" />
          <stop offset="55%" stopColor="#9b20a0" />
          <stop offset="100%" stopColor="#e0007a" />
        </linearGradient>
        <linearGradient id="ab-purple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#9b20a0" />
        </linearGradient>
        <linearGradient id="ab-pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9b20a0" />
          <stop offset="100%" stopColor="#e0007a" />
        </linearGradient>
        <linearGradient id="ab-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
        <filter id="ab-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#1e0a5e" floodOpacity="0.13" />
        </filter>
        <filter id="ab-shadow-sm">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#1e0a5e" floodOpacity="0.10" />
        </filter>
      </defs>

      {/* ── Soft background circle ── */}
      <circle cx="180" cy="200" r="148" fill="url(#ab-bg)" opacity="0.55" />
      <circle cx="180" cy="200" r="163" stroke="rgba(155,32,160,0.10)" strokeWidth="1" strokeDasharray="6 5" />

      {/* ── Subtle connector between people ── */}
      <line x1="90" y1="242" x2="270" y2="242"
        stroke="rgba(155,32,160,0.14)" strokeWidth="1.5" strokeDasharray="5 5" />

      {/* ══════════════════════
          LEFT PERSON
      ══════════════════════ */}
      <circle cx="90" cy="196" r="26" fill="url(#ab-purple)" />
      <circle cx="83" cy="189" r="7" fill="rgba(255,255,255,0.18)" />
      <path d="M44 270 Q44 234 90 234 Q136 234 136 270" fill="url(#ab-purple)" />

      {/* ══════════════════════
          CENTER PERSON  (larger / elevated)
      ══════════════════════ */}
      <circle cx="180" cy="176" r="34" fill="url(#ab-brand)" />
      <circle cx="171" cy="168" r="10" fill="rgba(255,255,255,0.18)" />
      <path d="M124 270 Q124 222 180 222 Q236 222 236 270" fill="url(#ab-brand)" />

      {/* ══════════════════════
          RIGHT PERSON
      ══════════════════════ */}
      <circle cx="270" cy="196" r="26" fill="url(#ab-pink)" />
      <circle cx="263" cy="189" r="7" fill="rgba(255,255,255,0.18)" />
      <path d="M224 270 Q224 234 270 234 Q316 234 316 270" fill="url(#ab-pink)" />

      {/* Ground bar */}
      <rect x="28" y="270" width="304" height="7" rx="3.5" fill="rgba(155,32,160,0.07)" />

      {/* ══════════════════════
          BADGE — Years of Experience
      ══════════════════════ */}
      <rect x="8" y="28" width="118" height="66" rx="14" fill="white" filter="url(#ab-shadow)" />
      <rect x="8" y="28" width="5" height="66" rx="2.5" fill="url(#ab-brand)" />
      <text x="24" y="57"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="28" fontWeight="800" fill="#9b20a0">5+</text>
      <text x="24" y="72"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="10" fill="#94a3b8">Years Experience</text>
      <rect x="24" y="80" width="72" height="4" rx="2" fill="#f1f5f9" />

      {/* ══════════════════════
          BADGE — Projects
      ══════════════════════ */}
      <rect x="234" y="18" width="118" height="66" rx="14" fill="white" filter="url(#ab-shadow)" />
      <rect x="347" y="18" width="5" height="66" rx="2.5" fill="url(#ab-pink)" />
      <text x="248" y="47"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="28" fontWeight="800" fill="#e0007a">150+</text>
      <text x="248" y="62"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="10" fill="#94a3b8">Projects Delivered</text>
      <rect x="248" y="70" width="72" height="4" rx="2" fill="#f1f5f9" />

      {/* ══════════════════════
          BADGE — Rating (bottom, gradient pill)
      ══════════════════════ */}
      <rect x="100" y="292" width="160" height="48" rx="24" fill="url(#ab-brand)" filter="url(#ab-shadow-sm)" />
      <text x="180" y="314"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="15" fill="rgba(255,255,255,0.92)" textAnchor="middle">★★★★★</text>
      <text x="180" y="330"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="10" fill="rgba(255,255,255,0.62)" textAnchor="middle">5.0 Client Rating</text>

      {/* ══════════════════════
          SPARKLE DECORATIONS
      ══════════════════════ */}
      <path d="M8 0 L9.4 5.6 L15 7 L9.4 8.4 L8 14 L6.6 8.4 L1 7 L6.6 5.6 Z"
        fill="#9b20a0" opacity="0.3" transform="translate(152,6)" />
      <path d="M6 0 L7 4.6 L12 5.5 L7 6.4 L6 11 L5 6.4 L0 5.5 L5 4.6 Z"
        fill="#e0007a" opacity="0.32" transform="translate(338,118)" />
      <path d="M5 0 L6 3.8 L10 4.5 L6 5.2 L5 9 L4 5.2 L0 4.5 L4 3.8 Z"
        fill="#9b20a0" opacity="0.22" transform="translate(16,148)" />

      {/* Floating dots */}
      <circle cx="180" cy="14" r="4"   fill="rgba(155,32,160,0.22)" />
      <circle cx="193" cy="6"  r="3"   fill="rgba(224,0,122,0.16)" />
      <circle cx="346" cy="206" r="4"  fill="rgba(155,32,160,0.18)" />
      <circle cx="354" cy="218" r="3"  fill="rgba(224,0,122,0.14)" />
    </svg>
  );
}

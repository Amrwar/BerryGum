export default function ServicesIllustration() {
  return (
    <svg
      viewBox="0 0 420 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[140px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="si-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e0a5e" />
          <stop offset="55%" stopColor="#9b20a0" />
          <stop offset="100%" stopColor="#e0007a" />
        </linearGradient>
        <linearGradient id="si-pink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9b20a0" />
          <stop offset="100%" stopColor="#e0007a" />
        </linearGradient>
        <linearGradient id="si-hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
        <filter id="si-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#1e0a5e" floodOpacity="0.13" />
        </filter>
        <filter id="si-shadow-sm">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#1e0a5e" floodOpacity="0.10" />
        </filter>
      </defs>

      {/* ── Soft background halos ── */}
      <circle cx="210" cy="115" r="120" fill="rgba(155,32,160,0.04)" />
      <circle cx="62" cy="100" r="50" fill="rgba(224,0,122,0.04)" />
      <circle cx="358" cy="100" r="50" fill="rgba(30,10,94,0.04)" />

      {/* ══════════════════════════════
          LEFT PHONE MOCKUP
      ══════════════════════════════ */}
      <rect x="28" y="52" width="58" height="102" rx="9" fill="white" filter="url(#si-shadow-sm)" />
      {/* screen */}
      <rect x="31" y="55" width="52" height="96" rx="6" fill="#f8fafc" />
      {/* header */}
      <rect x="31" y="55" width="52" height="24" rx="6" fill="url(#si-brand)" />
      <rect x="31" y="67" width="52" height="12" fill="url(#si-brand)" />
      {/* logo + hamburger */}
      <rect x="37" y="62" width="18" height="6" rx="2" fill="rgba(255,255,255,0.55)" />
      <rect x="66" y="62" width="9" height="1.5" rx="1" fill="rgba(255,255,255,0.55)" />
      <rect x="66" y="65" width="9" height="1.5" rx="1" fill="rgba(255,255,255,0.55)" />
      <rect x="66" y="68" width="9" height="1.5" rx="1" fill="rgba(255,255,255,0.55)" />
      {/* hero block */}
      <rect x="31" y="79" width="52" height="26" fill="url(#si-hero-bg)" />
      <rect x="37" y="84" width="28" height="6" rx="2" fill="#1e293b" />
      <rect x="37" y="93" width="20" height="4" rx="1" fill="#94a3b8" />
      <rect x="37" y="101" width="18" height="8" rx="4" fill="url(#si-brand)" />
      {/* card row */}
      <rect x="33" y="108" width="22" height="18" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.8" />
      <rect x="36" y="111" width="8" height="8" rx="2" fill="rgba(155,32,160,0.12)" />
      <rect x="36" y="121" width="13" height="3" rx="1" fill="#e2e8f0" />
      <rect x="57" y="108" width="22" height="18" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.8" />
      <rect x="60" y="111" width="8" height="8" rx="2" fill="rgba(224,0,122,0.12)" />
      <rect x="60" y="121" width="13" height="3" rx="1" fill="#e2e8f0" />
      {/* notch */}
      <rect x="48" y="55" width="12" height="3" rx="1.5" fill="rgba(30,10,94,0.18)" />

      {/* ══════════════════════════════
          MAIN BROWSER / LAPTOP  (centred)
      ══════════════════════════════ */}
      <rect x="108" y="14" width="204" height="158" rx="12" fill="white" filter="url(#si-shadow)" />
      {/* header */}
      <rect x="108" y="14" width="204" height="32" rx="12" fill="url(#si-brand)" />
      <rect x="108" y="34" width="204" height="12" fill="url(#si-brand)" />
      {/* dots */}
      <circle cx="124" cy="30" r="4" fill="rgba(255,255,255,0.4)" />
      <circle cx="136" cy="30" r="4" fill="rgba(255,255,255,0.4)" />
      <circle cx="148" cy="30" r="4" fill="rgba(255,255,255,0.4)" />
      {/* url bar */}
      <rect x="164" y="21" width="110" height="18" rx="9" fill="rgba(255,255,255,0.18)" />
      {/* nav */}
      <rect x="108" y="46" width="204" height="28" fill="#f8fafc" />
      <rect x="120" y="54" width="30" height="10" rx="3" fill="url(#si-brand)" opacity="0.9" />
      <rect x="162" y="56" width="18" height="6" rx="2" fill="#cbd5e1" />
      <rect x="186" y="56" width="18" height="6" rx="2" fill="#cbd5e1" />
      <rect x="210" y="56" width="18" height="6" rx="2" fill="#cbd5e1" />
      <rect x="272" y="53" width="28" height="12" rx="6" fill="url(#si-brand)" />
      {/* hero area */}
      <rect x="108" y="74" width="204" height="54" fill="url(#si-hero-bg)" />
      <rect x="120" y="84" width="80" height="10" rx="3" fill="#1e293b" />
      <rect x="120" y="98" width="60" height="7" rx="2" fill="#94a3b8" />
      <rect x="120" y="110" width="44" height="14" rx="6" fill="url(#si-brand)" />
      {/* decorative circle in hero */}
      <circle cx="270" cy="101" r="24" fill="url(#si-brand)" opacity="0.10" />
      <circle cx="270" cy="101" r="14" fill="url(#si-brand)" opacity="0.14" />
      <circle cx="270" cy="101" r="6"  fill="url(#si-brand)" opacity="0.22" />
      {/* divider */}
      <rect x="108" y="128" width="204" height="1" fill="#f1f5f9" />
      {/* 3 service cards */}
      {/* card 1 */}
      <rect x="116" y="134" width="56" height="32" rx="5" fill="#fafafa" stroke="#f1f5f9" strokeWidth="1" />
      <rect x="122" y="139" width="14" height="14" rx="3" fill="rgba(155,32,160,0.1)" />
      <rect x="122" y="157" width="34" height="4" rx="2" fill="#e2e8f0" />
      <rect x="122" y="163" width="22" height="3" rx="1.5" fill="#f1f5f9" />
      {/* card 2 */}
      <rect x="182" y="134" width="56" height="32" rx="5" fill="#fafafa" stroke="#f1f5f9" strokeWidth="1" />
      <rect x="188" y="139" width="14" height="14" rx="3" fill="rgba(224,0,122,0.1)" />
      <rect x="188" y="157" width="34" height="4" rx="2" fill="#e2e8f0" />
      <rect x="188" y="163" width="22" height="3" rx="1.5" fill="#f1f5f9" />
      {/* card 3 */}
      <rect x="248" y="134" width="56" height="32" rx="5" fill="#fafafa" stroke="#f1f5f9" strokeWidth="1" />
      <rect x="254" y="139" width="14" height="14" rx="3" fill="rgba(30,10,94,0.08)" />
      <rect x="254" y="157" width="34" height="4" rx="2" fill="#e2e8f0" />
      <rect x="254" y="163" width="22" height="3" rx="1.5" fill="#f1f5f9" />
      {/* laptop base */}
      <rect x="92" y="172" width="236" height="12" rx="3" fill="#e2e8f0" />
      <rect x="78" y="184" width="264" height="6" rx="3" fill="#cbd5e1" />

      {/* ══════════════════════════════
          RIGHT TABLET MOCKUP
      ══════════════════════════════ */}
      <rect x="334" y="40" width="82" height="112" rx="9" fill="white" filter="url(#si-shadow-sm)" />
      {/* screen */}
      <rect x="337" y="43" width="76" height="106" rx="6" fill="#f8fafc" />
      {/* header */}
      <rect x="337" y="43" width="76" height="26" rx="6" fill="url(#si-brand)" />
      <rect x="337" y="57" width="76" height="12" fill="url(#si-brand)" />
      {/* logo */}
      <rect x="344" y="50" width="22" height="7" rx="2" fill="rgba(255,255,255,0.55)" />
      {/* nav links */}
      <rect x="374" y="52" width="12" height="5" rx="1.5" fill="rgba(255,255,255,0.35)" />
      <rect x="391" y="52" width="12" height="5" rx="1.5" fill="rgba(255,255,255,0.35)" />
      {/* hero */}
      <rect x="337" y="69" width="76" height="32" fill="url(#si-hero-bg)" />
      <rect x="344" y="75" width="40" height="7" rx="2" fill="#1e293b" />
      <rect x="344" y="86" width="30" height="4" rx="1" fill="#94a3b8" />
      <rect x="344" y="93" width="24" height="8" rx="4" fill="url(#si-brand)" />
      {/* 2×2 card grid */}
      <rect x="339" y="103" width="33" height="18" rx="3" fill="white" stroke="#f1f5f9" strokeWidth="0.8" />
      <rect x="343" y="107" width="8" height="8" rx="2" fill="rgba(155,32,160,0.1)" />
      <rect x="343" y="117" width="20" height="3" rx="1" fill="#e2e8f0" />

      <rect x="378" y="103" width="33" height="18" rx="3" fill="white" stroke="#f1f5f9" strokeWidth="0.8" />
      <rect x="382" y="107" width="8" height="8" rx="2" fill="rgba(224,0,122,0.1)" />
      <rect x="382" y="117" width="20" height="3" rx="1" fill="#e2e8f0" />

      <rect x="339" y="124" width="33" height="18" rx="3" fill="white" stroke="#f1f5f9" strokeWidth="0.8" />
      <rect x="343" y="128" width="8" height="8" rx="2" fill="rgba(30,10,94,0.08)" />
      <rect x="343" y="138" width="20" height="3" rx="1" fill="#e2e8f0" />

      <rect x="378" y="124" width="33" height="18" rx="3" fill="white" stroke="#f1f5f9" strokeWidth="0.8" />
      <rect x="382" y="128" width="8" height="8" rx="2" fill="rgba(155,32,160,0.1)" />
      <rect x="382" y="138" width="20" height="3" rx="1" fill="#e2e8f0" />

      {/* ══════════════════════════════
          FLOATING BADGE — "4 Services"
      ══════════════════════════════ */}
      <rect x="148" y="190" width="124" height="30" rx="15" fill="url(#si-brand)" filter="url(#si-shadow-sm)" />
      <circle cx="166" cy="205" r="8" fill="rgba(255,255,255,0.2)" />
      {/* checkmark */}
      <path d="M161 205 L165 209 L171 201" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="180" y="200" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.75)" />
      <rect x="185" y="208" width="56" height="4" rx="2" fill="rgba(255,255,255,0.45)" />

      {/* ══════════════════════════════
          FLOATING MINI BADGE — top
      ══════════════════════════════ */}
      <rect x="76" y="20" width="74" height="22" rx="11" fill="white" filter="url(#si-shadow-sm)" />
      <circle cx="89" cy="31" r="6" fill="rgba(155,32,160,0.12)" />
      {/* star icon */}
      <path d="M89 26.5 L90 29.5 L93 29.5 L90.5 31.5 L91.5 34.5 L89 32.5 L86.5 34.5 L87.5 31.5 L85 29.5 L88 29.5 Z"
        fill="#9b20a0" opacity="0.8" />
      <rect x="98" y="27" width="44" height="4" rx="2" fill="#e2e8f0" />
      <rect x="102" y="33" width="32" height="3" rx="1.5" fill="#f1f5f9" />

      {/* ══════════════════════════════
          FLOATING MINI BADGE — right
      ══════════════════════════════ */}
      <rect x="280" y="8" width="70" height="22" rx="11" fill="white" filter="url(#si-shadow-sm)" />
      <circle cx="293" cy="19" r="6" fill="rgba(224,0,122,0.12)" />
      <path d="M290 17 L293 14 L296 17 L294 22 L293 23 L292 22 Z" fill="#e0007a" opacity="0.7" />
      <rect x="302" y="15" width="38" height="4" rx="2" fill="#e2e8f0" />
      <rect x="305" y="21" width="26" height="3" rx="1.5" fill="#f1f5f9" />

      {/* ══════════════════════════════
          CURSOR
      ══════════════════════════════ */}
      <g transform="translate(244,108)">
        <path d="M0 0 L0 15 L3.8 11 L6.5 17.5 L8.2 16.8 L5.5 10.3 L10 10.3 Z"
          fill="url(#si-brand)" />
      </g>

      {/* ══════════════════════════════
          SPARKLE DECORATIONS
      ══════════════════════════════ */}
      {/* top-left */}
      <path d="M8 0 L9.4 5.6 L15 7 L9.4 8.4 L8 14 L6.6 8.4 L1 7 L6.6 5.6 Z"
        fill="#9b20a0" opacity="0.35" transform="translate(0,8)" />
      {/* bottom-right */}
      <path d="M6 0 L7 4.6 L11.5 5.5 L7 6.4 L6 11 L5 6.4 L0.5 5.5 L5 4.6 Z"
        fill="#e0007a" opacity="0.3" transform="translate(404,160)" />
      {/* mid-left */}
      <path d="M4.5 0 L5.3 3.2 L8.5 4 L5.3 4.8 L4.5 8 L3.7 4.8 L0.5 4 L3.7 3.2 Z"
        fill="#9b20a0" opacity="0.25" transform="translate(10,148)" />

      {/* small floating dots */}
      <circle cx="96"  cy="156" r="4"   fill="rgba(155,32,160,0.18)" />
      <circle cx="85"  cy="168" r="2.8" fill="rgba(224,0,122,0.15)" />
      <circle cx="325" cy="165" r="4"   fill="rgba(155,32,160,0.18)" />
      <circle cx="336" cy="175" r="2.8" fill="rgba(224,0,122,0.15)" />
      <circle cx="210" cy="6"   r="3.5" fill="rgba(155,32,160,0.2)"  />
      <circle cx="222" cy="14"  r="2.5" fill="rgba(224,0,122,0.15)"  />
    </svg>
  );
}

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 260 200" className="hero-illus" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Background blob */}
      <ellipse cx="135" cy="170" rx="120" ry="14" fill="#eef1fb" />

      {/* Floating chart card (top-left) */}
      <g transform="translate(10 30)">
        <rect width="78" height="56" rx="8" fill="#fff" stroke="#e5e8f2" />
        <rect x="10" y="10" width="34" height="6" rx="3" fill="#d6deec" />
        <rect x="10" y="22" width="14" height="20" rx="2" fill="#7c3aed" />
        <rect x="28" y="28" width="14" height="14" rx="2" fill="#a78bfa" />
        <rect x="46" y="18" width="14" height="24" rx="2" fill="#2563eb" />
      </g>

      {/* Target (top-right) */}
      <g transform="translate(195 18)">
        <circle cx="22" cy="22" r="22" fill="#fee2e2" />
        <circle cx="22" cy="22" r="14" fill="#fff" />
        <circle cx="22" cy="22" r="7" fill="#dc2626" />
        <path d="M22 4 L22 -2 M22 -2 L26 0" stroke="#0f1133" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* Trophy (right) */}
      <g transform="translate(212 90)">
        <rect x="6" y="0" width="22" height="20" rx="3" fill="#fde047" />
        <path d="M6 4 H0 V10 Q0 16 6 18" fill="none" stroke="#facc15" strokeWidth="3" />
        <path d="M28 4 H34 V10 Q34 16 28 18" fill="none" stroke="#facc15" strokeWidth="3" />
        <rect x="12" y="20" width="10" height="6" fill="#fde047" />
        <rect x="6" y="26" width="22" height="4" rx="2" fill="#f59e0b" />
      </g>

      {/* Person base */}
      <g transform="translate(95 60)">
        {/* Chair back */}
        <rect x="-6" y="78" width="76" height="14" rx="6" fill="#1e3a8a" />
        {/* Body */}
        <path d="M8 50 Q8 38 32 38 Q56 38 56 50 L60 90 L4 90 Z" fill="#2563eb" />
        {/* Neck */}
        <rect x="26" y="32" width="12" height="10" fill="#f9c79b" />
        {/* Head */}
        <circle cx="32" cy="22" r="14" fill="#f9c79b" />
        {/* Hair */}
        <path d="M19 18 Q24 6 32 6 Q42 6 46 16 Q42 12 36 12 Q26 12 19 18 Z" fill="#1f2440" />
        {/* Eyes */}
        <circle cx="27" cy="22" r="1.2" fill="#1f2440" />
        <circle cx="37" cy="22" r="1.2" fill="#1f2440" />
        {/* Smile */}
        <path d="M28 28 Q32 31 36 28" stroke="#1f2440" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* Laptop */}
        <rect x="-4" y="78" width="72" height="8" rx="2" fill="#0f1133" />
        <rect x="2" y="58" width="60" height="22" rx="2" fill="#0f1133" />
        <rect x="6" y="61" width="52" height="16" rx="1" fill="#60a5fa" />
        {/* Arms */}
        <path d="M10 60 Q4 70 12 80" stroke="#f9c79b" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M54 60 Q62 70 54 80" stroke="#f9c79b" strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>

      {/* Floating dots */}
      <circle cx="20" cy="100" r="3" fill="#7c3aed" />
      <circle cx="245" cy="160" r="3" fill="#16a34a" />
      <circle cx="240" cy="60" r="2" fill="#f59e0b" />
    </svg>
  );
}

type P = { className?: string };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const CompassMark = ({ className }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="13.2" {...S} strokeWidth={1.8} />
    <path d="M16 5.5l2.6 10.5L16 26.5l-2.6-10.5z" fill="var(--color-coral)" stroke="none" />
    <path d="M5.5 16L16 13.4 26.5 16 16 18.6z" fill="var(--color-teal)" stroke="none" opacity="0.85" />
    <circle cx="16" cy="16" r="1.7" fill="var(--color-paper)" stroke="none" />
  </svg>
);

export const CompassRose = ({ className }: P) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <circle cx="100" cy="100" r="96" {...S} strokeWidth={0.8} opacity="0.5" />
    <circle cx="100" cy="100" r="70" {...S} strokeWidth={0.6} opacity="0.4" strokeDasharray="3 6" />
    <path d="M100 12l10 78-10 10-10-10z" fill="currentColor" opacity="0.5" stroke="none" />
    <path d="M100 188l10-78-10-10-10 10z" fill="currentColor" opacity="0.28" stroke="none" />
    <path d="M12 100l78-10 10 10-10 10z" fill="currentColor" opacity="0.28" stroke="none" />
    <path d="M188 100l-78-10-10 10 10 10z" fill="currentColor" opacity="0.28" stroke="none" />
    {Array.from({ length: 24 }).map((_, i) => {
      const a = (i * Math.PI) / 12;
      const x1 = 100 + Math.cos(a) * 90;
      const y1 = 100 + Math.sin(a) * 90;
      const x2 = 100 + Math.cos(a) * 96;
      const y2 = 100 + Math.sin(a) * 96;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...S} strokeWidth={0.8} opacity="0.45" />;
    })}
    <circle cx="100" cy="100" r="4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconRoute = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="6" cy="18" r="2.4" {...S} />
    <circle cx="18" cy="6" r="2.4" {...S} />
    <path d="M8.4 18H15a3.5 3.5 0 0 0 0-7H9a3 3 0 0 1 0-6h6.4" {...S} strokeDasharray="3.5 3" />
  </svg>
);

export const IconDoc = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" {...S} />
    <path d="M14 3.5V8h4.5" {...S} />
    <path d="M9 12.5h6M9 15.8h6M9 19h3.5" {...S} />
  </svg>
);

export const IconSpark = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 3.5l1.9 5.4 5.6 1.9-5.6 1.9L12 18l-1.9-5.3-5.6-1.9 5.6-1.9z" {...S} />
    <path d="M18.7 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" {...S} strokeWidth={1.3} />
  </svg>
);

export const IconMap = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M9 4.5L4 6.5v13l5-2 6 2 5-2v-13l-5 2z" {...S} />
    <path d="M9 4.5v13M15 6.5v13" {...S} />
    <circle cx="12" cy="10.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconUsers = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="9" cy="8.5" r="3.2" {...S} />
    <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" {...S} />
    <path d="M15.5 5.9a3.1 3.1 0 0 1 0 5.2M17.4 14.9c1.7.7 2.8 2.3 3.1 4.6" {...S} />
  </svg>
);

export const IconCoins = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <ellipse cx="9.5" cy="7.5" rx="6" ry="3" {...S} />
    <path d="M3.5 7.5v5c0 1.66 2.7 3 6 3s6-1.34 6-3v-5" {...S} />
    <path d="M3.5 12.5v5c0 1.66 2.7 3 6 3s6-1.34 6-3v-5" {...S} />
    <path d="M18.5 9.8c1.3.5 2 1.3 2 2.2 0 1-.9 1.8-2.3 2.2" {...S} />
  </svg>
);

export const IconChecklist = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="4" y="4" width="16" height="16.5" rx="2" {...S} />
    <path d="M8 9.4l1.6 1.6L13 7.6" {...S} />
    <path d="M8 15.4l1.6 1.6L13 13.6" {...S} />
    <path d="M15.5 10h2.5M15.5 16h2.5" {...S} />
  </svg>
);

export const IconStamp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 3.5a2.6 2.6 0 0 1 2.6 2.6c0 2-1.3 3-1.3 4.9h-2.6c0-1.9-1.3-2.9-1.3-4.9A2.6 2.6 0 0 1 12 3.5z" {...S} />
    <path d="M6.5 14.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v2h-11z" {...S} />
    <path d="M4.5 20.5h15" {...S} />
  </svg>
);

export const IconEye = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" {...S} />
    <circle cx="12" cy="12" r="2.8" {...S} />
  </svg>
);

export const IconBeacon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M8 20.5h8l-1.2-6H9.2z" {...S} />
    <path d="M12 14.5v-3" {...S} />
    <circle cx="12" cy="9" r="2.2" {...S} />
    <path d="M5.5 5.5l2 2M18.5 5.5l-2 2M12 3v2.3" {...S} />
  </svg>
);

export const IconPlug = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M9 3.5V8M15 3.5V8" {...S} />
    <path d="M6.5 8h11v3a5.5 5.5 0 0 1-11 0z" {...S} />
    <path d="M12 16.5v2a2 2 0 0 1-2 2H8.5" {...S} />
  </svg>
);

export const IconChart = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 4v16h16" {...S} />
    <path d="M8 15.5l3.5-4 3 2.5 4.5-6" {...S} />
    <circle cx="19" cy="8" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 3.5l7 2.6v5.2c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6.1z" {...S} />
    <path d="M9 11.8l2.2 2.2 4-4.4" {...S} />
  </svg>
);

export const IconGate = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 5h16l-5.5 6.5v5.5l-5 2.5V11.5z" {...S} />
  </svg>
);

export const IconChip = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.6" {...S} />
    <rect x="10" y="10" width="4" height="4" rx="0.6" {...S} strokeWidth={1.3} />
    <path d="M9 3.5v3M15 3.5v3M9 17.5v3M15 17.5v3M3.5 9h3M3.5 15h3M17.5 9h3M17.5 15h3" {...S} />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4.5 12.8l4.7 4.7L19.5 6.5" {...S} strokeWidth={2.1} />
  </svg>
);

export const IconArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 12h15M13.5 5.5L20 12l-6.5 6.5" {...S} strokeWidth={1.9} />
  </svg>
);

export const IconArrowUpRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M6.5 17.5l11-11M8.5 6h9v9" {...S} strokeWidth={1.9} />
  </svg>
);

export const IconStar = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="8.2" {...S} />
    <path d="M12 7.5V12l3 2.2" {...S} />
  </svg>
);

export const IconPin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 21s-6.8-6-6.8-11a6.8 6.8 0 0 1 13.6 0c0 5-6.8 11-6.8 11z" {...S} />
    <circle cx="12" cy="9.8" r="2.3" {...S} />
  </svg>
);

export const IconAnchor = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="6" r="2.5" {...S} />
    <path d="M12 8.5V20M12 20c-4.5 0-7.8-3-8-7.2l2.3 1M12 20c4.5 0 7.8-3 8-7.2l-2.3 1" {...S} />
  </svg>
);

export const IconPlane = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M10.5 13.5L3 11l1.8-1.8 6.7.9 4.8-4.8c.8-.8 2.2-.8 2.9 0 .8.8.8 2.1 0 2.9l-4.8 4.8.9 6.7L13.5 21l-2.5-7.5z" {...S} />
  </svg>
);

export const IconPlus = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" {...S} strokeWidth={1.9} />
  </svg>
);

export const IconDiamond = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 4l6 8-6 8-6-8z" fill="currentColor" stroke="none" />
  </svg>
);

export const FEATURE_ICONS = {
  route: IconRoute,
  doc: IconDoc,
  spark: IconSpark,
  map: IconMap,
  users: IconUsers,
  coins: IconCoins,
  checklist: IconChecklist,
  stamp: IconStamp,
  eye: IconEye,
  beacon: IconBeacon,
  plug: IconPlug,
  chart: IconChart,
} as const;

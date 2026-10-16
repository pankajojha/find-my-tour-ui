export default function Logo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label="FindMyTour.AI logo"
    >
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="55%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="logoPin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>

      <rect width="512" height="512" rx="112" fill="url(#logoBg)" />

      <path
        d="M72 408c64-56 128 40 192-16s112-40 176-8"
        fill="none"
        stroke="#C7D2FE"
        strokeWidth="18"
        strokeLinecap="round"
        strokeDasharray="0.5 34"
      />

      <path
        d="M256 88c-74 0-134 60-134 134 0 100 134 202 134 202s134-102 134-202c0-74-60-134-134-134z"
        fill="url(#logoPin)"
      />

      <path
        d="M256 148l20 54 54 20-54 20-20 54-20-54-54-20 54-20z"
        fill="#4F46E5"
      />

      <circle cx="256" cy="222" r="10" fill="#0EA5E9" />

      <path
        d="M384 86l10 26 26 10-26 10-10 26-10-26-26-10 26-10z"
        fill="#E0E7FF"
        opacity="0.9"
      />
    </svg>
  );
}

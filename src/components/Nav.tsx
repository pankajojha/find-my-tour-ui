import { useEffect, useState } from "react";
import { CompassMark } from "./icons";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#flow" },
  { label: "Excursions", href: "#excursions" },
  { label: "Privacy", href: "#privacy" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-deep/90 backdrop-blur-md border-b border-paper/10 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* reading progress */}
      <div
        className="absolute left-0 top-0 h-[2.5px] bg-coral transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Explorer Agents — home">
          <CompassMark className="h-9 w-9 transition-transform duration-700 ease-out group-hover:rotate-[135deg]" />
          <span className="font-display text-[1.15rem] font-semibold tracking-tight text-paper">
            Explorer<span className="text-coral"> Agents</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-[13.5px] font-medium tracking-wide text-paper/70 transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#plans"
            className="btn-arrow hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-[13.5px] font-semibold text-deep transition-all duration-300 hover:bg-ember hover:shadow-[0_8px_24px_-8px_rgb(255_92_57/0.7)] sm:inline-flex"
          >
            Start a trip
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15M13.5 5.5L20 12l-6.5 6.5" />
            </svg>
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-coral hover:text-coral lg:hidden"
          >
            <span
              className={`absolute h-[1.8px] w-4.5 bg-current transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-[1.8px] w-4.5 bg-current transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-b border-paper/10 bg-deep/97 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-out lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-5">
          {LINKS.map((l, i) => (
            <li key={l.href} className={open ? "anim-rise" : ""} style={{ animationDelay: `${i * 55}ms` }}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-paper/8 py-3 font-display text-xl text-paper/85 transition-colors hover:text-coral"
              >
                {l.label}
                <span className="font-mono text-[11px] text-paper/35">0{i + 1}</span>
              </a>
            </li>
          ))}
          <li className={open ? "anim-rise pt-3" : "pt-3"} style={{ animationDelay: "380ms" }}>
            <a
              href="#plans"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-deep"
            >
              Start a trip →
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

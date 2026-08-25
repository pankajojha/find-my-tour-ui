import { useEffect, useRef, useState } from "react";
import { CompassMark } from "./icons";
import { useAuth, firstName, initials } from "../lib/auth";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#flow" },
  { label: "Excursions", href: "#excursions" },
  { label: "Privacy", href: "#privacy" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const { user, open, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

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

  // close dropdown on outside click
  useEffect(() => {
    if (!dropOpen) return;
    const onDown = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [dropOpen]);

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
          {user ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen((v) => !v)}
                aria-expanded={dropOpen}
                aria-haspopup="true"
                className={`flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3.5 transition-all duration-300 ${
                  dropOpen ? "border-coral bg-hull" : "border-paper/20 hover:border-coral"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral font-mono text-[11px] font-bold text-deep">
                  {initials(user.name)}
                </span>
                <span className="hidden text-[13.5px] font-semibold text-paper sm:block">
                  {firstName(user.name)}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-3.5 w-3.5 text-paper/50 transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {dropOpen && (
                <div className="anim-rise absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-xl border border-paper/12 bg-hull shadow-lift">
                  <div className="border-b border-paper/10 px-5 py-4">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/40">
                      Signed in as
                    </p>
                    <p className="mt-1 truncate text-[13.5px] font-semibold text-paper">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <a
                      href="#top"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-paper/75 transition-colors hover:bg-paper/8 hover:text-paper"
                    >
                      <CompassMark className="h-5 w-5" /> My trips
                    </a>
                    <a
                      href="#flow"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-paper/75 transition-colors hover:bg-paper/8 hover:text-paper"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="4" y="4" width="16" height="16.5" rx="2" />
                        <path d="M8 9.4l1.6 1.6L13 7.6M8 15.4l1.6 1.6L13 13.6M15.5 10h2.5M15.5 16h2.5" />
                      </svg>
                      Trip checklists
                    </a>
                    <div className="mx-3 my-1.5 h-px bg-paper/10" />
                    <button
                      onClick={() => {
                        setDropOpen(false);
                        signOut();
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-medium text-coral transition-colors hover:bg-coral/10"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 8V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-2M10 12h9.5M17 8.5L20.5 12 17 15.5" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => open("signin")}
                className="link-underline hidden text-[13.5px] font-semibold text-paper/75 transition-colors hover:text-paper sm:block"
              >
                Sign in
              </button>
              <button
                onClick={() => open("signup")}
                className="btn-arrow hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-[13.5px] font-semibold text-deep transition-all duration-300 hover:bg-ember hover:shadow-[0_8px_24px_-8px_rgb(255_92_57/0.7)] sm:inline-flex"
              >
                Start a trip
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h15M13.5 5.5L20 12l-6.5 6.5" />
                </svg>
              </button>
            </>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-coral hover:text-coral lg:hidden"
          >
            <span
              className={`absolute h-[1.8px] w-4.5 bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-[1.8px] w-4.5 bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-b border-paper/10 bg-deep/97 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-out lg:hidden ${
          menuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-5">
          {LINKS.map((l, i) => (
            <li key={l.href} className={menuOpen ? "anim-rise" : ""} style={{ animationDelay: `${i * 55}ms` }}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-paper/8 py-3 font-display text-xl text-paper/85 transition-colors hover:text-coral"
              >
                {l.label}
                <span className="font-mono text-[11px] text-paper/35">0{i + 1}</span>
              </a>
            </li>
          ))}
          <li className={menuOpen ? "anim-rise pt-3" : "pt-3"} style={{ animationDelay: "380ms" }}>
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral font-mono text-[11px] font-bold text-deep">
                    {initials(user.name)}
                  </span>
                  <span className="truncate text-[13px] text-paper/70">{user.email}</span>
                </span>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="shrink-0 rounded-full border border-coral/50 px-5 py-2.5 text-[13px] font-semibold text-coral transition-colors hover:bg-coral hover:text-deep"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    open("signup");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-deep"
                >
                  Start a trip →
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    open("signin");
                  }}
                  className="rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-coral hover:text-coral"
                >
                  Sign in
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

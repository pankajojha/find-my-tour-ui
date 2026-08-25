import { useEffect, useState, type CSSProperties } from "react";
import { Reveal, usePrefersReducedMotion } from "../lib/motion";
import { useAuth } from "../lib/auth";
import { BOARD_WORDS, AI_LINES, HERO_STATS, HERO_IMG_OIA, HERO_IMG_FERRY } from "../data";
import {
  CompassRose,
  IconPlane,
  IconAnchor,
  IconChip,
  IconShield,
  IconStar,
  IconChecklist,
  IconArrowRight,
} from "./icons";

function SplitFlap({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [flipKey, setFlipKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
      setFlipKey((k) => k + 1);
    }, 2700);
    return () => clearInterval(t);
  }, [words.length]);

  const word = words[idx];
  const CELLS = 10;

  return (
    <div className="flex items-center gap-[7px]" role="status" aria-label={`Now planning: ${word}`}>
      {Array.from({ length: CELLS }).map((_, i) => {
        const letter = word[i] ?? "";
        return (
          <span
            key={i}
            className="flex h-[2.15em] w-[1.35em] items-center justify-center rounded-[5px] border border-paper/12 bg-hull shadow-[inset_0_-10px_14px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(237,242,238,0.08)]"
          >
            <span
              key={`${flipKey}-${i}`}
              className={`font-mono text-[0.95em] font-semibold tracking-widest text-paper ${letter ? "flap-letter" : "opacity-0"}`}
              style={{ animationDelay: `${i * 42}ms` }}
            >
              {letter || "·"}
            </span>
          </span>
        );
      })}
    </div>
  );
}

function AiLine() {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % AI_LINES.length), 2900);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="flex items-center gap-2.5 overflow-hidden rounded-lg border border-teal/25 bg-deep/70 px-3.5 py-2.5">
      <IconChip className="h-4.5 w-4.5 shrink-0 text-teal" />
      <span key={idx} className={`truncate text-[12.5px] text-paper/80 ${reduced ? "" : "anim-rise"}`}>
        {AI_LINES[idx]}
      </span>
      <span className="cursor-blink ml-auto shrink-0 font-mono text-teal">▍</span>
    </div>
  );
}

const AVATARS = [
  { initials: "MK", bg: "bg-coral" },
  { initials: "JR", bg: "bg-teal" },
  { initials: "AL", bg: "bg-sun text-deep" },
  { initials: "TS", bg: "bg-hull border border-paper/25" },
];

export default function Hero() {
  const { open, user } = useAuth();
  return (
    <section id="top" className="relative overflow-hidden bg-deep bg-grid-dark">
      {/* ambient layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 48% at 78% 12%, rgb(20 166 151 / 0.14), transparent 70%), radial-gradient(50% 42% at 8% 88%, rgb(255 92 57 / 0.1), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <CompassRose className="animate-spin-slower pointer-events-none absolute -right-28 -top-28 h-[430px] w-[430px] text-paper/14" />

      {/* flight paths */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full opacity-60"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-60 520 C 260 400, 620 560, 940 380 S 1380 240, 1520 300"
          fill="none"
          stroke="rgb(255 92 57 / 0.3)"
          strokeWidth="1.6"
          strokeDasharray="5 11"
          className="dash-flow"
        />
        <path
          d="M-40 240 C 300 320, 700 140, 1040 220 S 1400 120, 1500 90"
          fill="none"
          stroke="rgb(20 166 151 / 0.25)"
          strokeWidth="1.4"
          strokeDasharray="4 12"
          className="dash-flow"
        />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-44">
        {/* left — the pitch */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-teal">
              <span className="animate-pulsedot inline-block h-2 w-2 rounded-full bg-coral" />
              AI travel planning · consumer + managed
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display text-[clamp(2.7rem,6.2vw,4.9rem)] font-semibold leading-[1.01] tracking-tight text-paper">
              Every trip deserves
              <br />
              <em className="font-light italic text-coral">a brilliant plan.</em>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-paper/65">
              Explorer Agents turns messy bookings, forwarded emails and group-chat chaos into a
              clean, shared itinerary — for families and friend groups, and for the coordinators
              and programs that move travelers at scale.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9">
              <p className="mb-3 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/45">
                Now planning
                <span className="h-px w-10 bg-paper/20" />
              </p>
              <SplitFlap words={BOARD_WORDS} />
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => open("signup")}
                className="btn-arrow group inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-3.5 text-[15px] font-semibold text-deep transition-all duration-300 hover:bg-ember hover:shadow-[0_14px_36px_-10px_rgb(255_92_57/0.65)]"
              >
                Start a trip — it's free
                <IconArrowRight className="h-4.5 w-4.5" />
              </button>
              <a
                href="#platform"
                className="btn-arrow inline-flex items-center gap-2.5 rounded-full border border-paper/25 px-7 py-3.5 text-[15px] font-semibold text-paper transition-all duration-300 hover:border-teal hover:text-teal"
              >
                Explore the business demo
                <IconArrowRight className="h-4.5 w-4.5" />
              </a>
            </div>
          </Reveal>

          {!user && (
            <Reveal delay={300}>
              <p className="mt-5 text-[13px] text-paper/50">
                Already planning a trip?{" "}
                <button
                  onClick={() => open("signin")}
                  className="link-underline font-semibold text-teal"
                >
                  Sign in to your workspace
                </button>
              </p>
            </Reveal>
          )}

          <Reveal delay={420}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-paper/12 pt-7">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[1.9rem] font-semibold leading-none text-paper">
                    {s.value}
                  </dd>
                  <dd className="mt-2 font-mono text-[10.5px] uppercase leading-snug tracking-[0.14em] text-paper/45">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* right — the live workspace */}
        <div className="relative lg:col-span-5">
          <Reveal dir="right" delay={200} className="relative">
            {/* main workspace card */}
            <div className="relative rounded-2xl border border-paper/12 bg-hull/85 p-5 shadow-lift backdrop-blur-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper/45">
                  Trip workspace
                </p>
                <span className="flex items-center gap-2 rounded-full border border-teal/35 bg-teal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-teal">
                  <span className="animate-pulsedot h-1.5 w-1.5 rounded-full bg-teal" />
                  AI drafting
                </span>
              </div>

              <h2 className="font-display text-[1.55rem] font-semibold leading-tight text-paper">
                Aegean &amp; Amalfi
              </h2>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/40">
                Jun 12–21 · 6 travelers · cruise + land
              </p>

              <div className="mt-5 space-y-2.5">
                {/* day 1 */}
                <div className="flex items-center gap-3 rounded-lg border border-paper/8 bg-deep/60 px-3.5 py-3 transition-colors duration-300 hover:border-coral/40">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-coral">
                    Day 1
                  </span>
                  <IconPlane className="h-4 w-4 shrink-0 text-paper/55" />
                  <span className="truncate text-[13.5px] text-paper/85">
                    JFK → ATH · Aegean A3 102 · 17:40
                  </span>
                  <span className="ml-auto shrink-0 rounded bg-paper/8 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-paper/50">
                    flight
                  </span>
                </div>

                {/* day 2 */}
                <div className="flex items-center gap-3 rounded-lg border border-coral/35 bg-deep/60 px-3.5 py-3 transition-colors duration-300 hover:border-coral/60">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-coral">
                    Day 2
                  </span>
                  <img
                    src={HERO_IMG_OIA}
                    alt="Oia, Santorini at dusk"
                    className="h-12 w-16 shrink-0 rounded-md object-cover"
                    loading="eager"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-paper/90">
                      Santorini — caldera sunset sail
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-paper/40">
                      port 08:00–18:00
                      <IconStar className="h-3 w-3 text-sun" />
                      4.9 match
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 rounded bg-coral/15 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-coral">
                    booked
                  </span>
                </div>

                {/* day 3 */}
                <div className="flex items-center gap-3 rounded-lg border border-paper/8 bg-deep/60 px-3.5 py-3 transition-colors duration-300 hover:border-coral/40">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-coral">
                    Day 3
                  </span>
                  <img
                    src={HERO_IMG_FERRY}
                    alt="Ferry crossing the Aegean toward Naxos"
                    className="h-12 w-16 shrink-0 rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-paper/90">
                      Ferry to Naxos · 10:30 Blue Star
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-paper/40">
                      buffer ok · 2h before check-in
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 rounded bg-paper/8 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-paper/50">
                    transfer
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <AiLine />
              </div>

              {/* footer: crew + budget */}
              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-paper/10 pt-4">
                <div className="flex -space-x-2.5">
                  {AVATARS.map((a) => (
                    <span
                      key={a.initials}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${a.bg} font-mono text-[10px] font-semibold text-deep ring-2 ring-hull`}
                    >
                      {a.initials}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-paper/45">
                  <IconChecklist className="h-4 w-4 text-teal" />
                  checklist 12/18
                </span>
                <div className="ml-auto w-28">
                  <div className="mb-1 flex justify-between font-mono text-[9.5px] uppercase tracking-wider text-paper/45">
                    <span>budget</span>
                    <span className="text-sun">62%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-paper/10">
                    <div className="animate-budgetfill h-full rounded-full bg-sun" style={{ width: "62%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* floating: excursion match */}
            <div
              className="animate-floaty absolute -left-8 -top-8 hidden w-56 rounded-xl border border-paper/12 bg-deep/95 p-4 shadow-lift md:block"
              style={{ "--tilt": "-3deg" } as CSSProperties}
            >
              <p className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-teal">
                Excursion match
              </p>
              <p className="font-display text-[15px] font-semibold leading-snug text-paper">
                Caldera sunset sail
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-[11px] text-paper/55">
                  <IconStar className="h-3.5 w-3.5 text-sun" /> 4.9 · fits Day 2
                </span>
                <span className="font-mono text-[13px] font-semibold text-coral">$89</span>
              </div>
            </div>

            {/* floating: import parsed */}
            <div
              className="animate-floaty absolute -bottom-9 -right-4 hidden w-60 rounded-xl border border-paper/12 bg-deep/95 p-4 shadow-lift md:block"
              style={{ "--tilt": "2.5deg", animationDelay: "1.2s" } as CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/12 text-teal">
                  <IconShield className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-paper">Import parsed</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-paper/45">
                    booking-confirmation.pdf
                  </p>
                </div>
              </div>
              <p className="mt-2.5 font-mono text-[10.5px] leading-relaxed text-paper/55">
                12 fields mapped · <span className="text-teal">0 PII sent to AI</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={520}>
            <p className="mt-14 flex items-center justify-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper/35 md:mt-16">
              <IconAnchor className="h-4 w-4" />
              built for cruise, land &amp; everything between
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

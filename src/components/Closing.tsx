import { useState, type FormEvent } from "react";
import { Reveal } from "../lib/motion";
import { CompassMark, CompassRose, IconArrowRight, IconAnchor, IconCheck } from "./icons";

function ClosingBand() {
  return (
    <section id="closing" className="relative scroll-mt-20 overflow-hidden bg-deep bg-grid-dark py-24 text-paper lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(56% 46% at 50% 0%, rgb(255 92 57 / 0.12), transparent 70%), radial-gradient(46% 40% at 90% 100%, rgb(20 166 151 / 0.1), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <CompassRose className="animate-spin-slower pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-paper/8" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-5 text-center font-mono text-[11.5px] font-semibold uppercase tracking-[0.28em] text-teal">
            Next step
          </p>
          <h2 className="mx-auto max-w-4xl text-center font-display text-[clamp(2.2rem,5.2vw,4.1rem)] font-semibold leading-[1.03] tracking-tight">
            Start with the trip brief —{" "}
            <em className="font-light italic text-coral">or go straight to the excursions.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15.5px] leading-relaxed text-paper/60">
            Explorer Agents is strongest when the planning flow and the selling flow work
            together. Start wherever your travelers already are.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal dir="left" delay={100}>
            <a
              href="#plans"
              className="group flex h-full flex-col justify-between rounded-xl border border-paper/14 bg-hull/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-coral/60 hover:bg-hull"
            >
              <div>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-coral">
                  For travelers &amp; groups
                </p>
                <h3 className="mt-4 font-display text-[1.7rem] font-semibold leading-tight tracking-tight">
                  Open trip planning
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-paper/55">
                  Capture the trip, let the AI structure it, invite the group — free tier included.
                </p>
              </div>
              <span className="mt-8 flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 group-hover:text-coral">
                Start free
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-all duration-500 group-hover:translate-x-1.5 group-hover:border-coral group-hover:bg-coral group-hover:text-deep">
                  <IconArrowRight className="h-4.5 w-4.5" />
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal dir="right" delay={180}>
            <a
              href="#excursions"
              className="group flex h-full flex-col justify-between rounded-xl border border-paper/14 bg-hull/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal/60 hover:bg-hull"
            >
              <div>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal">
                  For port-day shoppers
                </p>
                <h3 className="mt-4 font-display text-[1.7rem] font-semibold leading-tight tracking-tight">
                  Browse excursions
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-paper/55">
                  2,300+ curated, port-checked experiences across 140+ ports and cities.
                </p>
              </div>
              <span className="mt-8 flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 group-hover:text-teal">
                See the marketplace
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-all duration-500 group-hover:translate-x-1.5 group-hover:border-teal group-hover:bg-teal group-hover:text-deep">
                  <IconArrowRight className="h-4.5 w-4.5" />
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <p className="mt-10 text-center font-mono text-[11.5px] uppercase tracking-[0.16em] text-paper/40">
            Running a program?{" "}
            <a href="mailto:programs@exploreragents.com" className="link-underline font-semibold text-teal">
              Request a managed-travel demo
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const FOOTER_COLS = [
  {
    head: "Product",
    links: [
      { label: "Consumer planning", href: "#platform" },
      { label: "Managed travel", href: "#platform" },
      { label: "Excursion marketplace", href: "#excursions" },
      { label: "Plans & pricing", href: "#plans" },
    ],
  },
  {
    head: "How it works",
    links: [
      { label: "Trip intake", href: "#flow" },
      { label: "Document import", href: "#flow" },
      { label: "Group collaboration", href: "#flow" },
      { label: "Live trip updates", href: "#flow" },
    ],
  },
  {
    head: "Trust",
    links: [
      { label: "Privacy & AI guardrails", href: "#privacy" },
      { label: "Data boundaries", href: "#privacy" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "mailto:hello@exploreragents.com" },
    ],
  },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) setDone(true);
  };

  return (
    <footer className="relative border-t border-paper/10 bg-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <a href="#top" className="group inline-flex items-center gap-3">
            <CompassMark className="h-9 w-9 transition-transform duration-700 group-hover:rotate-[135deg]" />
            <span className="font-display text-lg font-semibold tracking-tight">
              Explorer<span className="text-coral"> Agents</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-paper/55">
            AI-powered consumer travel and managed travel on one platform — planning intelligence
            for the people who travel and the teams that move them.
          </p>
          <p className="mt-6 flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper/35">
            <IconAnchor className="h-4 w-4 text-teal" />
            36.39° N · 25.46° E — sailing everywhere
          </p>

          <div className="mt-8">
            <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-paper/45">
              Port notes — monthly planning intel
            </p>
            {done ? (
              <p className="anim-rise flex items-center gap-2.5 rounded-lg border border-teal/35 bg-teal/10 px-4 py-3 font-mono text-[12px] uppercase tracking-wider text-teal">
                <IconCheck className="h-4 w-4" /> You're on the list — see you at the gate
              </p>
            ) : (
              <form onSubmit={submit} className="flex max-w-sm overflow-hidden rounded-full border border-paper/20 focus-within:border-teal">
                <label htmlFor="newsletter" className="sr-only">Email address</label>
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@harbor.com"
                  className="w-full bg-transparent px-5 py-3 text-[13.5px] text-paper placeholder:text-paper/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-coral px-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-deep transition-colors duration-300 hover:bg-ember"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {FOOTER_COLS.map((col) => (
          <nav key={col.head} className="lg:col-span-2" aria-label={col.head}>
            <p className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-paper/40">
              {col.head}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-underline text-[13.5px] text-paper/65 transition-colors hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-2">
          <p className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-paper/40">
            Now planning
          </p>
          <ul className="space-y-2.5 font-mono text-[12px] uppercase tracking-wider text-paper/50">
            {["Santorini", "Kyoto", "Patagonia", "Amalfi", "Reykjavík"].map((d) => (
              <li key={d} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-coral" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/35">
            © 2026 Explorer Agents · charted with care
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/35">
            PII &amp; PCI never touch the AI — <a href="#privacy" className="link-underline text-teal">our guardrails</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Closing() {
  return (
    <>
      <ClosingBand />
      <Footer />
    </>
  );
}

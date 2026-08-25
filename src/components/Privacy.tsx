import { Reveal } from "../lib/motion";
import { RAW_CHIPS, SAFE_CHIPS } from "../data";
import { IconGate, IconChip, IconShield, IconCheck, IconArrowRight, IconDoc } from "./icons";

function Connector({ vertical = false }: { vertical?: boolean }) {
  return vertical ? (
    <div className="flex justify-center py-1 lg:hidden" aria-hidden="true">
      <svg width="24" height="52" viewBox="0 0 24 52">
        <line
          x1="12" y1="2" x2="12" y2="40"
          stroke="rgb(20 166 151 / 0.65)" strokeWidth="1.6" strokeDasharray="4 7"
          className="dash-flow"
        />
        <path d="M6 38l6 9 6-9" fill="none" stroke="rgb(20 166 151 / 0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ) : (
    <div className="hidden items-center lg:flex" aria-hidden="true">
      <svg width="88" height="24" viewBox="0 0 88 24">
        <line
          x1="2" y1="12" x2="74" y2="12"
          stroke="rgb(20 166 151 / 0.65)" strokeWidth="1.6" strokeDasharray="4 7"
          className="dash-flow"
        />
        <path d="M72 5l12 7-12 7" fill="none" stroke="rgb(20 166 151 / 0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const ASSURANCES = [
  {
    icon: IconShield,
    title: "GDPR-ready by design",
    body: "The data boundary minimizes what ever reaches the AI layer, keeping sensitive handling inside controlled system paths — built to support GDPR obligations from day one.",
  },
  {
    icon: IconGate,
    title: "PII & PCI stay out of AI requests",
    body: "Names, emails, phone numbers, passport details, card data and billing content are removed or excluded before any itinerary content is sent to AI services.",
  },
  {
    icon: IconDoc,
    title: "ISO 27001-style controls",
    body: "Sanitization, access paths and audit trails are designed around ISO 27001 control expectations, so compliance-minded teams can adopt it without re-architecting.",
  },
];

export default function Privacy() {
  return (
    <section id="privacy" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 44% at 85% 8%, rgb(20 166 151 / 0.13), transparent 70%), radial-gradient(44% 38% at 5% 95%, rgb(255 92 57 / 0.09), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.28em] text-teal">
              Trust &amp; data boundaries
            </p>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.3rem)] font-semibold leading-[1.05] tracking-tight">
              Raw personal data <em className="font-light italic text-coral">never</em> meets the AI.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-paper/60 lg:ml-auto">
              Traveler details are sanitized and obfuscated before AI processing. The planning
              layer works only on privacy-safe travel context — never on the sensitive source.
            </p>
          </Reveal>
        </div>

        {/* pipeline */}
        <div className="mt-16 grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1.05fr_auto_1fr] lg:gap-0">
          {/* raw data */}
          <Reveal dir="left" className="flex">
            <div className="w-full rounded-xl border border-coral/30 bg-deep/60 p-6 transition-colors duration-300 hover:border-coral/55 sm:p-7">
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-coral">
                Raw booking data
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-paper/55">
                What you give us — stays in controlled paths.
              </p>
              <ul className="mt-5 space-y-2">
                {RAW_CHIPS.map((c) => (
                  <li
                    key={c}
                    className="flex items-center justify-between rounded-lg border border-paper/8 bg-paper/[0.03] px-3.5 py-2.5"
                  >
                    <span className="font-mono text-[12.5px] text-paper/45 line-through decoration-coral/80 decoration-[1.5px]">
                      {c}
                    </span>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-coral" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Connector vertical />
          <Reveal className="hidden items-center lg:flex">
            <Connector />
          </Reveal>

          {/* gate */}
          <Reveal dir="scale" delay={120} className="flex">
            <div className="relative w-full overflow-hidden rounded-xl border border-teal/45 bg-hull/80 p-6 shadow-lift sm:p-7">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(70% 70% at 50% 0%, rgb(20 166 151 / 0.16), transparent 75%)" }}
                aria-hidden="true"
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-teal/14 text-teal">
                <IconGate className="h-6 w-6" />
              </span>
              <h3 className="relative mt-4 font-display text-[1.35rem] font-semibold tracking-tight">
                Sanitization gate
              </h3>
              <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-paper/60">
                Direct identifiers are stripped and content is obfuscated <em>before</em> any AI
                request is assembled. Nothing sensitive crosses this line.
              </p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {["strip PII", "exclude PCI", "obfuscate"].map((t) => (
                  <span key={t} className="rounded-full border border-teal/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-teal">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Connector vertical />
          <Reveal className="hidden items-center lg:flex">
            <Connector />
          </Reveal>

          {/* AI layer */}
          <Reveal dir="right" delay={80} className="flex">
            <div className="w-full rounded-xl border border-teal/30 bg-deep/60 p-6 transition-colors duration-300 hover:border-teal/55 sm:p-7">
              <p className="flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal">
                <IconChip className="h-4 w-4" />
                AI planning layer
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-paper/55">
                Only privacy-safe context arrives here.
              </p>
              <ul className="mt-5 space-y-2">
                {SAFE_CHIPS.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 rounded-lg border border-paper/8 bg-paper/[0.03] px-3.5 py-2.5"
                  >
                    <IconCheck className="h-3.5 w-3.5 shrink-0 text-teal" />
                    <span className="font-mono text-[12.5px] text-paper/80">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* assurances */}
        <div className="mt-16 grid gap-10 border-t border-paper/12 pt-12 md:grid-cols-3">
          {ASSURANCES.map((a, i) => (
            <Reveal key={a.title} delay={i * 90} className="group">
              <a.icon className="h-7 w-7 text-teal transition-transform duration-300 group-hover:-translate-y-1" />
              <h3 className="mt-4 font-display text-[1.2rem] font-semibold tracking-tight">{a.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-paper/55">{a.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <a href="#faq" className="btn-arrow group mt-12 inline-flex items-center gap-2.5 font-mono text-[12.5px] font-semibold uppercase tracking-[0.18em] text-teal transition-colors hover:text-paper">
            Read privacy &amp; AI guardrails in the FAQ
            <IconArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

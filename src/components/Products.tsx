import { useState } from "react";
import { Reveal } from "../lib/motion";
import {
  CONSUMER_FEATURES,
  CONSUMER_AUDIENCE,
  CORPORATE_FEATURES,
  CORPORATE_AUDIENCE,
  type Feature,
} from "../data";
import { FEATURE_ICONS, IconArrowRight, IconCheck } from "./icons";

function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {features.map((f, i) => {
        const Icon = FEATURE_ICONS[f.icon];
        return (
          <Reveal key={f.title} delay={i * 60} className="group">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink/15 bg-mist text-ink transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-coral group-hover:text-coral">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-[15.5px] font-semibold tracking-tight text-ink">{f.title}</h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/60">{f.body}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function ConsumerMock() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-ink p-6 text-paper shadow-card">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 80% at 100% 0%, rgb(20 166 151 / 0.12), transparent 70%)" }}
        aria-hidden="true"
      />
      <p className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
        AI draft · Amalfi &amp; Aegean
        <span className="text-teal">3 suggestions live</span>
      </p>
      <ul className="space-y-2.5">
        {[
          { day: "Day 1", text: "Arrival NAP 14:05 — private transfer queued", tone: "text-paper/80", badge: "auto" },
          { day: "Day 2", text: "Positano morning + path of the gods hike", tone: "text-paper/80", badge: "voted 5/6" },
          { day: "Day 3", text: "Capri boat day — caldera-style sail 4.9★ match", tone: "text-paper/80", badge: "match" },
        ].map((r) => (
          <li
            key={r.day}
            className="flex items-center gap-3 rounded-lg border border-paper/10 bg-deep/50 px-4 py-3 transition-colors duration-300 hover:border-coral/50"
          >
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-coral">{r.day}</span>
            <span className={`truncate text-[13.5px] ${r.tone}`}>{r.text}</span>
            <span className="ml-auto shrink-0 rounded bg-paper/8 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-paper/55">
              {r.badge}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/40">
        <IconCheck className="h-3.5 w-3.5 text-teal" />
        port times aligned · buffers safe
      </p>
    </div>
  );
}

function CorporateMock() {
  const rows = [
    { text: "SFO → LHR · M. Okafor · $1,240", status: "Approved", tone: "bg-teal/15 text-teal border-teal/30" },
    { text: "Hotel · Berlin · 4 nights · $312/n", status: "Needs review", tone: "bg-sun/12 text-sun border-sun/30" },
    { text: "Group transfer · Lisbon · 14 pax", status: "Auto-approved", tone: "bg-paper/6 text-paper/60 border-paper/15" },
    { text: "SIN → HKG · J. Reyes · $688", status: "Approved", tone: "bg-teal/15 text-teal border-teal/30" },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl bg-ink p-6 text-paper shadow-card">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 80% at 0% 100%, rgb(255 92 57 / 0.1), transparent 70%)" }}
        aria-hidden="true"
      />
      <p className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
        Approval queue · this week
        <span className="text-coral">2 pending</span>
      </p>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li
            key={r.text}
            className="flex items-center gap-3 rounded-lg border border-paper/10 bg-deep/50 px-4 py-3 transition-colors duration-300 hover:border-teal/50"
          >
            <span className="truncate text-[13.5px] text-paper/80">{r.text}</span>
            <span
              className={`ml-auto shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider ${r.tone}`}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/40">
        <span>policy flags before spend</span>
        <span className="text-teal">100% auditable</span>
      </div>
    </div>
  );
}

const TABS = ["Individuals, family & friends", "Corporate & managed travel"] as const;

export default function Products() {
  const [tab, setTab] = useState(0);
  const consumer = tab === 0;

  return (
    <section id="platform" className="relative scroll-mt-20 bg-paper bg-grid-light py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.28em] text-coral">
              Offerings
            </p>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-tight">
              Two distinct products.
              <br />
              <em className="font-light italic text-ink/60">One shared planning brain.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="max-w-md text-[15.5px] leading-relaxed text-ink/65 lg:ml-auto">
              Explorer Agents serves two buying motions. Flip between the consumer travel
              experience and the managed-travel platform — without mixing the message.
            </p>
          </Reveal>
        </div>

        {/* tabs */}
        <Reveal delay={160}>
          <div
            role="tablist"
            aria-label="Choose an offering"
            className="relative mt-12 grid max-w-2xl grid-cols-2 rounded-full border border-ink/15 bg-mist p-1.5"
          >
            <span
              className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-ink shadow-card transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                tab === 1 ? "translate-x-full" : "translate-x-0"
              }`}
              aria-hidden="true"
            />
            {TABS.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`relative z-10 rounded-full px-4 py-3 text-[13px] font-semibold tracking-tight transition-colors duration-300 sm:text-[14px] ${
                  tab === i ? "text-paper" : "text-ink/55 hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* panels */}
        <div key={tab} className="anim-rise mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-teal">
              {consumer ? "Consumer offering" : "Business platform"}
            </p>
            <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.1] tracking-tight">
              {consumer
                ? "A self-serve planning & booking workspace for shared trips."
                : "Managed travel with AI assistance, approvals and total visibility."}
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/65">
              {consumer
                ? "Built for cruise passengers, vacation travelers, families and friend groups who want one AI-backed place to capture trip details, compare excursions, coordinate the itinerary, manage budget calls and stay on top of trip checklists — together."
                : "Built for coordinators, tour operators and corporate programs that need AI drafting with a human in the loop, configurable approvals, policy controls, live spend visibility and reporting that scales across trips and teams."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              {consumer ? (
                <>
                  <a
                    href="#plans"
                    className="btn-arrow inline-flex items-center gap-2.5 rounded-full bg-coral px-6 py-3 text-[14px] font-semibold text-deep transition-all duration-300 hover:bg-ember hover:shadow-[0_12px_30px_-10px_rgb(255_92_57/0.6)]"
                  >
                    Start planning <IconArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#excursions"
                    className="btn-arrow inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-6 py-3 text-[14px] font-semibold text-ink transition-all duration-300 hover:border-coral hover:text-coral"
                  >
                    Browse excursions <IconArrowRight className="h-4 w-4" />
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#closing"
                    className="btn-arrow inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper transition-all duration-300 hover:bg-hull"
                  >
                    Request a demo <IconArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:programs@exploreragents.com"
                    className="btn-arrow inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-6 py-3 text-[14px] font-semibold text-ink transition-all duration-300 hover:border-teal hover:text-teal"
                  >
                    programs@exploreragents.com
                  </a>
                </>
              )}
            </div>

            <div className="mt-9">
              <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                Who it's for
              </p>
              <div className="flex flex-wrap gap-2.5">
                {(consumer ? CONSUMER_AUDIENCE : CORPORATE_AUDIENCE).map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-ink/18 bg-mist px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/70 transition-colors duration-300 hover:border-coral hover:text-coral"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-9 lg:col-span-7">
            {consumer ? <ConsumerMock /> : <CorporateMock />}
            <FeatureGrid features={consumer ? CONSUMER_FEATURES : CORPORATE_FEATURES} />
          </div>
        </div>
      </div>
    </section>
  );
}

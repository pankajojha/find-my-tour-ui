import { Reveal } from "../lib/motion";
import { FLOW_STEPS } from "../data";
import { CompassRose, IconArrowRight } from "./icons";

export default function Flow() {
  return (
    <section id="flow" className="relative scroll-mt-20 overflow-hidden bg-deep bg-grid-dark py-24 text-paper lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 40% at 12% 10%, rgb(20 166 151 / 0.1), transparent 70%), radial-gradient(46% 40% at 92% 90%, rgb(255 92 57 / 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <CompassRose className="animate-spin-slower pointer-events-none absolute -bottom-40 -left-40 h-[480px] w-[480px] text-paper/10" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* sticky narrative */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.28em] text-teal">
                How it works
              </p>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.3rem)] font-semibold leading-[1.05] tracking-tight">
                From messy details to a{" "}
                <em className="font-light italic text-coral">ready-to-travel</em> plan.
              </h2>
              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-paper/60">
                Four moves, and the trip runs itself. Enter plans any way you like — the AI does
                the organizing, the group does the deciding, and the live plan keeps everyone
                pointed the same direction.
              </p>
              <a
                href="#plans"
                className="btn-arrow mt-9 inline-flex items-center gap-2.5 rounded-full border border-paper/25 px-6 py-3 text-[14px] font-semibold text-paper transition-all duration-300 hover:border-coral hover:text-coral"
              >
                Try it on your next trip <IconArrowRight className="h-4 w-4" />
              </a>

              <div className="mt-12 hidden max-w-sm border-l-2 border-coral/60 pl-5 lg:block">
                <p className="font-display text-[1.15rem] italic leading-relaxed text-paper/75">
                  “I pasted three confirmation emails and got back a nine-day plan with port times
                  already checked.”
                </p>
                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper/40">
                  — beta traveler · 6-person reunion
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* scrolling steps */}
        <div className="relative lg:col-span-7">
          <div className="absolute bottom-6 left-[13px] top-2 w-px border-l border-dashed border-paper/18" aria-hidden="true" />
          <ol className="space-y-6">
            {FLOW_STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80} className="relative pl-14">
                <span
                  className="absolute left-0 top-7 h-[27px] w-[27px] rounded-full border border-coral/60 bg-deep shadow-[0_0_0_5px_rgb(255_92_57/0.08)]"
                  aria-hidden="true"
                >
                  <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral" />
                </span>
                <div className="group rounded-xl border border-paper/10 bg-hull/55 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-coral/40 hover:bg-hull/80 hover:shadow-lift sm:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[2.1rem] font-semibold leading-none text-coral/90">
                      {s.n}
                    </span>
                    <h3 className="font-display text-[1.45rem] font-semibold tracking-tight text-paper">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-paper/60">{s.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-paper/14 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-paper/55 transition-colors duration-300 group-hover:border-teal/50 group-hover:text-teal"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

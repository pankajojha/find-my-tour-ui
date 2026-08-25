import { Reveal } from "../lib/motion";
import { useAuth } from "../lib/auth";
import { PLANS } from "../data";
import { IconCheck, IconArrowRight } from "./icons";

export default function Plans() {
  const { open } = useAuth();
  return (
    <section id="plans" className="relative scroll-mt-20 bg-paper bg-grid-light py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.28em] text-coral">
              Plans
            </p>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.3rem)] font-semibold leading-[1.05] tracking-tight">
              Priced per trip, <em className="font-light italic text-ink/60">not per person.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-ink/65 lg:ml-auto">
              Packaging straight from the playbook: start free, upgrade only when the trip — or
              the group — gets bigger.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                  p.featured
                    ? "bg-ink text-paper shadow-lift lg:-translate-y-4 lg:hover:-translate-y-6"
                    : "border border-ink/12 bg-mist shadow-card hover:shadow-lift"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-coral px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-deep">
                    Most booked
                  </span>
                )}
                <h3 className={`font-mono text-[12px] font-semibold uppercase tracking-[0.2em] ${p.featured ? "text-teal" : "text-ink/55"}`}>
                  {p.name}
                </h3>
                <div className="mt-5 flex items-baseline gap-2.5">
                  <span className="font-display text-[3.1rem] font-semibold leading-none tracking-tight">
                    {p.price}
                  </span>
                  <span className={`font-mono text-[11px] uppercase tracking-[0.14em] ${p.featured ? "text-paper/45" : "text-ink/45"}`}>
                    {p.unit}
                  </span>
                </div>
                <p className={`mt-4 text-[14px] leading-relaxed ${p.featured ? "text-paper/60" : "text-ink/60"}`}>
                  {p.blurb}
                </p>

                <ul className={`mt-7 flex-1 space-y-3 border-t pt-6 ${p.featured ? "border-paper/12" : "border-ink/10"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.featured ? "bg-teal/18 text-teal" : "bg-teal/12 text-teal"}`}>
                        <IconCheck className="h-3 w-3" />
                      </span>
                      <span className={`text-[13.5px] leading-relaxed ${p.featured ? "text-paper/80" : "text-ink/75"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {p.cta === "Talk to us" ? (
                  <a
                    href={p.href}
                    className={`btn-arrow mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-ink/25 px-6 py-3.5 text-[14px] font-semibold text-ink transition-all duration-300 hover:border-coral hover:bg-coral hover:text-deep`}
                  >
                    {p.cta} <IconArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    onClick={() => open("signup")}
                    className={`btn-arrow mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[14px] font-semibold transition-all duration-300 ${
                      p.featured
                        ? "bg-coral text-deep hover:bg-ember hover:shadow-[0_12px_30px_-10px_rgb(255_92_57/0.65)]"
                        : "border border-ink/25 text-ink hover:border-coral hover:bg-coral hover:text-deep"
                    }`}
                  >
                    {p.cta} <IconArrowRight className="h-4 w-4" />
                  </button>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-12 text-center font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink/50">
            Running a travel program?{" "}
            <a href="#platform" className="link-underline font-semibold text-coral">
              Managed-travel pricing on request
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { Reveal, usePrefersReducedMotion } from "../lib/motion";
import { EXCURSIONS } from "../data";
import { IconArrowRight, IconClock, IconPin, IconStar } from "./icons";

export default function Excursions() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const scrollBy = (dir: 1 | -1) => {
    track.current?.scrollBy({
      left: dir * 360,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section id="excursions" className="relative scroll-mt-20 overflow-hidden bg-paper bg-grid-light py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.28em] text-coral">
              Shore excursion marketplace
            </p>
            <h2 className="max-w-xl font-display text-[clamp(2rem,4.2vw,3.3rem)] font-semibold leading-[1.05] tracking-tight">
              Excursions that actually fit{" "}
              <em className="font-light italic text-ink/60">your port day.</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex items-center gap-3">
              <p className="mr-3 max-w-[220px] text-[13.5px] leading-relaxed text-ink/60">
                Curated, port-schedule-checked, group-size-aware. Drag or use the arrows.
              </p>
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Scroll excursions left"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:-translate-x-0.5 hover:border-coral hover:bg-coral hover:text-deep"
              >
                <IconArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Scroll excursions right"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:translate-x-0.5 hover:border-coral hover:bg-coral hover:text-deep"
              >
                <IconArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={120}>
        <div
          ref={track}
          className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {EXCURSIONS.map((e, i) => (
            <article
              key={e.title}
              className={`group w-[300px] shrink-0 snap-start overflow-hidden rounded-xl border border-ink/12 bg-mist shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift sm:w-[340px] ${
                i % 2 === 0 ? "lg:rotate-[-0.6deg]" : "lg:rotate-[0.6deg]"
              } lg:hover:rotate-0`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={e.img}
                  alt={`${e.title} in ${e.port}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-deep/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
                  {e.tag}
                </span>
                <span className="absolute bottom-3.5 left-4 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper">
                  <IconPin className="h-3.5 w-3.5 text-coral" />
                  {e.port}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[1.3rem] font-semibold leading-snug tracking-tight">
                  {e.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 font-mono text-[11.5px] uppercase tracking-wider text-ink/55">
                  <span className="flex items-center gap-1.5">
                    <IconClock className="h-3.5 w-3.5" /> {e.hours}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconStar className="h-3.5 w-3.5 text-sun" /> {e.rating}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="font-mono text-[15px] font-semibold text-ink">
                    ${e.price}
                    <span className="text-[10.5px] font-normal uppercase tracking-wider text-ink/45"> /person</span>
                  </span>
                  <a
                    href="#closing"
                    aria-label={`Details: ${e.title}`}
                    className="btn-arrow-up flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-coral hover:bg-coral hover:text-deep"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6.5 17.5l11-11M8.5 6h9v9" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* end card */}
          <article className="flex w-[300px] shrink-0 snap-start flex-col items-start justify-between rounded-xl border border-dashed border-ink/30 bg-transparent p-6 sm:w-[340px]">
            <div>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-coral">
                2,300+ more
              </p>
              <h3 className="mt-3 font-display text-[1.5rem] font-semibold leading-snug tracking-tight">
                Every port on your route, already vetted.
              </h3>
            </div>
            <a
              href="#platform"
              className="btn-arrow mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-paper transition-colors duration-300 hover:bg-coral hover:text-deep"
            >
              Open the marketplace <IconArrowRight className="h-4 w-4" />
            </a>
          </article>
        </div>
      </Reveal>
    </section>
  );
}

import { useState } from "react";
import { Reveal } from "../lib/motion";
import { FAQS } from "../data";
import { IconPlus } from "./icons";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 border-t border-ink/10 bg-mist py-24 text-ink lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.28em] text-coral">
                FAQ
              </p>
              <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] font-semibold leading-[1.06] tracking-tight">
                Fair questions, <em className="font-light italic text-ink/60">straight answers.</em>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/60">
                The things travelers and program coordinators ask us most — about data, imports,
                groups and what's actually free.
              </p>
              <p className="mt-8 border-l-2 border-teal pl-5 font-mono text-[11.5px] uppercase leading-relaxed tracking-[0.14em] text-ink/50">
                Something else? <br />
                <a href="mailto:hello@exploreragents.com" className="link-underline font-semibold text-teal normal-case tracking-normal">
                  hello@exploreragents.com
                </a>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="border-t border-ink/12">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className="border-b border-ink/12">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="font-mono text-[11px] font-semibold text-coral">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-[1.2rem] font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-[1.3rem] ${
                            isOpen ? "text-coral" : "text-ink group-hover:text-coral"
                          }`}
                        >
                          {f.q}
                        </span>
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                          isOpen
                            ? "rotate-45 border-coral bg-coral text-deep"
                            : "border-ink/25 text-ink group-hover:border-coral group-hover:text-coral"
                        }`}
                      >
                        <IconPlus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-7 pl-[42px] text-[14.5px] leading-relaxed text-ink/65">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

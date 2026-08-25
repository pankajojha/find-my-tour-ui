import { TICKER_PORTS } from "../data";
import { IconDiamond } from "./icons";

export default function Ticker() {
  const row = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {TICKER_PORTS.map((p, i) => (
        <span key={`${p}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-mono text-[13px] font-semibold uppercase tracking-[0.3em] text-deep">
            {p}
          </span>
          <IconDiamond className="h-2.5 w-2.5 text-deep/60" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-shell relative overflow-hidden border-y border-deep/20 bg-coral py-3.5">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  dir?: "up" | "left" | "right" | "scale";
  as?: "div" | "section" | "article" | "li" | "figure";
  style?: CSSProperties;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  dir = "up",
  as = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  const dirClass =
    dir === "left"
      ? "reveal reveal-left"
      : dir === "right"
        ? "reveal reveal-right"
        : dir === "scale"
          ? "reveal reveal-scale"
          : "reveal";

  return (
    <Tag
      ref={ref as never}
      className={`${dirClass} ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

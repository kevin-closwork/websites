import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  /** Acepta valores compuestos: "200+", "95%", "60-80%", "$0", "24/7". */
  value: string;
  durationMs?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function AnimatedCounter({ value, durationMs = 1400, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const tokens = useMemo(() => value.split(/(\d+)/).filter(Boolean), [value]);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let frameId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / durationMs, 1);
      setProgress(easeOutCubic(elapsed));
      if (elapsed < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [inView, reduceMotion, durationMs]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular-nums">
        {tokens.map((token) =>
          /^\d+$/.test(token) ? Math.round(Number(token) * progress) : token
        )}
      </span>
    </span>
  );
}

export default AnimatedCounter;

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  /** Duración de una vuelta completa. Más alto = más lento. */
  speedSeconds?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  items,
  speedSeconds = 38,
  reverse = false,
  className,
  itemClassName,
}: MarqueeProps) {
  return (
    <div className={cn("marquee", className)}>
      <div
        className="marquee__track"
        style={{
          animationDuration: `${speedSeconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee__group" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div key={i} className={cn("marquee__item", itemClassName)}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;

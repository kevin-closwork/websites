import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type RevealVariant = "default" | "fade-left" | "fade-right" | "scale" | "zoom-rotate" | "fade-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  variant?: RevealVariant;
}

const variantClass: Record<RevealVariant, string> = {
  default: "scroll-reveal",
  "fade-left": "scroll-reveal--fade-left",
  "fade-right": "scroll-reveal--fade-right",
  scale: "scroll-reveal--scale",
  "zoom-rotate": "scroll-reveal--zoom-rotate",
  "fade-up": "scroll-reveal--fade-up",
};

export function ScrollReveal({ children, className, delay = 0, variant = "default" }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={cn(
        variantClass[variant],
        isVisible && "revealed",
        delay >= 1 && delay <= 6 && `scroll-reveal-delay-${delay}`,
        className
      )}
    >
      {children}
    </div>
  );
}

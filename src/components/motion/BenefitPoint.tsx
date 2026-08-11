import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BenefitPointProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Lado desde el que entra el punto mientras avanza el scroll. */
  from: "left" | "right";
  size?: "default" | "lg";
}

export function BenefitPoint({ icon: Icon, title, description, from, size = "default" }: BenefitPointProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 68%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const opacity = useTransform(progress, [0, 1], [0.1, 1]);
  const x = useTransform(progress, [0, 1], [from === "left" ? -120 : 120, 0]);
  const filter = useTransform(progress, (value) => `blur(${(1 - value) * 5}px)`);

  const isLarge = size === "lg";

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { opacity, x, filter }}
      className={cn("flex will-change-transform", isLarge ? "gap-4" : "gap-3")}
    >
      {isLarge ? (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
      ) : (
        <Icon className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
      )}
      <div>
        <p className={isLarge ? "text-lg sm:text-xl font-semibold" : "font-medium"}>{title}</p>
        <p className={cn("text-muted-foreground", isLarge ? "mt-1 text-base" : "text-sm")}>{description}</p>
      </div>
    </motion.div>
  );
}

export default BenefitPoint;

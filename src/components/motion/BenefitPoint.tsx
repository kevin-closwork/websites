import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface BenefitPointProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Borde de la tarjeta desde el que entra el punto mientras avanza el scroll. */
  from: "left" | "right";
}

export function BenefitPoint({ icon: Icon, title, description, from }: BenefitPointProps) {
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

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { opacity, x, filter }}
      className="flex gap-3 will-change-transform"
    >
      <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export default BenefitPoint;

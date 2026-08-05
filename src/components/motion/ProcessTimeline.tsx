import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH } from "@/lib/motion";

export interface ProcessStep {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 55%"],
  });
  const lineScaleX = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.floor(value * steps.length);
    setActiveIndex(Math.max(0, Math.min(steps.length - 1, next)));
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Línea conectora que se dibuja con el progreso del scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[3.5rem] hidden md:block"
      >
        <div className="mx-[16.66%] h-px bg-border">
          <motion.div
            className="h-px origin-left bg-gradient-to-r from-[hsl(210,100%,21%)] via-[hsl(152,48%,47%)] to-[hsl(152,58%,57%)]"
            style={{ scaleX: reduceMotion ? 1 : lineScaleX }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = reduceMotion || i <= activeIndex;

          return (
            <motion.div
              key={step.step}
              initial={reduceMotion ? undefined : { opacity: 0, y: 44, filter: "blur(8px)" }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: EASE_SMOOTH }}
            >
              <Card
                className={cn(
                  "landing-section-card-hover relative h-full overflow-hidden transition-[border-color,box-shadow] duration-500",
                  isActive
                    ? "border-primary/30 shadow-[0_18px_40px_-18px_hsl(152_48%_47%_/_0.35)]"
                    : "border-border"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-3 right-3 select-none text-[92px] font-extrabold leading-none transition-colors duration-700",
                    isActive ? "text-primary/[0.12]" : "text-foreground/[0.04]"
                  )}
                >
                  {step.step}
                </span>

                <CardHeader className="relative">
                  <div
                    className={cn(
                      "mb-2 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500",
                      isActive
                        ? "bg-primary text-white shadow-[0_0_0_6px_hsl(152_48%_47%_/_0.12)]"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>Paso {step.step}</CardTitle>
                  <CardDescription>{step.title}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ProcessTimeline;

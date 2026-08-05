import { motion, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Segundos antes de arrancar el stagger. */
  delay?: number;
  stagger?: number;
  /** true en el hero: anima al montar en vez de esperar el scroll. */
  animateOnMount?: boolean;
}

export function AnimatedHeadline({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: AnimatedHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const orchestration = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        {...orchestration}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
            style={{ marginRight: "0.26em" }}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "115%", opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export default AnimatedHeadline;

import type { Transition, Variants } from "framer-motion";

/** Ease-out expo. Lento al final, sin rebote: la firma de las landings premium. */
export const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealTransition: Transition = { duration: 0.75, ease: EASE_SMOOTH };

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: revealTransition },
};

export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Umbral común para que los reveals disparen cuando el bloque ya se lee. */
export const revealViewport = { once: true, amount: 0.3 } as const;

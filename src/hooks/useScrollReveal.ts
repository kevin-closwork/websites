import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const applyEntry = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(([entry]) => applyEntry(entry), {
      threshold,
      rootMargin,
    });

    observer.observe(el);
    observer.takeRecords().forEach((entry) => applyEntry(entry));
    const rafId = window.requestAnimationFrame(() => {
      observer.takeRecords().forEach((entry) => applyEntry(entry));
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

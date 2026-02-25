import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasBeenVisible.current = true;
          setIsVisible(true);
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [options]);

  return { ref, isVisible };
};

import { useEffect, useRef } from "react";

const sample = [
  { company: "TechCo MX", text: "cerró $45K USD hace 2 horas" },
  { company: "Fintech Bogotá", text: "+3 deals esta semana" },
  { company: "SaaS Chile", text: "ROI 387% en 90 días" },
  { company: "LogiPerú", text: "+$120K MRR en 30 días" },
  { company: "AgroCol", text: "2 enterprise logos nuevos" },
];

const SocialTicker = () => {
  const container = useRef<HTMLDivElement | null>(null);

  // simple loop animation
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    let y = 0;
    const step = () => {
      y += 0.6; // speed
      el.style.transform = `translateY(-${y}px)`;
      if (y > el.scrollHeight / 2) y = 0; // loop
      raf = requestAnimationFrame(step);
    };
    let raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <aside className="w-full overflow-hidden border-y border-border">
      <div className="container py-6 grid md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <p className="text-sm text-muted-foreground">Actualizaciones reales de empresas reales</p>
          <h3 className="text-xl font-semibold mt-1">Social Proof</h3>
        </div>
        <div className="col-span-2 relative h-24">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
            <div ref={container} className="will-change-transform">
              {[...sample, ...sample, ...sample].map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5">
                  <span className="text-brand font-semibold">{item.company}</span>
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SocialTicker;

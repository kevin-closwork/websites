import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import LiveRevenueCounter from "./LiveRevenueCounter";

const Hero = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x: `${x}%`, y: `${y}%` });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const style = useMemo(() => ({
    ['--mx' as any]: pos.x,
    ['--my' as any]: pos.y,
  }), [pos]);

  return (
    <header ref={ref} style={style} className="relative overflow-hidden hero-interactive">
      <div className="container mx-auto py-24 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Closwork</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            ¿Y si existiera un botón que activara ventas B2B sin riesgos?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Closwork conecta tu empresa con closers elite que solo cobran por resultados. Punto.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="/solicitud?type=empresa">
              <Button variant="hero" size="xl" className="hover-scale" aria-label="Soy empresa: activar ventas B2B sin riesgos">
                Soy Empresa
              </Button>
            </a>
            <a href="/solicitud?type=closer">
              <Button variant="neon" size="xl" className="hover-scale" aria-label="Soy closer: unirme a la elite de Closwork">
                Soy Closer
              </Button>
            </a>
            <span className="text-sm text-muted-foreground">Sin salarios. Sin riesgos. Solo cierres.</span>
          </div>
          <div className="mt-10">
            <LiveRevenueCounter />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    </header>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import LiveRevenueCounter from "./LiveRevenueCounter";
import { ShieldCheck, Users, Zap } from "lucide-react";
const Hero = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({
    x: "50%",
    y: "50%"
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      setPos({
        x: `${x}%`,
        y: `${y}%`
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  const style = useMemo(() => ({
    ['--mx' as any]: pos.x,
    ['--my' as any]: pos.y
  }), [pos]);
  return <header ref={ref} style={style} className="relative overflow-hidden hero-interactive">
      <div className="container mx-auto py-24 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6">
            <img src="https://i.imgur.com/NgAumU4.png" alt="Closwork" className="h-12 md:h-16 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in animate-heartbeat">El botón que activa ventas para tu empresa</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in">
            Closwork conecta tu empresa con closers elite que solo cobran por resultados. Punto.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in">
            <a href="/solicitud?type=empresa">
              <Button variant="success" size="xl" aria-label="Soy empresa: activar ventas B2B sin riesgos" className="hover-scale animate-pulse">
                Soy Empresa
              </Button>
            </a>
            <a href="/solicitud?type=closer">
              <Button variant="tech" size="xl" aria-label="Soy closer: unirme a la elite de Closwork" className="hover-scale animate-pulse">
                Soy Closer
              </Button>
            </a>
            <span className="text-sm text-muted-foreground animate-fade-in">Sin salarios. Sin riesgos. Solo cierres.</span>
          </div>
          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground animate-fade-in">
            <span className="inline-flex items-center gap-2 animate-pulse"><ShieldCheck size={16} className="text-brand animate-tech-pulse" /> Sin salarios ni riesgos</span>
            <span className="inline-flex items-center gap-2 animate-pulse"><Users size={16} className="text-brand animate-tech-pulse" /> Closers verificados</span>
            <span className="inline-flex items-center gap-2 animate-pulse"><Zap size={16} className="text-brand animate-tech-pulse" /> Go-live en 14 días</span>
          </div>

          <div className="mt-10">
            <LiveRevenueCounter />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </header>;
};
export default Hero;
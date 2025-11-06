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
          <div className="mb-6 flex justify-center md:justify-start">
            <img src="https://i.imgur.com/NgAumU4.png" alt="Closwork" className="h-20 md:h-24 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-foreground">Closer validado en 48 hrs.</span>
            <br />
            <span className="text-brand bg-gradient-to-r from-brand to-brand/80 bg-clip-text text-transparent">
              Solo pagas al cerrar.
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="/solicitud?type=empresa">
              <Button variant="success" size="xl" aria-label="Soy empresa: activar ventas B2B sin riesgos" className="hover-scale">
                Soy Empresa
              </Button>
            </a>
            <a href="/solicitud?type=closer">
              <Button variant="tech" size="xl" aria-label="Soy closer: unirme a la elite de Closwork" className="hover-scale">
                Soy Closer
              </Button>
            </a>
            <span className="text-sm text-muted-foreground">Sin salarios. Sin riesgos. Solo cierres.</span>
          </div>
          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-brand" /> Sin salarios ni riesgos</span>
            <span className="inline-flex items-center gap-2"><Users size={16} className="text-brand" /> Closers verificados</span>
            <span className="inline-flex items-center gap-2"><Zap size={16} className="text-brand" /> Go-live en 14 días</span>
          </div>

          <div className="mt-10">
            <LiveRevenueCounter />
          </div>
        </div>
      </div>
      {/* Animated geometric figures */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        
        {/* Floating tech shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-tech-blue/30 rotate-45 float-animation" />
        <div className="absolute top-1/3 left-1/5 w-12 h-12 bg-neon/20 rounded-full animate-tech-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/5 w-20 h-20 border border-brand/40 rounded-lg rotate-12 float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/6 w-8 h-8 bg-success-green/30 transform rotate-45 animate-tech-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-14 h-14 border-2 border-electric-blue/40 rounded-full float-animation" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/5 right-1/3 w-6 h-6 bg-startup-yellow/40 rounded-full animate-tech-pulse" style={{ animationDelay: '2.5s' }} />
      </div>
    </header>;
};
export default Hero;
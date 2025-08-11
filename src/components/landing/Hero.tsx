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
  return <header ref={ref} style={style} className="relative overflow-hidden hero-interactive tech-grid">
      <div className="container mx-auto py-24 md:py-28 lg:py-32 relative">
        <div className="max-w-3xl relative z-10">
          <div className="mb-6">
            <img src="https://i.imgur.com/NgAumU4.png" alt="Closwork" className="h-12 md:h-16 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            ¿Y si existiera un botón que activara ventas B2B sin riesgos?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Closwork conecta tu empresa con closers elite que solo cobran por resultados. Punto.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="/solicitud?type=empresa">
              <Button variant="hero" size="xl" aria-label="Soy empresa: activar ventas B2B sin riesgos" className="hover-scale bg-gradient-cta shadow-cta text-white hover:shadow-lg transition-all duration-300">
                Soy Empresa
              </Button>
            </a>
            <a href="/solicitud?type=closer">
              <Button variant="neon" size="xl" aria-label="Soy closer: unirme a la elite de Closwork" className="hover-scale bg-gradient-tech shadow-energy text-white hover:shadow-lg transition-all duration-300">
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

        {/* Enhanced Tech Graphics */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-20 pointer-events-none">
          {/* Floating tech elements */}
          <div className="absolute top-20 right-20 w-16 h-16 border-2 border-tech-blue rounded-lg float-animation" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-40 w-12 h-12 bg-startup-yellow/30 rounded-full animate-tech-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-60 right-16 w-20 h-20 border border-electric-blue rounded-full float-animation" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 right-32 w-14 h-14 bg-innovation-blue/20 rotate-45 float-animation" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 right-12 w-10 h-10 bg-cyber-yellow/40 rounded-lg animate-tech-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Circuit lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--tech-blue))" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="hsl(var(--startup-yellow))" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M50 100 L150 100 L150 200 L250 200 L250 300" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-tech-pulse"/>
            <path d="M100 150 L200 150 L200 250 L300 250 L300 350" stroke="url(#circuit-gradient)" strokeWidth="1.5" fill="none" className="animate-tech-pulse" style={{ animationDelay: '0.8s' }}/>
            <circle cx="150" cy="100" r="4" fill="hsl(var(--startup-yellow))" className="animate-tech-pulse"/>
            <circle cx="250" cy="200" r="3" fill="hsl(var(--tech-blue))" className="animate-tech-pulse" style={{ animationDelay: '0.5s' }}/>
            <circle cx="300" cy="250" r="5" fill="hsl(var(--electric-blue))" className="animate-tech-pulse" style={{ animationDelay: '1.2s' }}/>
          </svg>
        </div>
      </div>
      
      {/* Enhanced background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-cta opacity-20 rounded-full blur-3xl animate-tech-pulse" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-tech opacity-15 rounded-full blur-3xl animate-tech-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-primary opacity-5 rounded-full blur-3xl" />
      </div>
    </header>;
};
export default Hero;
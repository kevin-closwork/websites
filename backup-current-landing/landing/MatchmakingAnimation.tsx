import { Building2, Search, Shuffle, Target, UserCheck } from "lucide-react";
const Chip = ({
  icon: Icon,
  label
}: {
  icon: React.ComponentType<any>;
  label: string;
}) => <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur animate-enter">
    <Icon size={16} className="text-brand" />
    <span>{label}</span>
  </div>;
const Arrow = () => <div className="hidden md:flex items-center justify-center text-muted-foreground">
    <svg width="72" height="24" viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12H67" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <path d="M61 6L67 12L61 18" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>;
const Card = ({
  title,
  subtitle,
  children,
  icon: Icon,
  className = ""
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  icon: React.ComponentType<any>;
  className?: string;
}) => <div className={`rounded-xl border border-border bg-card/60 p-5 shadow-glow backdrop-blur ${className}`}>
    <div className="flex items-center gap-2">
      <Icon className="text-brand" size={18} />
      <h4 className="font-semibold leading-none">{title}</h4>
    </div>
    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    {children ? <div className="mt-4 space-x-2 space-y-2">{children}</div> : null}
  </div>;
const MatchmakingAnimation = () => {
  return <section className="container py-16 relative overflow-hidden">
      {/* Animated network background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="relative w-full h-full">
          {/* Network nodes */}
          <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-tech-blue rounded-full animate-pulse"></div>
          <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-[60%] left-[30%] w-2 h-2 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-[80%] left-[80%] w-1.5 h-1.5 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-[15%] left-[50%] w-1 h-1 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-[25%] left-[90%] w-1.5 h-1.5 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-[45%] left-[10%] w-1 h-1 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-[70%] left-[60%] w-2 h-2 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-[90%] left-[40%] w-1.5 h-1.5 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-[5%] left-[75%] w-1 h-1 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '2.3s'}}></div>
          <div className="absolute top-[35%] left-[40%] w-1.5 h-1.5 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-[55%] left-[85%] w-1 h-1 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-[75%] left-[15%] w-2 h-2 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-[20%] left-[35%] w-1 h-1 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-[40%] left-[75%] w-1.5 h-1.5 bg-tech-blue rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--tech-blue))" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="hsl(var(--tech-blue))" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M20,10 Q50,30 70,30" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" className="animate-pulse"/>
            <path d="M70,30 Q30,60 30,60" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <path d="M30,60 Q80,80 80,80" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
            <path d="M50,15 Q20,10 20,10" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
          </svg>
        </div>
      </div>
      <div className="text-center mb-8">
        <h3 className="font-bold text-3xl">Matchmaking en acción</h3>
        <p className="text-muted-foreground mt-1">Conectamos tu oportunidad con el closer perfecto, en minutos.</p>
      </div>

      <div className="relative grid md:grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* Empresa */}
        <Card title="Empresa" subtitle="Busco ventas B2B sin riesgo" icon={Building2} className="animate-enter">
          <div className="flex flex-wrap gap-2">
            <Chip icon={Search} label="ICP: SaaS Mid-Market" />
            <Chip icon={Target} label="Meta: 8 deals/mes" />
            <Chip icon={Shuffle} label="Ciclo: 1-3 meses" />
          </div>
        </Card>

        {/* Flecha */}
        <Arrow />

        {/* Motor de Matchmaking */}
        <div className="relative flex items-center justify-center">
          <div className="relative size-28 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center shadow-glow animate-pulse">
            <span className="text-xs text-muted-foreground">Motor de<br />Matchmaking</span>
            <div className="absolute inset-0 rounded-full bg-brand/20 blur-2xl -z-10" aria-hidden="true" />
            
            {/* Connection arrow to closer */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 hidden md:block">
              <svg width="100" height="20" viewBox="0 0 100 20" className="animate-pulse">
                <defs>
                  <linearGradient id="connectionArrow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--tech-blue))" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="hsl(var(--tech-blue))" stopOpacity="0.4"/>
                  </linearGradient>
                </defs>
                <path 
                  d="M5 10 L85 10" 
                  stroke="url(#connectionArrow)" 
                  strokeWidth="2" 
                  strokeDasharray="3 2"
                  className="animate-pulse"
                />
                <path 
                  d="M80 6 L88 10 L80 14" 
                  stroke="hsl(var(--tech-blue))" 
                  strokeWidth="2" 
                  fill="none"
                  className="animate-pulse"
                  style={{animationDelay: '0.3s'}}
                />
              </svg>
            </div>
          </div>
          
          {/* Animated arrow connecting to closer */}
          <svg className="absolute left-full top-1/2 w-24 h-2 ml-4" viewBox="0 0 96 8" fill="none">
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--tech-blue))" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="hsl(var(--tech-blue))" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            <path 
              d="M0 4 L84 4" 
              stroke="url(#arrowGradient)" 
              strokeWidth="2" 
              className="animate-pulse"
              strokeDasharray="4 2"
            />
            <path 
              d="M80 1 L87 4 L80 7" 
              stroke="hsl(var(--tech-blue))" 
              strokeWidth="2" 
              fill="none"
              className="animate-pulse"
              style={{animationDelay: '0.5s'}}
            />
          </svg>
        </div>

        {/* Resultado: Closer */}
        <div className="md:col-start-3 animate-slide-in-right" style={{
        animationDelay: "200ms"
      }}>
          <Card title="Closer recomendado" subtitle="Senior | Enterprise | Español / Inglés" icon={UserCheck}>
            <div className="flex flex-wrap gap-2">
              <Chip icon={Target} label="Sweet spot: $25K-$100K" />
              <Chip icon={Shuffle} label="Cierra en 21 días" />
              <Chip icon={Search} label="LATAM + US" />
            </div>
          </Card>
        </div>
      </div>
    </section>;
};
export default MatchmakingAnimation;
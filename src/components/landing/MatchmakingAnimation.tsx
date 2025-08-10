import { Building2, Search, Shuffle, Target, UserCheck } from "lucide-react";

const Chip = ({ icon: Icon, label }: { icon: React.ComponentType<any>; label: string }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur animate-enter">
    <Icon size={16} className="text-brand" />
    <span>{label}</span>
  </div>
);

const Arrow = () => (
  <div className="hidden md:flex items-center justify-center text-muted-foreground">
    <svg width="72" height="24" viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12H67" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <path d="M61 6L67 12L61 18" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const Card = ({
  title,
  subtitle,
  children,
  icon: Icon,
  className = "",
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  icon: React.ComponentType<any>;
  className?: string;
}) => (
  <div className={`rounded-xl border border-border bg-card/60 p-5 shadow-glow backdrop-blur ${className}`}>
    <div className="flex items-center gap-2">
      <Icon className="text-brand" size={18} />
      <h4 className="font-semibold leading-none">{title}</h4>
    </div>
    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    {children ? <div className="mt-4 space-x-2 space-y-2">{children}</div> : null}
  </div>
);

const MatchmakingAnimation = () => {
  return (
    <section className="container py-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold">Matchmaking en acción</h3>
        <p className="text-muted-foreground mt-1">Conectamos tu oportunidad con el closer perfecto, en minutos.</p>
      </div>

      <div className="relative grid md:grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* Empresa */}
        <Card
          title="Empresa"
          subtitle="Busco ventas B2B sin riesgo"
          icon={Building2}
          className="animate-enter"
        >
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
            <span className="text-xs text-muted-foreground">Motor de<br/>Matchmaking</span>
            <div className="absolute inset-0 rounded-full bg-brand/20 blur-2xl -z-10" aria-hidden="true" />
          </div>
        </div>

        {/* Resultado: Closer */}
        <div className="md:col-start-3 animate-slide-in-right" style={{ animationDelay: "200ms" }}>
          <Card
            title="Closer recomendado"
            subtitle="Senior | Enterprise | Español / Inglés"
            icon={UserCheck}
          >
            <div className="flex flex-wrap gap-2">
              <Chip icon={Target} label="Sweet spot: $25K-$100K" />
              <Chip icon={Shuffle} label="Cierra en 21 días" />
              <Chip icon={Search} label="LATAM + US" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MatchmakingAnimation;

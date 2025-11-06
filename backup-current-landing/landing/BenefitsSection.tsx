import { CheckCircle, Target, TrendingUp, Users, Clock, Shield, DollarSign, Zap } from "lucide-react";
const BenefitsSection = () => {
  const companyBenefits = [{
    icon: Target,
    title: "Stack completo incluido",
    description: "Apollo, Clay, HubSpot, Calendly y más herramientas integradas"
  }, {
    icon: TrendingUp,
    title: "KPIs medibles",
    description: "Métricas claras: Open ≥40%, Reply+ ≥3%, SQL/MQL ≥40–45%"
  }, {
    icon: Users,
    title: "Precio fijo mensual",
    description: "USD $500/mes sin comisiones adicionales ni costos ocultos"
  }, {
    icon: Clock,
    title: "Setup completo",
    description: "Configuración, integración y capacitación del equipo incluida"
  }];
  const closerBenefits = [{
    icon: DollarSign,
    title: "Add-ons disponibles",
    description: "Frenchie leads MXN $2k–$4k c/u para leads adicionales de calidad"
  }, {
    icon: Shield,
    title: "Soporte técnico",
    description: "Configuración, troubleshooting y optimización de herramientas"
  }, {
    icon: Zap,
    title: "Métricas en tiempo real",
    description: "Monitoreo de KPIs: Show ≥70%, TTFM ≤14d y más"
  }, {
    icon: CheckCircle,
    title: "Sin comisiones",
    description: "Precio fijo mensual sin costos adicionales por ventas"
  }];
  const BenefitCard = ({
    icon: Icon,
    title,
    description,
    delay
  }: {
    icon: any;
    title: string;
    description: string;
    delay: number;
  }) => <div className="group p-6 rounded-xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow animate-fade-in" style={{
    animationDelay: `${delay}ms`
  }}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-primary animate-pulse group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>;
  return null;
};
export default BenefitsSection;
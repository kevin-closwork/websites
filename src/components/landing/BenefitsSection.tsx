import { CheckCircle, Target, TrendingUp, Users, Clock, Shield, DollarSign, Zap } from "lucide-react";
const BenefitsSection = () => {
  const companyBenefits = [{
    icon: Target,
    title: "Resultados garantizados",
    description: "Solo pagas por cierres efectivos, no por intentos"
  }, {
    icon: TrendingUp,
    title: "Crecimiento acelerado",
    description: "Escala tus ventas sin riesgo de inversión inicial"
  }, {
    icon: Users,
    title: "Talento elite",
    description: "Acceso a los mejores closers de Latinoamérica"
  }, {
    icon: Clock,
    title: "Ahorro de tiempo",
    description: "No más procesos largos de contratación y entrenamiento"
  }];
  const closerBenefits = [{
    icon: DollarSign,
    title: "Ingresos altos",
    description: "Gana hasta 5x más que en trabajos tradicionales"
  }, {
    icon: Shield,
    title: "Casos de calidad",
    description: "Solo trabajas con empresas verificadas y productos probados"
  }, {
    icon: Zap,
    title: "Libertad total",
    description: "Trabaja desde donde quieras, cuando quieras"
  }, {
    icon: CheckCircle,
    title: "Comisiones justas",
    description: "Transparencia total en pagos y tracking de resultados"
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
  return <section className="py-20 bg-secondary/30">
      <div className="container bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-950 md:text-6xl">
            Beneficios para todos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una plataforma diseñada para el éxito mutuo entre empresas y closers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Empresas */}
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success border border-success/20 mb-4">
                <Users className="w-4 h-4" />
                <span className="font-medium">Para Empresas</span>
              </div>
              <h3 className="text-xl font-semibold text-green-600">
                Acelera tu crecimiento sin riesgo
              </h3>
            </div>
            <div className="space-y-4">
              {companyBenefits.map((benefit, index) => <BenefitCard key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} delay={index * 100} />)}
            </div>
          </div>

          {/* Closers */}
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tech/10 text-tech border border-tech/20 mb-4">
                <Target className="w-4 h-4" />
                <span className="font-medium">Para Closers</span>
              </div>
              <h3 className="text-xl font-semibold text-green-600">
                Maximiza tu potencial de ventas
              </h3>
            </div>
            <div className="space-y-4">
              {closerBenefits.map((benefit, index) => <BenefitCard key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} delay={index * 100} />)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BenefitsSection;
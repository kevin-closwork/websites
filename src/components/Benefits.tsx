import { Shield, Zap, Users, Target, TrendingUp, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const benefits = {
  empresas: [
    {
      icon: Shield,
      title: "Reducción de Riesgo",
      description: "Sin costos fijos ni contratos largos. Solo pagas por resultados reales."
    },
    {
      icon: Zap,
      title: "Acceso Inmediato",
      description: "Conecta con closers verificados en menos de 48 horas."
    },
    {
      icon: Target,
      title: "Flexibilidad Total",
      description: "Ajusta comisiones y requisitos según tus necesidades específicas."
    }
  ],
  closers: [
    {
      icon: TrendingUp,
      title: "Oportunidades Constantes",
      description: "Acceso a múltiples ofertas de empresas verificadas cada semana."
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Conecta con otros closers, comparte estrategias y aprende continuamente."
    },
    {
      icon: Award,
      title: "Soporte Especializado",
      description: "Recibe formación y herramientas para maximizar tus comisiones."
    }
  ]
};

const BenefitCard = ({ benefit, index, delay, isCloser = false }: { benefit: typeof benefits.empresas[0], index: number, delay: number, isCloser?: boolean }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`group bg-white rounded-xl p-6 shadow-card hover:shadow-elevation transition-all duration-300 hover:-translate-y-2 scroll-animate ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 ${isCloser ? 'bg-gradient-secondary' : 'bg-gradient-primary'} rounded-lg flex items-center justify-center group-hover:animate-pulse-glow`}>
          <benefit.icon className="h-6 w-6 text-white" />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-secondary group-hover:text-primary transition-colors">
            {benefit.title}
          </h4>
          <p className="text-muted-foreground">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: empresasRef, isVisible: empresasVisible } = useScrollAnimation();
  const { ref: closersRef, isVisible: closersVisible } = useScrollAnimation();
  
  return (
    <section className="py-20 gradient-tech">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            Beneficios para todos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una plataforma diseñada para maximizar el éxito tanto de empresas como de closers
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Para Empresas */}
          <div 
            ref={empresasRef}
            className={`space-y-8 scroll-fade-in scroll-animate-delay-1 ${empresasVisible ? 'visible' : ''}`}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-secondary mb-4">
                Para Empresas
              </h3>
              <p className="text-lg text-muted-foreground">
                Escala tu fuerza de ventas sin riesgos
              </p>
            </div>
            
            <div className="grid gap-6">
              {benefits.empresas.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} index={index} delay={index + 1} />
              ))}
            </div>
          </div>
          
          {/* Para Closers */}
          <div 
            ref={closersRef}
            className={`space-y-8 scroll-fade-in scroll-animate-delay-2 ${closersVisible ? 'visible' : ''}`}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-secondary mb-4">
                Para Socios Comerciales
              </h3>
              <p className="text-lg text-muted-foreground">
                Maximiza tus ingresos con oportunidades verificadas
              </p>
            </div>
            
            <div className="grid gap-6">
              {benefits.closers.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} index={index} delay={index + 4} isCloser={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
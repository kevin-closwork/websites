import { Shield, Zap, Users, Target, TrendingUp, Award } from "lucide-react";

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

const Benefits = () => {
  return (
    <section className="py-20 gradient-tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            Beneficios para todos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una plataforma diseñada para maximizar el éxito tanto de empresas como de closers
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Para Empresas */}
          <div className="space-y-8">
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
                <div 
                  key={index}
                  className="group interactive-card bg-white rounded-xl p-6 shadow-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-wiggle group-hover:scale-110 transition-all duration-300">
                      <benefit.icon className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />
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
              ))}
            </div>
          </div>
          
          {/* Para Closers */}
          <div className="space-y-8">
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
                <div 
                  key={index}
                  className="group interactive-card bg-white rounded-xl p-6 shadow-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:animate-wiggle group-hover:scale-110 transition-all duration-300">
                      <benefit.icon className="h-6 w-6 text-white transition-transform group-hover:rotate-12" />
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
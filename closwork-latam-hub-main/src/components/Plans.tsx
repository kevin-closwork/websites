import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Startup",
    price: "Gratis",
    description: "Perfecto para empresas que están comenzando",
    features: [
      "Hasta 3 publicaciones activas",
      "Acceso a closers básicos",
      "Soporte por chat",
      "Dashboard básico",
      "Comisión estándar"
    ],
    cta: "Comenzar Gratis",
    popular: false,
    variant: "outline" as const
  },
  {
    name: "PyME",
    price: "$99",
    period: "/mes",
    description: "La opción más popular para pequeñas y medianas empresas",
    features: [
      "Publicaciones ilimitadas",
      "Acceso a closers premium",
      "Soporte prioritario 24/7",
      "Analytics avanzados",
      "Comisión reducida",
      "Manager dedicado",
      "Integración CRM"
    ],
    cta: "Empezar Prueba Gratis",
    popular: true,
    variant: "hero" as const
  },
  {
    name: "Enterprise",
    price: "Personalizado",
    description: "Solución completa para grandes empresas",
    features: [
      "Todo lo incluido en PyME",
      "Closers exclusivos",
      "SLA garantizado",
      "Integraciones personalizadas",
      "White label",
      "Capacitación personalizada",
      "Account manager ejecutivo"
    ],
    cta: "Contactar Ventas",
    popular: false,
    variant: "secondary" as const
  }
];

const Plans = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            Planes diseñados para tu crecimiento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a las necesidades de tu empresa.
            Todos incluyen nuestra garantía de satisfacción.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 interactive-card animate-scale-in ${
                plan.popular 
                  ? 'bg-gradient-to-br from-primary to-primary-glow text-white shadow-glow scale-105 animate-gradient-shift' 
                  : 'bg-white shadow-card border border-gray-100'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce-in">
                  <div className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 hover-scale">
                    <Star className="h-4 w-4 fill-current animate-pulse" />
                    Más Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-white' : 'text-secondary'
                }`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${
                    plan.popular ? 'text-white' : 'text-secondary'
                  }`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-lg ${
                      plan.popular ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`${
                  plan.popular ? 'text-white/90' : 'text-muted-foreground'
                }`}>
                  {plan.description}
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className="flex items-center gap-3 group/feature animate-fade-in-up"
                    style={{ animationDelay: `${(index * 0.1) + (featureIndex * 0.05)}s` }}
                  >
                    <Check className={`h-5 w-5 flex-shrink-0 transition-transform group-hover/feature:scale-125 group-hover/feature:rotate-12 ${
                      plan.popular ? 'text-white' : 'text-primary'
                    }`} />
                    <span className={`transition-colors ${
                      plan.popular ? 'text-white' : 'text-secondary'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant={plan.popular ? "outline-white" : plan.variant}
                size="lg"
                className="w-full hover-lift"
              >
                {plan.cta}
              </Button>
              
              {/* Guarantee Badge */}
              <div className="text-center mt-6">
                <div className={`inline-flex items-center gap-1 text-sm ${
                  plan.popular ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  <Check className="h-4 w-4" />
                  Garantía de 30 días
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas una solución personalizada?
          </p>
          <Button variant="outline" size="lg">
            Hablar con un Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Plans;
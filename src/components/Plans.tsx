import { Check, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pixelEvents } from "@/lib/pixelEvents";
import { getStripeCheckoutUrl, getStripePrice, getStripeTracking, getStripeCurrency } from "@/lib/stripeConfig";

const plans = [
  {
    name: "STARTER",
    subtitle: "Prueba sin riesgo, cambia cuando quieras",
    price: "$899",
    currency: "MXN",
    period: "/mes",
    features: [
      "1 socio comercial verificado activo",
      "1 Cambio de socio comercial por mes",
      "Sesión consultiva inicial (45 min)",
      "WhatsApp support"
    ],
    addon: {
      text: "Socio comercial adicional: +$699/mes",
      price: 699
    },
    cta: "Empezar Ahora",
    popular: false,
    variant: "hero" as const,
    planKey: "planBasico" as const,
    icon: Star,
    emoji: "🎯"
  },
  {
    name: "GROWTH",
    subtitle: "Dobla tus probabilidades, diferentes estilos",
    price: "$1,900",
    currency: "MXN",
    period: "/mes",
    features: [
      "2 socios comerciales simultáneamente",
      "2 cambios de socio comercial por mes",
      "2 sesiones consultivas/mes (30 min c/u)",
      "Prioridad en asignación de socios comerciales",
      "WhatsApp support prioritario (<4h)",
      "Acceso a eventos Closwork"
    ],
    addon: {
      text: "Socio comercial adicional: +$499/mes",
      price: 499
    },
    cta: "Comenzar Growth",
    popular: true,
    variant: "hero" as const,
    planKey: "planGrowth" as const,
    icon: TrendingUp,
    emoji: "🚀"
  },
  {
    name: "SCALE",
    subtitle: "Equipo comercial completo, resultados multiplicados",
    price: "$2,400",
    currency: "MXN",
    period: "/mes",
    features: [
      "3 socios comerciales simultáneamente",
      "Cambios ilimitados de socios comerciales",
      "Prioridad absoluta en nuevas oportunidades",
      "Beta access: Primeros en probar nuevas features",
      "2 sesiones consultivas/mes",
      "WhatsApp VIP directo (fundadores)",
      "Acceso exclusivo a socios comerciales TOP 10%"
    ],
    addon: {
      text: "Socio comercial adicional: +$199/mes",
      price: 199
    },
    cta: "Escalar Ahora",
    popular: false,
    variant: "hero" as const,
    planKey: "planScale" as const,
    icon: Zap,
    emoji: "💎"
  }
];

const Plans = () => {
  // Función para manejar el clic del botón de Stripe
  const handleStripeCheckout = (planKey: 'planBasico' | 'planGrowth' | 'planScale') => {
    // Obtener configuración de tracking
    const tracking = getStripeTracking(planKey);
    const price = getStripePrice(planKey);
    const currency = getStripeCurrency(planKey);
    
    // Track pixel events
    pixelEvents.initiateCheckout(tracking.checkoutType, price);
    pixelEvents.lead(tracking.leadType, price);
    
    // Obtener URL de Stripe Checkout
    const stripeCheckoutUrl = getStripeCheckoutUrl(planKey);
    
    // Redirigir a Stripe
    window.open(stripeCheckoutUrl, '_blank');
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-[#4aab6f] to-[#6bbf8a] text-white shadow-glow scale-105' 
                  : 'bg-white shadow-card hover:shadow-elevation border border-gray-100'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    Más Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.popular 
                      ? 'bg-white/20 text-white' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {plan.emoji && (
                      <span className="text-3xl">{plan.emoji}</span>
                    )}
                    {!plan.emoji && (
                      <plan.icon className="h-8 w-8" />
                    )}
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${
                  plan.popular ? 'text-white' : 'text-secondary'
                }`}>
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <p className={`text-sm mb-4 ${
                    plan.popular ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {plan.subtitle}
                  </p>
                )}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className={`text-4xl font-bold ${
                      plan.popular ? 'text-white' : 'text-secondary'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${
                      plan.popular ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {plan.currency}{plan.period}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="space-y-1">
                    <div className="flex items-center gap-3">
                      <Check className={`h-5 w-5 flex-shrink-0 ${
                        plan.popular ? 'text-white' : 'text-primary'
                      }`} />
                      <span className={`${
                        plan.popular ? 'text-white' : 'text-secondary'
                      }`}>
                        {feature}
                      </span>
                    </div>
                    {feature.toLowerCase().includes('socio comercial') && (
                      <p className={`text-xs ml-8 ${
                        plan.popular ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        Un cerrador de venta bajo comisión, no es freelancer ni empleado
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                variant={plan.popular ? "outline-white" : plan.variant}
                size="lg"
                className="w-full mb-3"
                onClick={() => handleStripeCheckout(plan.planKey)}
              >
                {plan.cta}
              </Button>
              
              {/* Addon Info */}
              {plan.addon && (
                <div className="text-center">
                  <p className={`text-xs ${
                    plan.popular ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {plan.addon.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas una solución personalizada?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              // Track pixel events
              pixelEvents.contact('WhatsApp Contact - Specialist Button');
              pixelEvents.lead('WhatsApp Contact - Specialist Button', 0);
              pixelEvents.schedule('WhatsApp Contact - Specialist Button');
              
              // Open WhatsApp
              const phoneNumber = '5213112403145';
              const message = 'Hola, me interesa conocer más sobre los planes de Closwork para mi empresa';
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            Hablar con un Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Plans;
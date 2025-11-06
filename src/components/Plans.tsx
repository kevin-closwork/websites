import { Check, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pixelEvents } from "@/lib/pixelEvents";
import { getStripeCheckoutUrl, getStripePrice, getStripeTracking, getStripeCurrency } from "@/lib/stripeConfig";

const plans = [
  {
    name: "Plan Básico",
    price: "$899",
    currency: "USD",
    originalPrice: "$1200",
    period: "por lanzamiento",
    description: "Perfecto para empresas que están comenzando",
    features: [
      "1 socio comercial",
      "Sesión consultiva",
      "Garantía de cambio (1 cambio en los siguientes 7 días posteriores)"
    ],
    cta: "Comenzar Ahora",
    popular: false,
    variant: "hero" as const,
    planKey: "planBasico" as const,
    icon: Star
  },
  {
    name: "Plan Growth",
    price: "$2,400",
    currency: "USD",
    originalPrice: "$2,700",
    period: "por lanzamiento",
    description: "Ideal para empresas en crecimiento",
    features: [
      "2 socios comerciales",
      "Garantía de cambio (2 cambios)",
      "Sesión consultiva extendida",
      "Soporte prioritario",
      "Garantía de 14 días"
    ],
    cta: "Escalar Ahora",
    popular: true,
    variant: "hero" as const,
    planKey: "planGrowth" as const,
    icon: TrendingUp
  },
  {
    name: "Plan Scale",
    price: "$7,900",
    currency: "USD",
    originalPrice: "$8,900",
    period: "por lanzamiento",
    description: "Para empresas que buscan máximo rendimiento",
    features: [
      "3 socios comerciales senior",
      "Garantía de cambio (2 cambios)",
      "2 Sesiónes consultivas",
      "Soporte prioritario",
      "Garantía de 30 días"
    ],
    cta: "Maximizar Ventas",
    popular: false,
    variant: "hero" as const,
    planKey: "planScale" as const,
    icon: Zap
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
                    <plan.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-white' : 'text-secondary'
                }`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  {plan.originalPrice && (
                    <div className="mb-2">
                      <span className={`text-lg line-through ${
                        plan.popular ? 'text-white/60' : 'text-muted-foreground'
                      }`}>
                        {plan.originalPrice}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-2">
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
                </div>
                <p className={`${
                  plan.popular ? 'text-white/90' : 'text-muted-foreground'
                }`}>
                  {plan.description}
                </p>
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
                className="w-full"
                onClick={() => handleStripeCheckout(plan.planKey)}
              >
                {plan.cta}
              </Button>
              
              {/* Guarantee Badge - Only show for Growth and Scale plans */}
              {plan.name !== "Plan Básico" && (
                <div className="text-center mt-6">
                  <div className={`inline-flex items-center gap-1 text-sm ${
                    plan.popular ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    <Check className="h-4 w-4" />
                    {plan.name === "Plan Growth" ? "Garantía de 14 días" : "Garantía de 30 días"}
                  </div>
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
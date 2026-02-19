import { Check, Star, TrendingUp, Info, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { pixelEvents } from "@/lib/pixelEvents";
import { getStripeCheckoutUrl, getStripePrice, getStripeTracking, getStripeCurrency } from "@/lib/stripeConfig";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const plans = [
  {
    name: "STARTER",
    subtitle: "Prueba sin riesgo, cambia cuando quieras",
    price: "$899",
    currency: "MXN",
    period: "/mes",
    features: [
      "1 socio comercial verificado activo",
      "Garantía extendida",
      "Garantía de satisfacción",
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
    price: "$1,299",
    currency: "MXN",
    period: "/mes",
    features: [
      "2 socios comerciales simultáneamente",
      "Garantía extendida",
      "Garantía de satisfacción",
      "1 sesión consultiva por mes",
      "Prioridad en asignación de socios comerciales",
      "WhatsApp support",
      "Acceso a eventos Closwork"
    ],
    addon: {
      text: "Socio comercial adicional: +$699/mes",
      price: 699
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
    subtitle: "Máximo rendimiento y escalabilidad",
    price: "$1,999",
    currency: "MXN",
    period: "/mes",
    features: [
      "3 socios comerciales simultáneamente",
      "Garantía extendida",
      "Garantía de satisfacción",
      "Hasta 2 sesiones consultivas por mes",
      "Prioridad VIP: Asignación de nuevos socios en < 48 horas",
      "WhatsApp support prioritario (<4h)",
      "Acceso a eventos Closwork"
    ],
    addon: {
      text: "Socio comercial adicional: +$299/mes",
      price: 299
    },
    cta: "Comenzar Scale",
    popular: false,
    variant: "hero" as const,
    planKey: "planScale" as const,
    icon: Scale,
    emoji: "💎"
  }
];

const Plans = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  
  // Función para manejar el clic del botón - redirige a página de TyC
  const handleStripeCheckout = (planKey: 'planBasico' | 'planGrowth' | 'planScale') => {
    // Obtener configuración de tracking
    const tracking = getStripeTracking(planKey);
    const price = getStripePrice(planKey);
    
    // Track pixel events
    pixelEvents.initiateCheckout(tracking.checkoutType, price);
    pixelEvents.lead(tracking.leadType, price);
    
    // Redirigir a la página de TyC correspondiente según el plan
    const tycRoutes = {
      planBasico: '/empresas-tyc-basico',
      planGrowth: '/empresas-tyc-growth',
      planScale: '/empresas-tyc-scale'
    };
    
    window.location.href = tycRoutes[planKey];
  };

  const PlanCard = ({ plan, index }: { plan: typeof plans[0], index: number }) => {
    const { ref, isVisible } = useScrollAnimation();
    
    return (
      <div 
        ref={ref}
        className={`group relative rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 scroll-animate ${isVisible ? 'visible' : ''}`}
        style={{ transitionDelay: `${index * 0.15}s` }}
      >
        <div className={`group relative rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 ${
          plan.popular 
            ? 'bg-gradient-to-br from-primary via-primary-glow to-primary text-white shadow-2xl shadow-primary/20 scale-105 border-2 border-primary/30' 
            : 'bg-white shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-primary/20'
        }`}>
          {/* Popular Badge */}
          {plan.popular && (
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-secondary to-secondary text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <Star className="h-4 w-4 fill-current" />
                Más Popular
              </div>
            </div>
          )}
          
          {/* Decorative gradient overlay for non-popular plans */}
          {!plan.popular && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          )}
          
          <div className="text-center mb-8 relative z-0">
            {/* Icon/Emoji Container */}
            <div className="flex justify-center mb-6">
              <div className={`relative p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                plan.popular 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'bg-gradient-to-br from-primary/10 to-primary/5'
              }`}>
                {plan.emoji && (
                  <span className="text-4xl block">{plan.emoji}</span>
                )}
                {!plan.emoji && (
                  <plan.icon className={`h-10 w-10 ${
                    plan.popular ? 'text-white' : 'text-primary'
                  }`} />
                )}
              </div>
            </div>
            
            {/* Plan Name */}
            <h3 className={`text-3xl font-bold mb-2 tracking-tight ${
              plan.popular ? 'text-white' : 'text-secondary'
            }`}>
              {plan.name}
            </h3>
            
            {/* Subtitle */}
            {plan.subtitle && (
              <p className={`text-sm mb-6 leading-relaxed ${
                plan.popular ? 'text-white/90' : 'text-muted-foreground'
              }`}>
                {plan.subtitle}
              </p>
            )}
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className={`text-5xl font-extrabold tracking-tight ${
                  plan.popular ? 'text-white' : 'text-secondary'
                }`}>
                  {plan.price}
                </span>
                <span className={`text-lg font-medium ${
                  plan.popular ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  {plan.currency}{plan.period}
                </span>
              </div>
            </div>
          </div>
          
          {/* Features List */}
          <div className="space-y-3.5 mb-8 min-h-[280px]">
            {plan.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-start gap-3 group/feature">
                <div className={`mt-0.5 flex-shrink-0 rounded-full p-1 ${
                  plan.popular 
                    ? 'bg-white/20' 
                    : 'bg-primary/10'
                }`}>
                  <Check className={`h-4 w-4 ${
                    plan.popular ? 'text-white' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1 flex items-start gap-2">
                  <span className={`text-sm leading-relaxed ${
                    plan.popular ? 'text-white/95' : 'text-gray-700'
                  }`}>
                    {feature}
                  </span>
                  {(feature === "Garantía extendida" || feature === "Garantía de satisfacción") && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className={`h-4 w-4 cursor-help mt-0.5 flex-shrink-0 transition-colors ${
                          plan.popular 
                            ? 'text-white/70 hover:text-white' 
                            : 'text-gray-400 hover:text-primary'
                        }`} />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          {feature === "Garantía extendida" 
                            ? "Si el socio comercial asignado no cumple con tus expectativas, nos comprometemos a realizar el reemplazo correspondiente para garantizar tu satisfacción."
                            : "Si después de un período mínimo de 3 meses no estás satisfecho con los resultados obtenidos, te reembolsaremos el monto correspondiente a tu inversión."}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Button 
            variant={plan.popular ? "outline-white" : plan.variant}
            size="lg"
            className={`w-full mb-4 font-semibold text-base py-6 rounded-xl transition-all duration-300 ${
              plan.popular 
                ? 'bg-white text-primary hover:bg-white/90 border-2 border-white shadow-lg hover:shadow-xl hover:scale-105' 
                : 'bg-gradient-to-r from-secondary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-105'
            }`}
            onClick={() => handleStripeCheckout(plan.planKey)}
          >
            {plan.cta}
          </Button>
          
          {/* Addon Info */}
          {plan.addon && (
            <div className="text-center pt-4 border-t border-gray-200/50">
              <p className={`text-xs font-medium ${
                plan.popular ? 'text-white/80' : 'text-muted-foreground'
              }`}>
                {plan.addon.text}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <section id="planes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            Planes diseñados para tu crecimiento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a las necesidades de tu empresa.
            Todos incluyen nuestra garantía de satisfacción.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} index={index} />
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
    </TooltipProvider>
  );
};

export default Plans;
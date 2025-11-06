import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, TrendingUp, Users, Shield, BarChart3 } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Plan Beta",
      subtitle: "Validación sin riesgo",
      description: "Founders que quieren probar sin riesgo",
      price: "$450",
      period: "Fee único",
      commission: "5% por venta",
      icon: Star,
      color: "bg-success-green",
      borderColor: "border-success-green",
      textColor: "text-success-green",
      features: [
        "1 closer remoto validado",
        "20 leads de arranque",
        "Pagas después del 1er cierre",
        "5% comisión por venta"
      ],
      kpis: [],
      addons: [],
      cta: "Comenzar Beta",
      popular: false
    },
    {
      name: "Plan Growth",
      subtitle: "Escalamiento",
      description: "Pymes SaaS en etapa de escalamiento",
      price: "$1,000",
      period: "anual",
      commission: "3% comisión",
      icon: TrendingUp,
      color: "bg-brand",
      borderColor: "border-brand",
      textColor: "text-brand",
      features: [
        "Hasta 3 closers expertos",
        "50 leads mensuales",
        "Gestión CRM integrada",
        "Reportes semanales",
        "3% comisión por venta"
      ],
      kpis: [],
      addons: [],
      cta: "Escalar Ahora",
      popular: true
    },
    {
      name: "Plan Scale",
      subtitle: "Expansión regional",
      description: "Scaleups y empresas en expansión regional",
      price: "$4,000",
      period: "anual",
      commission: "2% comisión",
      icon: Users,
      color: "bg-tech-blue",
      borderColor: "border-tech-blue",
      textColor: "text-tech-blue",
      features: [
        "Hasta 6 closers senior",
        "100 leads mensuales",
        "SDR support incluido",
        "Analytics dashboard",
        "2% comisión por venta"
      ],
      kpis: [],
      addons: [],
      cta: "Despega ya",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Planes que se adaptan a tu
            <span className="text-brand bg-gradient-to-r from-brand to-brand/80 bg-clip-text text-transparent">
              {" "}crecimiento
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desde validación sin riesgo hasta expansión regional. 
            Elige el plan que mejor se adapte a tu etapa de crecimiento.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative ${
                  plan.popular 
                    ? `border-2 ${plan.borderColor} shadow-2xl shadow-brand/20` 
                    : 'border-border hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${plan.color} text-white px-4 py-1 text-sm font-semibold`}>
                      <Zap className="w-4 h-4 mr-1" />
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-xl font-semibold text-muted-foreground">
                    {plan.subtitle}
                  </CardDescription>
                  <p className="text-lg text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="text-center pb-6">
                  <div className="mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 text-xl">/{plan.period}</span>
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${plan.color}/10 ${plan.textColor} text-lg font-semibold`}>
                    <BarChart3 className="w-5 h-5 mr-2" />
                    {plan.commission}
                  </div>
                </CardContent>

                <CardContent className="pt-0">
                  {/* Características */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-center">Características</h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 ${plan.textColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>


                  {/* Add-ons */}
                  {plan.addons && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-center">Add-ons</h3>
                      <ul className="space-y-2">
                        {plan.addons.map((addon, addonIndex) => (
                          <li key={addonIndex} className="flex items-center gap-3">
                            <div className={`w-2 h-2 ${plan.color} rounded-full flex-shrink-0`}></div>
                            <span className="text-sm text-muted-foreground">{addon}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-6">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-brand hover:bg-brand/90' : 'bg-primary hover:bg-primary/90'}`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-muted/50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas un plan personalizado?</h3>
            <p className="text-muted-foreground mb-6">
              Para empresas con necesidades específicas, ofrecemos planes personalizados 
              con closers dedicados y estrategias a medida.
            </p>
            <Button variant="outline" size="lg" className="mr-4">
              <Shield className="w-4 h-4 mr-2" />
              Contactar Ventas
            </Button>
            <Button variant="ghost" size="lg">
              Ver Casos de Éxito
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-brand mb-2">48hrs</div>
            <div className="text-sm text-muted-foreground">Tiempo de asignación</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success-green mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Tasa de satisfacción</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-tech-blue mb-2">$2M+</div>
            <div className="text-sm text-muted-foreground">Ventas generadas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neon mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Soporte disponible</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import { Rocket, TrendingUp, Scale, CheckCircle, Star, Zap, Target, Users, BarChart3, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const PackagesSection = () => {
  const packages = [
    {
      name: "Plan Beta",
      subtitle: "Validación sin riesgo",
      price: "USD $450",
      period: "Fee único",
      variant: "success" as const,
      icon: Rocket,
      description: "Founders que quieren probar sin riesgo",
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
      price: "USD $1,000",
      period: "/año",
      variant: "tech" as const,
      icon: TrendingUp,
      description: "Pymes SaaS en etapa de escalamiento",
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
      price: "USD $4,000",
      period: "/año",
      variant: "hero" as const,
      icon: Scale,
      description: "Scaleups y empresas en expansión regional",
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

  const PackageCard = ({ pkg, index }: { pkg: typeof packages[0], index: number }) => (
    <div className={`relative p-8 rounded-2xl border-2 ${
      pkg.popular 
        ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl' 
        : 'border-border bg-card/50 hover:border-primary/30'
    }`}>
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            ⭐ Más Popular
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
          pkg.popular ? 'bg-primary/20' : 'bg-primary/10'
        }`}>
          <pkg.icon className={`w-8 h-8 ${pkg.popular ? 'text-primary' : 'text-primary/70'}`} />
        </div>
        <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
        <p className="text-muted-foreground mb-4">{pkg.subtitle}</p>
        <div className="mb-2">
          <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
          <span className="text-muted-foreground">{pkg.period}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
      </div>

      <div className="space-y-6">
        {/* Features */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Características
          </h4>
          <ul className="space-y-2">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>


        {/* Add-ons */}
        {pkg.addons.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Add-ons
            </h4>
            <ul className="space-y-2">
              {pkg.addons.map((addon, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Star className="w-4 h-4 text-cyber-yellow mt-0.5 flex-shrink-0" />
                  <span>{addon}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Button 
          variant={pkg.variant} 
          size="xl" 
          className="w-full"
        >
          {pkg.cta}
        </Button>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-950 md:text-6xl">
            Planes que se adaptan a tu crecimiento
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desde validación sin riesgo hasta expansión regional. 
            Elige el plan que mejor se adapte a tu etapa de crecimiento.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas un paquete personalizado?
          </p>
          <Button variant="outline" size="lg">
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Consulta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

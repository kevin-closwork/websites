import { Building2, Users, TrendingUp } from "lucide-react";
import step1 from "@/assets/@1.png";
import step2 from "@/assets/@2.png";
import step3 from "@/assets/@3.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    title: "Publica tu empresa/oferta",
    description: "Registra tu empresa y publica las oportunidades de venta que necesitas promocionar. Define comisiones y requisitos.",
    icon: Building2,
    image: step1,
    color: "text-primary"
  },
  {
    number: "02", 
    title: "Te conectamos con un socio comercial validado",
    description: "Nuestro algoritmo te conecta con closers verificados que tienen experiencia en tu sector y mercado objetivo.",
    icon: Users,
    image: step2,
    color: "text-secondary"
  },
  {
    number: "03",
    title: "Pagas comisión solo cuando se concreten ventas",
    description: "Sin costos fijos. Solo pagas cuando tu socio comercial genere resultados reales para tu negocio.",
    icon: TrendingUp,
    image: step3,
    color: "text-primary"
  }
];

const StepCard = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-12 scroll-animate scroll-animate-delay-${index + 1} ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
      } ${isVisible ? 'visible' : ''}`}
    >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`text-6xl font-bold ${step.color} opacity-20`}>
                    {step.number}
                  </div>
                  <step.icon className={`h-12 w-12 ${step.color}`} />
                </div>
                
                <h3 className="text-3xl font-bold text-secondary">
                  {step.title}
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>Paso {step.number}</span>
                  <div className="h-0.5 w-12 bg-primary"></div>
                </div>
              </div>
              
              {/* Illustration */}
              <div className="flex-1 relative">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
  );
};

const HowItWorks = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            ¿Cómo funciona Closwork?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un proceso simple y transparente que conecta empresas con los mejores 
            closers de LATAM en 3 pasos
          </p>
        </div>
        
        <div className="space-y-20">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
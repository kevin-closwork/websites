import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RegistrationModal from "@/components/RegistrationModal";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinClick = () => {
    const plansSection = document.getElementById('planes');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full animate-float blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200/20 rounded-full animate-float blur-xl" style={{
          animationDelay: '1s'
        }}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-200/20 rounded-full animate-float blur-xl" style={{
          animationDelay: '2s'
        }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-8 animate-slide-up">
              {/* Pre-Title Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <span className="text-lg">🚀</span>
                <span className="text-sm lg:text-base text-secondary font-medium">
                  La evolución de las ventas B2B
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-secondary leading-tight">
                Crea tu fuerza de ventas bajo comisión
              </h1>
              
              <h2 className="text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed font-normal max-w-3xl mx-auto">
                El Primer Sales-as-a-Service de LATAM. Despliega fuerza de ventas experta en 24 horas. Conecta tu oferta con Socios Comerciales verificados bajo demanda. Sin nómina, solo resultados.
              </h2>
              
              <div className="pt-4 space-y-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="group text-lg px-12 py-6 shadow-lg"
                  onClick={handleJoinClick}
                >
                  Desplegar Sales Team
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <p className="text-sm lg:text-base text-muted-foreground">
                  Setup en 5 minutos • Cancelación flexible
                </p>
                
                <p className="text-sm lg:text-base text-muted-foreground">
                  ¿Eres un vendedor? Comienza tu camino{" "}
                  <Link 
                    to="/solicitud?type=closer" 
                    className="text-primary hover:text-primary-glow transition-colors font-medium"
                  >
                    aquí
                  </Link>
                </p>
              </div>

              {/* Accelerated by Section */}
              <div className="pt-12">
                <div className="flex flex-col items-center gap-6">
                  <p className="text-lg text-muted-foreground font-medium">Acelerados en:</p>
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <div className="flex items-center justify-center">
                      <img 
                        src="/logo-86bf1018.svg" 
                        alt="Partner Logo" 
                        className="h-20 w-auto opacity-80"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <img 
                        src="/emprelatam-logo.png" 
                        alt="Emprelatam Logo" 
                        className="h-10 w-auto opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-secondary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default HeroSection;
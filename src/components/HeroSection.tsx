import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroTech from "@/assets/hero-tech.png";
import RegistrationModal from "@/components/RegistrationModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="min-h-screen relative gradient-hero flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{
          animationDelay: '1s'
        }}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-float" style={{
          animationDelay: '2s'
        }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8 animate-slide-up text-left">
                {/* Pre-Title Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-lg">🚀</span>
                  <span className="text-sm lg:text-base text-white/90 font-medium">
                    La evolución de las ventas B2B
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                  El Primer Sales-as-a-Service de LATAM.
                </h1>
                
                <h2 className="text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed font-normal">
                  Despliega fuerza de ventas experta en 24 horas. Conecta tu oferta con Socios Comerciales verificados bajo demanda. Sin nómina, solo resultados.
                </h2>
                
                <div className="pt-4 space-y-4">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="group text-lg px-12 py-6"
                    onClick={handleJoinClick}
                  >
                    Desplegar Sales Team
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <p className="text-sm lg:text-base text-white/70">
                    Setup en 5 minutos • Cancelación flexible
                  </p>
                </div>

                {/* Accelerated by Section */}
                <div className="pt-8">
                  <div className="flex flex-col items-start gap-6">
                    <p className="text-lg text-white/80">Acelerados en:</p>
                    <div className="flex flex-wrap items-center gap-8">
                      <div className="flex items-center justify-center">
                        <img 
                          src="/logo-86bf1018.svg" 
                          alt="Partner Logo" 
                          className="h-24 w-auto filter brightness-0 invert"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <img 
                          src="/emprelatam-logo.png" 
                          alt="Emprelatam Logo" 
                          className="h-12 w-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="flex items-center justify-center lg:justify-end animate-slide-up" style={{
                animationDelay: '0.2s'
              }}>
                <img 
                  src="https://i.imgur.com/VzAEgME.png" 
                  alt="Hero Illustration" 
                  className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
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
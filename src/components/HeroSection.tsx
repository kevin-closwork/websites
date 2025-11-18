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
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8 animate-slide-up">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="text-white">
                  Únete a la comunidad
                </span>
                <br />
                de socios comerciales bajo comisión de LATAM
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Conecta con closers verificados y promotores de ventas especializados. 
                Sin riesgos fijos, solo comisión por resultados.
              </p>
              
              <div className="pt-8">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="group text-lg px-12 py-6"
                  onClick={handleJoinClick}
                >
                  Únete Gratis a la Comunidad
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Accelerated by Section */}
              <div className="pt-8">
                <div className="flex flex-col items-center gap-6">
                  <p className="text-lg text-white/80">Acelerados en:</p>
                  <div className="flex flex-wrap justify-center items-center gap-8">
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
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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
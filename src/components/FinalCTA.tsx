import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewHeight = window.innerHeight;
      
      // Show when user has scrolled past 50% of the page
      if (scrolled > viewHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main CTA Section */}
      <section className="py-20 gradient-secondary relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              ¿Listo para transformar tu negocio?
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Regístrate gratis y encuentra a tu socio comercial perfecto
              <span className="block font-semibold text-primary-glow">
                en menos de 7 días
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="/solicitud?type=empresa">
                <Button variant="hero" size="xl" className="group">
                  Comenzar Ahora - Es Gratis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="h-5 w-5" />
                <span>Setup en menos de 5 minutos</span>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white/80">
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm">Sin costos ocultos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm">Soporte disponible</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">7 días</div>
                <div className="text-sm">Garantía Growth/Scale</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">7 días</div>
                <div className="text-sm">Para encontrar socio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white shadow-elevation border-t border-gray-200 p-4">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="font-semibold text-secondary">
                  ¡No pierdas más tiempo sin los mejores closers!
                </div>
                <div className="text-sm text-muted-foreground">
                  Únete gratis y comienza a generar resultados hoy mismo
                </div>
              </div>
              
              <a href="/solicitud?type=empresa">
                <Button variant="hero" className="group flex-shrink-0">
                  Únete Gratis Ahora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalCTA;
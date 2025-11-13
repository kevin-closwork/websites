import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroTech from "@/assets/hero-tech.png";
const HeroSection = () => {
  return <section className="min-h-screen relative gradient-hero flex items-center justify-center overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Closwork: La comunidad de{" "}
                <span className="bg-gradient-to-r from-primary-glow to-white bg-clip-text text-gray-50">
                  socios comerciales
                </span>{" "}
                bajo comisión en LATAM
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Conecta con closers verificados y promotores de ventas especializados. 
                Sin riesgos fijos, solo comisión por resultados.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button variant="hero" size="xl" className="group hover-lift">
                  Únete Gratis a la Comunidad
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2 group-hover:scale-110" />
                </Button>
                
                <Button variant="outline-white" size="xl" className="group hover-lift">
                  <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-125" />
                  Ver Demo
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 text-white/80">
                <div className="text-center hover-scale animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="text-2xl font-bold text-white animate-counter hover-glow">+200</div>
                  <div className="text-sm">Closers Verificados</div>
                </div>
                <div className="text-center hover-scale animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="text-2xl font-bold text-white animate-counter hover-glow">+50</div>
                  <div className="text-sm">Empresas Activas</div>
                </div>
                <div className="text-center hover-scale animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="text-2xl font-bold text-white animate-counter hover-glow">95%</div>
                  <div className="text-sm">Tasa de Éxito</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Illustration */}
          <div className="relative">
            <div className="relative z-10 animate-float hover-scale">
              <img 
                src={heroTech} 
                alt="Closwork Platform Illustration" 
                className="w-full h-auto max-w-lg mx-auto transition-transform duration-500 hover:scale-110 hover:rotate-2" 
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-2xl animate-pulse-glow animate-gradient-shift"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover-scale cursor-pointer">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white transition-all duration-300">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse hover:bg-white"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
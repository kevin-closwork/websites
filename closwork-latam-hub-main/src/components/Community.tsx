import { useState, useEffect } from "react";
import { Users, Building, Trophy, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Closers Verificados",
    value: 200,
    suffix: "+"
  },
  {
    icon: Building,
    label: "Empresas Activas",
    value: 50,
    suffix: "+"
  },
  {
    icon: Trophy,
    label: "Tasa de Éxito",
    value: 95,
    suffix: "%"
  },
  {
    icon: Globe,
    label: "Países en LATAM",
    value: 12,
    suffix: ""
  }
];

const Community = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / 50;
        const interval = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(interval);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, 30);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-white/5 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Una comunidad en{" "}
            <span className="bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
              crecimiento
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Miles de empresas y closers ya confían en Closwork para hacer crecer sus negocios
            en toda América Latina
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 animate-counter">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-white/80 text-sm lg:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              Nuevos miembros uniéndose cada día
            </span>
          </div>
        </div>
        
        {/* Gallery of People in Business */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Nuestra comunidad en acción
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop", // Persona en reunión de negocios
              "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop", // Persona presentando
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop", // Persona en oficina
              "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop", // Persona en negociación
              "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop", // Persona vendiendo
              "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=400&fit=crop", // Persona en tienda
              "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=400&fit=crop", // Persona en call center
              "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop"  // Persona en ventas
            ].map((imageUrl, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer"
              >
                <img 
                  src={imageUrl} 
                  alt={`Persona en negocio ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
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
        
        {/* Network Visualization */}
        <div className="mt-16 relative h-64 lg:h-80 overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/60">
              <Globe className="h-16 w-16 mx-auto mb-4 animate-pulse" />
              <p className="text-lg">Red de conexiones en tiempo real</p>
            </div>
          </div>
          
          {/* Animated connection lines */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 bg-gradient-to-b from-primary to-transparent opacity-30"
                style={{
                  left: `${10 + i * 10}%`,
                  height: '100%',
                  animationDelay: `${i * 0.2}s`,
                  animation: 'pulse 2s infinite'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
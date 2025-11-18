import { useState, useEffect } from "react";
import { Users, Building, Trophy, Globe, MapPin, TrendingUp, Star } from "lucide-react";

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

// Datos dummy de closers para mostrar en la red (solo países hispanohablantes)
const dummyClosers = [
  {
    id: 1,
    name: "María González",
    location: "Ciudad de México",
    industry: "SaaS",
    rating: 4.9,
    deals: 47,
    revenue: "$180K",
    avatar: "MG",
    isOnline: true
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    location: "Bogotá",
    industry: "Fintech",
    rating: 4.8,
    deals: 32,
    revenue: "$95K",
    avatar: "CR",
    isOnline: true
  },
  {
    id: 3,
    name: "Ana Silva",
    location: "Madrid",
    industry: "E-commerce",
    rating: 4.9,
    deals: 28,
    revenue: "$120K",
    avatar: "AS",
    isOnline: false
  },
  {
    id: 4,
    name: "Diego Martínez",
    location: "Santiago",
    industry: "Logística",
    rating: 4.7,
    deals: 35,
    revenue: "$85K",
    avatar: "DM",
    isOnline: true
  },
  {
    id: 5,
    name: "Laura Fernández",
    location: "Buenos Aires",
    industry: "Salud",
    rating: 4.8,
    deals: 41,
    revenue: "$150K",
    avatar: "LF",
    isOnline: true
  },
  {
    id: 6,
    name: "Roberto Lima",
    location: "Lima",
    industry: "Edtech",
    rating: 4.6,
    deals: 23,
    revenue: "$75K",
    avatar: "RL",
    isOnline: false
  },
  {
    id: 7,
    name: "Carmen Vega",
    location: "Caracas",
    industry: "Marketing",
    rating: 4.7,
    deals: 29,
    revenue: "$110K",
    avatar: "CV",
    isOnline: true
  },
  {
    id: 8,
    name: "Javier Morales",
    location: "Guatemala",
    industry: "Tecnología",
    rating: 4.8,
    deals: 38,
    revenue: "$95K",
    avatar: "JM",
    isOnline: true
  },
  {
    id: 9,
    name: "Isabel Ruiz",
    location: "San José",
    industry: "Consultoría",
    rating: 4.9,
    deals: 33,
    revenue: "$140K",
    avatar: "IR",
    isOnline: false
  },
  {
    id: 10,
    name: "Miguel Torres",
    location: "La Paz",
    industry: "Manufactura",
    rating: 4.6,
    deals: 26,
    revenue: "$80K",
    avatar: "MT",
    isOnline: true
  }
];

const Community = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    console.log('🎠 Community component mounted');
    console.log('📊 Dummy closers data:', dummyClosers);
    console.log('🎯 Total closers for carousel:', [...dummyClosers, ...dummyClosers].length);
  }, []);

  // Verificar la animación después del renderizado
  useEffect(() => {
    const checkAnimation = () => {
      console.log('🔍 Checking animation after render...');
      
      // Verificar si la animación CSS está disponible
      const carouselElement = document.querySelector('.flex[style*="animation: scroll"]');
      if (carouselElement) {
        console.log('✅ Carousel element found:', carouselElement);
        const computedStyle = window.getComputedStyle(carouselElement);
        console.log('🎨 Computed styles:', {
          animation: computedStyle.animation,
          transform: computedStyle.transform,
          width: computedStyle.width,
          display: computedStyle.display
        });
        
        // Verificar si la animación está realmente aplicada
        const animationName = computedStyle.animationName;
        console.log('🎬 Animation name:', animationName);
        
        if (animationName === 'scroll') {
          console.log('✅ Animation "scroll" is applied correctly');
        } else {
          console.log('❌ Animation "scroll" is NOT applied. Current:', animationName);
        }
      } else {
        console.log('❌ Carousel element not found');
      }
    };

    // Ejecutar después de un pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(checkAnimation, 100);
    return () => clearTimeout(timer);
  }, []);

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
            Una comunidad en crecimiento
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
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
        
        {/* Red de Closers en Tiempo Real */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Red de Closers en Tiempo Real</h3>
            <p className="text-white/70">Conectando empresas con los mejores closers de países hispanohablantes</p>
          </div>
          
          {/* Carrusel Infinito */}
          <div className="relative overflow-hidden w-full">
            <div 
              className="flex animate-scroll" 
              style={{ 
                width: '200%'
              }}
            >
              {/* Primera fila de tarjetas */}
              {[...dummyClosers, ...dummyClosers].map((closer, index) => (
                <div
                  key={`${closer.id}-${index}`}
                  className="flex-shrink-0 w-48 mx-2 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                >
                  {/* Avatar y Status */}
                  <div className="relative mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto">
                      {closer.avatar}
                    </div>
                    {closer.isOnline && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Información del Closer */}
                  <div className="text-center">
                    <h4 className="text-white font-semibold text-sm mb-1 truncate">{closer.name}</h4>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 text-white/60" />
                      <span className="text-white/70 text-xs">{closer.location}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-white text-xs font-medium">{closer.rating}</span>
                      </div>
                      
                      <div className="text-xs text-white/60">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{closer.deals} deals</span>
                        </div>
                        <div className="text-primary-glow font-medium">{closer.revenue}</div>
                      </div>
                      
                      <div className="text-xs text-white/50 bg-white/10 rounded px-2 py-1 mt-2">
                        {closer.industry}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicador de actividad en tiempo real */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                10 closers activos ahora
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
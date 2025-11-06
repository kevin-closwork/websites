import { useEffect, useRef } from "react";
import { ArrowRight, Users, Target, Lightbulb, Globe, Heart, Zap, Shield, TrendingUp, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    // Observe values cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      year: "2024",
      title: "Identificamos el vacío",
      description: "Reconocimos la falta de marketplaces especializados en ventas B2B en LATAM, donde las empresas luchaban por encontrar socios comerciales confiables."
    },
    {
      year: "2025",
      title: "Nace Closwork",
      description: "Creamos la primera comunidad de closers y promotores bajo comisión, conectando talento de ventas con empresas que necesitan resultados."
    },
    {
      year: "2025",
      title: "Aceleración estratégica",
      description: "Somos seleccionados para ser acelerados en Reto Zapopan y EmpreLatam, fortaleciendo nuestro crecimiento y expansión en el ecosistema emprendedor de LATAM."
    },
    {
      year: "Hoy",
      title: "Construyendo el futuro",
      description: "Estamos desarrollando la red más grande y confiable de socios comerciales de LATAM, democratizando las ventas en la región."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Confianza y transparencia",
      description: "Cada socio comercial es validado y verificado para garantizar la máxima confiabilidad en cada conexión."
    },
    {
      icon: TrendingUp,
      title: "Crecimiento conjunto",
      description: "Creemos en el éxito mutuo. Cuando nuestros socios crecen, toda la comunidad se beneficia."
    },
    {
      icon: Lightbulb,
      title: "Innovación con propósito",
      description: "Utilizamos tecnología avanzada para resolver problemas reales del ecosistema de ventas en LATAM."
    },
    {
      icon: Globe,
      title: "Comunidad LATAM",
      description: "Somos orgullosamente latinoamericanos, entendiendo las necesidades únicas de nuestra región."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003976] via-[#003976] to-[#4aab6f] py-20 lg:py-32">
        {/* Tech Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4aab6f]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,300 Q300,200 600,300 T1200,300"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              opacity="0.3"
            />
            <path
              d="M0,400 Q400,100 800,400 T1200,400"
              stroke="url(#gradient2)"
              strokeWidth="1.5"
              fill="none"
              className="animate-pulse"
              opacity="0.2"
              style={{ animationDelay: '1s' }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4aab6f" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4aab6f" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Nuestra historia, misión y visión en{" "}
              <span className="bg-gradient-to-r from-[#4aab6f] to-white bg-clip-text text-transparent">
                LATAM
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Closwork nació para transformar la forma en que las empresas y socios comerciales se conectan en la región.
            </p>
            
            {/* Animated LATAM Map Illustration */}
            <div className="relative mt-12 mb-8">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4aab6f] to-[#003976] rounded-full animate-pulse-glow"></div>
                <div className="absolute inset-2 bg-white/20 rounded-full flex items-center justify-center">
                  <Globe className="w-16 h-16 text-white animate-float" />
                </div>
                {/* Connection dots */}
                <div className="absolute -top-4 -right-4 w-3 h-3 bg-[#4aab6f] rounded-full animate-ping"></div>
                <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -right-8 w-2 h-2 bg-[#4aab6f] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003976] mb-16">
              Cómo nacimos
            </h2>
            
            <div ref={timelineRef} className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4aab6f] to-[#003976]"></div>
              
              {timelineData.map((item, index) => (
                <div key={index} className="timeline-item relative flex items-start mb-16 opacity-0 transform translate-y-8 transition-all duration-700">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4aab6f] to-[#003976] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
                    {item.year === "Hoy" ? <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" /> : item.year}
                  </div>
                  <div className="ml-4 sm:ml-8 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#003976] mb-3">{item.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4aab6f] to-[#003976] rounded-full mb-8 animate-bounce-subtle">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003976] mb-8">
              Nuestra misión
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Nuestra misión es democratizar las ventas en LATAM, conectando empresas con socios comerciales validados, 
              reduciendo riesgos y acelerando el crecimiento de startups y scaleups.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003976] mb-16">
              Nuestros valores
            </h2>
            
            <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-card group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 opacity-0 transform translate-y-8"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#4aab6f] to-[#003976] rounded-xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#003976] mb-3 lg:mb-4 group-hover:text-[#4aab6f] transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003976] mb-6">
                Nuestros Fundadores
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conoce al equipo visionario que está transformando las ventas B2B en LATAM
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-shrink-0">
                <img 
                  src="/personajes-closwork.png" 
                  alt="Fundadores de Closwork" 
                  className="w-full max-w-md lg:max-w-lg h-auto hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#003976] mb-6">
                  Los visionarios detrás de Closwork
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Nuestros fundadores identificaron la necesidad de democratizar las ventas en LATAM 
                  y crearon Closwork como la solución definitiva para conectar empresas con socios 
                  comerciales de confianza.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Con años de experiencia en el ecosistema de ventas B2B, han construido una plataforma 
                  que no solo conecta, sino que valida, protege y acelera el crecimiento de todas las 
                  partes involucradas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Community Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative mb-12">
              {/* Tech illustration */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4aab6f] to-[#003976] rounded-full flex items-center justify-center animate-float">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#003976] to-[#4aab6f] rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#4aab6f] to-[#003976] rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#003976] mb-8">
              Somos una comunidad en crecimiento
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
              Somos una comunidad en crecimiento que une talento de ventas y empresas de toda LATAM. 
              Cada día, más profesionales se unen a nuestro movimiento de ventas colaborativas.
            </p>
            
            {/* Community stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4aab6f] mb-2">500+</div>
                <div className="text-gray-600">Socios comerciales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4aab6f] mb-2">50+</div>
                <div className="text-gray-600">Empresas conectadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4aab6f] mb-2">15</div>
                <div className="text-gray-600">Países LATAM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#003976] to-[#4aab6f] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 leading-tight px-4">
              Closwork es más que una plataforma. Es un movimiento de ventas colaborativas en LATAM.
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto px-4">
              Únete a la revolución de las ventas B2B y forma parte de la comunidad que está transformando LATAM.
            </p>
            <a
              href="/solicitud"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#003976] font-bold text-base sm:text-lg rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              Únete a la comunidad
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

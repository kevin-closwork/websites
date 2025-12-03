import { useEffect, useState, useMemo } from "react";
import { CheckCircle, Rocket, ArrowRight, Clock, Zap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const GraciasPlanScale = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Animación de confetti más larga
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Cargar script de Vimeo Player API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remover script al desmontar el componente
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Generar partículas de confeti con diferentes formas y colores
  const confettiPieces = useMemo(() => {
    const pieces = [];
    const colors = ['#003976', '#4aab6f', '#6bbf8a', '#1a4a7a'];
    const shapes = ['square', 'circle', 'triangle'];
    
    for (let i = 0; i < 50; i++) {
      const angle = (360 / 50) * i;
      const distance = 80 + Math.random() * 40;
      const delay = Math.random() * 0.5;
      const duration = 2 + Math.random() * 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 6 + Math.random() * 8;
      
      const radians = (angle * Math.PI) / 180;
      const startX = Math.cos(radians) * distance;
      const startY = Math.sin(radians) * distance;
      const driftX = (Math.random() - 0.5) * 150;
      const fallY = 200 + Math.random() * 100;
      const rotation = 360 + Math.random() * 360;
      
      pieces.push({
        id: i,
        angle,
        distance,
        delay,
        duration,
        color,
        shape,
        size,
        startX,
        startY,
        endX: startX + driftX,
        endY: startY + fallY,
        rotation
      });
    }
    
    return pieces;
  }, []);

  // Crear animaciones CSS dinámicas
  useEffect(() => {
    if (!showConfetti) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'confetti-animations-scale';
    
    const keyframes = confettiPieces.map((piece) => `
      @keyframes confettiFallScale${piece.id} {
        0% {
          opacity: 1;
          transform: translate(${piece.startX}px, ${piece.startY}px) rotate(0deg) scale(1);
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translate(${piece.endX}px, ${piece.endY}px) rotate(${piece.rotation}deg) scale(0);
        }
      }
    `).join('\n');
    
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    
    return () => {
      const existing = document.getElementById('confetti-animations-scale');
      if (existing) existing.remove();
    };
  }, [showConfetti, confettiPieces]);

  const roadmapSteps = [
    {
      status: "completed",
      title: "Pago Confirmado",
      description: "Tu suscripción está activa",
      icon: CheckCircle
    },
    {
      status: "current",
      title: "Completar Perfil",
      description: "Acción requerida: 3-4 minutos",
      icon: Clock
    },
    {
      status: "upcoming",
      title: "Closer Asignado",
      description: "Próximamente en <24h",
      icon: Rocket
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section - Celebration */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#4aab6f] to-[#6bbf8a] overflow-hidden">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Animation with Confetti */}
            <div className="mb-8 relative" style={{ minHeight: '200px' }}>
              {/* Confetti Container */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
                  {confettiPieces.map((piece) => (
                    <div
                      key={piece.id}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: `${piece.size}px`,
                        height: `${piece.size}px`,
                        backgroundColor: piece.color,
                        borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'triangle' ? '0' : '2px',
                        clipPath: piece.shape === 'triangle' 
                          ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                          : 'none',
                        transform: `translate(${piece.startX}px, ${piece.startY}px)`,
                        animation: `confettiFallScale${piece.id} ${piece.duration}s ease-out ${piece.delay}s forwards`,
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Main Icon - Colores invertidos */}
              <div className={`relative z-10 w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${showConfetti ? 'scale-110 animate-bounce-subtle' : 'scale-100'}`}>
                <Rocket className="w-10 h-10 text-[#4aab6f]" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              ¡Suscripción Activada con Éxito!
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-2 max-w-3xl mx-auto font-medium">
              Tu garantía de ventas y acceso a la plataforma están asegurados.
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              Es hora de desplegar tu fuerza de ventas.
            </p>

            {/* Minimal Purchase Summary */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-12 border border-white/30">
              <CheckCircle className="w-4 h-4 text-white" />
              <span>Plan Scale • $2,300 MXN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#003976] mb-3">
                  Ver este video antes de continuar
                </h2>
                <p className="text-gray-600">
                  Es importante que veas este contenido para entender cómo funciona el proceso
                </p>
              </div>
              
              {/* Video Container - Vimeo (Mitad del tamaño actual) */}
              <div className="max-w-sm mx-auto">
                <div style={{ padding: '177.71% 0 0 0', position: 'relative' }}>
                  <iframe
                    src="https://player.vimeo.com/video/1141958981?badge=0&autopause=0&player_id=0&app_id=58479&controls=1&title=0&byline=0&portrait=0&transparent=0&autoplay=0"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="Closwork- Revolutionizing LATAM Sales with Seamless WhatsApp Integration"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical CTA Section - The Mission Card */}
      <section className="py-8 bg-gradient-to-br from-[#003976] via-[#003976] to-[#1a4a7a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4aab6f] rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4aab6f]/10 rounded-full mb-6">
                <Zap className="w-4 h-4 text-[#4aab6f]" />
                <span className="text-sm font-semibold text-[#4aab6f] uppercase tracking-wide">Paso Final Crítico</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#003976] mb-4">
                Activa tu Asignación
              </h2>

              {/* Body */}
              <p className="text-lg text-gray-700 mb-2 leading-relaxed">
                Tenemos closers en espera. Para conectarte con el experto en tu nicho, necesitamos entender qué vendes.
              </p>
              <p className="text-base text-gray-600 mb-8">
                El reloj de 24h empieza cuando completes esto.
              </p>

              {/* Main CTA Button - WhatsApp sin mensaje precargado */}
              <a
                href="https://wa.me/523112403145"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#003976] to-[#1a4a7a] hover:from-[#1a4a7a] hover:to-[#003976] text-white text-lg font-semibold py-6 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  Completar Ficha Técnica de la Oferta
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <p className="text-sm text-gray-500 text-center mt-4">
                Toma aproximadamente 3-4 minutos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Visual */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#003976] text-center mb-12">
              Lo que sigue
            </h3>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4aab6f] to-[#003976] w-1/3"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {roadmapSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = step.status === "completed";
                  const isCurrent = step.status === "current";
                  const isUpcoming = step.status === "upcoming";

                  return (
                    <div key={index} className="relative">
                      <div className={`text-center ${isCurrent ? 'scale-105' : ''} transition-transform duration-300`}>
                        {/* Icon */}
                        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                          isCompleted 
                            ? 'bg-gradient-to-br from-[#4aab6f] to-[#6bbf8a] shadow-lg' 
                            : isCurrent
                            ? 'bg-gradient-to-br from-[#003976] to-[#1a4a7a] shadow-xl ring-4 ring-[#003976]/20'
                            : 'bg-gray-200'
                        }`}>
                          <StepIcon className={`w-10 h-10 ${
                            isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                          }`} />
                        </div>

                        {/* Status Badge */}
                        <div className="mb-3">
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#4aab6f]/10 text-[#4aab6f] rounded-full text-sm font-semibold">
                              <CheckCircle className="w-3 h-3" />
                              Completado
                            </span>
                          )}
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#003976]/10 text-[#003976] rounded-full text-sm font-semibold">
                              <Clock className="w-3 h-3" />
                              En progreso
                            </span>
                          )}
                          {isUpcoming && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-semibold">
                              Próximamente
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className={`text-lg font-bold mb-2 ${
                          isCurrent ? 'text-[#003976]' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </h4>

                        {/* Description */}
                        <p className={`text-sm ${
                          isCurrent ? 'text-gray-700 font-medium' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Summary */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-[#4aab6f]" />
                <span className="font-medium">Pago recibido</span>
                <span className="text-gray-400">→</span>
                <Clock className="w-4 h-4 text-[#003976]" />
                <span className="font-medium">Tú: Completas ficha</span>
                <span className="text-gray-400">→</span>
                <Rocket className="w-4 h-4 text-[#4aab6f]" />
                <span className="font-medium">Nosotros: Te presentamos a tu Closer (Mañana)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-4">
              ¿Dudas? Tu soporte prioritario de WhatsApp ya está activo.
            </p>
            <a
              href="https://wa.me/523112403145?text=Hola, acabo de completar mi compra y tengo una pregunta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GraciasPlanScale;


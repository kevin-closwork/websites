import { CheckCircle, Clock, Users, MessageCircle, Calendar, ArrowRight, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const GraciasPlanBasico = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Contacto del equipo",
      description: "Alguien de nuestro equipo te contactará en las próximas 24 horas para agendar tu sesión de onboarding.",
      time: "24 horas"
    },
    {
      icon: Calendar,
      title: "Sesión de onboarding",
      description: "Agendaremos tu sesión de onboarding para entender tu negocio y configurar tu estrategia de ventas.",
      time: "48-72 horas"
    },
    {
      icon: Users,
      title: "Asignación de socio",
      description: "Te conectaremos con tu socio comercial especializado en tu tipo de producto/servicio.",
      time: "Después del onboarding"
    },
    {
      icon: Zap,
      title: "Inicio de operaciones",
      description: "Comenzamos a trabajar en tu estrategia de ventas y generación de leads.",
      time: "Máximo 7 días después del onboarding"
    }
  ];

  const contactInfo = [
    {
      name: "Kevin - CEO & Founder",
      role: "Estrategia y coordinación general",
      email: "kevin@closwork.com"
    },
    {
      name: "Equipo de Onboarding",
      role: "Configuración y sesión de onboarding",
      phone: "+52 311 240 3145",
      email: "hola@closwork.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003976] via-[#003976] to-[#4aab6f]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center animate-bounce-subtle">
                <CheckCircle className="w-12 h-12 text-[#4aab6f]" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              ¡Compra exitosa! 🎉
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Gracias por confiar en Closwork. Tu Plan Básico está activado y nuestro equipo ya está trabajando para ti.
            </p>

            {/* Plan Summary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Resumen de tu compra</h2>
              <div className="text-white/90 space-y-2">
                <div className="flex justify-between">
                  <span>Plan Básico</span>
                  <span className="font-semibold">$899</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Precio original</span>
                  <span className="line-through">$1200</span>
                </div>
                <div className="border-t border-white/20 pt-2 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total pagado</span>
                    <span>$899</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003976] mb-6">
                Próximos pasos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para agendar tu sesión de onboarding y comenzar a trabajar en tu estrategia de ventas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#4aab6f] to-[#003976] transform translate-x-4 z-0"></div>
                  )}
                  
                  <div className="relative z-10 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4aab6f] to-[#6bbf8a] rounded-xl flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#003976] mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                    <div className="flex items-center gap-2 text-sm text-[#4aab6f] font-semibold">
                      <Clock className="w-4 h-4" />
                      {step.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003976] mb-6">
                Tu equipo de contacto
              </h2>
              <p className="text-xl text-gray-600">
                Estas son las personas que te acompañarán en todo el proceso
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactInfo.map((contact, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4aab6f] to-[#6bbf8a] rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#003976]">{contact.name}</h3>
                      <p className="text-gray-600">{contact.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {contact.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#4aab6f]/10 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-[#4aab6f]" />
                        </div>
                        <a 
                          href={`tel:${contact.phone}`}
                          className="text-[#003976] hover:text-[#4aab6f] transition-colors font-semibold"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#4aab6f]/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-[#4aab6f]" />
                      </div>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-[#003976] hover:text-[#4aab6f] transition-colors font-semibold"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003976] mb-6">
                ¿Qué incluye tu Plan Básico?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#4aab6f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#003976] mb-2">1 Socio Comercial Especializado</h3>
                    <p className="text-gray-600">Te conectamos con un closer validado y especializado en tu industria.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#4aab6f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#003976] mb-2">1 Tipo de Producto/Servicio</h3>
                    <p className="text-gray-600">Enfocamos todos los esfuerzos en tu producto o servicio principal.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#4aab6f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#003976] mb-2">Garantía de Cambio</h3>
                    <p className="text-gray-600">Si no estás satisfecho, puedes cambiar de socio comercial una vez.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#4aab6f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#003976] mb-2">Sesión de Onboarding Incluida</h3>
                    <p className="text-gray-600">Sesión completa de onboarding para entender tu negocio y configurar tu estrategia de ventas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#003976] to-[#4aab6f] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte. No dudes en contactarnos en cualquier momento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+523112403145"
                className="inline-flex items-center px-8 py-4 bg-white text-[#003976] font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Llamar Ahora
              </a>
              <a
                href="mailto:kevin@closwork.com"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-[#003976] transition-all duration-300 hover:scale-105 group"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Enviar Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GraciasPlanBasico;

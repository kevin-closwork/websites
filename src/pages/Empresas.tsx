import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pixelEvents } from "@/lib/pixelEvents";
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Clock,
  Shield,
  BarChart3,
  Star,
  Play,
  Quote,
  Zap,
  Award,
  Globe
} from "lucide-react";

const Empresas = () => {
  // Track page view
  useEffect(() => {
    pixelEvents.viewContent('Empresas Page', 'landing');
  }, []);

  return (
    <>
      <Helmet>
        <title>Closers On Demand para Empresas | Cierra Más Ventas con Expertos</title>
        <meta name="description" content="Conecta con closers expertos que cierran ventas por ti. Aumenta tu conversión hasta 300% con nuestro equipo de especialistas en ventas B2B." />
        <meta name="keywords" content="closers, ventas, B2B, empresas, conversión, sales, closers on demand" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Closers On Demand para Empresas | Cierra Más Ventas" />
        <meta property="og:description" content="Conecta con closers expertos que cierran ventas por ti. Aumenta tu conversión hasta 300% con nuestro equipo de especialistas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://closwork.com/empresas" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Closers On Demand para Empresas" />
        <meta name="twitter:description" content="Conecta con closers expertos que cierran ventas por ti. Aumenta tu conversión hasta 300%." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        {/* Hero Section - Hook */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <Badge className="mb-6 bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
                🚀 +500 Empresas ya confían en nosotros
              </Badge>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Tu equipo de ventas está
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}perdiendo oportunidades{" "}
                </span>
                que deberían cerrar?
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Conectamos tu empresa con <strong>closers expertos</strong> que convierten 
                leads cualificados en ventas cerradas. <strong>Sin contratar, sin entrenar, sin riesgos.</strong>
              </p>
              
              {/* Video Section */}
              <div className="mb-12">
                <div className="relative max-w-4xl mx-auto">
                  <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Video Placeholder/Player */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                          <Play className="w-8 h-8 ml-1" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Ver Demo en 40 segundos</h3>
                        <p className="text-lg opacity-90">Descubre cómo funciona Closwork</p>
                      </div>
                    </div>
                    
                    {/* Video Overlay with Play Button */}
                    <button 
                      className="absolute inset-0 flex items-center justify-center group hover:bg-black/20 transition-all duration-300"
                      onClick={() => pixelEvents.viewContent('Demo Video Play', 'video')}
                    >
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </div>
                    </button>
                    
                    {/* Video Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      40 seg
                    </div>
                  </div>
                  
                  {/* Video Description */}
                  <div className="mt-6 text-center">
                    <p className="text-lg text-gray-600 mb-4">
                      <strong>En solo 40 segundos</strong> verás cómo nuestros closers expertos 
                      pueden transformar tu pipeline de ventas
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Sin descarga requerida</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Demo en vivo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Resultados reales</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => pixelEvents.viewContent('Demo Request', 'cta')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo en 2 Minutos
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg font-semibold"
                  onClick={() => pixelEvents.contact('Expert Consultation')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Hablar con un Experto
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>4.9/5 en Google Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Garantía de 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>+15 países</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12">
                ¿Te suena familiar esta situación?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="p-8 border-red-100 bg-red-50/50">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Leads calificados que no se convierten
                        </h3>
                        <p className="text-gray-600">
                          Tienes leads de calidad, pero tu equipo no logra cerrar. 
                          Cada lead perdido es dinero que se va por el drenaje.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-8 border-orange-100 bg-orange-50/50">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Tiempo perdido en entrenamiento
                        </h3>
                        <p className="text-gray-600">
                          Meses entrenando vendedores que al final no rinden. 
                          El costo de oportunidad es enorme.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-8 border-yellow-100 bg-yellow-50/50">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Costos fijos altos
                        </h3>
                        <p className="text-gray-600">
                          Salarios, comisiones, beneficios... El equipo de ventas 
                          es uno de los costos más altos de tu empresa.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-8 border-purple-100 bg-purple-50/50">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Crecimiento estancado
                        </h3>
                        <p className="text-gray-600">
                          Necesitas escalar ventas pero no sabes cómo. 
                          Cada mes que pasa es un mes perdido de crecimiento.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900 mb-4">
                  Si esto te resuena, <span className="text-red-600">no estás solo</span>
                </p>
                <p className="text-lg text-gray-600">
                  El 73% de las empresas B2B reportan dificultades para cerrar ventas efectivamente
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Aquí está la solución que cambió todo
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                <strong>Closers On Demand</strong> conecta tu empresa con closers expertos 
                que cierran ventas por ti. Sin contratar, sin entrenar, sin riesgos.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Card className="p-8 bg-white shadow-lg">
                  <CardContent className="p-0 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Implementación en 48 horas
                    </h3>
                    <p className="text-gray-600">
                      Tu equipo de closers expertos listo para trabajar en menos de 2 días
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-8 bg-white shadow-lg">
                  <CardContent className="p-0 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Aumento del 300% en conversión
                    </h3>
                    <p className="text-gray-600">
                      Nuestros closers convierten 3x más que vendedores promedio
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-8 bg-white shadow-lg">
                  <CardContent className="p-0 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Sin riesgos, solo resultados
                    </h3>
                    <p className="text-gray-600">
                      Pagas solo por ventas cerradas. Garantía de 30 días
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12">
                Empresas que ya están cerrando más ventas
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <Card className="p-6 bg-gray-50">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">TechStart Inc.</h4>
                        <p className="text-sm text-gray-600">SaaS B2B</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-gray-400 mb-3" />
                    <p className="text-gray-700 italic mb-4">
                      "Aumentamos nuestras ventas un 250% en 3 meses. 
                      Los closers de Closwork son increíbles."
                    </p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-6 bg-gray-50">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">GrowthCo</h4>
                        <p className="text-sm text-gray-600">Consultoría</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-gray-400 mb-3" />
                    <p className="text-gray-700 italic mb-4">
                      "Por fin tenemos un equipo de ventas que realmente cierra. 
                      ROI del 400% en el primer mes."
                    </p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-6 bg-gray-50">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">ScaleUp Solutions</h4>
                        <p className="text-sm text-gray-600">Software</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-gray-400 mb-3" />
                    <p className="text-gray-700 italic mb-4">
                      "El mejor ROI que hemos tenido. Nuestros closers 
                      entienden perfectamente nuestro producto."
                    </p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-6">
                  <strong>+500 empresas</strong> ya confían en nosotros para cerrar más ventas
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>98% de satisfacción</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Promedio 300% más ventas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Garantía de 30 días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                ¿Listo para cerrar más ventas?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Únete a las 500+ empresas que ya están cerrando más ventas con nuestros closers expertos
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  onClick={() => pixelEvents.viewContent('Free Demo Request', 'cta')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo Gratis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                  onClick={() => pixelEvents.contact('Expert Consultation - CTA')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Hablar con Experto
                </Button>
              </div>
              
              <p className="text-sm opacity-75">
                Sin compromisos • Demo en 2 minutos • Garantía de 30 días
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Empresas;

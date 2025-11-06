import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
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
  Globe,
  Phone,
  Mail,
  Calendar,
  ArrowDown,
  Check,
  X,
  ExternalLink
} from "lucide-react";

const EmpresasV2 = () => {
  // Track page view and additional content views
  useEffect(() => {
    pixelEvents.viewContent('Empresas V2 Page', 'landing');
    
    // Track specific content sections
    const trackContentSections = () => {
      pixelEvents.viewContent('Empresas V2 - Hero Section', 'hero');
      pixelEvents.viewContent('Empresas V2 - Problem Section', 'problems');
      pixelEvents.viewContent('Empresas V2 - Solution Section', 'solution');
      pixelEvents.viewContent('Empresas V2 - Beta Directory Section', 'directory');
      pixelEvents.viewContent('Empresas V2 - CTA Section', 'cta');
    };
    
    // Track content sections after a short delay to ensure they're visible
    setTimeout(trackContentSections, 1000);
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
        <meta property="og:url" content="https://closwork.com/empresas-v2" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Closers On Demand para Empresas" />
        <meta name="twitter:description" content="Conecta con closers expertos que cierran ventas por ti. Aumenta tu conversión hasta 300%." />
        
        {/* Meta Pixel Code for Empresas V2 */}
        <script>
          {`
            // Use the main pixel instead of duplicate
            if (typeof fbq !== 'undefined') {
              fbq('track', 'ViewContent', {
                content_name: 'Empresas V2 Page',
                content_category: 'Company Landing'
              });
            }
          `}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section - Hook */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start lg:items-center">
                {/* Left Column - Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Badge className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-6 py-3 text-sm font-bold shadow-lg">
                      🚀 Startups en LATAM ya están vendiendo con nosotros
                    </Badge>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Cierra <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      3x más ventas
                    </span> con closers expertos
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-gray-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Conectamos tu empresa con <strong>closers especializados</strong> que convierten 
                    leads cualificados en ventas cerradas. <strong>Paga solo cuando vendas. Sin contratar, sin riesgos.</strong>
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-5 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                      onClick={() => {
                        // Track multiple events for comprehensive analytics
                        pixelEvents.lead('Empresa Registration - Hero CTA', 0);
                        pixelEvents.initiateCheckout('Empresa Registration - Beta Directory', 0);
                        pixelEvents.submitApplication('Empresa Registration - Beta Directory');
                        window.location.href = '/solicitud?plan=Directorio%20Beta';
                      }}
                    >
                      <Calendar className="w-6 h-6 mr-3" />
                      Registra tu empresa gratis
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="px-8 py-4 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => {
                        // Track contact event with additional context
                        pixelEvents.contact('WhatsApp Contact - Hero Section');
                        pixelEvents.lead('WhatsApp Contact - Empresas V2 Hero', 0);
                        window.open('https://wa.me/523112403145?text=Hola, me interesa conocer más sobre los planes de Closers On Demand para mi empresa', '_blank');
                      }}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contactar
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Implementación en 7 días</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Garantía 30 días</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Sin compromisos</span>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Right Column - Visual */}
                <motion.div 
                  className="relative z-10 flex justify-end"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  <motion.div 
                    className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 max-w-md mx-auto lg:mx-0 lg:ml-auto"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <motion.div 
                        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Resultados Reales</h3>
                      <p className="text-gray-600">Empresas que ya escalaron sus ventas</p>
                    </motion.div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div>
                          <p className="font-semibold text-gray-900">Perspectiva Data</p>
                          <p className="text-sm text-gray-600">Servicios de Nubes Privadas</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">4 nuevas ventas</p>
                          <p className="text-sm text-gray-600">este mes</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Tu equipo de ventas está perdiendo oportunidades?
              </h2>
              <p className="text-xl text-gray-600">
                El 73% de las empresas B2B reportan dificultades para cerrar ventas efectivamente
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center border-red-100 bg-white h-full">
                  <CardContent className="p-0">
                    <motion.div 
                      className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Target className="w-8 h-8 text-red-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Leads que no se convierten
                    </h3>
                    <p className="text-gray-600">
                      Tienes leads de calidad, pero tu equipo no logra cerrar. 
                      Cada lead perdido es dinero que se va por el drenaje.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center border-orange-100 bg-white h-full">
                  <CardContent className="p-0">
                    <motion.div 
                      className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Clock className="w-8 h-8 text-orange-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Tiempo perdido en entrenamiento
                    </h3>
                    <p className="text-gray-600">
                      Meses entrenando vendedores que al final no rinden. 
                      El costo de oportunidad es enorme.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center border-yellow-100 bg-white h-full">
                  <CardContent className="p-0">
                    <motion.div 
                      className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DollarSign className="w-8 h-8 text-yellow-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Costos fijos altos
                    </h3>
                    <p className="text-gray-600">
                      Salarios, comisiones, beneficios... El equipo de ventas 
                      es uno de los costos más altos de tu empresa.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  La solución que cambió todo
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  <strong>Closers On Demand</strong> conecta tu empresa con closers expertos 
                  que cierran ventas por ti. Sin contratar, sin entrenar, sin riesgos.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    ¿Cómo funciona?
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Conectamos con tu empresa</h4>
                        <p className="text-gray-600">Entendemos tu producto, mercado y objetivos de ventas en una llamada de 30 minutos.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Asignamos closers expertos</h4>
                        <p className="text-gray-600">Seleccionamos los mejores closers especializados en tu industria y tipo de producto.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Comenzamos a cerrar ventas</h4>
                        <p className="text-gray-600">Tus closers expertos trabajan con tus leads y cierran ventas desde el primer día.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Pagas solo por resultados</h4>
                        <p className="text-gray-600">Solo pagas cuando se cierran ventas. Sin costos fijos, sin riesgos.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Beneficios Clave
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Implementación en 7 días</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Aumento del 300% en conversión</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Sin costos fijos ni riesgos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Closers especializados en tu industria</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Reportes semanales de performance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Garantía de 30 días</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Beta Directory Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Star className="w-4 h-4" />
                  <span>Conecta tu empresa</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Registra tu empresa gratis en <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Closwork
                  </span> y comienza a trabajar con los mejores cerradores
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Únete a nuestro <strong>directorio exclusivo</strong> donde los mejores closers 
                  pueden descubrir y recomendar tu empresa a sus clientes.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                {/* Left Column - Benefits */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">
                    ¿Por qué elegir Closwork?
                  </h3>
                  
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-purple-100"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
                      onHoverStart={() => pixelEvents.viewContent('Empresas V2 - Visibilidad Premium Benefit', 'benefit')}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Visibilidad Premium</h4>
                        <p className="text-gray-600 text-sm">
                          Tu empresa aparecerá en nuestro directorio donde los closers expertos buscan empresas para recomendar.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-purple-100"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
                      onHoverStart={() => pixelEvents.viewContent('Empresas V2 - Recomendaciones Orgánicas Benefit', 'benefit')}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Recomendaciones Orgánicas</h4>
                        <p className="text-gray-600 text-sm">
                          Los closers podrán recomendar tu empresa cuando sea la mejor opción para sus clientes.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-purple-100"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
                      onHoverStart={() => pixelEvents.viewContent('Empresas V2 - Credibilidad Validada Benefit', 'benefit')}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Credibilidad Validada</h4>
                        <p className="text-gray-600 text-sm">
                          Al estar en nuestro directorio, tu empresa gana credibilidad y confianza ante potenciales clientes.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-purple-100"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
                      onHoverStart={() => pixelEvents.viewContent('Empresas V2 - Acceso Prioritario Benefit', 'benefit')}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Acceso Prioritario</h4>
                        <p className="text-gray-600 text-sm">
                          Recibe notificaciones cuando closers busquen empresas como la tuya para proyectos específicos.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right Column - Visual & CTA */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
                    <div className="text-center mb-8">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Globe className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Únete a la transformación de ventas
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Únete a las primeras empresas en nuestro directorio exclusivo que podrán colaborar con los mejores cerradores de latam
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">Registro completamente gratuito</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">Perfil de empresa destacado</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">Notificaciones de oportunidades</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">Acceso a closers especializados</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                      onClick={() => {
                        // Track comprehensive events for directory registration
                        pixelEvents.lead('Empresa Registration - Directory Card', 0);
                        pixelEvents.initiateCheckout('Empresa Registration - Directory Card', 0);
                        pixelEvents.submitApplication('Empresa Registration - Directory Card');
                        pixelEvents.startTrial('Empresa Registration - Beta Directory', 0);
                        window.location.href = '/solicitud?plan=Directorio Beta';
                      }}
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Registra tu empresa gratis
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      * Solo para empresas validadas. Proceso de aprobación de 24-48 horas.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Stats Section */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Únete a la revolución de las ventas B2B
                  </h3>
                  <p className="text-gray-600">
                    Donde los closers expertos conectan empresas con clientes perfectos
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onHoverStart={() => pixelEvents.viewContent('Empresas V2 - Stats - 50+ Empresas', 'stats')}
                  >
                    <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-gray-600">Empresas ya registradas</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onHoverStart={() => pixelEvents.viewContent('Empresas V2 - Stats - 200+ Closers', 'stats')}
                  >
                    <div className="text-3xl font-bold text-indigo-600 mb-2">200+</div>
                    <div className="text-gray-600">Closers expertos activos</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onHoverStart={() => pixelEvents.viewContent('Empresas V2 - Stats - 95% Satisfacción', 'stats')}
                  >
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-gray-600">Tasa de satisfacción</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para cerrar más ventas?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Únete a las 500+ empresas que ya están cerrando más ventas con nuestros closers expertos
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-5 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  onClick={() => {
                    // Track final conversion events
                    pixelEvents.lead('Empresa Registration - Final CTA', 0);
                    pixelEvents.initiateCheckout('Empresa Registration - Final CTA', 0);
                    pixelEvents.submitApplication('Empresa Registration - Final CTA');
                    pixelEvents.completeRegistration('Empresa Registration - Final CTA');
                    window.location.href = '/solicitud?plan=Directorio%20Beta';
                  }}
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  Registra tu empresa gratis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold bg-transparent"
                  onClick={() => {
                    // Track final contact events
                    pixelEvents.contact('WhatsApp Contact - Final CTA');
                    pixelEvents.lead('WhatsApp Contact - Final CTA', 0);
                    pixelEvents.schedule('WhatsApp Contact - Final CTA');
                    window.open('https://wa.me/523112403145?text=Hola, me interesa conocer más sobre los planes de Closers On Demand para mi empresa', '_blank');
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contactar
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sin compromisos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Garantía de 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Implementación en 7 días</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950">
          <div className="container py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-xl font-bold text-zinc-100">Closwork</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-zinc-100">Sobre Nosotros</h3>
                <p className="leading-relaxed max-w-md text-zinc-50">
                  Closwork es una plataforma innovadora diseñada para revolucionar las ventas B2B, 
                  ofreciendo herramientas avanzadas y soluciones personalizadas.
                </p>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-zinc-50">Contacto</h3>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">📧</span>
                    <a href="mailto:hola@closwork.com" className="hover:text-primary transition-colors">
                      hola@closwork.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">📞</span>
                    <a href="tel:+523112403145" className="hover:text-primary transition-colors">
                      +52 3112403145
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">📍</span>
                    <span className="text-slate-50">Guadalajara, Jal.</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-zinc-50">Enlaces Rápidos</h3>
                <div className="space-y-2">
                  <a href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                    Inicio
                  </a>
                  <a href="#caracteristicas" className="block text-muted-foreground hover:text-primary transition-colors">
                    Características
                  </a>
                  <a href="/calculadora" className="block text-muted-foreground hover:text-primary transition-colors">
                    Precios
                  </a>
                  <a href="mailto:hola@closwork.com" className="block text-muted-foreground hover:text-primary transition-colors">
                    Contacto
                  </a>
                  <a href="/solicitud" className="block text-muted-foreground hover:text-primary transition-colors">
                    Registro
                  </a>
                  <a href="/terminos-condiciones" className="block text-muted-foreground hover:text-primary transition-colors">
                    Términos y Condiciones
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2024 Closwork. Todos los derechos reservados.
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <p className="text-sm text-muted-foreground italic">
                    "A veces, las ideas más revolucionarias nacen de la pregunta más simple: ¿Y si existiera un botón?"
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href="/terminos-condiciones" className="hover:text-primary transition-colors">
                      Términos y Condiciones
                    </a>
                    <span>•</span>
                    <a href="mailto:privacidad@closwork.com" className="hover:text-primary transition-colors">
                      Privacidad
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default EmpresasV2;

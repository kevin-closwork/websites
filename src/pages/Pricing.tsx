import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import PricingSection from "@/components/landing/PricingSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { pixelEvents } from "@/lib/pixelEvents";

const Pricing = () => {
  // Track page view
  useEffect(() => {
    pixelEvents.viewContent('Pricing Page', 'pricing');
  }, []);

  return (
    <>
      <Helmet>
        <title>Precios - Closwork | Planes de Closers Validados</title>
        <meta 
          name="description" 
          content="Planes de pricing flexibles para closers validados. Desde validación sin riesgo hasta expansión regional. Solo pagas por resultados." 
        />
        <meta property="og:title" content="Precios - Closwork" />
        <meta property="og:description" content="Planes de pricing flexibles para closers validados. Solo pagas por resultados." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="https://i.imgur.com/NgAumU4.png" 
                  alt="Closwork" 
                  className="h-8 w-auto" 
                />
                <span className="font-bold text-xl">Closwork</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al inicio
                  </Button>
                </Link>
                <Link to="/solicitud?type=empresa">
                  <Button 
                    size="sm"
                    onClick={() => pixelEvents.lead('Pricing Header CTA', 0)}
                  >
                    Comenzar Ahora
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-brand/5 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Precios que se adaptan a tu
              <span className="text-brand bg-gradient-to-r from-brand to-brand/80 bg-clip-text text-transparent">
                {" "}crecimiento
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Desde validación sin riesgo hasta expansión regional. 
              Elige el plan que mejor se adapte a tu etapa de crecimiento.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-success-green/5 border border-success-green/20">
                <CheckCircle className="w-6 h-6 text-success-green flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold">Sin riesgo inicial</h3>
                  <p className="text-sm text-muted-foreground">Pagas solo cuando hay resultados</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-tech-blue/5 border border-tech-blue/20">
                <CheckCircle className="w-6 h-6 text-tech-blue flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold">Closers validados</h3>
                  <p className="text-sm text-muted-foreground">Especialistas en SaaS/B2B</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-brand/5 border border-brand/20">
                <CheckCircle className="w-6 h-6 text-brand flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold">Escalable</h3>
                  <p className="text-sm text-muted-foreground">Crece con tu empresa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Preguntas Frecuentes
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">¿Cuándo pago el fee inicial?</h3>
                    <p className="text-muted-foreground">
                      En el Plan Beta, pagas el fee de $450 USD después del primer cierre exitoso. 
                      En los planes Growth y Scale, el pago es mensual/anual según corresponda.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">¿Qué incluye el soporte de leads?</h3>
                    <p className="text-muted-foreground">
                      Incluye generación de leads cualificados usando Apollo, 
                      investigación de contactos y datos de contacto verificados.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">¿Puedo cambiar de plan?</h3>
                    <p className="text-muted-foreground">
                      Sí, puedes escalar o reducir tu plan en cualquier momento. 
                      Los cambios se reflejan en el siguiente ciclo de facturación.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">¿Qué es el escrow de comisiones?</h3>
                    <p className="text-muted-foreground">
                      Un sistema de garantía donde las comisiones se mantienen en custodia 
                      hasta confirmar la satisfacción del cliente y el cierre exitoso.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">¿Hay garantía de resultados?</h3>
                    <p className="text-muted-foreground">
                      Ofrecemos garantía Beta: si en 30 días no hay tracción real, 
                      cambiamos el closer sin costo adicional.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">¿Cómo se miden los resultados?</h3>
                    <p className="text-muted-foreground">
                      A través de demos programadas, pipeline real generado y 
                      reportes semanales de performance con métricas claras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-brand to-brand/80">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para escalar tus ventas?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a las empresas que ya están cerrando más con closers validados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/solicitud?type=empresa">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-brand hover:bg-white/90"
                  onClick={() => pixelEvents.lead('Pricing Final CTA', 0)}
                >
                  Comenzar Ahora
                </Button>
              </Link>
              <Link to="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-brand"
                  onClick={() => pixelEvents.viewContent('Demo Request - Pricing', 'cta')}
                >
                  Ver Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;

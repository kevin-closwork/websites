import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, MessageCircle } from "lucide-react";
import Footer from "@/components/Footer";

const PagoCancelado = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Helmet>
        <title>Pago cancelado | Closwork</title>
        <meta name="description" content="Tu pago fue cancelado. Puedes intentar nuevamente o contactarnos para más información." />
        <link rel="canonical" href="/pago-cancelado" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Helmet>

      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancel Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pago cancelado
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            Tu pago fue cancelado. No te preocupes, puedes intentar nuevamente cuando estés listo.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-[#003976] hover:bg-[#003976]/90">
              <a href="/empresas">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Volver a planes
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:hola@closwork.com">
                <MessageCircle className="mr-2 w-5 h-5" />
                Contactar soporte
              </a>
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#003976] mb-4">
              ¿Necesitas ayuda?
            </h2>
            <p className="text-gray-600 mb-6">
              Si tienes problemas con el pago o necesitas más información sobre nuestros planes, nuestro equipo está aquí para ayudarte.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#4aab6f]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-[#4aab6f]" />
                </div>
                <h3 className="font-semibold text-[#003976] mb-2">Email</h3>
                <a 
                  href="mailto:hola@closwork.com"
                  className="text-[#4aab6f] hover:underline"
                >
                  hola@closwork.com
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#4aab6f]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-[#4aab6f]" />
                </div>
                <h3 className="font-semibold text-[#003976] mb-2">WhatsApp</h3>
                <a 
                  href="https://wa.me/523112403145"
                  className="text-[#4aab6f] hover:underline"
                >
                  +52 311 240 3145
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PagoCancelado;

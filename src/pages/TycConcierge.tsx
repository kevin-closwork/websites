import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import ConciergeTyCContent from "@/components/ConciergeTyCContent";
import { getStripeCheckoutUrl } from "@/lib/stripeConfig";

const FEATURES = [
  "Diagnóstico inicial de oferta y flujo de leads",
  "Match y colocación de un Closer certificado",
  "Supervisión activa y monitoreo de llamadas",
  "Garantía de reemplazo del Closer",
  "Punto de contacto único Cliente–Closer",
];

const TycConcierge = () => {
  const navigate = useNavigate();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleAcceptAndPay = () => {
    window.location.href = getStripeCheckoutUrl("planConcierge");
  };

  return (
    <div className="min-h-screen landing-page relative overflow-hidden">
      <Helmet>
        <title>Términos y Condiciones — Concierge | Closwork</title>
        <meta
          name="description"
          content="Acepta los términos y condiciones del servicio Concierge de Closwork antes de proceder al pago."
        />
        <link rel="canonical" href="/tyc-concierge" />
      </Helmet>

      <Navbar />
      <main className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal variant="fade-up">
            <Button
              variant="ghost"
              className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={1}>
            <Card className="mb-8">
              <CardHeader className="text-center pb-4">
                <Badge variant="outline" className="w-fit mx-auto mb-3 text-sm">
                  CONCIERGE
                </Badge>
                <CardTitle className="text-2xl sm:text-3xl">
                  Plan Concierge — $249 USD/mes
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Revisa y acepta los términos y condiciones antes de proceder al pago.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={2}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Términos y Condiciones del Servicio Closwork — Concierge
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  CLOSWORK — Kevin Daniel De Alba Méndez · Versión 1.0
                </p>
              </CardHeader>
              <CardContent>
                <ConciergeTyCContent onScrollToBottom={() => setHasScrolledToBottom(true)} />
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={3}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="text-lg px-10 gap-2"
                onClick={handleAcceptAndPay}
                disabled={!hasScrolledToBottom}
              >
                Acepto los términos — Proceder al pago
                <ExternalLink className="h-4 w-4" />
              </Button>
              {!hasScrolledToBottom && (
                <p className="text-sm text-amber-600 font-medium">
                  Desplázate hasta el final de los términos para habilitar el botón
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center max-w-md">
                Al hacer clic, confirmas que has leído y aceptas los Términos y Condiciones del plan
                Concierge. Serás redirigido a Stripe para completar el pago de forma segura.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TycConcierge;

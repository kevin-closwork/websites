import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import EmpresasTyCContent from "@/components/EmpresasTyCContent";

interface PlanConfig {
  name: string;
  badge: string;
  price: string;
  stripeUrl: string;
  features: string[];
}

const PLANS: Record<string, PlanConfig> = {
  basico: {
    name: "Starter",
    badge: "🎯 STARTER",
    price: "$899 MXN/mes",
    stripeUrl: "https://buy.stripe.com/5kQ8wO83791YfcT6R16Na05",
    features: [
      "1 socio comercial verificado activo",
      "Garantía extendida",
      "Garantía de satisfacción",
      "Sesión consultiva inicial (45 min)",
      "WhatsApp support",
    ],
  },
  growth: {
    name: "Growth",
    badge: "🚀 GROWTH",
    price: "$1,299 MXN/mes",
    stripeUrl: "https://buy.stripe.com/6oUaEWervfqm5CjgrB6Na0a",
    features: [
      "2 socios comerciales simultáneamente",
      "Garantía extendida",
      "Garantía de satisfacción",
      "1 sesión consultiva por mes",
      "Prioridad en asignación de socios",
      "WhatsApp support",
      "Acceso a eventos Closwork",
    ],
  },
  scale: {
    name: "Scale",
    badge: "💎 SCALE",
    price: "$1,999 MXN/mes",
    stripeUrl: "https://buy.stripe.com/5kQ8wO5UZ5PMc0H2AL6Na09",
    features: [
      "3 socios comerciales simultáneamente",
      "Garantía extendida",
      "Garantía de satisfacción",
      "Hasta 2 sesiones consultivas por mes",
      "Prioridad VIP: asignación en <48h",
      "WhatsApp support prioritario (<4h)",
      "Acceso a eventos Closwork",
    ],
  },
};

interface EmpresasTyCProps {
  planKey: "basico" | "growth" | "scale";
}

const EmpresasTyC = ({ planKey }: EmpresasTyCProps) => {
  const navigate = useNavigate();
  const plan = PLANS[planKey];

  const handleAcceptAndPay = () => {
    window.location.href = plan.stripeUrl;
  };

  return (
    <div className="min-h-screen landing-page relative overflow-hidden">
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
                  {plan.badge}
                </Badge>
                <CardTitle className="text-2xl sm:text-3xl">
                  Plan {plan.name} — {plan.price}
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Revisa y acepta los términos y condiciones antes de proceder al pago.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {plan.features.map((f, i) => (
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
                <CardTitle className="text-xl">Términos y Condiciones de Uso de los Servicios — Plan {plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">CLOSWORK - MIO MOBILE S.A. DE C.V.</p>
              </CardHeader>
              <CardContent>
                <EmpresasTyCContent />
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={3}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="text-lg px-10 gap-2"
                onClick={handleAcceptAndPay}
              >
                Acepto los términos — Proceder al pago
                <ExternalLink className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center max-w-md">
                Al hacer clic, confirmas que has leído y aceptas los Términos y Condiciones del plan {plan.name}.
                Serás redirigido a Stripe para completar el pago de forma segura.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmpresasTyC;

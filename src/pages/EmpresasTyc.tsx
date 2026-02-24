import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

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
    stripeUrl: "https://buy.stripe.com/PLACEHOLDER_SCALE_URL",
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
                <CardTitle className="text-xl">Términos y Condiciones — Plan {plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                <p>
                  Al contratar el plan <strong>{plan.name}</strong> de Closwork, el usuario (en adelante "La Empresa") acepta los
                  siguientes términos:
                </p>

                <h4 className="text-foreground font-semibold">1. Objeto del servicio</h4>
                <p>
                  Closwork proporcionará acceso a su plataforma de conexión entre empresas y socios comerciales (closers) verificados,
                  conforme a las características del plan seleccionado.
                </p>

                <h4 className="text-foreground font-semibold">2. Duración y facturación</h4>
                <p>
                  La suscripción tiene una duración mensual a partir de la fecha de pago. El cobro de <strong>{plan.price}</strong> se
                  realizará de forma recurrente salvo cancelación previa. La Empresa puede cancelar en cualquier momento; el acceso se
                  mantiene hasta el fin del periodo pagado.
                </p>

                <h4 className="text-foreground font-semibold">3. Garantía de satisfacción</h4>
                <p>
                  Si después de 3 meses La Empresa no está satisfecha con los resultados obtenidos, Closwork reembolsará la inversión
                  correspondiente al último mes cobrado, sujeto a evaluación del caso.
                </p>

                <h4 className="text-foreground font-semibold">4. Garantía extendida</h4>
                <p>
                  Si el socio comercial asignado no cumple con las expectativas de La Empresa, Closwork se compromete a realizar el
                  reemplazo correspondiente sin costo adicional dentro del periodo activo de suscripción.
                </p>

                <h4 className="text-foreground font-semibold">5. Responsabilidades de La Empresa</h4>
                <p>
                  La Empresa se compromete a proporcionar información veraz sobre sus productos/servicios, mantener comunicación activa
                  con los socios comerciales asignados y respetar las comisiones pactadas por resultados generados.
                </p>

                <h4 className="text-foreground font-semibold">6. Limitación de responsabilidad</h4>
                <p>
                  Closwork actúa como intermediario entre La Empresa y los socios comerciales. No garantiza un volumen específico de
                  ventas. Los resultados dependen de múltiples factores, incluyendo la oferta de La Empresa y las condiciones del
                  mercado.
                </p>

                <h4 className="text-foreground font-semibold">7. Privacidad y datos</h4>
                <p>
                  La información proporcionada por La Empresa será tratada conforme a nuestra Política de Privacidad. Los datos no
                  serán compartidos con terceros fuera del alcance del servicio contratado.
                </p>

                <h4 className="text-foreground font-semibold">8. Modificaciones</h4>
                <p>
                  Closwork se reserva el derecho de modificar estos términos con previo aviso de 30 días. El uso continuado del
                  servicio tras la notificación implica la aceptación de los nuevos términos.
                </p>

                <h4 className="text-foreground font-semibold">9. Jurisdicción</h4>
                <p>
                  Para cualquier controversia derivada de estos términos, las partes se someten a la jurisdicción de los tribunales de
                  Guadalajara, Jalisco, México.
                </p>
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

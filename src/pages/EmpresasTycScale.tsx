import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { addEmpresasTycData } from "@/lib/firestoreService";
import { getStripeCheckoutUrl } from "@/lib/stripeConfig";
import EmpresasTyCContent from "@/components/EmpresasTyCContent";

const EmpresasTycScale = () => {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [rfc, setRfc] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const title = "Términos y Condiciones - Plan Scale | Closwork";
  const description = "Acepta los términos y condiciones para contratar el Plan Scale en Closwork.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el nombre de la empresa.",
        variant: "destructive",
      });
      return;
    }

    if (!contactName.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el nombre del contacto.",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el correo electrónico.",
        variant: "destructive",
      });
      return;
    }

    if (!rfc.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el RFC de la empresa.",
        variant: "destructive",
      });
      return;
    }

    if (!accepted) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addEmpresasTycData({
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        rfc: rfc.trim(),
        accepted: true,
        acceptedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        plan: "planScale",
      });

      toast({
        title: "¡Éxito!",
        description: "Redirigiendo al proceso de pago...",
      });

      // Redirigir al link de Stripe del Plan Scale
      const stripeUrl = getStripeCheckoutUrl("planScale");
      window.location.href = stripeUrl;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/empresas-tyc-scale" />
        
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/empresas-tyc-scale" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/NgAumU4.png" alt="Closwork" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold">Closwork</span>
          </div>
          <a href="/">
            <Button variant="outline" size="sm">
              ← Volver al Inicio
            </Button>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
            <h2 className="text-2xl font-semibold text-muted-foreground">Plan Scale - Closwork para Empresas</h2>
            <div className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full">
              <p className="text-lg font-semibold text-white">$1,999 MXN /mes</p>
            </div>
            <p className="text-muted-foreground mt-4">
              <strong>MIO MOBILE S.A. DE C.V.</strong> | <strong>División Closwork</strong>
            </p>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Important Notice Banner */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg border-2 border-purple-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Paso Requerido Antes del Pago
                </h3>
                <p className="text-white/95 text-base leading-relaxed">
                  Para continuar con tu compra del <strong>Plan Scale</strong>, es necesario que leas y aceptes nuestros términos y condiciones de servicio. 
                  Este documento contiene información importante sobre tu suscripción, garantías, responsabilidades y derechos como cliente.
                </p>
                <p className="text-white/90 text-sm mt-3 font-medium">
                  ⚠️ Por favor, tómate unos minutos para revisar el contenido completo antes de proceder al pago.
                </p>
              </div>
            </div>
          </div>

          {/* Plan Highlight */}
          <Card className="mb-8 border-2 border-purple-600 bg-gradient-to-br from-purple-600/10 to-purple-800/10">
            <CardHeader>
              <CardTitle className="text-xl text-purple-600">Plan Scale - $1,999 MXN/mes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>3 socios comerciales simultáneamente</li>
                <li>Garantía extendida</li>
                <li>Garantía de satisfacción</li>
                <li>Auditoría de Ventas Mensual: Sesión consultiva con tus socios comerciales para buscar mejoras</li>
                <li>Prioridad VIP: Asignación de nuevos socios en &lt; 48 horas</li>
                <li>WhatsApp support prioritario (&lt;4h)</li>
                <li>Acceso a eventos Closwork</li>
              </ul>
            </CardContent>
          </Card>

          {/* Terms Content - Scrollable Container */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Términos y Condiciones de Uso de los Servicios</CardTitle>
              <p className="text-sm text-muted-foreground">CLOSWORK - MIO MOBILE S.A. DE C.V.</p>
            </CardHeader>
            <CardContent>
              <EmpresasTyCContent />
            </CardContent>
          </Card>

          {/* Acceptance Form */}
          <Card className="border-2 border-purple-600">
            <CardHeader>
              <CardTitle className="text-xl text-purple-600">Formulario de Aceptación - Plan Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ingresa el nombre de la empresa"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nombre del Contacto *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ingresa el nombre del contacto"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@empresa.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rfc">RFC de la Empresa *</Label>
                    <Input
                      id="rfc"
                      type="text"
                      value={rfc}
                      onChange={(e) => setRfc(e.target.value)}
                      placeholder="RFC123456789"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="accept"
                    checked={accepted}
                    onCheckedChange={(checked) => setAccepted(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="accept" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      ACEPTO LOS TÉRMINOS Y CONDICIONES *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Al marcar esta casilla, confirmo que he leído, comprendido y acepto todos los términos y condiciones establecidos en este documento, 
                      incluyendo el reconocimiento de que Closwork actúa únicamente como facilitador de conexión y que no se responsabiliza por la relación 
                      comercial posterior entre mi empresa y los Closers, así como todas las limitaciones de responsabilidad establecidas.
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white" 
                  size="lg"
                  disabled={isSubmitting || !companyName.trim() || !contactName.trim() || !email.trim() || !rfc.trim() || !accepted}
                >
                  {isSubmitting ? "Procesando..." : "ACEPTAR Y CONTINUAR AL PAGO"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Back to Home Button */}
          <div className="text-center mt-12">
            <a href="/">
              <Button size="lg" className="px-8" variant="outline">
                Volver al Inicio
              </Button>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50">
        <div className="container py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Closwork. Todos los derechos reservados.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <a href="/terminos-condiciones" className="hover:text-primary transition-colors">
                Términos y Condiciones
              </a>
              {' • '}
              <a href="mailto:hola@closwork.com" className="hover:text-primary transition-colors">
                Privacidad
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmpresasTycScale;


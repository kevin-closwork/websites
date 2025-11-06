import { Helmet } from "react-helmet-async";
import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyForm } from "@/components/forms/CompanyForm";
import { CloserForm } from "@/components/forms/CloserForm";
import { pixelEvents } from "@/lib/pixelEvents";

const Solicitud = () => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const email = params.get("email") || "";
  const success = params.get("success") === "1" || params.get("submitted") === "1";
  const selectedPlan = params.get("plan");
  const initialTab = params.get("type") === "closer" ? "closer" : "empresa";
  
  // Si viene con un plan seleccionado, es una empresa que vino desde la landing de empresas
  const isFromEmpresaPage = !!selectedPlan;

  // Track page view
  useEffect(() => {
    if (isFromEmpresaPage) {
      pixelEvents.viewContent('Company Registration Page', 'form');
    } else {
      pixelEvents.viewContent('Registration Page', 'form');
    }
  }, [isFromEmpresaPage]);

  // Track successful registration
  useEffect(() => {
    if (success) {
      console.log('🎉 REGISTRATION SUCCESS DETECTED');
      if (isFromEmpresaPage) {
        // Track multiple events for company registration success
        pixelEvents.lead('Company Registration Complete', 0);
        pixelEvents.completeRegistration('Company Registration Complete');
        pixelEvents.purchase('Company Registration Complete', 0, 'USD');
        console.log('✅ COMPANY REGISTRATION EVENTS SENT');
      } else {
        // Track events for closer registration success
        pixelEvents.lead('Closer Registration Complete', 0);
        pixelEvents.completeRegistration('Closer Registration Complete');
        console.log('✅ CLOSER REGISTRATION EVENTS SENT');
      }
    }
  }, [success, isFromEmpresaPage]);

  const share = async () => {
    const url = `${window.location.origin}/?ref=${encodeURIComponent(email || "vip")}`;
    const text = "Estoy activando el botón de ventas sin riesgo en Closwork. ¿Te unes?";
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ url, text, title: "Acceso VIP Closwork" });
        toast.success("Compartido — acceso VIP activado si 3 se registran");
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copiado. Consigue 3 registros para salto de fila ✨");
  };

  return (
    <div className="container py-16">
      <Helmet>
        <title>{success ? "Solicitud enviada | Closwork" : "Aplicar | Closwork"}</title>
        <meta name="description" content={success ? "Tu solicitud está siendo evaluada por closers verificados. Pronto tendrás tus primeros interesados." : "Aplica como empresa o closer en Closwork. Completa el formulario para acelerar tus ventas B2B sin riesgo."} />
        <link rel="canonical" href="/solicitud" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Meta Pixel Code for Directorio Beta Plan - Using main pixel */}
        {selectedPlan === 'Directorio Beta' && (
          <>
            <script>
              {`
                // Use the main pixel instead of duplicate
                if (typeof fbq !== 'undefined') {
                  fbq('track', 'ViewContent', {
                    content_name: 'Directorio Beta Registration',
                    content_category: 'Company Registration'
                  });
                }
              `}
            </script>
          </>
        )}
      </Helmet>

      {success ? (
        <div>
          <h1 className="text-3xl font-bold">Tu solicitud está siendo evaluada por 247 closers</h1>
          <p className="mt-2 text-muted-foreground">Los primeros 5 interesados llegarán en 24 horas.</p>
          <div className="mt-8">
            <Button 
              variant="success" 
              size="lg" 
              onClick={() => {
                pixelEvents.lead('VIP Access Share', 0);
                share();
              }}
            >
              Compartir para acceso VIP
            </Button>
          </div>
          <a href="/" className="block mt-6 story-link text-sm text-muted-foreground">Volver al inicio</a>
        </div>
      ) : (
        <section>
          <header className="mb-8">
            <h1 className="text-3xl font-bold">
              {isFromEmpresaPage ? "Registra tu empresa" : "Activa tu crecimiento"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isFromEmpresaPage 
                ? "Completa el formulario para unirte al directorio de empresas. Toma 2 minutos."
                : "Elige tu camino y completa el formulario. Toma 2 minutos."
              }
            </p>
          </header>

          {isFromEmpresaPage ? (
            // Si viene desde la página de empresas con plan, solo mostrar formulario de empresa
            <div className="mt-8">
              <CompanyForm />
            </div>
          ) : (
            // Si viene sin plan, mostrar las pestañas normales
            <Tabs defaultValue={initialTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="empresa">Empresas</TabsTrigger>
                <TabsTrigger value="closer">Closers</TabsTrigger>
              </TabsList>
              <div className="mt-8">
                <TabsContent value="empresa">
                  <CompanyForm />
                </TabsContent>
                <TabsContent value="closer">
                  <CloserForm />
                </TabsContent>
              </div>
            </Tabs>
          )}
        </section>
      )}
    </div>
  );
};

export default Solicitud;

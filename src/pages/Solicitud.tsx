import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyForm } from "@/components/forms/CompanyForm";
import { CloserForm } from "@/components/forms/CloserForm";

const Solicitud = () => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const email = params.get("email") || "";
  const success = params.get("success") === "1" || params.get("submitted") === "1";

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
      </Helmet>

      {success ? (
        <div>
          <h1 className="text-3xl font-bold">Tu solicitud está siendo evaluada por 247 closers</h1>
          <p className="mt-2 text-muted-foreground">Los primeros 5 interesados llegarán en 24 horas.</p>
          <div className="mt-8">
            <Button variant="hero" size="lg" onClick={share}>Compartir para acceso VIP</Button>
          </div>
          <a href="/" className="block mt-6 story-link text-sm text-muted-foreground">Volver al inicio</a>
        </div>
      ) : (
        <section>
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Activa tu crecimiento</h1>
            <p className="text-muted-foreground mt-1">Elige tu camino y completa el formulario. Toma 2 minutos.</p>
          </header>

          <Tabs defaultValue="empresa" className="w-full">
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
        </section>
      )}
    </div>
  );
};

export default Solicitud;

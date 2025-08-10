import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Solicitud = () => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const email = params.get("email") || "";

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
    <div className="container py-20">
      <Helmet>
        <title>Solicitud enviada | Closwork</title>
        <meta name="description" content="Tu solicitud está siendo evaluada por closers verificados. Pronto tendrás tus primeros interesados." />
        <link rel="canonical" href="/solicitud" />
      </Helmet>
      <h1 className="text-3xl font-bold">Tu solicitud está siendo evaluada por 247 closers</h1>
      <p className="mt-2 text-muted-foreground">Los primeros 5 interesados llegarán en 24 horas.</p>
      <div className="mt-8">
        <Button variant="hero" size="lg" onClick={share}>Compartir para acceso VIP</Button>
      </div>
      <a href="/" className="block mt-6 story-link text-sm text-muted-foreground">Volver al inicio</a>
    </div>
  );
};

export default Solicitud;

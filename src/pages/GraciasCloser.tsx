import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { pixelEvents } from "@/lib/pixelEvents";

const GraciasCloser = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  // Track successful registration completion
  useEffect(() => {
    pixelEvents.purchase('Closer Registration Complete', 0, 'USD');
  }, []);

  return (
    <div className="container py-16">
      <Helmet>
        <title>Bienvenido a la elite | Closwork</title>
        <meta name="description" content="Tu aplicación como closer ha sido recibida. Te contactaremos pronto para unirte a nuestra red de closers elite." />
        <link rel="canonical" href="/gracias-closer" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Helmet>

      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">
            ¡Bienvenido a la elite de Closwork!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Hemos recibido tu aplicación correctamente. Te enviaremos un correo de confirmación y nuestro equipo revisará tu perfil para conectarte con las mejores oportunidades.
          </p>
        </div>

        <div className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
          <h2 className="text-lg font-semibold">Tu próximo paso hacia el éxito</h2>
          <ul className="text-left space-y-2 text-muted-foreground">
            <li>• Evaluaremos tu perfil y experiencia</li>
            <li>• Te conectaremos con empresas que buscan tu expertise</li>
            <li>• Recibirás oportunidades exclusivas en tu industria</li>
            <li>• Gana comisiones competitivas por cada deal cerrado</li>
          </ul>
        </div>

        <div className="mt-8 space-y-4">
          <Button asChild variant="success" size="lg">
            <a href="/">Volver al inicio</a>
          </Button>
          <p className="text-sm text-muted-foreground">
            ¿Necesitas más información? Escríbenos a{" "}
            <a href="mailto:hola@closwork.com" className="text-primary hover:underline">
              hola@closwork.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GraciasCloser;
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { pixelEvents } from "@/lib/pixelEvents";

const GraciasEmpresa = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  // Track successful registration completion
  useEffect(() => {
    pixelEvents.purchase('Company Registration Complete', 0, 'USD');
  }, []);

  return (
    <div className="container py-16">
      <Helmet>
        <title>Gracias por registrarte | Closwork</title>
        <meta name="description" content="Tu registro en Closwork ha sido exitoso. Te contactaremos pronto para activar tu botón mágico de ventas." />
        <link rel="canonical" href="/gracias-empresa" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Helmet>

      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">
            Gracias por registrarte en Closwork
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Te enviaremos un correo de confirmación y uno de nuestros asesores se pondrá en contacto contigo en las próximas 24 horas para activar tu botón mágico de ventas.
          </p>
        </div>

        <div className="grid gap-4 p-6 rounded-xl border border-border bg-card/60 backdrop-blur">
          <h2 className="text-lg font-semibold">¿Qué sigue ahora?</h2>
          <ul className="text-left space-y-2 text-muted-foreground">
            <li>• Revisaremos tu perfil y necesidades</li>
            <li>• Te conectaremos con closers especializados en tu industria</li>
            <li>• Recibirás las primeras propuestas en máximo 48 horas</li>
            <li>• Solo pagas por resultados, sin riesgo inicial</li>
          </ul>
        </div>

        <div className="mt-8 space-y-4">
          <Button asChild variant="success" size="lg">
            <a href="/">Volver al inicio</a>
          </Button>
          <p className="text-sm text-muted-foreground">
            ¿Tienes preguntas? Escríbenos a{" "}
            <a href="mailto:hola@closwork.com" className="text-primary hover:underline">
              hola@closwork.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GraciasEmpresa;
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ContratarConfirmacion() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <>
      <Helmet>
        <title>Contratación confirmada — Closwork</title>
      </Helmet>
      <div className="min-h-screen landing-page flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 max-w-lg text-center">
          <h1 className="text-3xl font-bold text-secondary mb-4">¡Gracias!</h1>
          <p className="text-muted-foreground mb-6">
            Recibirás el Resumen de Contratación en las próximas 24 horas en el correo verificado,
            con los PDF del Contrato Marco y la Orden de Servicio adjuntos.
          </p>
          {sessionId ? (
            <p className="text-xs text-muted-foreground font-mono mb-6">Ref: {sessionId}</p>
          ) : null}
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </main>
        <Footer />
      </div>
    </>
  );
}

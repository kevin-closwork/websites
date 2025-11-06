import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página no encontrada | Closwork</title>
        <meta name="description" content="La página que buscas no existe. Regresa al inicio de Closwork." />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="text-8xl font-bold text-slate-300 mb-4">404</div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              ¡Ups! Página no encontrada
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              La página <code className="bg-slate-200 px-2 py-1 rounded">{location.pathname}</code> no existe.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                Volver al inicio
              </a>
            </Button>
            
            <Button variant="outline" asChild size="lg" className="w-full">
              <a href="/solicitud?type=empresa">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Aplicar como empresa
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

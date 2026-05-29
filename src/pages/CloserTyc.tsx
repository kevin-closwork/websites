import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { addCloserTycData } from "@/lib/firestoreService";
import EmpresasTyCContent from "@/components/EmpresasTyCContent";

const CloserTyc = () => {
  const [fullName, setFullName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const title = "Términos y Condiciones de Uso de los Servicios | Closwork";
  const description = "Acepta los términos y condiciones para participar como Vendedor en Closwork.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa tu nombre completo.",
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
      await addCloserTycData({
        fullName: fullName.trim(),
        accepted: true,
        acceptedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "¡Éxito!",
        description: "Has aceptado los términos y condiciones correctamente.",
      });

      setFullName("");
      setAccepted(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/closer-tyc" />
        
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/closer-tyc" />
      </Helmet>

      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold">Closwork</span>
          </div>
          <a href="/">
            <Button variant="outline" size="sm">
              ← Volver al Inicio
            </Button>
          </a>
        </div>
      </header>

      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Términos y Condiciones de Uso de los Servicios</h1>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl">Términos y Condiciones de Uso de los Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <EmpresasTyCContent />
            </CardContent>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Formulario de Aceptación</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ingresa tu nombre completo"
                    required
                    className="w-full"
                  />
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
                      Al marcar esta casilla, confirmo que he leído, comprendido y acepto todos los términos y condiciones establecidos en este documento.
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting || !fullName.trim() || !accepted}
                >
                  {isSubmitting ? "Procesando..." : "ACEPTAR TÉRMINOS Y CONDICIONES"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <a href="/">
              <Button size="lg" className="px-8" variant="outline">
                Volver al Inicio
              </Button>
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-secondary/50">
        <div className="container py-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
            <span className="text-sm text-muted-foreground">Acelerados en:</span>
            <a href="https://www.retozapopan.com.mx/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <img src="/logo-86bf1018.svg" alt="Reto Zapopan" className="h-12 sm:h-16 w-auto" />
            </a>
            <a href="https://emprelatam.com/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <img src="/emprelatam-logo.png" alt="Emprelatam" className="h-8 sm:h-10 w-auto" />
            </a>
          </div>
          <div className="text-center pt-8 border-t border-border">
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

export default CloserTyc;

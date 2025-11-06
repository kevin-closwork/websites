import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Hero from "@/components/landing/Hero";
import SocialTicker from "@/components/landing/SocialTicker";
import PainPoints from "@/components/landing/PainPoints";
import ModelComparison from "@/components/landing/ModelComparison";
import LiveMarketplace from "@/components/landing/LiveMarketplace";
import SimpleSteps from "@/components/landing/SimpleSteps";
import BenefitsSection from "@/components/landing/BenefitsSection";
import PackagesSection from "@/components/landing/PackagesSection";
import MinimalForm from "@/components/landing/MinimalForm";
import { Button } from "@/components/ui/button";
import { pixelEvents } from "@/lib/pixelEvents";
const Index = () => {
  const title = "Closwork: Ventas B2B sin riesgo (paga por cierre)";
  const description = "Activa ventas B2B sin nómina. Closers elite que cobran solo por resultados. Tu primer deal en 14 días.";
  
  // Track page view
  useEffect(() => {
    pixelEvents.viewContent('Homepage', 'landing');
  }, []);

  return <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Closwork",
          url: "/",
          description
        })}</script>
      </Helmet>

      <Hero />
      <SocialTicker />
      <main>
        <PainPoints />
        <ModelComparison />
        <LiveMarketplace />
        {/* Animación de matchmaking ya incluida en LiveMarketplace */}
        <SimpleSteps />
        <BenefitsSection />
        <PackagesSection />
        <section className="container py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">La decisión</h2>
              <p className="text-muted-foreground mt-1">Escoge lo que acelera tu crecimiento hoy.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/solicitud?type=empresa">
                <Button 
                  variant="success" 
                  size="xl"
                  onClick={() => pixelEvents.lead('Empresa Registration Click', 0)}
                >
                  Soy Empresa
                </Button>
              </a>
              <a href="/solicitud?type=closer">
                <Button 
                  variant="tech" 
                  size="xl"
                  onClick={() => pixelEvents.lead('Closer Registration Click', 0)}
                >
                  Soy Closer
                </Button>
              </a>
            </div>
          </div>
          <div className="mt-10">
            <MinimalForm />
          </div>
        </section>
      </main>

      {/* Sticky dual-CTA for conversion */}
      <div className="fixed inset-x-0 bottom-4 z-40">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-xl bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border shadow-glow p-3 flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Elige tu camino en closwork:</span>
            <span className="text-sm text-muted-foreground sm:hidden">Elegir camino:</span>
            <div className="flex items-center gap-3">
              <a href="/solicitud?type=empresa">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={() => pixelEvents.lead('Empresa Registration Click - Sticky CTA', 0)}
                >
                  Empresa
                </Button>
              </a>
              <a href="/solicitud?type=closer">
                <Button 
                  variant="tech" 
                  size="lg"
                  onClick={() => pixelEvents.lead('Closer Registration Click - Sticky CTA', 0)}
                >
                  Closer
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-slate-950">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold text-zinc-100">Closwork</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-100">Sobre Nosotros</h3>
              <p className="leading-relaxed max-w-md text-zinc-50">
                Closwork es una plataforma innovadora diseñada para revolucionar las ventas B2B, 
                ofreciendo herramientas avanzadas y soluciones personalizadas.
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-zinc-50">Contacto</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📧</span>
                  <a 
                  href="mailto:hola@closwork.com" 
                  className="hover:text-primary transition-colors"
                  onClick={() => pixelEvents.contact('Email Contact')}
                >
                    hola@closwork.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📞</span>
                  <a 
                    href="tel:+523112403145" 
                    className="hover:text-primary transition-colors"
                    onClick={() => pixelEvents.contact('Phone Contact')}
                  >
                    +52 3112403145
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📍</span>
                  <span className="text-slate-50">Guadalajara, Jal.</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-zinc-50">Enlaces Rápidos</h3>
              <div className="space-y-2">
                <a href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </a>
                <a href="#caracteristicas" className="block text-muted-foreground hover:text-primary transition-colors">
                  Características
                </a>
                <a 
                  href="/calculadora" 
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => pixelEvents.viewContent('Pricing Calculator', 'navigation')}
                >
                  Precios
                </a>
                <a href="mailto:hola@closwork.com" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </a>
                <a 
                  href="/solicitud" 
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => pixelEvents.lead('Registration Link Click', 0)}
                >
                  Registro
                </a>
                <a href="/terminos-condiciones" className="block text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 Closwork. Todos los derechos reservados.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p className="text-sm text-muted-foreground italic">
                  "A veces, las ideas más revolucionarias nacen de la pregunta más simple: ¿Y si existiera un botón?"
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <a href="/terminos-condiciones" className="hover:text-primary transition-colors">
                    Términos y Condiciones
                  </a>
                  <span>•</span>
                  <a href="mailto:privacidad@closwork.com" className="hover:text-primary transition-colors">
                    Privacidad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
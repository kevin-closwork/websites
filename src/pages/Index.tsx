import { Helmet } from "react-helmet-async";
import Hero from "@/components/landing/Hero";
import SocialTicker from "@/components/landing/SocialTicker";
import PainPoints from "@/components/landing/PainPoints";
import ModelComparison from "@/components/landing/ModelComparison";
import LiveMarketplace from "@/components/landing/LiveMarketplace";
import WhatsAppTestimonials from "@/components/landing/WhatsAppTestimonials";
import FounderTruth from "@/components/landing/FounderTruth";
import SimpleSteps from "@/components/landing/SimpleSteps";
import MinimalForm from "@/components/landing/MinimalForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  const title = "Closwork: Ventas B2B sin riesgo (paga por cierre)";
  const description = "Activa ventas B2B sin nómina. Closers elite que cobran solo por resultados. Tu primer deal en 14 días.";
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Closwork",
          url: "/",
          description,
        })}</script>
      </Helmet>

      <Hero />
      <SocialTicker />
      <main>
        <PainPoints />
        <ModelComparison />
        <LiveMarketplace />
        {/* Animación de matchmaking ya incluida en LiveMarketplace */}
        <WhatsAppTestimonials />
        <FounderTruth />
        <SimpleSteps />
        <section className="container py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">La decisión</h2>
              <p className="text-muted-foreground mt-1">Escoge lo que acelera tu crecimiento hoy.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/solicitud?type=empresa"><Button variant="hero" size="xl">Soy Empresa</Button></a>
              <a href="/solicitud?type=closer"><Button variant="neon" size="xl">Soy Closer</Button></a>
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
            <span className="text-sm hidden sm:inline text-muted-foreground">Activa tu crecimiento:</span>
            <div className="flex items-center gap-3">
              <a href="/solicitud?type=empresa"><Button variant="hero" size="lg">Empresa</Button></a>
              <a href="/solicitud?type=closer"><Button variant="neon" size="lg">Closer</Button></a>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-10">
        <div className="container text-center text-sm text-muted-foreground">
          "A veces, las ideas más revolucionarias nacen de la pregunta más simple: ¿Y si existiera un botón?"
        </div>
      </footer>
    </div>
  );
};

export default Index;

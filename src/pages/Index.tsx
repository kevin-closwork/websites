import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/pricing/PricingSection";
import { PRICING_VISIBLE } from "@/config/featureFlags";
import { Sparkles, Send, Building2, Users, TrendingUp, Shield, Zap, Target, Award, Check, TrendingDown, HelpCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Marquee } from "@/components/motion/Marquee";
import { ProcessTimeline, type ProcessStep } from "@/components/motion/ProcessTimeline";
import { BenefitPoint } from "@/components/motion/BenefitPoint";
import { FloatingAvatars } from "@/components/motion/FloatingAvatars";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

const HERO_PHRASES = [
  "Necesito vender mi ERP",
  "Busco un vendedor bajo comisión",
  "Mi empresa quiere vender más",
  "Quiero cerrar más ventas B2B",
  "Necesito socios comerciales",
];

const SECTORS = [
  "SaaS & Software",
  "Fintech",
  "ERP & CRM",
  "Manufactura",
  "Logística",
  "Ecommerce",
  "Consultoría",
  "Salud",
  "Educación",
  "Inmobiliaria",
  "Agencias",
  "Hardware",
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Building2,
    step: "01",
    title: "Publica tu empresa/oferta",
    description:
      "Registra tu empresa y publica las oportunidades de venta que necesitas promocionar. Define comisiones y requisitos.",
  },
  {
    icon: Users,
    step: "02",
    title: "Te conectamos con un socio comercial validado",
    description:
      "Nuestro algoritmo te conecta con closers verificados que tienen experiencia en tu sector y mercado objetivo.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Pagas comisión solo cuando se concreten ventas",
    description:
      "Sin costos fijos. Solo pagas cuando tu socio comercial genere resultados reales para tu negocio.",
  },
];

const EMPRESA_BENEFITS = [
  {
    icon: Shield,
    title: "Reducción de Riesgo",
    description: "Sin costos fijos ni contratos largos. Solo pagas por resultados reales.",
  },
  {
    icon: Zap,
    title: "Acceso Inmediato",
    description: "Conecta con closers verificados en menos de 48 horas.",
  },
  {
    icon: Target,
    title: "Flexibilidad Total",
    description: "Ajusta comisiones y requisitos según tus necesidades específicas.",
  },
];

const CLOSER_BENEFITS = [
  {
    icon: TrendingUp,
    title: "Oportunidades Constantes",
    description: "Acceso a múltiples ofertas de empresas verificadas cada semana.",
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Conecta con otros closers, comparte estrategias y aprende continuamente.",
  },
  {
    icon: Award,
    title: "Soporte Especializado",
    description: "Recibe formación y herramientas para maximizar tus comisiones.",
  },
];

const BENEFIT_BLOCKS = [
  {
    id: "empresas",
    title: "Para Empresas",
    subtitle: "Escala tu fuerza de ventas sin riesgos",
    from: "left" as const,
    image: "/stock/empresas-equipo.jpg",
    imageAlt: "Equipo de una empresa cerrando un acuerdo comercial en una sala de juntas",
    points: EMPRESA_BENEFITS,
  },
  {
    id: "closers",
    title: "Para Socios Comerciales (Closers)",
    subtitle: "Maximiza tus ingresos con oportunidades verificadas",
    from: "right" as const,
    image: "/stock/closers-acuerdo.jpg",
    imageAlt: "Socio comercial cerrando un trato con un apretón de manos",
    points: CLOSER_BENEFITS,
  },
];

const SAVINGS_POINTS = [
  {
    icon: Check,
    title: "Sin Salarios Fijos",
    description:
      "No pagas salarios mensuales. Solo pagas por resultados y socios comerciales activos trabajando para ti.",
  },
  {
    icon: Check,
    title: "Ahorro Promedio 60-80%",
    description:
      "Las empresas ahorran entre 60% y 80% comparado con contratar socios comerciales con salario fijo tradicional.",
  },
  {
    icon: Check,
    title: "Calcula Tu Ahorro",
    description:
      "Usa nuestra calculadora interactiva para ver exactamente cuánto ahorrarías según tu escenario específico.",
  },
];

const Index = () => {
  const [heroMessage, setHeroMessage] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const navigate = useNavigate();

  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 90]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroContentScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
  const heroDecorY = useTransform(heroProgress, [0, 1], [0, -70]);
  const heroParallaxStyle = reduceMotion
    ? undefined
    : { y: heroContentY, opacity: heroContentOpacity, scale: heroContentScale };

  useEffect(() => {
    if (inputFocused || heroMessage) return;
    const phrase = HERO_PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedPlaceholder.length < phrase.length) {
            setTypedPlaceholder(phrase.slice(0, typedPlaceholder.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          if (typedPlaceholder.length > 0) {
            setTypedPlaceholder(typedPlaceholder.slice(0, -1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % HERO_PHRASES.length);
          }
        }
      },
      isDeleting ? 40 : typedPlaceholder.length === phrase.length ? 2000 : 80
    );
    return () => clearTimeout(timeout);
  }, [typedPlaceholder, phraseIndex, isDeleting, inputFocused, heroMessage]);

  const handleHeroSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = heroMessage.trim();
    if (!text) return;
    setHeroMessage("");

    let attempts = 0;
    const sendToBotpress = (msg: string) => {
      const bp = (window as Window & { botpress?: { open: () => void; on: (ev: string, cb: () => void) => () => void; sendMessage: (m: string) => Promise<void> } }).botpress;
      if (bp) {
        bp.open();
        const unsub = bp.on("webchat:opened", () => {
          bp.sendMessage(msg);
          unsub?.();
        });
        setTimeout(() => bp.sendMessage(msg).catch(() => {}), 300);
      } else if (attempts++ < 40) {
        setTimeout(() => sendToBotpress(msg), 150);
      }
    };
    if (typeof window !== "undefined") sendToBotpress(text);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/5213112403145", "_blank");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen landing-page relative overflow-hidden">
        <ScrollProgress />
        <GrainOverlay />
        <Navbar />

        <main className="relative z-10 pt-20 md:pt-24">
          {/* Hero Section */}
          <section ref={heroRef} id="hero" data-deploy="hero-v2-2026" className="relative w-full mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-20 pb-12 sm:pb-20 text-center bg-gradient-to-br from-[#1a5ca0] via-[#2474c4] to-[#5dc88c] rounded-b-3xl shadow-lg">
            {/* Capa decorativa con parallax propio (se mueve más lento que el texto) */}
            <motion.div
              aria-hidden
              style={reduceMotion ? undefined : { y: heroDecorY }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-3xl"
            >
              <div className="absolute -top-24 left-[8%] h-[26rem] w-[26rem] rounded-full bg-[hsl(152,58%,57%)] opacity-30 blur-[110px] animate-float" />
              <div className="absolute -bottom-32 right-[6%] h-[22rem] w-[22rem] rounded-full bg-white opacity-[0.18] blur-[120px] animate-float-subtle" />
              <div className="hero-grid absolute inset-0" />
            </motion.div>

            <motion.div
              style={heroParallaxStyle}
              variants={staggerContainer(0.11, 0.08)}
              initial="hidden"
              animate="visible"
              className="container relative"
            >
              <motion.div variants={fadeUpVariants}>
                <Badge variant="secondary" className="mb-4 gap-1 bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
                  🚀 La evolución de las ventas B2B
                </Badge>
              </motion.div>
              <AnimatedHeadline
                as="h1"
                animateOnMount
                delay={0.15}
                stagger={0.075}
                text="Crea tu fuerza de ventas bajo comisión"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4 drop-shadow-sm"
              />
              <motion.p variants={fadeUpVariants} className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto mb-6 leading-relaxed px-4">
                El Primer Sales-as-a-Service de LATAM. Despliega fuerza de ventas experta en 24 horas. Conecta tu oferta con Socios Comerciales verificados bajo demanda. Sin nómina, solo resultados.
              </motion.p>

              <motion.form
                variants={fadeUpVariants}
                onSubmit={handleHeroSubmit}
                className="max-w-2xl mx-auto flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl border-0 mx-4 sm:mx-auto mb-8 transition-shadow duration-500 focus-within:shadow-[0_0_0_4px_hsl(152_58%_57%_/_0.35),0_18px_40px_-14px_rgba(0,54,107,0.45)]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles size={18} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 relative min-w-0">
                  <input
                    value={heroMessage}
                    onChange={(e) => setHeroMessage(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    className="w-full bg-transparent border-none focus:outline-none text-sm sm:text-base text-foreground min-w-0 relative z-10"
                  />
                  {!heroMessage && !inputFocused && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-sm sm:text-base text-muted-foreground pointer-events-none whitespace-nowrap"
                      aria-hidden
                    >
                      {typedPlaceholder}
                      <span className="inline-block w-0.5 h-4 sm:h-5 ml-0.5 bg-current align-middle animate-cursor-blink" aria-hidden />
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:text-primary-glow transition-colors flex-shrink-0"
                >
                  <span className="hidden xs:inline">Enviar</span>
                  <Send size={14} className="sm:w-4 sm:h-4" />
                </button>
              </motion.form>

              <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <Button
                  size="lg"
                  className="cta-shine cta-glow bg-[#22c55e] hover:bg-[#16a34a] text-white text-lg px-8 font-semibold w-full sm:w-auto"
                  asChild
                >
                  <a href="https://app.closwork.com/register/empresa" target="_blank" rel="noopener noreferrer">
                    Registra tu empresa
                  </a>
                </Button>
                <Button
                  variant="outline-white"
                  size="lg"
                  className="cta-shine cta-glow text-lg px-8 font-semibold bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                  asChild
                >
                  <a href="https://app.closwork.com/register/closer" target="_blank" rel="noopener noreferrer">
                    Regístrate como Closer
                  </a>
                </Button>
              </motion.div>
              <motion.p variants={fadeUpVariants} className="text-sm text-white/80 mb-8">
                Setup en 5 minutos • Cancelación flexible
              </motion.p>

              <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <span className="text-sm text-white/80">Acelerados en:</span>
                <a href="https://www.retozapopan.com.mx/" target="_blank" rel="noopener noreferrer" className="opacity-90 transition-all duration-300 hover:opacity-100 hover:-translate-y-0.5">
                  <img src="/logo-86bf1018.svg" alt="Reto Zapopan" className="h-10 sm:h-12 w-auto brightness-0 invert" />
                </a>
                <a href="https://emprelatam.com/" target="_blank" rel="noopener noreferrer" className="opacity-90 transition-all duration-300 hover:opacity-100 hover:-translate-y-0.5">
                  <img src="/emprelatam-logo.png" alt="Emprelatam" className="h-6 sm:h-8 w-auto brightness-0 invert" />
                </a>
              </motion.div>
            </motion.div>
          </section>

          {/* Ticker de sectores */}
          <section aria-label="Sectores en los que operamos" className="border-b border-border/60 bg-white/70 py-7 backdrop-blur-sm">
            <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Cerramos ventas en todos los sectores
            </p>
            <Marquee
              speedSeconds={44}
              items={SECTORS.map((sector) => (
                <span className="mx-2 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:border-primary/40 hover:text-primary">
                  {sector}
                </span>
              ))}
            />
          </section>

          {/* Cómo Funciona */}
          <section id="como-funciona" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeadline
                text="¿Cómo funciona Closwork?"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4"
              />
              <ScrollReveal variant="fade-up" delay={1}>
                <p className="text-sm sm:text-base text-muted-foreground mt-4 px-4">
                  Un proceso simple y transparente que conecta empresas con los mejores closers de LATAM en 3 pasos
                </p>
              </ScrollReveal>
            </div>
            <ProcessTimeline steps={PROCESS_STEPS} />
          </section>

          {/* Beneficios */}
          <section id="beneficios" className="w-full bg-slate-50 relative overflow-visible">
            <div className="absolute inset-0 pointer-events-none animate-glow-pulse" aria-hidden="true">
              <div className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(152,48%,47%)] opacity-20 blur-[120px]" />
              <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-[hsl(210,60%,40%)] opacity-15 blur-[100px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <ScrollReveal variant="scale">
            <div className="landing-section-header mb-16 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                Beneficios para todos
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-4 px-4 subtitle-muted">
                Una plataforma diseñada para maximizar el éxito tanto de empresas como de closers
              </p>
            </div>
            </ScrollReveal>
            <div className="relative z-10 space-y-16 sm:space-y-24">
              {BENEFIT_BLOCKS.map((block) => (
                <div key={block.id} className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className="flex flex-col justify-center">
                    <ScrollReveal variant="fade-up">
                      <h3 className="text-3xl sm:text-4xl font-semibold text-foreground">{block.title}</h3>
                      <p className="mt-3 text-base sm:text-lg text-muted-foreground">{block.subtitle}</p>
                    </ScrollReveal>
                    <div className="mt-8 space-y-7 overflow-hidden">
                      {block.points.map((point) => (
                        <BenefitPoint key={point.title} {...point} from={block.from} size="lg" />
                      ))}
                    </div>
                  </div>
                  <ScrollReveal variant="scale" className="h-full">
                    <div className="relative h-full min-h-[18rem] sm:min-h-[24rem] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(0,54,107,0.45)]">
                      <img
                        src={block.image}
                        alt={block.imageAlt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(210,100%,21%)]/35 via-transparent to-transparent" />
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* Comunidad */}
          <section id="comunidad" className="w-full bg-slate-50 relative overflow-visible">
            <div className="absolute inset-0 pointer-events-none animate-glow-pulse" aria-hidden="true">
              <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] rounded-full bg-[hsl(152,48%,47%)] opacity-20 blur-[100px]" />
              <div className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] rounded-full bg-[hsl(210,60%,40%)] opacity-15 blur-[90px]" />
            </div>
            <FloatingAvatars />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <ScrollReveal variant="scale">
            <div className="landing-section-header mb-12 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                Una comunidad en crecimiento
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-4 px-4 subtitle-muted">
                Miles de empresas y closers ya confían en Closwork para hacer crecer sus negocios en toda América Latina
              </p>
            </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto w-full relative z-10">
              {[
                { value: "200+", label: "Closers Verificados" },
                { value: "50+", label: "Empresas Activas" },
                { value: "95%", label: "Tasa de Éxito" },
                { value: "12", label: "Países en LATAM" },
              ].map((stat, i) => (
                <ScrollReveal key={i} variant="zoom-rotate" delay={(i + 1) as 1 | 2 | 3 | 4}>
                <div className="landing-stats-card text-center p-4 bg-card rounded-xl border">
                  <AnimatedCounter
                    value={stat.value}
                    className="block text-2xl sm:text-3xl font-bold text-primary"
                  />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal variant="fade-up" delay={3}>
            <div className="flex flex-col items-center justify-center text-center relative z-10">
              <Badge variant="secondary" className="mb-4 animate-float-subtle">Nuevos miembros uniéndose cada día</Badge>
              <h3 className="font-semibold text-lg mb-1">Red de Closers en Tiempo Real</h3>
              <p className="text-sm text-muted-foreground mb-2 max-w-xl mx-auto">Conectando empresas con los mejores closers de países hispanohablantes</p>
              <p className="text-xs text-primary font-medium">10 closers activos ahora</p>
            </div>
            </ScrollReveal>
            </div>
          </section>

          {/* Planes */}
          {PRICING_VISIBLE && <PricingSection />}

          {/* Ahorros */}
          <section id="ahorros" className="w-full bg-slate-50 relative overflow-visible">
            <div className="absolute inset-0 pointer-events-none animate-glow-pulse" aria-hidden="true">
              <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-[hsl(152,48%,47%)] opacity-15 blur-[110px]" />
              <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] rounded-full bg-[hsl(210,60%,40%)] opacity-12 blur-[90px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <ScrollReveal variant="scale">
            <div className="landing-section-header mb-12 relative z-10">
              <Badge variant="secondary" className="mb-4 gap-1 animate-float-subtle">
                <TrendingDown className="h-4 w-4" /> Ahorro Garantizado
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                ¿Cuánto puedes ahorrar con Closwork?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-4 px-4 subtitle-muted">
                Compara el costo real de contratar socios comerciales tradicionales vs nuestro modelo de pago por resultados.
              </p>
            </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto w-full relative z-10">
              {[
                { value: "60-80%", label: "Ahorro promedio" },
                { value: "$0", label: "Salarios fijos" },
                { value: "100%", label: "Pago por resultados" },
                { value: "24/7", label: "Disponibilidad" },
              ].map((s, i) => (
                <ScrollReveal key={i} variant="zoom-rotate" delay={(i + 1) as 1 | 2 | 3 | 4}>
                <div className="landing-stats-card text-center p-4 bg-card rounded-xl border">
                  <AnimatedCounter
                    value={s.value}
                    className="block text-xl font-bold text-primary"
                  />
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="space-y-6 max-w-2xl mx-auto mb-8 relative z-10 overflow-hidden">
              {SAVINGS_POINTS.map((point, i) => (
                <BenefitPoint key={point.title} {...point} from={i % 2 === 0 ? "left" : "right"} />
              ))}
            </div>
            <ScrollReveal variant="scale" delay={2}>
            <Card className="max-w-xl mx-auto landing-section-card-hover relative z-10">
              <CardHeader>
                <CardTitle>Descubre cuánto puedes ahorrar</CardTitle>
                <CardDescription>
                  Nuestra calculadora te muestra el ahorro exacto comparando el modelo tradicional vs Closwork. Personaliza según tu cantidad de socios comerciales y ciclo de ventas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="cta-shine cta-glow w-full" onClick={() => navigate("/calculadora")}>
                  Calcular Mi Ahorro
                </Button>
              </CardContent>
            </Card>
            </ScrollReveal>
            </div>
          </section>

          {/* Final CTA */}
          <section id="cta-final" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <AnimatedHeadline
              text="¿Listo para transformar tu negocio?"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4 mb-4"
            />
            <ScrollReveal variant="fade-up" delay={1}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
              Regístrate gratis y encuentra a tu socio comercial perfecto en menos de 7 días
            </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={2}>
            <Button
              size="lg"
              className="cta-shine cta-glow text-lg px-8 mb-4"
              asChild
            >
              <a href="https://app.closwork.com/register/empresa" target="_blank" rel="noopener noreferrer">
                Registra tu empresa
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mb-8">Setup en menos de 5 minutos</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={2}>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span>100% Sin costos ocultos</span>
              <span>24/7 Soporte disponible</span>
              <span>7 días Garantía Growth/Scale</span>
              <span>7 días Para encontrar socio</span>
            </div>
            </ScrollReveal>
          </section>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Index;

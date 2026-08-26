import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTA_DIAGNOSTICO_URL } from "@/config/featureFlags"; // ← Calendly de diagnóstico (TODO_PENDIENTE)
import { Sparkles, Send, User, Users, HelpCircle, Search, Zap, Shield, Award, TrendingUp, Target, Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { ProcessTimeline, type ProcessStep } from "@/components/motion/ProcessTimeline";
import { BenefitPoint } from "@/components/motion/BenefitPoint";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

const HERO_PHRASES = [
  "Mi equipo no cierra lo suficiente",
  "No tengo proceso de ventas documentado",
  "Quiero escalar sin contratar nómina",
  "Mis vendedores improvisan cada llamada",
  "Tengo leads pero no conversión",
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Search,
    step: "01",
    title: "Diagnosticamos",
    description:
      "Entrevistamos a tu founder y a tu equipo, revisamos tu data y auditamos tus llamadas reales. Te entregamos un informe con los cuellos de botella y una hoja de ruta priorizada. 90 minutos de presentación de hallazgos. Sin costo.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Construimos el sistema",
    description:
      "Playbook comercial con metodología Anti-Script™: proceso paso a paso, manejo de objeciones, templates. Entrenamos a tu equipo con roleplay en vivo e implementamos 2-3 quick wins de impacto inmediato. 4 a 6 semanas.",
  },
  {
    icon: Users,
    step: "03",
    title: "Ponemos el equipo",
    description:
      "Te presentamos closers verificados que ya operan bajo tu playbook. Tú defines la comisión y la negocias directamente con ellos. Nosotros gestionamos la selección, el onboarding y la calidad de las conversaciones.",
  },
];

const PROBLEM_BLOCKS = [
  {
    icon: User,
    title: "Tu founder sigue siendo el mejor vendedor",
    description:
      "Cuando él no está en la llamada, la conversión cae. Eso no es un equipo, es una dependencia.",
  },
  {
    icon: Users,
    title: "Contrataste vendedores y no funcionó",
    description:
      "No porque fueran malos. Porque no había proceso que seguir, así que cada uno improvisó el suyo.",
  },
  {
    icon: HelpCircle,
    title: "Tienes leads y no sabes por qué no cierran",
    description:
      'Sin llamadas auditadas, la respuesta siempre es "el lead venía frío". Casi nunca es eso.',
  },
];

const METHODOLOGY_PHASES = [
  { step: "01", title: "Anclaje humano", description: "Conectar de verdad y bajar la guardia" },
  { step: "02", title: "Frame", description: "Establecer expectativas y agenda de la sesión" },
  { step: "03", title: "Discovery", description: "Entender el dolor profundo y la situación actual" },
  { step: "04", title: "Deep Future", description: "Visualizar el resultado deseado y su impacto" },
  { step: "05", title: "Bridge", description: "Conectar el dolor identificado con la solución" },
  { step: "06", title: "Pitch", description: "Presentar una oferta altamente relevante" },
  { step: "07", title: "Cierre", description: "Invitar a una decisión firme, sin presión" },
];

const OUTCOMES = [
  {
    icon: Shield,
    title: "Proceso documentado",
    description: "Se acaba la improvisación. Tu equipo sigue pasos definidos, no intuiciones.",
  },
  {
    icon: Award,
    title: "Vendedores auténticos",
    description: "Nadie actuando un personaje. Confianza y autoridad reales en la llamada.",
  },
  {
    icon: TrendingUp,
    title: "Conversión medible",
    description: "Mejora en al menos una etapa crítica del funnel: Discovery, Pitch o Cierre.",
  },
  {
    icon: Zap,
    title: "Onboarding acelerado",
    description: "Un vendedor nuevo llega a rampa sin que el founder lo entrene uno a uno.",
  },
  {
    icon: Target,
    title: "Escala sin dependencia",
    description: "Tu conocimiento comercial deja de vivir en la cabeza de una sola persona.",
  },
];

const FIT_YES = [
  "Ya vendes y quieres escalar",
  "Tienes equipo comercial de 2 a 15 personas",
  "Generas leads pero no cierras lo suficiente",
  "Estás dispuesto a que auditemos tus llamadas",
];

const FIT_NO = [
  "Todavía estás validando el producto",
  "Vendes exclusivamente por autoservicio",
  "No generas leads todavía",
  "Buscas solo vendedores, no proceso",
];

const WORK_MODELS = [
  {
    name: "Diagnóstico",
    para: "Entender qué está roto",
    incluye: ["Auditoría", "Informe", "Hoja de ruta"],
    duracion: "2-4 semanas",
    inversion: "Sin costo",
  },
  {
    name: "Implementación",
    para: "Construir el sistema",
    incluye: ["Playbook", "Training", "Quick wins", "1 mes de soporte"],
    duracion: "4-6 semanas",
    inversion: "Proyecto único",
  },
  {
    name: "Operación continua",
    para: "Sostener y escalar",
    incluye: ["Auditoría de llamadas", "KPIs", "Sesión semanal", "Equipo de closers"],
    duracion: "Mínimo 3 meses",
    inversion: "Mensual",
  },
];

const OBJECTIONS = [
  {
    q: "¿Esto es una bolsa de trabajo?",
    a: "No. Construimos tu proceso comercial y, si lo necesitas, te presentamos closers ya entrenados en él. La comisión la defines y la negocias tú directamente con cada closer.",
  },
  {
    q: "¿Cuánto tardo en ver resultados?",
    a: "Los quick wins se implementan en las primeras 3 semanas. El sistema completo, entre 4 y 6.",
  },
  {
    q: "Ya tengo un equipo de ventas.",
    a: "Mejor. Trabajamos sobre lo que ya existe: auditamos, documentamos y entrenamos. No reemplazamos gente.",
  },
  {
    q: "¿Qué pasa si no aplico las recomendaciones?",
    a: "Entonces no funciona. Por eso pedimos compromiso explícito de implementar al menos 1-2 mejoras antes de empezar.",
  },
];

const Index = () => {
  const [heroMessage, setHeroMessage] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

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

  return (
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
                  Consultoría comercial + equipo de cierre
                </Badge>
              </motion.div>
              <AnimatedHeadline
                as="h1"
                animateOnMount
                delay={0.15}
                stagger={0.075}
                text="Tu empresa no necesita más leads. Necesita quién los cierre."
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4 drop-shadow-sm"
              />
              <motion.p variants={fadeUpVariants} className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto mb-6 leading-relaxed px-4">
                Diseñamos tu proceso comercial, entrenamos el método y te ponemos closers verificados a operarlo. Sin nómina, sin contratar, sin construirlo desde cero.
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
                  <a href={CTA_DIAGNOSTICO_URL}>
                    Agenda tu diagnóstico gratuito
                  </a>
                </Button>
                <Button
                  variant="outline-white"
                  size="lg"
                  className="cta-shine cta-glow text-lg px-8 font-semibold bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                  asChild
                >
                  <a href="#como-trabajamos">
                    Ver cómo trabajamos
                  </a>
                </Button>
              </motion.div>
              <motion.p variants={fadeUpVariants} className="text-sm text-white/80 mb-8">
                90 minutos · Sin costo · Cupos limitados por mes
              </motion.p>

              <motion.div variants={fadeUpVariants} className="space-y-4">
                <p className="text-sm text-white/80 px-4">
                  Hemos auditado conversaciones de venta en SaaS, agencias, educación e inmobiliaria
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <span className="text-sm text-white/80">Acelerados en Reto Zapopan y Emprelatam</span>
                  <a href="https://www.retozapopan.com.mx/" target="_blank" rel="noopener noreferrer" className="opacity-90 transition-all duration-300 hover:opacity-100 hover:-translate-y-0.5">
                    <img src="/logo-86bf1018.svg" alt="Reto Zapopan" className="h-10 sm:h-12 w-auto brightness-0 invert" />
                  </a>
                  <a href="https://emprelatam.com/" target="_blank" rel="noopener noreferrer" className="opacity-90 transition-all duration-300 hover:opacity-100 hover:-translate-y-0.5">
                    <img src="/emprelatam-logo.png" alt="Emprelatam" className="h-6 sm:h-8 w-auto brightness-0 invert" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Removido en V2 — ver CONTENIDO_LANDING_V2.md: Ticker de sectores */}

          {/* El problema */}
          <section id="problema" className="w-full bg-slate-50 relative overflow-visible">
            <div className="absolute inset-0 pointer-events-none animate-glow-pulse" aria-hidden="true">
              <div className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(152,48%,47%)] opacity-20 blur-[120px]" />
              <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-[hsl(210,60%,40%)] opacity-15 blur-[100px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <ScrollReveal variant="scale">
                <div className="landing-section-header mb-16 relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                    El problema casi nunca es el producto
                  </h2>
                </div>
              </ScrollReveal>
              <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 overflow-hidden">
                {PROBLEM_BLOCKS.map((point, i) => (
                  <Card key={point.title} className="landing-section-card-hover h-full">
                    <CardContent className="p-6">
                      <BenefitPoint {...point} from={i % 2 === 0 ? "left" : "right"} size="lg" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollReveal variant="fade-up" delay={2}>
                <p className="relative z-10 mt-12 text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                  Contratar más gente encima de un proceso roto solo hace el problema más caro.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Cómo trabajamos */}
          <section id="como-trabajamos" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeadline
                text="Tres fases. Empezamos por la primera."
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4"
              />
            </div>
            <ProcessTimeline steps={PROCESS_STEPS} />
            <ScrollReveal variant="fade-up" delay={2}>
              <p className="text-sm sm:text-base text-muted-foreground mt-12 text-center max-w-3xl mx-auto px-4">
                Puedes quedarte en la fase 2 si ya tienes equipo. Puedes ir directo a la fase 3 si ya tienes proceso. La mayoría necesita las tres.
              </p>
            </ScrollReveal>
          </section>

          {/* Metodología Anti-Script™ */}
          <section id="metodologia" className="w-full bg-slate-50 relative overflow-visible">
            <div className="absolute inset-0 pointer-events-none animate-glow-pulse" aria-hidden="true">
              <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] rounded-full bg-[hsl(152,48%,47%)] opacity-20 blur-[100px]" />
              <div className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] rounded-full bg-[hsl(210,60%,40%)] opacity-15 blur-[90px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <ScrollReveal variant="scale">
                <div className="landing-section-header mb-16 relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                    Anti-Script™: no te decimos qué decir, te enseñamos a guiar la conversación
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-4 px-4 subtitle-muted">
                    Siete fases para que el prospecto se venda a sí mismo. Sin scripts rígidos, sin personajes de venta, sin presión.
                  </p>
                </div>
              </ScrollReveal>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {METHODOLOGY_PHASES.map((phase, i) => (
                  <ScrollReveal key={phase.step} variant="fade-up" delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                    <div className="landing-stats-card h-full p-4 bg-card rounded-xl border">
                      <p className="text-2xl sm:text-3xl font-bold text-primary">{phase.step}</p>
                      <p className="font-medium mt-2">{phase.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal variant="scale" delay={2}>
                <Card className="max-w-xl mx-auto mt-16 landing-section-card-hover relative z-10">
                  <CardContent className="p-6 text-center">
                    <p className="text-lg sm:text-xl font-semibold text-foreground">
                      “Conversaciones reales. Resultados reales.”
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Andrés, socio operador comercial</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </section>

          {/* Qué te llevas */}
          <section id="beneficios" className="w-full relative overflow-visible">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <ScrollReveal variant="scale">
                <div className="landing-section-header mb-16 relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                    Resultados, no entregables
                  </h2>
                </div>
              </ScrollReveal>
              <div className="relative z-10 space-y-7 max-w-2xl mx-auto overflow-hidden">
                {OUTCOMES.map((point, i) => (
                  <BenefitPoint key={point.title} {...point} from={i % 2 === 0 ? "left" : "right"} size="lg" />
                ))}
              </div>
            </div>
          </section>

          {/* Para quién sí y para quién no */}
          <section id="para-quien" className="w-full bg-slate-50 relative overflow-visible">
            <div className="absolute inset-0 pointer-events-none animate-glow-pulse" aria-hidden="true">
              <div className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(152,48%,47%)] opacity-20 blur-[120px]" />
              <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-[hsl(210,60%,40%)] opacity-15 blur-[100px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <ScrollReveal variant="scale">
                <div className="landing-section-header mb-16 relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                    Esto no es para todos
                  </h2>
                </div>
              </ScrollReveal>
              <div className="relative z-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-14">
                <ScrollReveal variant="fade-up">
                  <Card className="landing-section-card-hover h-full border-primary/30">
                    <CardHeader>
                      <CardTitle>Trabajamos contigo si:</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {FIT_YES.map((item) => (
                          <li key={item} className="flex gap-3">
                            <Check className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={1}>
                  <Card className="landing-section-card-hover h-full bg-muted/50 border-border">
                    <CardHeader>
                      <CardTitle className="text-muted-foreground">No es tu momento si:</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {FIT_NO.map((item) => (
                          <li key={item} className="flex gap-3 text-muted-foreground">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">–</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Removido en V2 — ver CONTENIDO_LANDING_V2.md: Comunidad (stats) */}

          {/* Removido en V2 — ver CONTENIDO_LANDING_V2.md: Planes. Reemplazado por Modelos de trabajo. */}

          {/* Modelos de trabajo */}
          <section id="modelos" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeadline
                text="Tres formas de trabajar con nosotros"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {WORK_MODELS.map((model) => (
                <Card key={model.name} className="landing-section-card-hover relative h-full overflow-hidden">
                  <CardHeader>
                    <CardTitle>{model.name}</CardTitle>
                    <CardDescription>Para: {model.para}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Incluye</p>
                      <ul className="space-y-2">
                        {model.incluye.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Duración:</span> {model.duracion}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Inversión:</span> {model.inversion}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollReveal variant="fade-up" delay={2}>
              <div className="mt-12 text-center">
                <Button size="lg" className="cta-shine cta-glow text-lg px-8" asChild>
                  <a href={CTA_DIAGNOSTICO_URL}>Empieza por el diagnóstico</a>
                </Button>
              </div>
            </ScrollReveal>
          </section>

          {/* Removido en V2 — ver CONTENIDO_LANDING_V2.md: Ahorros / calculadora */}

          {/* Objeciones */}
          <section id="objeciones" className="w-full bg-slate-50 relative overflow-visible">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
              <ScrollReveal variant="scale">
                <div className="landing-section-header mb-16 relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold title-gradient px-4">
                    Lo que nos preguntan antes de empezar
                  </h2>
                </div>
              </ScrollReveal>
              <Accordion type="single" collapsible className="relative z-10 max-w-3xl mx-auto w-full">
                {OBJECTIONS.map((item, i) => (
                  <AccordionItem key={item.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-base sm:text-lg">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Final CTA */}
          <section id="cta-final" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <AnimatedHeadline
              text="Empieza por saber qué está roto"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4 mb-4"
            />
            <ScrollReveal variant="fade-up" delay={1}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
              90 minutos, sin costo, sin compromiso de compra. Sales con un informe y una hoja de ruta, trabajes con nosotros o no.
            </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={2}>
            <Button
              size="lg"
              className="cta-shine cta-glow text-lg px-8 mb-4"
              asChild
            >
              <a href={CTA_DIAGNOSTICO_URL}>
                Agenda tu diagnóstico
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mb-8">Cupos limitados: 1-2 diagnósticos por mes</p>
            <p>
              <a
                href="https://app.closwork.com/register/closer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ¿Eres closer y buscas oportunidades? → Regístrate aquí
              </a>
            </p>
            </ScrollReveal>
          </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

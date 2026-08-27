import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Send, User, Users, HelpCircle, UserPlus, Search, Zap, Shield, Award, TrendingUp, Target, Check } from "lucide-react";
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
import { Marquee } from "@/components/motion/Marquee";
import { ProcessTimeline, type ProcessStep } from "@/components/motion/ProcessTimeline";
import { BenefitPoint } from "@/components/motion/BenefitPoint";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CTA_DIAGNOSTICO_URL = "TODO_PENDIENTE"; // ← Calendly de diagnóstico
const CTA_CONCIERGE_URL = "TODO_PENDIENTE";   // ← Calendly o formulario corto
const CTA_REGISTRO_EMPRESA = "https://app.closwork.com/register/empresa";
const CTA_REGISTRO_CLOSER = "https://app.closwork.com/register/closer";

const HERO_PHRASES = [
  "Mi equipo no cierra lo suficiente",
  "Necesito vendedores sin nómina",
  "Tengo leads pero no conversión",
  "Mis vendedores improvisan cada llamada",
  "Quiero escalar sin contratar",
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
    icon: Search,
    step: "01",
    title: "Nos dices qué vendes y a quién",
    description:
      "Publicas tu oportunidad: producto, mercado, ciclo de venta y la comisión que estás dispuesto a pagar. Te decimos con franqueza si es una oferta que un closer va a querer tomar.",
  },
  {
    icon: Users,
    step: "02",
    title: "Te presentamos closers verificados",
    description:
      "Perfiles con experiencia comprobada en tu sector. Tú entrevistas, tú eliges y tú negocias la comisión directamente con cada uno. Nosotros gestionamos la selección y el onboarding.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Sostenemos la operación",
    description:
      "Escuchamos las llamadas, medimos qué está fallando y corregimos. Si tu proceso comercial no existe o no aguanta el volumen, lo construimos contigo.",
  },
];

const PROBLEM_BLOCKS = [
  {
    icon: User,
    title: "Sigues siendo el mejor vendedor de tu empresa",
    description:
      "Cuando no estás en la llamada, la conversión cae. Eso no es un equipo, es una dependencia.",
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
      'Sin escuchar las llamadas, la respuesta siempre es "el lead venía frío". Casi nunca es eso.',
  },
  {
    icon: UserPlus,
    title: "Cada contratación es una apuesta",
    description:
      "Sueldo, tiempo de rampa, riesgo laboral. Y a los tres meses vuelves a empezar.",
  },
];

const WORK_MODELS = [
  {
    name: "Autoservicio",
    para: "Ya sabes a quién buscas y quieres gestionarlo tú",
    incluye: [
      "Publicación de tus oportunidades",
      "Acceso a closers verificados",
      "Selección y contacto directo",
      "Contratos y marco legal listos",
    ],
    cta: "Registra tu empresa",
    href: CTA_REGISTRO_EMPRESA,
    external: true,
    microcopy: "Empiezas hoy, sin llamada",
    featured: false,
  },
  {
    name: "Concierge",
    para: "Quieres el equipo funcionando sin gestionarlo tú",
    badge: "El más contratado",
    incluye: [
      "Todo lo de Autoservicio",
      "Preselección y entrevista de closers por nosotros",
      "Onboarding y acompañamiento del closer",
      "Seguimiento de actividad y resultados",
      "Reemplazo si el closer no funciona",
    ],
    cta: "Habla con nosotros",
    href: CTA_CONCIERGE_URL,
    external: false,
    microcopy: "Equipo operando en menos de 30 días",
    featured: true,
  },
  {
    name: "Enterprise",
    para: "Tu problema no es de gente, es de proceso",
    incluye: [
      "Todo lo de Concierge",
      "Diagnóstico comercial completo con auditoría de llamadas",
      "Sales Playbook con metodología Anti-Script™",
      "Entrenamiento en vivo a tu equipo actual",
      "Auditoría continua, KPIs y sesión semanal",
    ],
    cta: "Agenda tu diagnóstico",
    href: CTA_DIAGNOSTICO_URL,
    external: false,
    microcopy: "Empieza con un diagnóstico sin costo",
    featured: false,
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
    icon: Users,
    title: "Fuerza de ventas sin nómina",
    description: "Sumas capacidad comercial sin sueldos fijos ni riesgo laboral.",
  },
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
    description: "Un vendedor nuevo llega a rampa sin que tengas que entrenarlo tú.",
  },
  {
    icon: Target,
    title: "Escala sin dependencia",
    description: "Tu conocimiento comercial deja de vivir en tu cabeza.",
  },
];

const FIT_YES = [
  "Ya vendes y quieres escalar",
  "Tienes leads calientes ahora, no en tres meses",
  "Tienes definida la comisión que vas a pagar",
  "Tu ciclo de venta cierra en 30 días o menos",
];

const FIT_NO = [
  "Todavía estás validando el producto",
  "No generas leads todavía",
  "Vendes exclusivamente por autoservicio",
  "Tu ciclo se estira más de un trimestre",
];

const OBJECTIONS = [
  {
    q: "¿Esto es una bolsa de trabajo?",
    a: "No. Te presentamos closers verificados y, si lo necesitas, construimos contigo el proceso que van a operar. La comisión la defines y la negocias tú directamente con cada closer.",
  },
  {
    q: "¿Cómo sé que el closer es bueno?",
    a: "Verificamos experiencia y auditamos sus conversaciones. En Concierge y Enterprise, si no funciona, lo reemplazamos.",
  },
  {
    q: "¿Cuánto tardo en tener a alguien vendiendo?",
    a: "En Autoservicio depende de qué tan rápido entrevistes. En Concierge, menos de 30 días.",
  },
  {
    q: "Ya tengo equipo de ventas.",
    a: "Entonces tu conversación es Enterprise. Trabajamos sobre lo que ya existe: escuchamos, documentamos y entrenamos. No reemplazamos gente.",
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
                  Ventas B2B como servicio · México y Colombia
                </Badge>
              </motion.div>
              <AnimatedHeadline
                as="h1"
                animateOnMount
                delay={0.15}
                stagger={0.075}
                text="No necesitas más leads. Necesitas quién los cierre."
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4 drop-shadow-sm"
              />
              <motion.p variants={fadeUpVariants} className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto mb-6 leading-relaxed px-4">
                Te conectamos con closers verificados y, si lo necesitas, construimos contigo el sistema comercial que van a operar. Sin nómina, sin contratar, sin armarlo desde cero.
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
                  <a href={CTA_REGISTRO_EMPRESA} target="_blank" rel="noopener noreferrer">
                    Registra tu empresa
                  </a>
                </Button>
                <Button
                  variant="outline-white"
                  size="lg"
                  className="cta-shine cta-glow text-lg px-8 font-semibold bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                  asChild
                >
                  <a href={CTA_DIAGNOSTICO_URL}>
                    Agenda tu diagnóstico gratuito
                  </a>
                </Button>
              </motion.div>
              <motion.p variants={fadeUpVariants} className="text-sm text-white/80 mb-4">
                Registro en 5 minutos · El diagnóstico dura 90 min y no tiene costo
              </motion.p>
              <motion.p variants={fadeUpVariants} className="mb-8">
                <a
                  href={CTA_REGISTRO_CLOSER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  ¿Eres closer y buscas oportunidades? → Regístrate aquí
                </a>
              </motion.p>

              <motion.div variants={fadeUpVariants} className="space-y-4">
                <p className="text-sm text-white/80 px-4">
                  Cerramos en SaaS, agencias, educación e inmobiliaria
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
                    El problema casi nunca es tu producto
                  </h2>
                </div>
              </ScrollReveal>
              <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 overflow-hidden">
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
                text="Empezamos donde estés"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4"
              />
            </div>
            <ProcessTimeline steps={PROCESS_STEPS} />
            <ScrollReveal variant="fade-up" delay={2}>
              <p className="text-sm sm:text-base text-muted-foreground mt-12 text-center max-w-3xl mx-auto px-4">
                Si ya tienes proceso, empieza en el paso 2. Si no lo tienes, el paso 3 es donde está el verdadero trabajo.
              </p>
            </ScrollReveal>
          </section>

          {/* Removido en V2.1 — ver CONTENIDO_LANDING_V2.1.md: Planes. Reemplazado por Los tres modelos. */}

          {/* Los tres modelos */}
          <section id="modelos" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeadline
                text="Tres formas de trabajar con nosotros"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3">
              {WORK_MODELS.map((model) => (
                <Card
                  key={model.name}
                  className={cn(
                    "landing-section-card-hover relative flex h-full flex-col",
                    model.featured && "border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl"
                  )}
                >
                  {model.badge && (
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                      <Badge className="rounded-full">{model.badge}</Badge>
                    </div>
                  )}
                  <CardHeader className={model.featured ? "pt-8" : undefined}>
                    <CardTitle>{model.name}</CardTitle>
                    <CardDescription>Para: {model.para}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col space-y-4">
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
                    <div className="mt-auto space-y-2 pt-2">
                      <Button
                        size="lg"
                        variant={model.featured ? "default" : "outline"}
                        className="cta-shine w-full"
                        asChild
                      >
                        <a
                          href={model.href}
                          {...(model.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {model.cta}
                        </a>
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">{model.microcopy}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollReveal variant="fade-up" delay={2}>
              <p className="mt-12 text-center text-xs sm:text-sm text-muted-foreground max-w-3xl mx-auto px-4">
                La comisión de cada closer la defines y la negocias tú directamente con él. Lo que pagas a Closwork es una cuota fija por el servicio.
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

          {/* Removido en V2.1 — ver CONTENIDO_LANDING_V2.1.md: Comunidad (stats) */}

          {/* Removido en V2.1 — ver CONTENIDO_LANDING_V2.1.md: Ahorros / calculadora */}

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
          <section id="cta-final" className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeadline
                text="Empieza por donde te duela más"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground px-4"
              />
            </div>
            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
              <ScrollReveal variant="fade-up">
                <Card className="landing-section-card-hover h-full">
                  <CardHeader>
                    <CardTitle>Sé lo que necesito</CardTitle>
                    <CardDescription>
                      Publica tu oportunidad y empieza a recibir closers verificados.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button size="lg" className="cta-shine cta-glow w-full" asChild>
                      <a href={CTA_REGISTRO_EMPRESA} target="_blank" rel="noopener noreferrer">
                        Registra tu empresa
                      </a>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">Registro en 5 minutos</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={1}>
                <Card className="landing-section-card-hover h-full">
                  <CardHeader>
                    <CardTitle>No sé por dónde empezar</CardTitle>
                    <CardDescription>
                      90 minutos, sin costo. Sales con un diagnóstico de tu operación comercial y una hoja de ruta, trabajes con nosotros o no.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button size="lg" variant="outline" className="cta-shine w-full" asChild>
                      <a href={CTA_DIAGNOSTICO_URL}>
                        Agenda tu diagnóstico
                      </a>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">Cupos limitados por mes</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

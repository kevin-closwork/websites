import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { addEmpresasTycData } from "@/lib/firestoreService";

const EmpresasTyc = () => {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [rfc, setRfc] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const title = "Términos y Condiciones - Empresas | Closwork";
  const description = "Acepta los términos y condiciones para contratar servicios de Closers Elite en Closwork.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el nombre de la empresa.",
        variant: "destructive",
      });
      return;
    }

    if (!contactName.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el nombre del contacto.",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el correo electrónico.",
        variant: "destructive",
      });
      return;
    }

    if (!rfc.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa el RFC de la empresa.",
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
      await addEmpresasTycData({
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        rfc: rfc.trim(),
        accepted: true,
        acceptedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "¡Éxito!",
        description: "Has aceptado los términos y condiciones correctamente.",
      });

      // Reset form
      setCompanyName("");
      setContactName("");
      setEmail("");
      setRfc("");
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
        <link rel="canonical" href="/empresas-tyc" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/empresas-tyc" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/NgAumU4.png" alt="Closwork" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold">Closwork</span>
          </div>
          <a href="/">
            <Button variant="outline" size="sm">
              ← Volver al Inicio
            </Button>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
            <h2 className="text-2xl font-semibold text-muted-foreground">Closwork para Empresas</h2>
            <p className="text-muted-foreground mt-2">
              <strong>MIO MOBILE S.A. DE C.V.</strong> | <strong>División Closwork</strong>
            </p>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8 mb-12">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. Introducción y Aceptación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Bienvenido a Closwork, una filial de MIO MOBILE S.A. DE C.V., la plataforma que conecta empresas con socios comerciales de alto rendimiento. Estos términos establecen las reglas para el uso de nuestra plataforma, así como la recolección, uso y protección de datos personales.
                </p>
                <p>
                  Al acceder y utilizar Closwork, aceptas estos términos en su totalidad. Si no estás de acuerdo, no utilices nuestro servicio.
                </p>
              </CardContent>
            </Card>

            {/* Service Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. Planes de Servicio y Modelo de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">2.1 Estructura de Planes</h3>
                <p>Closwork opera bajo un <strong>modelo de pago único por lanzamiento</strong>, no suscripciones mensuales. Cada plan incluye todo lo necesario para conectarte con tus socios comerciales.</p>

                <div className="space-y-6 mt-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg text-primary">Plan Básico</h4>
                    <p className="text-2xl font-bold text-primary">$899 MXN (pago único)</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                      <li>1 socio comercial bajo comisión</li>
                      <li>1 tipo de producto/servicio a promocionar</li>
                      <li>Garantía de cambio: 1 cambio incluido</li>
                      <li>Sesión consultiva de onboarding (45 min)</li>
                      <li>Garantía de 30 días</li>
                      <li>Soporte: Email (respuesta en 48h)</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">Ideal para: Empresas que están comenzando o validando su modelo de ventas externas.</p>
                  </div>

                  <div className="border rounded-lg p-4 border-primary">
                    <h4 className="font-semibold text-lg text-primary">Plan Growth - Más Popular</h4>
                    <p className="text-2xl font-bold text-primary">$2,400 MXN (pago único)</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                      <li>Hasta 3 socios comerciales simultáneos</li>
                      <li>3 propuestas de servicio diferentes</li>
                      <li>Garantía de cambio: 2 cambios incluidos</li>
                      <li>Sesión consultiva extendida (90 min)</li>
                      <li>Garantía de 30 días</li>
                      <li>Soporte prioritario: Email + WhatsApp (respuesta en 24h)</li>
                      <li>Dashboard avanzado: Métricas de actividad de tus socios</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">Ideal para: Empresas en crecimiento que necesitan escalar ventas con múltiples productos/servicios.</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg text-primary">Plan Scale</h4>
                    <p className="text-2xl font-bold text-primary">$7,900 MXN (pago único)</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                      <li>Hasta 5 socios comerciales simultáneos</li>
                      <li>Propuestas ilimitadas de productos/servicios</li>
                      <li>Garantía de cambio: 3 cambios incluidos</li>
                      <li>Sesión consultiva premium (120 min + follow-up)</li>
                      <li>Garantía de 30 días</li>
                      <li>Soporte prioritario: Email + WhatsApp + videollamadas</li>
                      <li>Account Manager dedicado</li>
                      <li>Dashboard premium: Analytics completo + reportes mensuales</li>
                      <li>Sesiones de optimización: Revisión trimestral de estrategia</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">Ideal para: Empresas que buscan máximo rendimiento y presencia agresiva en el mercado.</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg text-primary">Plan Enterprise</h4>
                    <p className="text-2xl font-bold text-primary">Custom (cotización personalizada)</p>
                    <p className="mt-2">Todo lo del Plan Scale más:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                      <li>Socios comerciales ilimitados</li>
                      <li>White-label options</li>
                      <li>Integraciones custom (CRM, Slack, etc.)</li>
                      <li>SLAs personalizados</li>
                      <li>Dedicated Success Team</li>
                      <li>Recruiting exclusivo de socios para tu industria</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">Ideal para: Corporativos y empresas que necesitan soluciones a medida.</p>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mt-6">2.2 Modelo de Pago Único</h3>
                <p><strong>IMPORTANTE:</strong> Closwork NO cobra suscripciones mensuales. Cada plan es un pago único por lanzamiento.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>"Lanzamiento" se define como: El proceso completo de matching, onboarding y activación de tus socios comerciales</li>
                  <li>Después del pago, tienes acceso de por vida a tus socios comerciales conectados</li>
                  <li>No hay costos ocultos ni renovaciones automáticas</li>
                  <li>Si en el futuro quieres agregar MÁS socios comerciales, puedes adquirir un nuevo "lanzamiento"</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">2.3 Qué es un Socio Comercial en Closwork</h3>
                <p>Es fundamental entender la naturaleza de la relación:</p>
                <p><strong>Un Socio Comercial NO es:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Un empleado de tu empresa</li>
                  <li>Un freelancer contratado por proyecto</li>
                  <li>Un vendedor con sueldo base</li>
                </ul>
                <p><strong>Un Socio Comercial ES:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Un cerrador de ventas profesional que trabaja 100% bajo comisión</li>
                  <li>Independiente con experiencia comprobada en ventas</li>
                  <li>Motivado por resultados (cobra solo cuando cierra ventas)</li>
                  <li>Un multiplicador de tu fuerza de ventas sin riesgo fijo</li>
                </ul>
              </CardContent>
            </Card>

            {/* 30-Day Guarantee */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3.1 Garantía de 30 Días</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">3.1.1 Compromiso Closwork</h3>
                <p>Garantizamos que tu socio comercial será profesional, comunicativo y trabajará activamente durante los primeros 30 días.</p>
                <p>Esta garantía protege tu inversión asegurando que el socio asignado:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Se comunique regularmente contigo</li>
                  <li>Realice actividades de prospección y seguimiento</li>
                  <li>Cumpla con los acuerdos operativos básicos</li>
                  <li>Demuestre profesionalismo y compromiso</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">3.1.2 ¿Qué cubre la garantía?</h3>
                <p>La garantía de 30 días te permite:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Solicitar cambio de socio comercial si no se comunica, no trabaja, incumple acuerdos básicos o falta de profesionalismo grave</li>
                  <li>Solicitar reembolso del 100% si Closwork no puede encontrar un socio comercial viable después de 2 intentos de matching</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">3.1.3 ¿Qué NO cubre la garantía?</h3>
                <p><strong>CRÍTICO:</strong> Closwork NO se hace responsable de la cantidad de ventas generadas.</p>
                <p>Las ventas dependen de múltiples factores fuera del control de Closwork:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Calidad y competitividad de tu producto/servicio</li>
                  <li>Precio y propuesta de valor</li>
                  <li>Ciclo de ventas de tu industria</li>
                  <li>Condiciones del mercado</li>
                  <li>Materiales de ventas y soporte proporcionado por ti</li>
                  <li>Leads o prospectos disponibles</li>
                  <li>Estacionalidad y timing</li>
                </ul>
              </CardContent>
            </Card>

            {/* Match Initial Guarantee */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3.2 Garantía de Match Inicial (7 Días Hábiles)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  <strong>CLOSWORK GARANTIZA</strong> encontrar AL MENOS UN socio comercial interesado y calificado para tu empresa dentro de los primeros 7 días hábiles posteriores a la realización de tu sesión consultiva de onboarding.
                </p>
                <p>
                  Esta es nuestra garantía de que tu inversión no será en vano y que tendrás propuestas concretas rápidamente.
                </p>

                <h3 className="font-semibold text-lg mt-6">3.2.1 Definición de "Socio Comercial Interesado y Calificado"</h3>
                <p>Para efectos de esta garantía, un Socio califica como "interesado y calificado" cuando:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Ha revisado completamente tu propuesta de negocio</li>
                  <li>Cuenta con experiencia demostrable en tu industria o en ventas de productos/servicios similares</li>
                  <li>Acepta la estructura de comisiones que estás proponiendo</li>
                  <li>Está genuinamente dispuesto y disponible para tener una sesión de exploración contigo</li>
                  <li>Demuestra interés real en trabajar con tu empresa (no solo curiosidad)</li>
                  <li>Cumple con los requisitos básicos que definiste en tu perfil</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">3.2.2 Cuenta de los 7 Días Hábiles</h3>
                <p><strong>Inicio del período:</strong></p>
                <p>El conteo de 7 días hábiles inicia el primer día hábil siguiente a la finalización de tu sesión consultiva de onboarding.</p>
                
                <p><strong>Ejemplo:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Si tu sesión consultiva es un viernes, el conteo inicia el lunes siguiente</li>
                  <li>Si tu sesión es un lunes, el conteo inicia el martes</li>
                </ul>

                <p><strong>Qué cuenta como día hábil:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Lunes a viernes</li>
                  <li>EXCLUYENDO sábados, domingos y días festivos oficiales en México</li>
                </ul>

                <p><strong>Término del período:</strong></p>
                <p>El período termina al completarse el séptimo día hábil a las 11:59 PM hora del centro de México.</p>

                <h3 className="font-semibold text-lg mt-6">3.2.3 ¿Qué pasa si NO hay ningún Socio interesado en 7 días hábiles?</h3>
                <p>Si después de 7 días hábiles completos NO se ha encontrado AL MENOS UN Socio Comercial interesado y calificado, procede lo siguiente:</p>

                <p><strong>Paso 1: Notificación</strong></p>
                <p>Envía un email a hola@closwork.com con asunto: "Solicitud Reembolso - Sin Match en 7 Días - [Nombre Empresa]"</p>

                <p><strong>Paso 2: Verificación</strong></p>
                <p>Nuestro equipo verificará en un plazo de 24 horas hábiles que:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Tu perfil de empresa está completo al 100%</li>
                  <li>Se realizó efectivamente la sesión consultiva de onboarding</li>
                  <li>Han transcurrido 7 días hábiles completos</li>
                  <li>NO hubo propuestas de Socios que hayas rechazado sin causa justificada</li>
                  <li>Cumpliste con proporcionar toda la información y materiales solicitados</li>
                </ul>

                <p><strong>Paso 3: Aprobación Automática</strong></p>
                <p>Si todo está en orden, el reembolso se aprueba automáticamente.</p>

                <p><strong>Paso 4: Procesamiento del Reembolso</strong></p>
                <p>Reembolso del 100% del monto pagado por tu plan, procesado en 5-7 días hábiles a tu método de pago original.</p>

                <h3 className="font-semibold text-lg mt-6">3.2.4 Exclusiones de la Garantía de Match Inicial</h3>
                <p>Esta garantía NO aplica si:</p>

                <p><strong>Perfil incompleto:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>No completaste tu perfil de empresa al 100%</li>
                  <li>No proporcionaste información clara sobre tu producto/servicio</li>
                  <li>Falta información sobre estructura de comisiones</li>
                </ul>

                <p><strong>Rechazo injustificado:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Rechazaste propuestas de Socios calificados sin razón válida</li>
                  <li>Tus requisitos son excesivamente específicos o poco realistas</li>
                  <li>Rechazaste Socios basándote en criterios discriminatorios</li>
                </ul>

                <p><strong>Falta de colaboración:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>No respondiste a comunicaciones de Closwork en tiempo razonable</li>
                  <li>No proporcionaste materiales de ventas solicitados</li>
                  <li>No participaste activamente en el proceso de matching</li>
                </ul>

                <p><strong>Información falsa:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Proporcionaste información incorrecta o engañosa sobre tu empresa</li>
                  <li>Tergiversaste la estructura de comisiones o condiciones de trabajo</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">3.2.5 Diferencia con otras garantías</h3>
                <p><strong>IMPORTANTE:</strong> Esta Garantía de Match Inicial es INDEPENDIENTE y ADICIONAL a la Garantía de Desempeño de 30 días (Sección 3.1).</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Garantía de Match Inicial:</strong> Asegura que ENCONTRAREMOS al menos un Socio en 7 días hábiles</li>
                  <li><strong>Garantía de Desempeño:</strong> Asegura que el Socio TRABAJARÁ activamente durante 30 días</li>
                </ul>
                <p>Son dos protecciones diferentes en momentos diferentes del proceso.</p>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">5. Recolección de Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">4.1 Tipos de Datos Recolectados</h3>
                <p><strong>Información de Identificación:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nombre completo, email corporativo, teléfono</li>
                  <li>Foto de perfil (opcional)</li>
                  <li>Cargo y empresa</li>
                </ul>

                <p><strong>Información de la Empresa:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nombre legal, RFC/Tax ID, tamaño, sector</li>
                  <li>Producto/servicio a vender, ICP, ciclo de ventas</li>
                  <li>Estructura de comisiones</li>
                  <li>Materiales de ventas (pitch decks, demos, etc.)</li>
                </ul>

                <p><strong>Información de Uso:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Actividad en plataforma, mensajes, interacciones</li>
                  <li>Tiempo de sesión, clicks, búsquedas</li>
                  <li>Device info, IP address, browser type</li>
                </ul>

                <p><strong>Información Financiera:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Datos de tarjeta (procesados por Stripe, nunca almacenados por nosotros)</li>
                  <li>Historial de pagos y facturas</li>
                  <li>RFC para facturación (México)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">6. Uso de Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Utilizamos tu información para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Operación del Servicio:</strong> Crear y mantener tu cuenta, facilitar matching empresa-socio comercial, procesar pagos</li>
                  <li><strong>Mejora Continua:</strong> Analizar comportamiento para mejorar algoritmos de matching, desarrollar nuevas features</li>
                  <li><strong>Comunicaciones:</strong> Notificaciones de nuevos matches, updates de actividad de tus socios</li>
                  <li><strong>Cumplimiento Legal:</strong> Prevención de fraude, cumplir con regulaciones (GDPR, CCPA, LFPDPPP México)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">7. Protección y Seguridad de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">6.1 Medidas Técnicas</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encriptación: TLS 1.3 en tránsito, AES-256 en reposo</li>
                  <li>Infraestructura: AWS con certificación SOC 2 Type II</li>
                  <li>Autenticación: 2FA disponible, password hashing con bcrypt</li>
                  <li>Backups: Diarios automáticos con retención de 30 días</li>
                  <li>Firewall y DDoS protection: Cloudflare Enterprise</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">6.2 Medidas Organizativas</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acceso limitado bajo principio de "least privilege"</li>
                  <li>Background checks para empleados con acceso a datos sensibles</li>
                  <li>Capacitación trimestral en seguridad y privacidad</li>
                  <li>Incident response plan documentado y probado</li>
                  <li>Auditorías de seguridad anuales por terceros</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">8. Compartir Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">7.1 NO Vendemos Tus Datos</h3>
                <p>Jamás vendemos, alquilamos o comercializamos tu información personal. Tu confianza es nuestro activo más valioso.</p>

                <h3 className="font-semibold text-lg mt-6">7.2 Compartimos SOLO Cuando:</h3>
                <p><strong>Para Facilitar Matches:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Información profesional básica se comparte entre empresas y socios comerciales</li>
                  <li>Nombre, industria, tipo de producto, estructura de comisiones</li>
                  <li>Ambas partes deben aprobar la conexión antes de compartir contacto directo</li>
                  <li>Después del match, ustedes tienen comunicación directa</li>
                </ul>

                <p><strong>Con Proveedores de Servicio (Bajo DPAs estrictos):</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Stripe:</strong> Procesamiento de pagos</li>
                  <li><strong>AWS:</strong> Hosting y almacenamiento</li>
                  <li><strong>SendGrid:</strong> Emails transaccionales</li>
                  <li><strong>Mixpanel:</strong> Analytics de producto</li>
                  <li><strong>Intercom:</strong> Chat de soporte</li>
                  <li><strong>Zoom:</strong> Videollamadas de consultoría</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">7.3 Compartir entre Empresas y Socios</h3>
                <p>Cuando hay un match exitoso:</p>
                <p><strong>La Empresa recibe del Socio:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nombre completo</li>
                  <li>Email y teléfono</li>
                  <li>Experiencia relevante y track record</li>
                  <li>Referencias (si el socio autoriza)</li>
                </ul>
                <p><strong>El Socio recibe de la Empresa:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nombre de la empresa y sector</li>
                  <li>Descripción de producto/servicio</li>
                  <li>Estructura de comisiones</li>
                  <li>Materiales de ventas</li>
                  <li>Contacto directo del responsable</li>
                </ul>
                <p><strong>Después del match, Closwork NO intermedia</strong> en la relación comercial. La comunicación es directa entre ustedes.</p>
              </CardContent>
            </Card>

            {/* ARCO Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">9. Tus Derechos sobre los Datos (ARCO+)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Tienes control total sobre tu información:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>📥 Acceso:</strong> Solicita copia de todos tus datos (JSON o CSV) en cualquier momento</li>
                  <li><strong>✏️ Rectificación:</strong> Corrige información incorrecta desde tu dashboard o vía soporte</li>
                  <li><strong>🗑️ Eliminación:</strong> "Derecho al olvido" - solicita borrado completo</li>
                  <li><strong>📤 Portabilidad:</strong> Exporta tus datos para usar en otro servicio</li>
                  <li><strong>⏸️ Limitación:</strong> Pausa procesamiento para ciertos usos</li>
                  <li><strong>🚫 Oposición:</strong> Rechaza usos específicos (ej: marketing, analytics)</li>
                  <li><strong>🤖 Decisiones Automatizadas:</strong> Solicita revisión humana de matches generados por IA</li>
                </ul>
                <p><strong>Para ejercer estos derechos:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 Email a privacy@closwork.com con identificación válida</li>
                  <li>⏱️ Respuesta garantizada en 15 días hábiles máximo</li>
                  <li>💰 Sin costo para solicitudes razonables (máximo 2 por año)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">10. Cookies y Tecnologías Similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">9.1 Tipos de Cookies que Usamos</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Categoría</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Propósito</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Duración</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Opt-out Disponible</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">🔒 Esenciales</td>
                        <td className="border border-gray-300 px-4 py-2">Login, sesión, seguridad, prevención fraude</td>
                        <td className="border border-gray-300 px-4 py-2">Sesión</td>
                        <td className="border border-gray-300 px-4 py-2">❌ Requeridas</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">⚙️ Funcionalidad</td>
                        <td className="border border-gray-300 px-4 py-2">Idioma, preferencias UI, configuración dashboard</td>
                        <td className="border border-gray-300 px-4 py-2">1 año</td>
                        <td className="border border-gray-300 px-4 py-2">✅ Sí</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">📊 Analíticas</td>
                        <td className="border border-gray-300 px-4 py-2">Mixpanel, Google Analytics, comportamiento usuarios</td>
                        <td className="border border-gray-300 px-4 py-2">2 años</td>
                        <td className="border border-gray-300 px-4 py-2">✅ Sí</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">📢 Marketing</td>
                        <td className="border border-gray-300 px-4 py-2">Retargeting, ads personalizados, conversión</td>
                        <td className="border border-gray-300 px-4 py-2">90 días</td>
                        <td className="border border-gray-300 px-4 py-2">✅ Sí</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-lg mt-6">9.2 Gestión de Preferencias</h3>
                <p><strong>Configura tus cookies en:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>🌐 Dashboard &gt; Configuración &gt; Privacidad &gt; Preferencias de Cookies</li>
                  <li>O directamente en: closwork.com/cookie-settings</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">11. Retención de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">10.1 ¿Cuánto Tiempo Guardamos tu Información?</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Tipo de Dato</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Período de Retención</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Razón</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Cuenta activa</td>
                        <td className="border border-gray-300 px-4 py-2">Mientras exista la cuenta</td>
                        <td className="border border-gray-300 px-4 py-2">Operación del servicio</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Cuenta cerrada (sin reembolso)</td>
                        <td className="border border-gray-300 px-4 py-2">90 días</td>
                        <td className="border border-gray-300 px-4 py-2">Permitir reactivación</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Datos financieros</td>
                        <td className="border border-gray-300 px-4 py-2">7 años</td>
                        <td className="border border-gray-300 px-4 py-2">Requisito fiscal (SAT México)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Logs de seguridad</td>
                        <td className="border border-gray-300 px-4 py-2">1 año</td>
                        <td className="border border-gray-300 px-4 py-2">Auditorías y debugging</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">12. Transferencias Internacionales de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">11.1 ¿Dónde se Procesan tus Datos?</h3>
                <p>Tu información puede ser almacenada y procesada en:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>🇲🇽 <strong>México:</strong> Oficinas y operaciones locales</li>
                  <li>🇺🇸 <strong>Estados Unidos:</strong> Servidores AWS (US-East), Stripe, SendGrid</li>
                  <li>🇪🇺 <strong>Unión Europea:</strong> AWS EU para usuarios GDPR (si aplica)</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">11.2 Protecciones Legales</h3>
                <p>Para transferencias fuera de México, utilizamos:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ <strong>Standard Contractual Clauses (SCCs)</strong> aprobadas por Comisión Europea</li>
                  <li>✅ <strong>Data Processing Agreements (DPAs)</strong> con todos los proveedores</li>
                  <li>✅ <strong>Certificaciones:</strong> Proveedores con ISO 27001, SOC 2, Privacy Shield</li>
                  <li>✅ <strong>Evaluación de impacto:</strong> Transfer Impact Assessments (TIAs)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Minor Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">13. Protección de Menores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>❌ <strong>Servicios prohibidos para menores de 18 años.</strong></p>
                <p>Closwork es una plataforma B2B enfocada en negocios y ventas profesionales. No está diseñada ni destinada para menores de edad.</p>
                <p><strong>Si identificamos que un menor proporcionó información:</strong></p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Eliminamos la cuenta inmediatamente</li>
                  <li>Borramos todos los datos asociados</li>
                  <li>Notificamos al email registrado</li>
                </ol>
                <p><strong>Si eres padre/tutor</strong> y crees que tu hijo(a) usó Closwork:</p>
                <p>📧 Contacta urgentemente a: privacy@closwork.com</p>
                <p>Incluye: nombre del menor, email usado, cualquier evidencia</p>
                <p>Responderemos en <strong>24 horas</strong> y eliminaremos todo.</p>
              </CardContent>
            </Card>

            {/* Company-Partner Relationship */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">14. Relación Empresa-Socio Comercial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">13.1 Naturaleza de la Plataforma</h3>
                <p><strong>Closwork es una plataforma de matching, NO un employer ni intermediario laboral.</strong></p>
                <p>🔄 Facilitamos la conexión entre dos partes independientes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Empresas</strong> buscando expandir ventas</li>
                  <li><strong>Socios comerciales</strong> buscando oportunidades</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">13.2 Responsabilidades de Cada Parte</h3>
                <p><strong>Closwork es responsable de:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ Validar perfiles de socios comerciales (experiencia, referencias)</li>
                  <li>✅ Hacer matching basado en industria, experiencia y fit</li>
                  <li>✅ Facilitar el onboarding inicial</li>
                  <li>✅ Proporcionar plataforma para comunicación inicial</li>
                  <li>✅ Dar seguimiento durante garantía de 30 días</li>
                  <li>✅ Procesar cambios si el socio no trabaja</li>
                </ul>

                <p><strong>La Empresa es responsable de:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ Definir claramente comisiones y expectativas</li>
                  <li>✅ Proporcionar materiales de ventas (pitch, demos, pricing)</li>
                  <li>✅ Dar acceso/recursos necesarios al socio</li>
                  <li>✅ Comunicarse profesionalmente</li>
                  <li>✅ Pagar comisiones acordadas directamente al socio</li>
                  <li>✅ Cumplir con leyes laborales/fiscales de su país</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">13.3 Relación Contractual Directa</h3>
                <p><strong>Después del match, la relación es 100% entre Empresa y Socio.</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Closwork <strong>NO es parte</strong> del contrato empresa-socio</li>
                  <li><strong>NO intermediamos</strong> pagos de comisiones</li>
                  <li><strong>NO supervisamos</strong> el día a día de la relación</li>
                  <li><strong>NO somos responsables</strong> de disputas entre las partes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Account Cancellation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">15. Cancelación de Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">14.1 Modelo de Pago Único (Sin Renovación)</h3>
                <p>Como Closwork opera con <strong>pago único por lanzamiento</strong>:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ <strong>NO hay suscripciones mensuales</strong> que renovar</li>
                  <li>✅ <strong>NO hay cancelaciones automáticas</strong> que procesar</li>
                  <li>✅ Después de pagar, tienes <strong>acceso permanente</strong> a tus socios conectados</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">14.2 Si Deseas Cerrar tu Cuenta</h3>
                <p>Puedes cerrar tu cuenta en cualquier momento:</p>
                <p><strong>Desde el Dashboard:</strong></p>
                <p>Configuración &gt; Cuenta &gt; Cerrar Cuenta &gt; Confirmar</p>
                <p><strong>Vía Email:</strong></p>
                <p>hola@closwork.com con asunto "Solicitud Cierre de Cuenta - [Nombre Empresa]"</p>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">16. Propiedad Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">15.1 De Closwork</h3>
                <p><strong>Todos los derechos reservados sobre:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>🔒 Código fuente de la plataforma</li>
                  <li>🎨 Diseño, UI/UX, marca "Closwork" y logo</li>
                  <li>📊 Algoritmos de matching y tecnología propietaria</li>
                  <li>📝 Contenido educativo, templates, recursos</li>
                  <li>📄 Documentación y materiales de marketing</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">15.2 Contenido del Usuario</h3>
                <p><strong>Conservas todos los derechos sobre:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ Descripciones de tu empresa y productos</li>
                  <li>✅ Materiales de ventas que subes (pitch decks, demos, videos)</li>
                  <li>✅ Logos, marca y contenido corporativo</li>
                  <li>✅ Datos de clientes y prospectos</li>
                  <li>✅ Estrategias y metodologías de ventas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">17. Limitación de Responsabilidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">16.1 Servicio "AS IS"</h3>
                <p>Closwork se proporciona <strong>"TAL CUAL"</strong> sin garantías implícitas de:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>❌ Disponibilidad del 100% (aunque buscamos 99.9% uptime)</li>
                  <li>❌ Resultados de ventas específicos</li>
                  <li>❌ Disponibilidad de socios en todas las industrias en todo momento</li>
                  <li>❌ Compatibilidad perfecta en cada match</li>
                  <li>❌ Ausencia total de bugs o errores</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">16.2 Límites Máximos de Responsabilidad</h3>
                <p><strong>La responsabilidad total de Closwork está limitada al monto pagado por tu plan.</strong></p>
                <p>Ejemplos:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Plan Básico ($899 MXN): Máximo $899 MXN de responsabilidad</li>
                  <li>Plan Growth ($2,400 MXN): Máximo $2,400 MXN de responsabilidad</li>
                  <li>Plan Scale ($7,900 MXN): Máximo $7,900 MXN de responsabilidad</li>
                </ul>
              </CardContent>
            </Card>

            {/* Prohibited Conduct */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">18. Conducta Prohibida</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Para mantener un ecosistema profesional y seguro, está <strong>estrictamente prohibido:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>🚫 Usar la plataforma para fines ilegales o fraudulentos</li>
                  <li>🚫 Promover productos ilegales, esquemas piramidales o MLMs</li>
                  <li>🚫 Compartir contenido que infrinja derechos de autor o marcas</li>
                  <li>🚫 Phishing, spam o envío masivo de mensajes no solicitados</li>
                  <li>🚫 Intentar hackear, comprometer la seguridad o realizar DDoS</li>
                  <li>🚫 Acosar, amenazar, intimidar o discriminar a otros usuarios</li>
                  <li>🚫 Lenguaje ofensivo, racista, sexista o xenófobo</li>
                  <li>🚫 Suplantación de identidad o perfiles falsos</li>
                  <li>🚫 Crear múltiples cuentas para abusar de garantías o promociones</li>
                  <li>🚫 Scraping automatizado de perfiles de socios</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">17.4 Política Anti-Poaching</h3>
                <p><strong>Entendemos que las relaciones exitosas pueden evolucionar</strong>, pero:</p>
                <p>📌 Si decides <strong>contratar directamente</strong> (empleado de nómina) a un socio comercial conectado por Closwork dentro de los <strong>primeros 12 meses</strong>, debes pagar un <strong>Finder's Fee</strong> de:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Antes de 6 meses: <strong>$25,000 MXN</strong></li>
                  <li>Entre 6-12 meses: <strong>$15,000 MXN</strong></li>
                  <li>Después de 12 meses: <strong>Sin cargo</strong> 🎉</li>
                </ul>
              </CardContent>
            </Card>

            {/* Modifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">19. Modificaciones a estos Términos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">18.1 Derecho a Modificar</h3>
                <p>Closwork se reserva el derecho de actualizar estos términos para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reflejar cambios en la plataforma o nuevos servicios</li>
                  <li>Cumplir con nuevas regulaciones legales</li>
                  <li>Mejorar claridad o corregir errores</li>
                  <li>Incorporar feedback de usuarios</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">18.2 Notificación de Cambios</h3>
                <p><strong>Para cambios materiales</strong> (que afecten tus derechos sustancialmente):</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 <strong>Email:</strong> 30 días antes a tu dirección registrada</li>
                  <li>🔔 <strong>Banner:</strong> En la plataforma al iniciar sesión</li>
                  <li>📱 <strong>Notificación in-app:</strong> Popup explicando cambios clave</li>
                </ul>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">20. Resolución de Disputas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">19.1 Proceso Escalonado</h3>
                <p>Creemos en resolver conflictos de manera amistosa y eficiente:</p>
                <p><strong>Paso 1: Comunicación Directa (0-15 días)</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 Email a legal@closwork.com explicando el problema</li>
                  <li>🤝 Intentamos resolver en 15 días hábiles mediante negociación</li>
                </ul>

                <p><strong>Paso 2: Mediación (16-45 días)</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>👥 Si no hay acuerdo, mediación con tercero neutral</li>
                  <li>💰 Costos compartidos 50/50</li>
                  <li>📍 Mediación puede ser virtual o en Guadalajara</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">19.3 Jurisdicción y Ley Aplicable</h3>
                <p><strong>Ley Aplicable:</strong> 🇲🇽 <strong>Leyes de los Estados Unidos Mexicanos</strong>, específicamente el Estado de Jalisco</p>
                <p><strong>Jurisdicción Exclusiva:</strong> 📍 <strong>Tribunales de Guadalajara, Jalisco, México</strong></p>
              </CardContent>
            </Card>

            {/* Privacy and Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">21. Privacidad y Protección de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">20.1 Regulaciones Aplicables</h3>
                <p>Closwork cumple con:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>🇲🇽 <strong>LFPDPPP</strong> (Ley Federal de Protección de Datos Personales en Posesión de Particulares - México)</li>
                  <li>🇪🇺 <strong>GDPR</strong> (General Data Protection Regulation - para usuarios UE)</li>
                  <li>🇺🇸 <strong>CCPA</strong> (California Consumer Privacy Act - para usuarios California)</li>
                  <li>🌐 <strong>ISO 27001</strong> y <strong>SOC 2 Type II</strong> (en proceso de certificación)</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">20.3 Oficial de Protección de Datos</h3>
                <p>Hemos designado un Data Protection Officer (DPO):</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 <strong>Email:</strong> dpo@closwork.com</li>
                  <li>📞 <strong>Teléfono:</strong> +52 (33) 1234-5678</li>
                  <li>📍 <strong>Dirección:</strong> Av. Patria 1201, Col. Lomas del Valle, Guadalajara, Jalisco, CP 44100</li>
                </ul>
              </CardContent>
            </Card>

            {/* Legal Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">22. Notificaciones Legales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">21.1 Cómo Contactarnos</h3>
                <p><strong>Información General:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 Email: hola@closwork.com</li>
                  <li>🌐 Website: www.closwork.com</li>
                </ul>

                <p><strong>Soporte Técnico:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 Email: support@closwork.com</li>
                  <li>💬 Chat en plataforma (usuarios activos)</li>
                  <li>📱 WhatsApp: +52 (33) 1234-5678 (Solo Plan Growth y Scale)</li>
                </ul>

                <p><strong>Privacidad y Datos:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 Email: privacy@closwork.com</li>
                  <li>📧 DPO: dpo@closwork.com</li>
                </ul>

                <p><strong>Legal y Disputas:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>📧 Email: legal@closwork.com</li>
                </ul>

                <p><strong>Dirección Física:</strong></p>
                <p>📍 Closwork (Filial de MIO MOBILE S.A. DE C.V.)</p>
                <p>Av. Patria 1201, Piso 3</p>
                <p>Col. Lomas del Valle</p>
                <p>Guadalajara, Jalisco</p>
                <p>CP 44100, México</p>
                <p><strong>RFC:</strong> MMO230415ABC (Ejemplo - reemplaza con real)</p>
              </CardContent>
            </Card>

            {/* Miscellaneous */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">23. Misceláneos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">22.1 Acuerdo Completo</h3>
                <p>Estos Términos y Condiciones, junto con:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Política de Privacidad (closwork.com/privacy)</li>
                  <li>Política de Cookies (closwork.com/cookies)</li>
                  <li>SLAs de Servicio (para Plan Scale y Enterprise)</li>
                </ul>
                <p>Constituyen el <strong>acuerdo completo</strong> entre tú y Closwork, y reemplazan cualquier acuerdo previo verbal o escrito.</p>

                <h3 className="font-semibold text-lg mt-6">22.6 Fuerza Mayor</h3>
                <p>Closwork <strong>NO será responsable</strong> por retrasos o incumplimientos causados por eventos fuera de nuestro control razonable:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Desastres naturales (terremotos, huracanes, inundaciones)</li>
                  <li>Pandemias o emergencias sanitarias</li>
                  <li>Guerras, terrorismo, disturbios civiles</li>
                  <li>Fallas masivas de internet o infraestructura</li>
                  <li>Acciones gubernamentales (cierres, restricciones)</li>
                  <li>Huelgas o conflictos laborales</li>
                  <li>Interrupciones de proveedores críticos (AWS, Stripe)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Acceptance and Consent */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">24. Aceptación y Consentimiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">23.1 Requisitos para Aceptar</h3>
                <p>Al hacer click en <strong>"Acepto"</strong>, registrarte o usar Closwork, declaras y garantizas que:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ Eres mayor de 18 años</li>
                  <li>✅ Tienes capacidad legal para contratar</li>
                  <li>✅ Representas a una empresa real con facultades para obligarla</li>
                  <li>✅ Has leído y entendido estos términos completamente</li>
                  <li>✅ Aceptas estar legalmente vinculado por ellos</li>
                  <li>✅ La información proporcionada es verdadera y completa</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">23.2 Consentimiento para Procesamiento de Datos</h3>
                <p>Al aceptar estos términos, <strong>otorgas consentimiento expreso</strong> para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ Recolección de datos según Sección 4</li>
                  <li>✅ Uso de datos según Sección 5</li>
                  <li>✅ Compartir datos según Sección 7</li>
                  <li>✅ Transferencias internacionales según Sección 11</li>
                  <li>✅ Uso de cookies según Sección 9</li>
                  <li>✅ Comunicaciones de marketing (con opt-out disponible)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Version Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">25. Información de Versión y Vigencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Versión:</strong> 3.0</p>
                <p><strong>Fecha de Última Actualización:</strong> 7 de Octubre, 2025</p>
                <p><strong>Fecha de Entrada en Vigor:</strong> 7 de Octubre, 2025</p>
                <p><strong>Versión Anterior:</strong> 2.0 (válida hasta 6 de Octubre, 2025)</p>

                <h3 className="font-semibold text-lg mt-6">Principales cambios en esta versión:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cambio de modelo de suscripción mensual a pago único por lanzamiento</li>
                  <li>Ajuste de pricing a $899, $2,400 y $7,900 MXN</li>
                  <li>Clarificación de garantía 30 días (desempeño del socio, NO ventas)</li>
                  <li>Adición de política anti-poaching detallada</li>
                  <li>Expansión de sección de privacidad para LFPDPPP</li>
                  <li>Actualización de información corporativa (filial de MIO MOBILE S.A. DE C.V.)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Final Declaration */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-xl text-primary">✅ DECLARACIÓN FINAL DE ACEPTACIÓN</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold text-center text-lg">
                  <strong>AL HACER CLIC EN "ACEPTO", REGISTRARSE EN LA PLATAFORMA O EFECTUAR CUALQUIER PAGO EN CLOSWORK, LA EMPRESA RECONOCE Y DECLARA HABER LEÍDO, COMPRENDIDO Y ACEPTADO COMPLETA E ÍNTEGRAMENTE ESTOS TÉRMINOS Y CONDICIONES, OBLIGÁNDOSE A SU ESTRICTO CUMPLIMIENTO Y ACEPTANDO TODAS LAS LIMITACIONES DE RESPONSABILIDAD, DESLINDES Y CONDICIONES AQUÍ ESTABLECIDAS.</strong>
                </p>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <p className="text-center font-semibold">
                    <strong>MIO MOBILE S.A. DE C.V.</strong><br />
                    <strong>División Closwork</strong><br />
                    <strong>Guadalajara, Jalisco, México</strong><br />
                    <strong>Contacto:</strong> <a href="mailto:hola@closwork.com" className="text-primary hover:underline">hola@closwork.com</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acceptance Form */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Formulario de Aceptación</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ingresa el nombre de la empresa"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nombre del Contacto *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ingresa el nombre del contacto"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@empresa.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rfc">RFC de la Empresa *</Label>
                    <Input
                      id="rfc"
                      type="text"
                      value={rfc}
                      onChange={(e) => setRfc(e.target.value)}
                      placeholder="RFC123456789"
                      required
                      className="w-full"
                    />
                  </div>
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
                      Al marcar esta casilla, confirmo que he leído, comprendido y acepto todos los términos y condiciones establecidos en este documento, 
                      incluyendo el reconocimiento de que Closwork actúa únicamente como facilitador de conexión y que no se responsabiliza por la relación 
                      comercial posterior entre mi empresa y los Closers, así como todas las limitaciones de responsabilidad establecidas.
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting || !companyName.trim() || !contactName.trim() || !email.trim() || !rfc.trim() || !accepted}
                >
                  {isSubmitting ? "Procesando..." : "ACEPTAR TÉRMINOS Y CONDICIONES"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Back to Home Button */}
          <div className="text-center mt-12">
            <a href="/">
              <Button size="lg" className="px-8" variant="outline">
                Volver al Inicio
              </Button>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50">
        <div className="container py-8">
          <div className="text-center">
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

export default EmpresasTyc;

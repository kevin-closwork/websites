import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { addEmpresasTycData } from "@/lib/firestoreService";
import { getStripeCheckoutUrl } from "@/lib/stripeConfig";

const EmpresasTycGrowth = () => {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [rfc, setRfc] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const title = "Términos y Condiciones - Plan Growth | Closwork";
  const description = "Acepta los términos y condiciones para contratar el Plan Growth en Closwork.";

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
        plan: "planGrowth",
      });

      toast({
        title: "¡Éxito!",
        description: "Redirigiendo al proceso de pago...",
      });

      // Redirigir al link de Stripe del Plan Growth
      const stripeUrl = getStripeCheckoutUrl("planGrowth");
      window.location.href = stripeUrl;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/empresas-tyc-growth" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/empresas-tyc-growth" />
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
            <h2 className="text-2xl font-semibold text-muted-foreground">Plan Growth - Closwork para Empresas</h2>
            <div className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-[#4aab6f] to-[#6bbf8a] rounded-full">
              <p className="text-lg font-semibold text-white">$1,900 MXN /mes</p>
            </div>
            <p className="text-muted-foreground mt-4">
              <strong>MIO MOBILE S.A. DE C.V.</strong> | <strong>División Closwork</strong>
            </p>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Important Notice Banner */}
          <div className="mb-8 p-6 bg-gradient-to-r from-[#4aab6f] to-[#6bbf8a] rounded-xl shadow-lg border-2 border-[#4aab6f]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Paso Requerido Antes del Pago
                </h3>
                <p className="text-white/95 text-base leading-relaxed">
                  Para continuar con tu compra del <strong>Plan Growth</strong>, es necesario que leas y aceptes nuestros términos y condiciones de servicio. 
                  Este documento contiene información importante sobre tu suscripción, garantías, responsabilidades y derechos como cliente.
                </p>
                <p className="text-white/90 text-sm mt-3 font-medium">
                  ⚠️ Por favor, tómate unos minutos para revisar el contenido completo antes de proceder al pago.
                </p>
              </div>
            </div>
          </div>

          {/* Plan Highlight */}
          <Card className="mb-8 border-2 border-[#4aab6f] bg-gradient-to-br from-[#4aab6f]/10 to-[#6bbf8a]/10">
            <CardHeader>
              <CardTitle className="text-xl text-[#4aab6f]">Plan Growth - $1,900 MXN/mes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>2 socios comerciales simultáneamente</li>
                <li>Garantía extendida</li>
                <li>2 sesiones consultivas/mes (30 min c/u)</li>
                <li>Prioridad en asignación de socios comerciales</li>
                <li>WhatsApp support</li>
                <li>Acceso a eventos Closwork</li>
              </ul>
            </CardContent>
          </Card>

          {/* Terms Content - Scrollable Container */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Términos y Condiciones de Servicio</CardTitle>
              <p className="text-sm text-muted-foreground">CLOSWORK - División de MIO MOBILE S.A. DE C.V.</p>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto pr-4 space-y-6 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-base mb-2">1. IDENTIFICACIÓN DEL PRESTADOR DE SERVICIOS</h3>
                  <p><strong>Razón Social:</strong> MIO MOBILE S.A. DE C.V.</p>
                  <p><strong>Nombre Comercial:</strong> Closwork</p>
                  <p><strong>Domicilio:</strong> Guadalajara, Jalisco, México</p>
                  <p><strong>Contacto:</strong> hola@closwork.com</p>
                  <p><strong>Sitio Web:</strong> www.closwork.com</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">2. DEFINICIONES</h3>
                  <p>Para efectos de estos Términos y Condiciones, se entenderá por:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li><strong>"Closwork" o "La Plataforma":</strong> El servicio de marketplace digital operado por MIO MOBILE S.A. DE C.V. que conecta empresas con socios comerciales independientes.</li>
                    <li><strong>"Cliente" o "Empresa":</strong> Persona física con actividad empresarial o persona moral que contrata los servicios de Closwork para conectarse con socios comerciales.</li>
                    <li><strong>"Socio Comercial" o "Closer":</strong> Profesional independiente de ventas que opera bajo esquema 100% comisionista, registrado en la plataforma Closwork.</li>
                    <li><strong>"Plan":</strong> Paquete de servicios contratado por el Cliente, con características y precio específicos.</li>
                    <li><strong>"Mensualidad":</strong> Pago recurrente mensual correspondiente al Plan contratado, requerido para mantener activos los servicios.</li>
                    <li><strong>"Matching":</strong> Proceso de selección y asignación de Socios Comerciales compatibles con el perfil y necesidades del Cliente.</li>
                    <li><strong>"Lanzamiento":</strong> Proceso completo que incluye matching, onboarding, capacitación inicial y activación del Socio Comercial asignado.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">3. OBJETO DEL CONTRATO</h3>
                  <p>Closwork es una plataforma intermediaria que facilita la conexión entre Empresas y Socios Comerciales independientes. Closwork NO:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Emplea, contrata o tiene relación laboral con los Socios Comerciales</li>
                    <li>Garantiza resultados de ventas específicos</li>
                    <li>Asume responsabilidad sobre las acciones de los Socios Comerciales fuera de la plataforma</li>
                    <li>Controla las negociaciones comerciales entre Cliente y Socio Comercial</li>
                    <li>Se responsabiliza por la calidad, legalidad o viabilidad de los productos/servicios del Cliente</li>
                  </ul>
                  <p className="mt-2">Closwork SÍ proporciona:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Acceso a red verificada de Socios Comerciales profesionales</li>
                    <li>Proceso de matching personalizado</li>
                    <li>Herramientas de gestión y seguimiento</li>
                    <li>Soporte técnico y operativo según el Plan contratado</li>
                    <li>Facilitación de la relación comercial inicial</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">4. PLANES DE SERVICIO</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">4.1 Plan Growth - $1,900 MXN/mes</h4>
                  <p className="font-semibold mb-2">MODELO DE PAGO: SUSCRIPCIÓN MENSUAL RECURRENTE</p>
                  <p>El Cliente acepta expresamente que este servicio opera bajo modelo de suscripción con renovación automática mensual hasta que el Cliente solicite explícitamente su cancelación.</p>
                  <p className="mt-2"><strong>Características incluidas:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>2 socios comerciales simultáneamente activos</li>
                    <li>Garantía de servicio mensual (ver Sección 5)</li>
                    <li>2 sesiones consultivas mensuales de 30 minutos cada una</li>
                    <li>Prioridad en asignación de nuevos socios comerciales</li>
                    <li>Soporte vía WhatsApp Business en horario laboral</li>
                    <li>Acceso a eventos y capacitaciones Closwork</li>
                  </ul>
                  <p className="mt-2"><em>Ideal para: Empresas B2B en crecimiento que requieren escalar ventas con múltiples productos/servicios o territorios.</em></p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">4.2 Términos de Pago y Renovación</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li><strong>Primer Pago:</strong> Al contratar el Plan, el Cliente paga $1,900 MXN correspondientes al primer mes de servicio</li>
                    <li><strong>Renovación Automática:</strong> El cargo se realizará automáticamente cada 30 días naturales</li>
                    <li><strong>Método de Pago:</strong> Tarjeta de crédito/débito, transferencia bancaria o métodos autorizados por Closwork</li>
                    <li><strong>Facturación:</strong> Se emitirá CFDI por cada pago mensual realizado</li>
                    <li><strong>Mora:</strong> El retraso en el pago suspenderá inmediatamente el acceso a los servicios hasta regularización</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">4.3 Vigencia del Plan</h4>
                  <p>El Plan contratado permanece activo EXCLUSIVAMENTE mientras el pago mensual esté al corriente.</p>
                  <p className="mt-2"><strong>Al suspenderse el pago:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Se desactiva el acceso a la plataforma</li>
                    <li>Se suspenden sesiones consultivas</li>
                    <li>Se pierde prioridad en matching</li>
                    <li>Los Socios Comerciales asignados pueden ser reasignados a otros clientes activos</li>
                    <li>Closwork no garantiza disponibilidad de los mismos Socios Comerciales al reactivar</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">5. GARANTÍA DE SERVICIO MENSUAL</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">5.1 Alcance de la Garantía</h4>
                  <p className="font-semibold mb-2">IMPORTANTE: Esta garantía aplica ÚNICAMENTE durante los meses en que el pago esté al corriente. No es una garantía de resultados de ventas.</p>
                  <p>Closwork garantiza proporcionar mensualmente:</p>
                  <p className="mt-2"><strong>✅ Acceso continuo a Socios Comerciales asignados:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Mantenimiento de 2 socios comerciales activos en tu cuenta</li>
                    <li>Reemplazo inmediato en caso de baja voluntaria del Socio Comercial</li>
                  </ul>
                  <p className="mt-2"><strong>✅ Cumplimiento de beneficios del Plan:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>2 sesiones consultivas mensuales (deben agendarse con mínimo 48hrs de anticipación)</li>
                    <li>Respuesta en WhatsApp Business en máximo 24 horas hábiles</li>
                    <li>Acceso a plataforma y dashboard sin interrupciones técnicas</li>
                  </ul>
                  <p className="mt-2"><strong>✅ Derecho a solicitar cambio de Socio Comercial:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Sin costo adicional, 1 vez por mes</li>
                    <li>Por motivos justificados (falta de comunicación, incumplimiento de acuerdos básicos, incompatibilidad profesional)</li>
                    <li>Proceso de nuevo matching en máximo 7 días hábiles</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">5.2 Limitaciones de la Garantía</h4>
                  <p><strong>❌ La garantía NO cubre:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Cantidad de ventas generadas por los Socios Comerciales</li>
                    <li>Calidad o cierre de leads proporcionados por el Cliente</li>
                    <li>Desempeño de ventas afectado por factores externos (precio, competencia, mercado, producto)</li>
                    <li>Acciones independientes de los Socios Comerciales fuera de la plataforma</li>
                    <li>Conflictos personales no relacionados con profesionalismo</li>
                    <li>Cambios ilimitados de Socios Comerciales (máximo 1 por mes sin costo)</li>
                    <li>Servicios durante períodos sin pago (la garantía se reactiva al regularizar)</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">5.3 Proceso para Ejercer la Garantía</h4>
                  <p>Para solicitar cambio de Socio Comercial o reportar incumplimiento de beneficios:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
                    <li>Enviar solicitud formal a hola@closwork.com con asunto "Garantía de Servicio"</li>
                    <li>Incluir: nombre del Socio Comercial, motivo detallado, evidencia (capturas, correos, etc.)</li>
                    <li>Closwork evaluará en máximo 48 horas hábiles</li>
                    <li>Si procede: nuevo matching en 5-7 días hábiles</li>
                    <li>Si no procede: se explicará razón fundamentada</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">6. NATURALEZA DE LA RELACIÓN CON SOCIOS COMERCIALES</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">6.1 Definición de Socio Comercial</h4>
                  <p>El Cliente reconoce y acepta expresamente que los Socios Comerciales son:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Profesionales INDEPENDIENTES sin relación laboral con Closwork ni con el Cliente</li>
                    <li>✓ Trabajan bajo esquema 100% comisionista (sin sueldo base ni prestaciones)</li>
                    <li>✓ Responsables únicos de sus acciones, decisiones comerciales y obligaciones fiscales</li>
                    <li>✓ Libres de establecer sus propios horarios, métodos y estrategias de venta</li>
                    <li>✓ NO empleados, NO subordinados, NO representantes legales de ninguna de las partes</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">6.2 Responsabilidades del Cliente Respecto al Socio Comercial</h4>
                  <p>El Cliente es COMPLETAMENTE RESPONSABLE de:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Establecer acuerdos de comisiones claros y por escrito</li>
                    <li>Pagar las comisiones pactadas directamente al Socio Comercial</li>
                    <li>Proporcionar materiales de venta, capacitación de producto y soporte necesario</li>
                    <li>Cumplir con cualquier contrato privado establecido con el Socio Comercial</li>
                    <li>Verificar la legalidad y cumplimiento fiscal de los pagos realizados</li>
                    <li>Resolver conflictos comerciales directamente con el Socio Comercial</li>
                  </ul>
                  <p className="mt-2">Closwork NO interviene en:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Negociación de comisiones</li>
                    <li>Pagos entre Cliente y Socio Comercial</li>
                    <li>Disputas sobre ventas cerradas o comisiones adeudadas</li>
                    <li>Acuerdos comerciales privados entre las partes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">7. DESLINDE DE RESPONSABILIDAD</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">7.1 Limitación General de Responsabilidad</h4>
                  <p className="font-semibold mb-2">EL CLIENTE RECONOCE Y ACEPTA EXPRESAMENTE QUE CLOSWORK:</p>
                  <p><strong>❌ NO es responsable de:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Fraudes, estafas o conductas ilícitas cometidas por Socios Comerciales hacia Clientes, prospectos o terceros</li>
                    <li>Uso indebido de información confidencial por parte de Socios Comerciales</li>
                    <li>Daños, pérdidas o lucro cesante derivados de acciones de Socios Comerciales</li>
                    <li>Incumplimientos contractuales entre Cliente y Socio Comercial</li>
                    <li>Ventas no cerradas, clientes perdidos o malas prácticas comerciales del Socio Comercial</li>
                    <li>Violaciones a derechos de terceros (propiedad intelectual, datos personales, competencia desleal)</li>
                    <li>Accidentes, daños físicos o patrimoniales ocurridos durante actividades de venta</li>
                    <li>Obligaciones fiscales, laborales o legales del Socio Comercial o del Cliente</li>
                    <li>Calidad, legalidad, veracidad o viabilidad de los productos/servicios que el Cliente vende</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">7.2 Uso Fraudulento de la Plataforma</h4>
                  <p>Closwork se reserva el derecho de:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Suspender o cancelar cuentas con actividad sospechosa</li>
                    <li>Reportar a autoridades cualquier uso ilícito detectado</li>
                    <li>Bloquear a Socios Comerciales o Clientes que violen estos términos</li>
                    <li>Negar servicio sin responsabilidad de reembolso en casos de fraude comprobado</li>
                  </ul>
                  <p className="mt-2">El Cliente acepta que cualquier actividad ilegal realizada a través de la plataforma es responsabilidad exclusiva del infractor, liberando a Closwork de cualquier reclamación.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">7.3 Verificación de Antecedentes</h4>
                  <p>Aunque Closwork realiza verificación básica de Socios Comerciales (identidad, experiencia declarada, referencias), NO garantiza:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Veracidad absoluta de información proporcionada por Socios Comerciales</li>
                    <li>Ausencia de antecedentes penales, civiles o fiscales</li>
                    <li>Conducta ética futura del Socio Comercial</li>
                    <li>Idoneidad total para las necesidades específicas del Cliente</li>
                  </ul>
                  <p className="mt-2">El Cliente acepta realizar su propia due diligence adicional si lo considera necesario.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">8. CANCELACIÓN Y REEMBOLSOS</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">8.1 Cancelación por el Cliente</h4>
                  <p>El Cliente puede cancelar su suscripción en cualquier momento mediante:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Solicitud escrita a hola@closwork.com con 5 días de anticipación al próximo cobro</li>
                    <li>Desde la configuración de su cuenta en la plataforma (si disponible)</li>
                  </ul>
                  <p className="mt-2"><strong>Efectos de la cancelación:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Se desactiva renovación automática</li>
                    <li>Los servicios permanecen activos hasta finalizar el período pagado</li>
                    <li>No se generan reembolsos por días no utilizados del mes en curso</li>
                    <li>Se pierde acceso a la plataforma al concluir el período pagado</li>
                    <li>Los Socios Comerciales asignados quedan disponibles para otros clientes</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">8.2 Cancelación por Closwork</h4>
                  <p>Closwork puede cancelar el servicio inmediatamente y sin reembolso si:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>El Cliente incumple estos Términos y Condiciones</li>
                    <li>Se detecta uso fraudulento, ilícito o abusivo de la plataforma</li>
                    <li>El Cliente proporciona información falsa o engañosa</li>
                    <li>Existe mora en pagos superior a 7 días naturales</li>
                    <li>El Cliente acosa, discrimina o agrede a Socios Comerciales o personal de Closwork</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">8.3 Política de Reembolsos</h4>
                  <p className="font-semibold mb-2">NO SE REALIZAN REEMBOLSOS excepto en los siguientes casos específicos:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Error de cobro duplicado: Reembolso del 100% del cargo duplicado</li>
                    <li>✓ Falla técnica total de la plataforma por más de 72 horas consecutivas sin solución: Reembolso proporcional del mes</li>
                    <li>✓ Incumplimiento de Closwork en asignación de Socios Comerciales: Reembolso del 100% si después de 15 días hábiles no se han asignado los Socios Comerciales prometidos</li>
                  </ul>
                  <p className="mt-2"><strong>Motivos que NO generan reembolso:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Insatisfacción con el desempeño de ventas de los Socios Comerciales</li>
                    <li>Incompatibilidad personal con Socios Comerciales asignados</li>
                    <li>Cambio de estrategia comercial del Cliente</li>
                    <li>Falta de tiempo del Cliente para gestionar a los Socios Comerciales</li>
                    <li>Resultados comerciales por debajo de expectativas del Cliente</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">9. PROPIEDAD INTELECTUAL</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">9.1 Contenidos de Closwork</h4>
                  <p>Todos los contenidos de la plataforma (diseño, software, logos, textos, gráficos, bases de datos, código) son propiedad exclusiva de MIO MOBILE S.A. DE C.V. y están protegidos por leyes de propiedad intelectual.</p>
                  <p className="mt-2">Queda estrictamente prohibido:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Copiar, reproducir o distribuir contenidos de la plataforma</li>
                    <li>Realizar ingeniería inversa del software</li>
                    <li>Extraer bases de datos de Socios Comerciales</li>
                    <li>Usar la marca "Closwork" sin autorización escrita</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">9.2 Información del Cliente</h4>
                  <p>El Cliente conserva todos los derechos sobre:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Materiales de venta proporcionados a Socios Comerciales</li>
                    <li>Información de su empresa y productos</li>
                    <li>Estrategias comerciales y contenidos propios</li>
                  </ul>
                  <p className="mt-2">Closwork tiene licencia limitada para usar estos materiales exclusivamente para facilitar el servicio contratado.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">10. PROTECCIÓN DE DATOS PERSONALES</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">10.1 Aviso de Privacidad</h4>
                  <p>Closwork cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. El Aviso de Privacidad integral está disponible en: www.closwork.com/privacidad</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">10.2 Datos Recopilados</h4>
                  <p>Para proporcionar el servicio, Closwork recopila:</p>
                  <p className="mt-2"><strong>Del Cliente:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Datos de contacto (nombre, correo, teléfono)</li>
                    <li>Información empresarial (razón social, RFC, giro)</li>
                    <li>Datos de facturación y pago</li>
                    <li>Información sobre productos/servicios a vender</li>
                  </ul>
                  <p className="mt-2"><strong>De Socios Comerciales:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Datos de identificación y contacto</li>
                    <li>Experiencia profesional y referencias</li>
                    <li>Datos bancarios para recomendaciones de pago</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">10.3 Uso de Datos</h4>
                  <p>Los datos se utilizan exclusivamente para:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Proporcionar los servicios contratados</li>
                    <li>Realizar matching efectivo</li>
                    <li>Comunicación entre las partes</li>
                    <li>Facturación y cobro</li>
                    <li>Mejora del servicio</li>
                  </ul>
                  <p className="mt-2">Closwork NO vende, renta ni comparte datos personales con terceros no relacionados con la prestación del servicio.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">10.4 Derechos ARCO</h4>
                  <p>El Cliente puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición mediante solicitud a: privacidad@closwork.com</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">11. OBLIGACIONES DEL CLIENTE</h3>
                  <p>El Cliente se compromete a:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Proporcionar información veraz, completa y actualizada</li>
                    <li>✓ Cumplir con todos los pagos en tiempo y forma</li>
                    <li>✓ Tratar con respeto y profesionalismo a Socios Comerciales y personal de Closwork</li>
                    <li>✓ Proporcionar materiales de venta, capacitación y soporte necesarios a Socios Comerciales</li>
                    <li>✓ Pagar comisiones pactadas con Socios Comerciales de manera puntual</li>
                    <li>✓ Usar la plataforma únicamente para fines legítimos y legales</li>
                    <li>✓ Mantener confidencialidad de credenciales de acceso</li>
                    <li>✓ Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
                    <li>✓ Cumplir con todas las leyes aplicables en México y su jurisdicción</li>
                  </ul>
                  <p className="mt-2">El incumplimiento de estas obligaciones faculta a Closwork para suspender o cancelar el servicio sin reembolso.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">12. PROPIEDAD DE LEADS Y CLIENTES</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">12.1 Leads Proporcionados por el Cliente</h4>
                  <p>Todos los prospectos, contactos y bases de datos proporcionadas por el Cliente son y permanecen como propiedad exclusiva del Cliente.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">12.2 Leads Generados por Socios Comerciales</h4>
                  <p>Los leads generados independientemente por los Socios Comerciales son propiedad del Socio Comercial, quien puede decidir compartirlos o no con el Cliente según acuerdos privados entre ellos.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">12.3 Clientes Cerrados</h4>
                  <p className="font-semibold mb-2">CLÁUSULA ANTI-BYPASS:</p>
                  <p>Los clientes cerrados por un Socio Comercial durante la vigencia del servicio generan derecho permanente de comisión para dicho Socio Comercial, incluso si la relación entre Cliente y Closwork finaliza.</p>
                  <p className="mt-2">El Cliente acepta que NO puede contratar directamente a los Socios Comerciales como empleados durante los 12 meses posteriores a la finalización del servicio, salvo acuerdo escrito con Closwork y compensación acordada.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">13. MODIFICACIONES AL SERVICIO</h3>
                  <p>Closwork se reserva el derecho de:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Modificar características, precios o beneficios de los Planes con 30 días de aviso previo</li>
                    <li>Actualizar estos Términos y Condiciones notificando vía correo electrónico</li>
                    <li>Suspender temporalmente la plataforma por mantenimiento (notificando con anticipación cuando sea posible)</li>
                    <li>Descontinuar servicios o funcionalidades con 60 días de aviso previo</li>
                  </ul>
                  <p className="mt-2">Los cambios en precio NO afectan suscripciones activas hasta su próxima renovación. El Cliente puede cancelar antes de la renovación si no acepta los nuevos términos.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">14. FUERZA MAYOR</h3>
                  <p>Closwork no será responsable por incumplimientos causados por:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Desastres naturales</li>
                    <li>Fallas en servicios de terceros (internet, servidores, pasarelas de pago)</li>
                    <li>Cambios regulatorios o legales</li>
                    <li>Pandemias, disturbios civiles, guerras</li>
                    <li>Ataques cibernéticos o fallas tecnológicas fuera de su control</li>
                  </ul>
                  <p className="mt-2">En estos casos, Closwork hará sus mejores esfuerzos por restablecer el servicio y notificará oportunamente a los Clientes afectados.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">15. RESOLUCIÓN DE CONTROVERSIAS</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">15.1 Jurisdicción y Ley Aplicable</h4>
                  <p>Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos.</p>
                  <p className="mt-2">Cualquier controversia derivada de estos términos será resuelta mediante:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Negociación directa entre las partes (15 días naturales)</li>
                    <li>Mediación ante institución acordada mutuamente (30 días naturales)</li>
                    <li>Jurisdicción: Tribunales de Guadalajara, Jalisco, México</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">15.2 Renuncia a Demandas Colectivas</h4>
                  <p>El Cliente renuncia expresamente a participar en demandas colectivas contra Closwork, aceptando que cualquier disputa será resuelta de manera individual.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">16. DISPOSICIONES FINALES</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">16.1 Independencia de Cláusulas</h4>
                  <p>Si alguna disposición de estos Términos es declarada inválida o inexigible, las demás cláusulas permanecerán en pleno vigor.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">16.2 Cesión</h4>
                  <p>El Cliente no puede ceder sus derechos u obligaciones sin consentimiento escrito de Closwork. Closwork puede ceder estos términos libremente.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">16.3 Comunicaciones</h4>
                  <p>Todas las comunicaciones oficiales deben enviarse a:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Closwork: hola@closwork.com</li>
                    <li>Cliente: Al correo electrónico registrado en la plataforma</li>
                  </ul>
                  <p className="mt-2">Las notificaciones se consideran recibidas 24 horas después del envío del correo electrónico.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">16.4 Idioma</h4>
                  <p>En caso de traducción de estos términos, la versión en español prevalecerá en caso de conflicto interpretativo.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">17. ACEPTACIÓN Y CONSENTIMIENTO</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">17.1 Formas de Aceptación</h4>
                  <p>El Cliente acepta estos Términos y Condiciones mediante cualquiera de las siguientes acciones:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✅ Marcar la casilla "Acepto los Términos y Condiciones" durante el registro</li>
                    <li>✅ Realizar el primer pago por el servicio</li>
                    <li>✅ Acceder y usar la plataforma Closwork</li>
                    <li>✅ Firmar electrónicamente el contrato de servicio</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">17.2 Declaración de Lectura y Comprensión</h4>
                  <p className="font-semibold mb-2">AL ACEPTAR ESTOS TÉRMINOS, EL CLIENTE DECLARA BAJO PROTESTA DE DECIR VERDAD QUE:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Ha leído COMPLETAMENTE estos Términos y Condiciones</li>
                    <li>Los ha COMPRENDIDO en su totalidad</li>
                    <li>Acepta TODAS las limitaciones de responsabilidad de Closwork aquí establecidas</li>
                    <li>Reconoce que Closwork es un intermediario, no garantiza ventas ni resultados comerciales</li>
                    <li>Comprende que los Socios Comerciales son profesionales independientes sin relación laboral</li>
                    <li>Acepta que NO hay reembolsos por insatisfacción con resultados de ventas</li>
                    <li>Reconoce su responsabilidad exclusiva sobre acuerdos con Socios Comerciales</li>
                    <li>Acepta la garantía limitada y sus alcances específicos</li>
                    <li>Libera a Closwork de cualquier responsabilidad por fraudes, negligencias o conductas ilícitas de Socios Comerciales</li>
                    <li>Acepta la renovación automática mensual y condiciones de cancelación</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">17.3 Constancia de Aceptación</h4>
                  <p>Esta aceptación queda registrada electrónicamente con:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Fecha y hora exacta</li>
                    <li>Dirección IP desde la cual se aceptó</li>
                    <li>Versión de los Términos aceptada</li>
                    <li>Identificador único de usuario</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">18. CONTACTO Y ATENCIÓN AL CLIENTE</h3>
                  <p>Para cualquier duda, aclaración o soporte:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li><strong>Correo electrónico:</strong> hola@closwork.com</li>
                    <li><strong>Horario de atención:</strong> Lunes a viernes, 9:00 AM - 6:00 PM (Hora del Centro de México)</li>
                    <li><strong>Tiempo de respuesta:</strong> Máximo 24 horas hábiles</li>
                    <li><strong>WhatsApp Business:</strong> Solo para clientes con Plan activo</li>
                  </ul>
                </div>

                <div className="border-t pt-4 mt-6">
                  <h3 className="font-semibold text-base mb-2">DECLARACIÓN FINAL</h3>
                  <p>MIO MOBILE S.A. DE C.V., operando como Closwork, agradece tu confianza en nuestra plataforma. Estos Términos y Condiciones están diseñados para establecer una relación transparente, justa y mutuamente beneficiosa.</p>
                  <p className="mt-2">Nuestro compromiso es proporcionarte acceso a los mejores Socios Comerciales de LATAM y brindarte las herramientas para escalar tus ventas. Tu éxito comercial dependerá de la calidad de tu oferta, el esfuerzo conjunto con tus Socios Comerciales y la ejecución de tu estrategia de ventas.</p>
                  <p className="mt-2 font-semibold">Bienvenido a Closwork - El Commission Crowd de LATAM.</p>
                  <p className="mt-4 text-xs text-center">
                    <strong>Última actualización:</strong> Diciembre 2024<br />
                    <strong>Versión:</strong> 2.0<br />
                    <strong>© 2024 MIO MOBILE S.A. DE C.V. | Todos los derechos reservados</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance Form */}
          <Card className="border-2 border-[#4aab6f]">
            <CardHeader>
              <CardTitle className="text-xl text-[#4aab6f]">Formulario de Aceptación - Plan Growth</CardTitle>
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
                  className="w-full bg-gradient-to-r from-[#4aab6f] to-[#6bbf8a] hover:from-[#6bbf8a] hover:to-[#4aab6f] text-white" 
                  size="lg"
                  disabled={isSubmitting || !companyName.trim() || !contactName.trim() || !email.trim() || !rfc.trim() || !accepted}
                >
                  {isSubmitting ? "Procesando..." : "ACEPTAR Y CONTINUAR AL PAGO"}
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

export default EmpresasTycGrowth;


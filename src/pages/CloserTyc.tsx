import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { addCloserTycData } from "@/lib/firestoreService";

const CloserTyc = () => {
  const [fullName, setFullName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const title = "Términos y Condiciones - Closers Elite | Closwork";
  const description = "Acepta los términos y condiciones para participar como Closer Elite en Closwork.";

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

      // Reset form
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
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/closer-tyc" />
      </Helmet>

      {/* Header */}
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

      {/* Main Content */}
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
            <h2 className="text-2xl font-semibold text-muted-foreground">Closwork for Closers</h2>
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
                <CardTitle className="text-xl">🎯 CLÁUSULA INICIAL - RECONOCIMIENTO DE MODELO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Al registrarse en Closwork, EL CLOSER reconoce que está accediendo a un <strong>ecosistema comercial</strong> donde los profesionales eligen con qué empresas trabajar. Este modelo otorga libertades excepcionales pero también exige responsabilidades elevadas.
                </p>
              </CardContent>
            </Card>

            {/* Parties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. PARTES Y NATURALEZA JURÍDICA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">1.1 Identificación de Partes:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>MIO MOBILE S.A. DE C.V.</strong>, a través de su división comercial <strong>Closwork</strong></li>
                  <li>El profesional que se registra como <strong>"CLOSER ELITE"</strong> (en adelante "EL CLOSER")</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">1.2 Naturaleza de la Relación:</h3>
                <p>Esta relación se constituye como:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Alianza Comercial Estratégica</strong> de carácter no exclusivo</li>
                  <li><strong>Licencia de Representación Comercial</strong> limitada y revocable</li>
                  <li><strong>Modelo de Socios Comerciales Afiliados</strong> bajo régimen "pay-per-performance"</li>
                  <li><strong>EXCLUYE EXPRESAMENTE:</strong> Relación laboral, freelance, subordinación o cualquier vínculo contractual permanente</li>
                </ul>
              </CardContent>
            </Card>

            {/* Object and Scope */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. OBJETO Y ALCANCE DE LA PLATAFORMA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">2.1 Propósito Principal:</h3>
                <p>Closwork facilita la conexión entre empresas B2B verificadas y closers elite pre-validados, operando como un <strong>marketplace comercial bidireccional</strong> donde:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Las empresas publican oportunidades comerciales</li>
                  <li>Los closers ELIGEN libremente en qué proyectos participar</li>
                  <li>Todas las compensaciones se basan exclusivamente en resultados</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">2.2 Servicios Incluidos:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Directorio comercial con verificación de identidad</li>
                  <li>Sistema de matchmaking inteligente empresa-closer</li>
                  <li>Herramientas de gestión comercial y seguimiento</li>
                  <li>Soporte técnico y comercial especializado</li>
                  <li>Acceso a comunidad elite de profesionales</li>
                </ul>
              </CardContent>
            </Card>

            {/* Validation Process */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3. PROCESO DE VALIDACIÓN Y VERIFICACIÓN ELITE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">3.1 Estándares de Admisión:</h3>
                <p>Solo el cierto porcentaje de aplicantes accede a Closwork tras superar:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Verificación de identidad y antecedentes comerciales</li>
                  <li>Evaluación de competencias y experiencia en ventas B2B</li>
                  <li>Entrevista de validación con nuestro equipo comercial</li>
                  <li>Revisión de referencias y casos de éxito previos</li>
                  <li>Compromiso con código de ética comercial Closwork</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">3.2 Mantenimiento de Status Elite:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Evaluaciones de desempeño trimestrales</li>
                  <li>Cumplimiento de estándares de calidad comercial</li>
                  <li>Adherencia a valores y principios Closwork</li>
                  <li>Participación activa en la comunidad</li>
                </ul>
              </CardContent>
            </Card>

            {/* Rights and Freedoms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">4. DERECHOS Y LIBERTADES DEL CLOSER ELITE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">4.1 Autonomía Comercial:</h3>
                <p>EL CLOSER tiene <strong>libertad absoluta</strong> para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Elegir qué oportunidades comerciales aceptar</li>
                  <li>Establecer su horario y metodología de trabajo</li>
                  <li>Rechazar proyectos que no se alineen con su perfil</li>
                  <li>Trabajar desde cualquier ubicación geográfica</li>
                  <li>Determinar su nivel de actividad en la plataforma</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">4.2 Transparencia Garantizada:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acceso completo a información de empresas y oportunidades</li>
                  <li>Visibilidad total de comisiones y condiciones comerciales</li>
                  <li>Métricas de desempeño en tiempo real</li>
                  <li>Feedback directo de empresas y Closwork</li>
                </ul>
              </CardContent>
            </Card>

            {/* Obligations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">5. OBLIGACIONES Y RESPONSABILIDADES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">5.1 Confidencialidad Absoluta:</h3>
                <p>EL CLOSER se compromete a mantener <strong>confidencialidad perpetua</strong> sobre:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Información comercial, financiera y estratégica de empresas</li>
                  <li>Datos de clientes, prospectos y operaciones comerciales</li>
                  <li>Metodologías, procesos y know-how de Closwork</li>
                  <li>Información personal de otros closers y empresas</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">5.2 Integridad Comercial:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>PROHIBICIÓN TOTAL</strong> de prácticas fraudulentas, corrupción o actividades ilícitas</li>
                  <li>Cumplimiento estricto de acuerdos comerciales con empresas</li>
                  <li>Transparencia absoluta en reportes de actividad comercial</li>
                  <li>Respeto a competidores y profesionales del ecosistema</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">5.3 Lealtad Comercial:</h3>
                <p>Durante la participación en Closwork y <strong>24 meses posteriores</strong>:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>No crear, desarrollar o participar en plataformas competidoras</li>
                  <li>No utilizar información obtenida en Closwork para competir directamente</li>
                  <li>No contactar empresas de la plataforma fuera del marco establecido</li>
                  <li>No reclutar otros closers para proyectos externos</li>
                </ul>
              </CardContent>
            </Card>

            {/* Economic Model */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">6. MODELO ECONÓMICO Y COMPENSACIONES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">6.1 Esquema Pay-Per-Performance:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>100% de compensación basada en resultados comerciales</strong></li>
                  <li>Comisiones negociadas directamente entre closer y empresa</li>
                  <li>Pagos procesados según acuerdos específicos por proyecto</li>
                  <li>Closwork NO garantiza ingresos mínimos ni máximos</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">6.2 Servicios de Intermediación Financiera (Opcional):</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sistema de escrow para garantizar pagos</li>
                  <li>Procesamiento de pagos internacionales</li>
                  <li>Gestión de facturación y aspectos fiscales</li>
                  <li><strong>IMPORTANTE:</strong> Estos servicios son opcionales y sujetos a tarifas específicas</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">6.3 Deslinde de Responsabilidad Financiera:</h3>
                <p>Closwork se <strong>DESLINDA COMPLETAMENTE</strong> de:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Retrasos, incumplimientos o modificaciones en pagos</li>
                  <li>Disputas comerciales entre closers y empresas</li>
                  <li>Diferencias en interpretación de acuerdos comerciales</li>
                  <li>Fluctuaciones en resultados comerciales o ingresos</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">7. PROPIEDAD INTELECTUAL Y ACTIVOS DIGITALES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">7.1 Propiedad de Closwork:</h3>
                <p>Son propiedad exclusiva de MIO MOBILE S.A. DE C.V.:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Marca "Closwork" y elementos visuales</li>
                  <li>Plataforma tecnológica y algoritmos</li>
                  <li>Base de datos de empresas y closers</li>
                  <li>Metodologías y procesos comerciales</li>
                  <li>Contenido educativo y materiales de capacitación</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">7.2 Uso Autorizado:</h3>
                <p>EL CLOSER puede utilizar elementos de la marca exclusivamente para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Identificarse como miembro verificado de Closwork</li>
                  <li>Promocionar servicios comerciales dentro de la plataforma</li>
                  <li>Participar en actividades oficiales de la comunidad</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">8. LIMITACIÓN DE RESPONSABILIDADES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">8.1 Responsabilidades Limitadas de Closwork:</h3>
                <p>Closwork se compromete <strong>ÚNICAMENTE</strong> a:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mantener operativa la plataforma tecnológica</li>
                  <li>Verificar identidad básica de empresas y closers</li>
                  <li>Facilitar comunicación inicial entre partes</li>
                  <li>Brindar soporte técnico estándar</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">8.2 Exclusiones de Garantía:</h3>
                <p>Closwork <strong>NO GARANTIZA:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Resultados comerciales específicos</li>
                  <li>Cantidad mínima de oportunidades</li>
                  <li>Ingresos o comisiones determinados</li>
                  <li>Éxito en procesos comerciales específicos</li>
                  <li>Compatibilidad perfecta entre closers y empresas</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">8.3 Limitación de Daños:</h3>
                <p>La responsabilidad total de Closwork por cualquier concepto no excederá el <strong>equivalente a una mensualidad promedio</strong> de comisiones del closer afectado, limitada a $500 USD máximo.</p>
              </CardContent>
            </Card>

            {/* Disciplinary System */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">9. SISTEMA DISCIPLINARIO Y SANCIONES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">9.1 Infracciones Menores:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Retrasos en reportes o comunicaciones</li>
                  <li>Incumplimiento menor de estándares de calidad</li>
                </ul>
                <p><strong>Sanciones:</strong> Amonestación escrita, capacitación remedial</p>

                <h3 className="font-semibold text-lg mt-6">9.2 Infracciones Graves:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violación de confidencialidad</li>
                  <li>Prácticas comerciales cuestionables</li>
                  <li>Incumplimiento reiterado de compromisos</li>
                </ul>
                <p><strong>Sanciones:</strong> Suspensión temporal (30-180 días), restricción de oportunidades premium</p>

                <h3 className="font-semibold text-lg mt-6">9.3 Infracciones Críticas:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fraude o actividades ilícitas</li>
                  <li>Competencia desleal</li>
                  <li>Daño reputacional grave a Closwork</li>
                </ul>
                <p><strong>Sanciones:</strong> Desvinculación inmediata, acciones legales, reclamación de daños</p>
              </CardContent>
            </Card>

            {/* Advanced Protection Clauses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">10. CLÁUSULAS DE PROTECCIÓN AVANZADA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">10.1 Indemnización Integral:</h3>
                <p>EL CLOSER se obliga a <strong>indemnizar, defender y eximir de responsabilidad</strong> a MIO MOBILE S.A. DE C.V. y Closwork por:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reclamaciones de terceros derivadas de su actuación</li>
                  <li>Daños causados a empresas o clientes finales</li>
                  <li>Violaciones a derechos de propiedad intelectual</li>
                  <li>Incumplimientos legales o regulatorios</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">10.2 Fuerza Mayor:</h3>
                <p>Closwork no será responsable por interrupciones o limitaciones causadas por:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Eventos naturales, pandemias o crisis sanitarias</li>
                  <li>Fallas en servicios de terceros (internet, energía eléctrica)</li>
                  <li>Cambios regulatorios o gubernamentales</li>
                  <li>Ataques cibernéticos o problemas de seguridad</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">10.3 Supervivencia de Cláusulas:</h3>
                <p>Las siguientes disposiciones mantendrán vigencia después de la terminación:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Confidencialidad (perpetua)</li>
                  <li>No competencia (24 meses)</li>
                  <li>Indemnización (5 años)</li>
                  <li>Propiedad intelectual (perpetua)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Privacy and Data Policies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">11. POLÍTICAS DE PRIVACIDAD Y DATOS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">11.1 Tratamiento de Datos Personales:</h3>
                <p>Conforme a la <strong>Ley Federal de Protección de Datos Personales</strong>, Closwork podrá:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Procesar información personal y profesional para operación de la plataforma</li>
                  <li>Generar estadísticas y análisis de desempeño agregados</li>
                  <li>Compartir información con empresas para fines de matchmaking</li>
                  <li>Utilizar datos para mejoras tecnológicas y comerciales</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">11.2 Derechos del Titular:</h3>
                <p>EL CLOSER puede ejercer derechos ARCO (Acceso, Rectificación, Cancelación, Oposición) contactando a: <a href="mailto:hola@closwork.com" className="text-primary hover:underline">hola@closwork.com</a></p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">12. TERMINACIÓN Y DESVINCULACIÓN</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">12.1 Terminación por Closwork:</h3>
                <p>Sin previo aviso en casos de:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Infracciones graves o críticas</li>
                  <li>Inactividad prolongada (más de 180 días)</li>
                  <li>Cambios en modelo de negocio</li>
                  <li>Decisiones comerciales estratégicas</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">12.2 Terminación por el Closer:</h3>
                <p>Con aviso de 30 días, manteniendo obligaciones post-contractuales.</p>

                <h3 className="font-semibold text-lg mt-6">12.3 Efectos de la Terminación:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Pérdida inmediata de acceso a la plataforma</li>
                  <li>Finalización de oportunidades comerciales en curso</li>
                  <li>Mantenimiento de obligaciones de confidencialidad</li>
                  <li>Liquidación de comisiones pendientes (si aplicable)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Jurisdiction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">13. JURISDICCIÓN Y LEY APLICABLE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">13.1 Marco Legal:</h3>
                <p>Este acuerdo se rige por las leyes de los <strong>Estados Unidos Mexicanos</strong>, específicamente:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Código Civil Federal</li>
                  <li>Ley Federal de Protección de Datos Personales</li>
                  <li>Código de Comercio</li>
                  <li>Legislación aplicable en materia comercial</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">13.2 Jurisdicción:</h3>
                <p>Las partes se someten expresamente a la jurisdicción de los <strong>tribunales competentes de la Ciudad de México, CDMX</strong>, renunciando a cualquier otro fuero que pudiera corresponderles.</p>

                <h3 className="font-semibold text-lg mt-6">13.3 Resolución de Controversias:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>Negociación directa</strong> (30 días)</li>
                  <li><strong>Mediación comercial</strong> (60 días)</li>
                  <li><strong>Arbitraje comercial</strong> (según reglamento de la Cámara de Comercio de México)</li>
                  <li><strong>Vía judicial</strong> (como última instancia)</li>
                </ol>
              </CardContent>
            </Card>

            {/* Final Provisions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">14. DISPOSICIONES FINALES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">14.1 Modificaciones:</h3>
                <p>Closwork podrá modificar estos términos con <strong>30 días de anticipación</strong>, notificando vía email y plataforma. La continuación en el servicio constituye aceptación.</p>

                <h3 className="font-semibold text-lg mt-6">14.2 Divisibilidad:</h3>
                <p>Si alguna cláusula resulta inválida, las demás mantendrán plena vigencia.</p>

                <h3 className="font-semibold text-lg mt-6">14.3 Acuerdo Integral:</h3>
                <p>Este documento constituye el acuerdo completo entre las partes, sustituyendo cualquier comunicación o acuerdo previo.</p>

                <h3 className="font-semibold text-lg mt-6">14.4 Consentimiento Digital y Casilla de Aceptación:</h3>
                <p>La <strong>selección de la casilla "ACEPTO TÉRMINOS Y CONDICIONES"</strong> durante el registro constituye <strong>firma electrónica válida</strong> con plenos efectos jurídicos conforme a la <strong>Ley de Firma Electrónica Avanzada</strong>. Esta acción representa <strong>consentimiento expreso, libre e informado</strong> para la celebración del presente contrato comercial.</p>

                <p>El sistema registrará automáticamente:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Timestamp exacto de aceptación</li>
                  <li>Dirección IP del dispositivo utilizado</li>
                  <li>Versión específica de términos aceptada</li>
                  <li>Datos técnicos del navegador/dispositivo</li>
                  <li>Geolocalización aproximada</li>
                </ul>

                <p>Esta evidencia digital constituye <strong>prueba plena</strong> de la aceptación voluntaria del presente acuerdo.</p>
              </CardContent>
            </Card>

            {/* Digital Consent */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-xl text-primary">✅ DECLARACIÓN DE ACEPTACIÓN Y CONSENTIMIENTO EXPRESO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold">
                  <strong>IMPORTANTE:</strong> Al seleccionar la casilla <strong>"ACEPTO LOS TÉRMINOS Y CONDICIONES"</strong> durante el proceso de registro en Closwork, declaro expresamente que:
                </p>

                <h3 className="font-semibold text-lg">📋 CONFIRMACIONES OBLIGATORIAS:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>✅ <strong>He leído íntegramente</strong> estos Términos y Condiciones de Participación para Closers Elite</li>
                  <li>✅ <strong>Comprendo completamente</strong> todas las cláusulas, responsabilidades y limitaciones establecidas</li>
                  <li>✅ <strong>Acepto voluntariamente</strong> todas las obligaciones contractuales aquí contenidas</li>
                  <li>✅ <strong>Reconozco expresamente</strong> el carácter disruptivo, elite y no-laboral de la relación</li>
                  <li>✅ <strong>Me comprometo</strong> a cumplir con los más altos estándares comerciales y éticos</li>
                  <li>✅ <strong>Entiendo claramente</strong> que esta relación NO constituye vínculo laboral de ningún tipo</li>
                  <li>✅ <strong>Acepto completamente</strong> el modelo 100% basado en resultados sin garantías de ingresos</li>
                  <li>✅ <strong>Autorizo</strong> el tratamiento de mis datos personales conforme a la política de privacidad</li>
                  <li>✅ <strong>Me someto</strong> a la jurisdicción de tribunales de la Ciudad de México, CDMX</li>
                  <li>✅ <strong>Confirmo</strong> que tengo capacidad legal plena para celebrar este acuerdo</li>
                </ul>

                <h3 className="font-semibold text-lg">🔒 CONSENTIMIENTO DIGITAL VINCULANTE:</h3>
                <p>
                  <strong>LA SELECCIÓN DE LA CASILLA "ACEPTO TÉRMINOS Y CONDICIONES" CONSTITUYE:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Firma electrónica válida</strong> con plenos efectos jurídicos</li>
                  <li><strong>Consentimiento expreso e irrevocable</strong> para todos los términos</li>
                  <li><strong>Aceptación incondicional</strong> del marco contractual completo</li>
                  <li><strong>Renuncia</strong> a reclamar falta de conocimiento o comprensión</li>
                </ul>

                <h3 className="font-semibold text-lg">📊 REGISTRO AUTOMÁTICO DE EVIDENCIA LEGAL:</h3>
                <p>
                  <strong>Fecha de aceptación:</strong> [Automática - Timestamp]
                </p>
                <p>
                  <strong>Dirección IP de registro:</strong> [Automática]
                </p>
                <p>
                  <strong>Versión de términos aceptada:</strong> 2.0 - [Fecha]
                </p>
                <p>
                  <strong>Dispositivo utilizado:</strong> [Automático - User Agent]
                </p>
                <p>
                  <strong>Geolocalización:</strong> [Automática - País/Ciudad]
                </p>

                <h3 className="font-semibold text-lg">⚖️ EFECTOS JURÍDICOS DE LA ACEPTACIÓN:</h3>
                <p>Al seleccionar "ACEPTO TÉRMINOS Y CONDICIONES":</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>Se perfecciona inmediatamente</strong> este contrato comercial</li>
                  <li><strong>Adquiero todos los derechos</strong> de Closer Elite en Closwork</li>
                  <li><strong>Asumo todas las responsabilidades</strong> establecidas en este documento</li>
                  <li><strong>Reconozco</strong> que este acto tiene <strong>plena validez jurídica</strong> conforme a la Ley de Firma Electrónica Avanzada</li>
                </ol>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <p className="text-center font-semibold">
                    <strong>MIO MOBILE S.A. DE C.V.</strong><br />
                    <strong>División Closwork</strong><br />
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
                      Al marcar esta casilla, confirmo que he leído, comprendido y acepto todos los términos y condiciones establecidos en este documento, 
                      incluyendo el reconocimiento de que esta relación NO constituye vínculo laboral de ningún tipo y que estoy de acuerdo con el modelo 
                      de compensación 100% basado en resultados.
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

export default CloserTyc;

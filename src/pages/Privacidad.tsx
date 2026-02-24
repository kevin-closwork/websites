import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacidad = () => {
  const title = "Aviso de Privacidad | Closwork";
  const description = "Aviso de Privacidad de Closwork - División de MIO MOBILE S.A. DE C.V. Conoce cómo protegemos y utilizamos tus datos personales.";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/privacidad" />
        
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/privacidad" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/NgAumU4.png" alt="Closwork" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold">Closwork</span>
          </div>
          <a href="/">
            <button className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              ← Volver al Inicio
            </button>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Aviso de Privacidad</h1>
            <h2 className="text-2xl font-semibold text-muted-foreground">CLOSWORK - División de MIO MOBILE S.A. DE C.V.</h2>
            <p className="text-muted-foreground mt-4">
              <strong>MIO MOBILE S.A. DE C.V.</strong> | <strong>División Closwork</strong>
            </p>
            <p className="text-muted-foreground">
              Última actualización: Diciembre 2024 | Versión 1.0
            </p>
          </div>

          {/* Privacy Content - Scrollable Container */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Aviso de Privacidad</CardTitle>
              <p className="text-sm text-muted-foreground">CLOSWORK - División de MIO MOBILE S.A. DE C.V.</p>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto pr-4 space-y-6 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-base mb-2">1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE</h3>
                  <p><strong>Razón Social:</strong> MIO MOBILE S.A. DE C.V.</p>
                  <p><strong>Nombre Comercial:</strong> Closwork</p>
                  <p><strong>Correo electrónico para dudas:</strong> privacidad@closwork.com</p>
                  <p><strong>Sitio web:</strong> www.closwork.com</p>
                  <p className="mt-2">En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento, MIO MOBILE S.A. DE C.V., operando comercialmente como Closwork, pone a su disposición el presente Aviso de Privacidad.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">2. INFORMACIÓN RECOPILADA</h3>
                  <p>Closwork recopila diferentes categorías de datos personales dependiendo del tipo de usuario y la naturaleza de la relación comercial:</p>
                  
                  <h4 className="font-semibold text-sm mb-2 mt-4">2.1 Datos de Clientes (Empresas Contratantes)</h4>
                  <p><strong>Datos de Identificación:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Nombre completo del representante legal</li>
                    <li>Razón social o nombre comercial de la empresa</li>
                    <li>RFC con homoclave</li>
                    <li>Comprobante de domicilio fiscal</li>
                    <li>Identificación oficial (INE/IFE, pasaporte)</li>
                    <li>CURP (cuando aplique)</li>
                  </ul>
                  <p className="mt-2"><strong>Datos de Contacto:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Correo electrónico corporativo y personal</li>
                    <li>Número(s) telefónico(s) (celular y fijo)</li>
                    <li>Dirección física de oficinas</li>
                    <li>WhatsApp Business (cuando aplique)</li>
                  </ul>
                  <p className="mt-2"><strong>Datos Comerciales y Empresariales:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Giro comercial y sector industrial</li>
                    <li>Descripción de productos/servicios a vender</li>
                    <li>Estructura comercial actual</li>
                    <li>Historial de ventas (cuando se proporcione)</li>
                    <li>Materiales de venta, presentaciones, catálogos</li>
                    <li>Estrategia comercial y objetivos de ventas</li>
                    <li>Información sobre competencia y posicionamiento</li>
                  </ul>
                  <p className="mt-2"><strong>Datos Financieros y Patrimoniales:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Información de tarjetas de crédito/débito (tokenizada y encriptada)</li>
                    <li>Datos bancarios para transferencias</li>
                    <li>Historial de pagos y facturación</li>
                    <li>Información fiscal para emisión de CFDI</li>
                  </ul>
                  <p className="mt-2"><strong>Datos de Operación en Plataforma:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Usuario y contraseña (encriptados)</li>
                    <li>Registros de actividad en la plataforma</li>
                    <li>Comunicaciones con Socios Comerciales a través del sistema</li>
                    <li>Métricas de uso y engagement</li>
                    <li>Preferencias y configuraciones personalizadas</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">2.2 Datos de Socios Comerciales (Closers)</h4>
                  <p><strong>Datos de Identificación Personal:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Nombre completo</li>
                    <li>Fecha de nacimiento</li>
                    <li>Género</li>
                    <li>Nacionalidad</li>
                    <li>RFC con homoclave</li>
                    <li>CURP</li>
                    <li>Identificación oficial vigente</li>
                    <li>Comprobante de domicilio</li>
                  </ul>
                  <p className="mt-2"><strong>Datos de Contacto:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Correo electrónico</li>
                    <li>Número(s) telefónico(s)</li>
                    <li>Dirección física completa</li>
                    <li>Perfiles de redes sociales profesionales (LinkedIn, etc.)</li>
                  </ul>
                  <p className="mt-2"><strong>Datos Profesionales y Laborales:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Currículum vitae completo</li>
                    <li>Experiencia en ventas (empresas, roles, períodos)</li>
                    <li>Sectores de especialización</li>
                    <li>Certificaciones y capacitaciones</li>
                    <li>Referencias laborales (nombres, contactos, relación)</li>
                    <li>Portafolio de ventas y casos de éxito</li>
                    <li>Rangos salariales históricos</li>
                  </ul>
                  <p className="mt-2"><strong>Datos Financieros:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Datos bancarios para recomendaciones de pago (CLABE interbancaria)</li>
                    <li>Información de facturación electrónica</li>
                    <li>Constancia de situación fiscal</li>
                  </ul>
                  <p className="mt-2"><strong>Datos Sensibles (con consentimiento expreso):</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Antecedentes penales (para verificación de confiabilidad)</li>
                    <li>Referencias crediticias (solo si el Socio Comercial acepta compartirlas)</li>
                  </ul>
                  <p className="mt-2"><strong>Datos de Desempeño:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Métricas de ventas generadas a través de la plataforma</li>
                    <li>Evaluaciones de desempeño de Clientes</li>
                    <li>Comunicaciones y registros de interacción</li>
                    <li>Historial de asignaciones y cambios</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">2.3 Datos Recopilados Automáticamente</h4>
                  <p><strong>Datos de Navegación y Dispositivo:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Dirección IP</li>
                    <li>Tipo de navegador y versión</li>
                    <li>Sistema operativo</li>
                    <li>Identificadores únicos de dispositivo</li>
                    <li>Cookies y tecnologías similares</li>
                    <li>Páginas visitadas y tiempo de permanencia</li>
                    <li>Fuente de referencia (cómo llegó al sitio)</li>
                    <li>Geolocalización aproximada (basada en IP)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">3. FINALIDADES DEL TRATAMIENTO</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">3.1 Finalidades Primarias (Necesarias para la relación jurídica)</h4>
                  <p>Los datos personales serán utilizados para las siguientes finalidades esenciales, sin las cuales no podemos proporcionar el servicio:</p>
                  <p className="mt-2"><strong>Para Clientes:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Crear y gestionar cuenta en la plataforma Closwork</li>
                    <li>✓ Procesar pagos, facturación y cobros recurrentes</li>
                    <li>✓ Realizar proceso de matching con Socios Comerciales compatibles</li>
                    <li>✓ Facilitar comunicación entre Cliente y Socios Comerciales asignados</li>
                    <li>✓ Proporcionar acceso a dashboard y herramientas de gestión</li>
                    <li>✓ Brindar soporte técnico y atención al cliente</li>
                    <li>✓ Programar y realizar sesiones consultivas mensuales</li>
                    <li>✓ Cumplir obligaciones contractuales del Plan contratado</li>
                    <li>✓ Garantizar la seguridad y prevenir fraudes</li>
                    <li>✓ Cumplir con obligaciones fiscales y legales</li>
                  </ul>
                  <p className="mt-2"><strong>Para Socios Comerciales:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Registrar perfil profesional en la red Closwork</li>
                    <li>✓ Realizar verificación de identidad y antecedentes</li>
                    <li>✓ Incluir en proceso de matching con Clientes potenciales</li>
                    <li>✓ Facilitar asignación a oportunidades comerciales</li>
                    <li>✓ Proporcionar acceso a plataforma y recursos de venta</li>
                    <li>✓ Evaluar desempeño y generar métricas profesionales</li>
                    <li>✓ Procesar recomendaciones de pago y facturación</li>
                    <li>✓ Cumplir con obligaciones fiscales aplicables</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">3.2 Finalidades Secundarias (Opcionales - Requieren consentimiento)</h4>
                  <p>Adicionalmente, con su consentimiento expreso, utilizaremos sus datos para:</p>
                  <p className="mt-2"><strong>❏ Marketing y Comunicaciones Comerciales:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Enviar newsletters, promociones y ofertas especiales</li>
                    <li>Informar sobre nuevas funcionalidades y eventos</li>
                    <li>Realizar encuestas de satisfacción</li>
                    <li>Compartir contenido educativo sobre ventas B2B</li>
                  </ul>
                  <p className="mt-2"><strong>❏ Mejora de Servicios:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Analizar patrones de uso para optimizar la plataforma</li>
                    <li>Desarrollar nuevas funcionalidades basadas en comportamiento de usuarios</li>
                    <li>Crear perfiles agregados para inteligencia de mercado</li>
                  </ul>
                  <p className="mt-2"><strong>❏ Prospección Comercial:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Contactarlo con oportunidades de colaboración estratégica</li>
                    <li>Invitarlo a eventos, webinars y capacitaciones premium</li>
                  </ul>
                  <p className="mt-2">Si usted NO desea que sus datos se utilicen para estas finalidades secundarias, puede manifestarlo en cualquier momento enviando un correo a: <strong>privacidad@closwork.com</strong> con el asunto "RECHAZO FINALIDADES SECUNDARIAS".</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">4. TRANSFERENCIAS DE DATOS</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">4.1 Transferencias Nacionales</h4>
                  <p>Para cumplir con las finalidades descritas, Closwork comparte datos personales con terceros en los siguientes casos:</p>
                  <p className="mt-2"><strong>Proveedores de Servicios Tecnológicos:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Firebase (Google): Almacenamiento de base de datos y autenticación</li>
                    <li>Stripe: Procesamiento de pagos y tokenización de tarjetas</li>
                    <li>Lovable: Hosting de landing pages y formularios</li>
                    <li>WhatsApp Business API: Comunicaciones con clientes</li>
                  </ul>
                  <p className="mt-2"><strong>Servicios de Análisis:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Google Analytics (datos anonimizados)</li>
                    <li>Herramientas de CRM y gestión comercial</li>
                  </ul>
                  <p className="mt-2"><strong>Autoridades Fiscales:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>SAT (para emisión de CFDI y cumplimiento fiscal)</li>
                    <li>Proveedores autorizados de certificación de factura electrónica (PAC)</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">4.2 Transferencias Entre Usuarios de la Plataforma</h4>
                  <p className="font-semibold mb-2">IMPORTANTE:</p>
                  <p>Al utilizar Closwork, usted autoriza expresamente las siguientes transferencias:</p>
                  <p className="mt-2"><strong>✓ De Cliente a Socio Comercial:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Información de productos/servicios a vender</li>
                    <li>Materiales de ventas, presentaciones, catálogos</li>
                    <li>Datos de prospectos y leads (cuando el Cliente los proporcione)</li>
                    <li>Condiciones comerciales y estructura de comisiones</li>
                  </ul>
                  <p className="mt-2"><strong>✓ De Socio Comercial a Cliente:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Perfil profesional, experiencia y portafolio</li>
                    <li>Referencias laborales verificadas</li>
                    <li>Métricas de desempeño anteriores</li>
                    <li>Comunicaciones sobre prospectos y avances comerciales</li>
                  </ul>
                  <p className="mt-2">Estas transferencias son indispensables para la operación del marketplace y NO requieren consentimiento adicional al formar parte del objeto principal del servicio.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">4.3 Transferencias Internacionales</h4>
                  <p>Algunos de nuestros proveedores tecnológicos pueden almacenar o procesar datos en servidores ubicados fuera de México, específicamente:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Estados Unidos: Firebase (Google), Stripe</li>
                    <li>Unión Europea: Servidores de respaldo en la nube</li>
                  </ul>
                  <p className="mt-2">Todas estas empresas cumplen con estándares internacionales de protección de datos (GDPR, Privacy Shield, cláusulas contractuales estándar) y garantizan nivel equivalente de protección.</p>
                  <p className="mt-2">Al aceptar este Aviso de Privacidad, usted consiente expresamente estas transferencias internacionales.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">5. MEDIDAS DE SEGURIDAD</h3>
                  <p>Closwork implementa medidas físicas, técnicas y administrativas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o acceso no autorizado:</p>
                  
                  <h4 className="font-semibold text-sm mb-2 mt-4">5.1 Medidas Técnicas</h4>
                  <p><strong>✓ Encriptación:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>SSL/TLS para transmisión de datos (certificado HTTPS)</li>
                    <li>Encriptación AES-256 para datos sensibles en reposo</li>
                    <li>Tokenización de información de tarjetas de crédito (PCI-DSS compliance vía Stripe)</li>
                  </ul>
                  <p className="mt-2"><strong>✓ Control de Acceso:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Autenticación multifactor (MFA) para cuentas sensibles</li>
                    <li>Principio de mínimo privilegio (acceso por roles)</li>
                    <li>Logs de auditoría de todos los accesos a datos personales</li>
                  </ul>
                  <p className="mt-2"><strong>✓ Protección de Infraestructura:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Firewalls y sistemas de detección de intrusiones</li>
                    <li>Monitoreo continuo de vulnerabilidades</li>
                    <li>Respaldos encriptados automáticos cada 24 horas</li>
                    <li>Planes de recuperación ante desastres</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">5.2 Medidas Administrativas</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Capacitación obligatoria en protección de datos para todo el personal</li>
                    <li>✓ Acuerdos de confidencialidad firmados por empleados y colaboradores</li>
                    <li>✓ Política interna de seguridad de la información (alineada a ISO 27001)</li>
                    <li>✓ Proceso de gestión de incidentes de seguridad</li>
                    <li>✓ Auditorías periódicas de cumplimiento</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">5.3 Medidas Físicas</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Servidores en centros de datos certificados con acceso restringido</li>
                    <li>✓ Destrucción segura de documentos físicos con datos personales</li>
                    <li>✓ Control de acceso biométrico a oficinas (cuando aplique)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">6. DERECHOS ARCO Y REVOCACIÓN DEL CONSENTIMIENTO</h3>
                  <p>En términos de la LFPDPPP, usted tiene derecho a:</p>
                  
                  <h4 className="font-semibold text-sm mb-2 mt-4">6.1 Derechos ARCO</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ <strong>Acceso:</strong> Conocer qué datos personales tenemos sobre usted y para qué los usamos</li>
                    <li>✓ <strong>Rectificación:</strong> Solicitar corrección de datos inexactos o incompletos</li>
                    <li>✓ <strong>Cancelación:</strong> Solicitar eliminación de sus datos cuando considere que no son necesarios</li>
                    <li>✓ <strong>Oposición:</strong> Negarse a que sus datos sean tratados para finalidades específicas</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">6.2 Procedimiento para Ejercer Derechos ARCO</h4>
                  <p>Para ejercer cualquiera de estos derechos, deberá enviar solicitud a:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li><strong>Correo electrónico:</strong> privacidad@closwork.com</li>
                    <li><strong>Asunto:</strong> "Solicitud de Derechos ARCO - [ACCESO/RECTIFICACIÓN/CANCELACIÓN/OPOSICIÓN]"</li>
                  </ul>
                  <p className="mt-2"><strong>Requisitos de la solicitud:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Nombre completo del titular</li>
                    <li>Correo electrónico registrado en Closwork</li>
                    <li>Descripción clara del derecho que desea ejercer</li>
                    <li>Documentos que acrediten su identidad (INE/IFE o pasaporte)</li>
                    <li>En caso de rectificación: documentos que acrediten la procedencia de lo solicitado</li>
                    <li>Domicilio o correo para recibir respuesta</li>
                  </ul>
                  <p className="mt-2"><strong>Plazo de respuesta:</strong> 20 días hábiles contados a partir de la recepción de la solicitud</p>
                  <p><strong>Plazo de efectividad:</strong> 15 días hábiles posteriores a la comunicación de respuesta</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">6.3 Limitaciones al Ejercicio de Derechos ARCO</h4>
                  <p>No procederá la cancelación cuando:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Existan obligaciones legales de conservar los datos (fiscales, mercantiles)</li>
                    <li>Los datos sean necesarios para cumplir contratos vigentes</li>
                    <li>Se esté llevando a cabo un procedimiento legal</li>
                    <li>Los datos sean necesarios para la defensa de Closwork en litigios</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">6.4 Revocación del Consentimiento</h4>
                  <p>Puede revocar su consentimiento para el tratamiento de sus datos en cualquier momento, enviando correo a <strong>privacidad@closwork.com</strong> con asunto "REVOCACIÓN DE CONSENTIMIENTO".</p>
                  <p className="mt-2 font-semibold">IMPORTANTE:</p>
                  <p>La revocación del consentimiento implica:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Imposibilidad de continuar proporcionando el servicio</li>
                    <li>Cancelación automática de su cuenta y suscripción</li>
                    <li>Sin derecho a reembolso por los días restantes del período pagado</li>
                    <li>Conservación de datos durante plazos legales obligatorios</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">7. RETENCIÓN Y ELIMINACIÓN DE DATOS</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">7.1 Plazos de Conservación</h4>
                  <p>Closwork conservará sus datos personales durante:</p>
                  <p className="mt-2"><strong>Mientras la relación esté activa:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Todos los datos necesarios para proporcionar el servicio</li>
                  </ul>
                  <p className="mt-2"><strong>Después de terminada la relación:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Datos fiscales y de facturación: 5 años (obligación legal del Código Fiscal)</li>
                    <li>Datos contractuales: 10 años (prescripción de acciones civiles y mercantiles)</li>
                    <li>Datos de comunicaciones con soporte: 2 años (para resolución de disputas)</li>
                    <li>Datos de marketing (si dio consentimiento): Hasta que revoque el consentimiento</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">7.2 Eliminación Segura</h4>
                  <p>Al cumplirse los plazos de retención, Closwork eliminará los datos mediante:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Borrado seguro de bases de datos (sobreescritura múltiple)</li>
                    <li>Destrucción física de medios de almacenamiento cuando aplique</li>
                    <li>Anonimización irreversible para datos estadísticos</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">8. COOKIES Y TECNOLOGÍAS DE RASTREO</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">8.1 ¿Qué son las Cookies?</h4>
                  <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos permiten reconocer su navegador y recordar ciertas informaciones.</p>

                  <h4 className="font-semibold text-sm mb-2 mt-4">8.2 Tipos de Cookies que Utilizamos</h4>
                  <p><strong>Cookies Estrictamente Necesarias (No requieren consentimiento):</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Autenticación de sesión</li>
                    <li>Seguridad y prevención de fraude</li>
                    <li>Funcionalidad básica de la plataforma</li>
                  </ul>
                  <p className="mt-2"><strong>Cookies de Rendimiento y Analíticas (Requieren consentimiento):</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Google Analytics (para entender cómo se usa el sitio)</li>
                    <li>Métricas de conversión y embudo de ventas</li>
                  </ul>
                  <p className="mt-2"><strong>Cookies de Publicidad y Marketing (Requieren consentimiento):</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Remarketing de Google Ads</li>
                    <li>Facebook Pixel</li>
                    <li>LinkedIn Insight Tag</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">8.3 Gestión de Cookies</h4>
                  <p>Puede administrar sus preferencias de cookies:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>En el sitio: Banner de consentimiento al ingresar por primera vez</li>
                    <li>En su navegador: Configuración de privacidad para bloquear o eliminar cookies</li>
                    <li>Contactándonos: privacidad@closwork.com para ejercer derechos específicos</li>
                  </ul>
                  <p className="mt-2"><strong>NOTA:</strong> Deshabilitar cookies esenciales puede afectar la funcionalidad del sitio.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">9. USO DE DATOS POR MENORES DE EDAD</h3>
                  <p>Closwork NO está dirigido a menores de 18 años. No recopilamos intencionalmente datos de menores de edad.</p>
                  <p className="mt-2">Si usted es padre, madre o tutor y cree que su hijo(a) nos ha proporcionado datos personales, contáctenos inmediatamente a <strong>privacidad@closwork.com</strong> para proceder con la eliminación inmediata.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">10. MODIFICACIONES AL AVISO DE PRIVACIDAD</h3>
                  <p>Closwork se reserva el derecho de modificar este Aviso de Privacidad en cualquier momento para:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Cumplir con nuevas regulaciones legales</li>
                    <li>Adaptarse a nuevas prácticas de negocio</li>
                    <li>Incorporar nuevos proveedores o tecnologías</li>
                    <li>Mejorar la claridad y transparencia</li>
                  </ul>
                  <p className="mt-2"><strong>Notificación de cambios:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Enviaremos correo electrónico a la dirección registrada</li>
                    <li>Publicaremos versión actualizada en www.closwork.com/privacidad</li>
                    <li>Indicaremos claramente la "Fecha de última actualización"</li>
                  </ul>
                  <p className="mt-2"><strong>Fecha de entrada en vigor:</strong> Los cambios entrarán en vigor 10 días después de la notificación.</p>
                  <p className="mt-2">Si NO está de acuerdo con las modificaciones, podrá cancelar su cuenta antes de que entren en vigor.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">11. CONSENTIMIENTO</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">11.1 Forma de Otorgar el Consentimiento</h4>
                  <p>Al realizar cualquiera de las siguientes acciones, usted manifiesta su consentimiento expreso para el tratamiento de sus datos conforme a este Aviso de Privacidad:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>✓ Marcar la casilla "Acepto el Aviso de Privacidad" durante el registro</li>
                    <li>✓ Proporcionar sus datos personales a través de formularios en el sitio web</li>
                    <li>✓ Enviar correos electrónicos con sus datos a Closwork</li>
                    <li>✓ Contratar cualquier servicio de Closwork</li>
                    <li>✓ Utilizar la plataforma después de haber sido notificado de este Aviso</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">11.2 Consentimiento para Datos Sensibles</h4>
                  <p>Para el tratamiento de datos sensibles (antecedentes penales, referencias crediticias), solicitaremos su consentimiento expreso y por separado mediante:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Casilla específica durante el registro</li>
                    <li>Confirmación por correo electrónico</li>
                    <li>Firma electrónica en documento separado</li>
                  </ul>
                  <p className="mt-2">Sin su consentimiento expreso, NO trataremos datos sensibles.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">12. CONTACTO Y AUTORIDAD DE PROTECCIÓN DE DATOS</h3>
                  <h4 className="font-semibold text-sm mb-2 mt-3">12.1 Departamento de Privacidad de Closwork</h4>
                  <p>Para cualquier duda, aclaración o ejercicio de derechos relacionados con este Aviso de Privacidad:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li><strong>Correo electrónico:</strong> privacidad@closwork.com</li>
                    <li><strong>Domicilio:</strong> Guadalajara, Jalisco, México</li>
                    <li><strong>Horario de atención:</strong> Lunes a viernes, 9:00 AM - 6:00 PM (Hora del Centro de México)</li>
                  </ul>

                  <h4 className="font-semibold text-sm mb-2 mt-4">12.2 Instituto Nacional de Transparencia (INAI)</h4>
                  <p>Si considera que su derecho a la protección de datos personales ha sido lesionado, puede acudir a la autoridad:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li><strong>Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)</strong></li>
                    <li><strong>Sitio web:</strong> www.inai.org.mx</li>
                    <li><strong>Teléfono:</strong> 01 800 835 43 24</li>
                    <li><strong>Correo:</strong> info@inai.org.mx</li>
                  </ul>
                </div>

                <div className="border-t pt-4 mt-6">
                  <h3 className="font-semibold text-base mb-2">13. DECLARACIÓN FINAL DE ACEPTACIÓN</h3>
                  <p className="font-semibold mb-2">AL PROPORCIONAR SUS DATOS PERSONALES A CLOSWORK, USTED DECLARA:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Haber leído y comprendido el presente Aviso de Privacidad en su totalidad</li>
                    <li>Consentir el tratamiento de sus datos conforme a las finalidades descritas</li>
                    <li>Aceptar las transferencias de datos a terceros mencionadas</li>
                    <li>Comprender sus derechos ARCO y el procedimiento para ejercerlos</li>
                    <li>Reconocer que puede revocar su consentimiento en cualquier momento</li>
                    <li>Aceptar el uso de cookies y tecnologías de rastreo conforme a lo descrito</li>
                    <li>Garantizar que los datos proporcionados son veraces, completos y actualizados</li>
                    <li>Si proporciona datos de terceros (referencias, empleados), garantiza contar con su autorización</li>
                  </ul>
                  <p className="mt-4 text-xs text-center">
                    <strong>Última actualización:</strong> Diciembre 2024<br />
                    <strong>Versión:</strong> 1.0<br />
                    <strong>Vigencia:</strong> Este Aviso de Privacidad es vigente a partir de su fecha de publicación<br />
                    <strong>© 2024 MIO MOBILE S.A. DE C.V. | Todos los derechos reservados</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home Button */}
          <div className="text-center mt-12">
            <a href="/">
              <button className="px-8 py-3 text-base font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                Volver al Inicio
              </button>
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
              <a href="/privacidad" className="hover:text-primary transition-colors">
                Aviso de Privacidad
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacidad;








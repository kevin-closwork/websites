import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TerminosCondiciones = () => {
  const title = "Términos y Condiciones - Recolección de Datos | Closwork";
  const description = "Términos y condiciones para la recolección, uso y protección de datos personales en Closwork.";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/terminos-condiciones" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/terminos-condiciones" />
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
            <h2 className="text-2xl font-semibold text-muted-foreground">Recolección y Uso de Datos Personales</h2>
            <p className="text-muted-foreground mt-2">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. Introducción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Bienvenido a Closwork. Estos términos y condiciones establecen las reglas y regulaciones para el uso de nuestra plataforma, 
                  así como la recolección, uso y protección de datos personales de nuestros usuarios.
                </p>
                <p>
                  Al acceder y utilizar Closwork, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte 
                  de estos términos, no debes utilizar nuestro servicio.
                </p>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. Recolección de Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">2.1 Tipos de Datos Recolectados</h3>
                <p>Recolectamos los siguientes tipos de información personal:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Información de Identificación:</strong> Nombre completo, dirección de correo electrónico, número de teléfono</li>
                  <li><strong>Información Profesional:</strong> Cargo, empresa, industria, experiencia en ventas</li>
                  <li><strong>Información de la Empresa:</strong> Nombre de la empresa, tamaño, sector, necesidades de ventas</li>
                  <li><strong>Información de Uso:</strong> Actividad en la plataforma, interacciones, preferencias</li>
                </ul>

                <h3 className="font-semibold text-lg mt-6">2.2 Métodos de Recolección</h3>
                <p>Los datos se recolectan a través de:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Formularios de registro y contacto</li>
                  <li>Comunicaciones por correo electrónico</li>
                  <li>Uso de la plataforma y herramientas</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3. Uso de Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Utilizamos tu información personal para los siguientes propósitos:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Proporcionar y mantener nuestros servicios</li>
                  <li>Facilitar la conexión entre empresas y closers</li>
                  <li>Personalizar tu experiencia en la plataforma</li>
                  <li>Comunicarnos contigo sobre servicios y actualizaciones</li>
                  <li>Mejorar nuestros servicios y desarrollar nuevas funcionalidades</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">4. Protección y Seguridad de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal 
                  contra acceso no autorizado, alteración, divulgación o destrucción.
                </p>
                <p>Estas medidas incluyen:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encriptación de datos en tránsito y en reposo</li>
                  <li>Acceso restringido a datos personales</li>
                  <li>Monitoreo regular de sistemas de seguridad</li>
                  <li>Capacitación del personal en prácticas de seguridad</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">5. Compartir Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>No vendemos, alquilamos o intercambiamos tu información personal con terceros, excepto en las siguientes circunstancias:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Con tu consentimiento explícito</strong></li>
                  <li><strong>Para facilitar conexiones:</strong> Información básica se comparte entre empresas y closers para facilitar la conexión</li>
                  <li><strong>Proveedores de servicios:</strong> Con empresas que nos ayudan a operar la plataforma (solo con garantías de protección)</li>
                  <li><strong>Requerimientos legales:</strong> Cuando la ley lo requiera o para proteger nuestros derechos</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">6. Tus Derechos sobre los Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Tienes los siguientes derechos respecto a tu información personal:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Acceso:</strong> Solicitar una copia de los datos que tenemos sobre ti</li>
                  <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos personales</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
                  <li><strong>Limitación:</strong> Restringir el procesamiento de tus datos</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                </ul>
                <p className="mt-4">
                  Para ejercer estos derechos, contáctanos en{' '}
                  <a href="mailto:hola@closwork.com" className="text-primary hover:underline">
                    hola@closwork.com
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">7. Retención de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos 
                  para los que fue recolectada, incluyendo obligaciones legales, contables o de reportes.
                </p>
                <p>
                  Los datos se eliminan de forma segura cuando ya no son necesarios, o puedes solicitar su eliminación 
                  en cualquier momento.
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">8. Cookies y Tecnologías Similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia en la plataforma, 
                  analizar el tráfico y personalizar el contenido.
                </p>
                <p>Tipos de cookies que utilizamos:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico de la plataforma</li>
                  <li><strong>Cookies de Funcionalidad:</strong> Para recordar tus preferencias y configuraciones</li>
                  <li><strong>Cookies Analíticas:</strong> Para entender cómo utilizas la plataforma</li>
                  <li><strong>Cookies de Marketing:</strong> Para mostrar contenido relevante</li>
                </ul>
                <p className="mt-4">
                  Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">9. Transferencias Internacionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Tu información personal puede ser transferida y procesada en países fuera de tu residencia. 
                  Nos aseguramos de que estas transferencias cumplan con las leyes de protección de datos aplicables.
                </p>
                <p>
                  Cuando sea necesario, implementamos acuerdos de transferencia de datos y medidas de seguridad 
                  adicionales para proteger tu información.
                </p>
              </CardContent>
            </Card>

            {/* Children */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">10. Protección de Menores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nuestros servicios no están dirigidos a menores de 18 años. No recolectamos intencionalmente 
                  información personal de menores de edad.
                </p>
                <p>
                  Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, 
                  contáctanos inmediatamente para que podamos eliminar dicha información.
                </p>
              </CardContent>
            </Card>

            {/* Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">11. Cambios en estos Términos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                  Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.
                </p>
                <p>
                  Te notificaremos sobre cambios significativos por correo electrónico o a través de la plataforma. 
                  Te recomendamos revisar estos términos regularmente.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">12. Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Si tienes preguntas sobre estos términos y condiciones o sobre cómo manejamos tus datos personales, 
                  contáctanos:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:hola@closwork.com" className="text-primary hover:underline">hola@closwork.com</a></p>
                  <p><strong>Dirección:</strong> Guadalajara, Jalisco, México</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-12">
            <a href="/">
              <Button size="lg" className="px-8">
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

export default TerminosCondiciones;

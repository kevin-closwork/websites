import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
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
                >
                  hola@closwork.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <a 
                  href="tel:+523112403145" 
                  className="hover:text-primary transition-colors"
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
              <a href="/about-us" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#caracteristicas" className="block text-muted-foreground hover:text-primary transition-colors">
                Características
              </a>
              <a 
                href="/calculadora" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Precios
              </a>
              <a href="mailto:hola@closwork.com" className="block text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </a>
              <a 
                href="/solicitud" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Registro
              </a>
              <a href="/terminos-condiciones" className="block text-muted-foreground hover:text-primary transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>

        {/* Partners/Logos Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-lg font-semibold text-zinc-50">Acelerados en:</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center justify-center">
                <img 
                  src="/logo-86bf1018.svg" 
                  alt="Partner Logo" 
                  className="h-24 w-auto filter brightness-0 invert"
                />
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/emprelatam-logo.png" 
                  alt="Emprelatam Logo" 
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
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
  );
};

export default Footer;
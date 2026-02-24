import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Inicio", href: "/", isRoute: true },
    { label: "About Us", href: "/#como-funciona", isRoute: false },
    { label: "Características", href: "/#beneficios", isRoute: false },
    { label: "Precios", href: "/#pricing", isRoute: false },
    { label: "Contacto", href: "mailto:hola@closwork.com", isRoute: false },
    { label: "Solicitud", href: "/solicitud", isRoute: true },
    { label: "Términos y Condiciones", href: "/terminos-condiciones", isRoute: true },
    { label: "Privacidad", href: "/privacidad", isRoute: true },
  ];

  return (
    <footer className="bg-[#1a2b3d] text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Columna Izquierda: Sobre Nosotros */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold">Closwork</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Sobre Nosotros</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Closwork es una plataforma innovadora diseñada para revolucionar las ventas B2B, ofreciendo herramientas avanzadas y soluciones personalizadas.
            </p>
          </div>

          {/* Columna Centro: Contacto */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Contacto</h3>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="mailto:hola@closwork.com"
                className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors break-words"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#a855f7] flex-shrink-0" />
                <span className="break-all">hola@closwork.com</span>
              </a>
              <a
                href="tel:+523112403145"
                className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#ec4899] flex-shrink-0" />
                <span>+52 3112403145</span>
              </a>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#ec4899] flex-shrink-0" />
                <span>Guadalajara, Jal.</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Enlaces Rápidos */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Enlaces Rápidos</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {!link.isRoute && link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </a>
                  ) : link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Acelerados en */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-8 border-t border-gray-600">
          <span className="text-xs text-gray-400">Acelerados en</span>
          <img src="/Closwork_Logos.png" alt="Closwork" className="h-6 object-contain opacity-80" />
        </div>

        {/* Copyright y frase */}
        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p className="text-xs text-gray-400">© 2026 Closwork. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-500 italic mt-2 max-w-xl mx-auto">
            A veces, las ideas más revolucionarias nacen de la pregunta más simple: ¿Y si existiera un botón?
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-400">
            <Link to="/terminos-condiciones" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <a href="mailto:privacidad@closwork.com" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


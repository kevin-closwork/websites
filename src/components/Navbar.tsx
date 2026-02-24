import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const navLinks = [
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Beneficios", href: "/#beneficios" },
    { label: "Testimonios", href: "/#testimonios" },
    { label: "Precios", href: "/#pricing" },
    { label: "Ahorros", href: "/#ahorros" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
              <img
                src="https://i.imgur.com/zi6UAt6.png"
                alt="Closwork"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))' }}
              />
            </Link>
          </div>

          {isLanding && (
            <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-primary rounded-lg transition-colors duration-200 hover:bg-gray-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
              asChild
            >
              <Link to="/solicitud">Contacto</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
              asChild
            >
              <a href="https://app.closwork.com/login" target="_blank" rel="noopener noreferrer">Iniciar sesión</a>
            </Button>
            <Button
              variant="default"
              className="bg-primary text-white hover:bg-primary/90 rounded-lg font-medium px-6"
              asChild
            >
              <a href="https://app.closwork.com/login" target="_blank" rel="noopener noreferrer">Registrarte</a>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="pb-4 border-b border-gray-200">
                  <img
                    src="https://i.imgur.com/zi6UAt6.png"
                    alt="Closwork"
                    className="h-12 w-auto object-contain"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))' }}
                  />
                </div>

                {isLanding && (
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-base font-medium text-gray-700 hover:text-primary rounded-lg transition-colors duration-200 hover:bg-gray-50"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link to="/solicitud">Contacto</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <a href="https://app.closwork.com/login" target="_blank" rel="noopener noreferrer">Iniciar sesión</a>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <a href="https://app.closwork.com/login" target="_blank" rel="noopener noreferrer">Registrarte</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

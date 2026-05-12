import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.imgur.com/NgAumU4.png"
              alt="Closwork"
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl text-secondary">Closwork</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                Blog
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </Link>
            <Link to="/solicitud?type=empresa">
              <Button size="sm" className="hidden sm:inline-flex">
                Solicitud
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

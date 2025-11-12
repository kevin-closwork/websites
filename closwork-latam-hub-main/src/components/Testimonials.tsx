import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "María González",
    company: "TechStart México",
    role: "CEO",
    content: "Closwork nos ayudó a escalar nuestras ventas un 300% en solo 3 meses. Los closers que encontramos son realmente profesionales y conocen el mercado LATAM.",
    avatar: "MG",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
    type: "empresa"
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    company: "Closer Premium",
    role: "Socio Comercial",
    content: "En 6 meses con Closwork he generado más comisiones que en todo el año anterior. La calidad de las oportunidades y el soporte es excepcional.",
    avatar: "CM",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    type: "closer"
  },
  {
    id: 3,
    name: "Ana Torres",
    company: "EcommSolutions",
    role: "Directora de Ventas",
    content: "La plataforma nos conectó con el socio comercial perfecto para nuestro nicho. Sin riesgos fijos y con resultados desde el primer mes.",
    avatar: "AT",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    type: "empresa"
  },
  {
    id: 4,
    name: "Roberto Silva",
    company: "Growth Partners",
    role: "Closer Especializado",
    content: "Closwork me ha permitido trabajar con múltiples empresas al mismo tiempo. La comunidad es increíble y siempre hay nuevas oportunidades.",
    avatar: "RS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    type: "closer"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Historias reales de empresas y closers que han transformado su negocio con Closwork
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-12 shadow-elevation relative overflow-hidden">
            {/* Background Quote */}
            <Quote className="absolute top-6 right-6 h-16 w-16 text-primary/10" />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-elevation"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <blockquote className="text-xl lg:text-2xl text-secondary leading-relaxed mb-6">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  
                  <div className="space-y-1">
                    <div className="font-semibold text-secondary">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentIndex].role} - {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
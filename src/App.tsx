import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Calculator from "./pages/Calculator";
import Solicitud from "./pages/Solicitud";
import GraciasEmpresa from "./pages/GraciasEmpresa";
import GraciasCloser from "./pages/GraciasCloser";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import CloserTyc from "./pages/CloserTyc";
import EmpresasTyc from "./pages/EmpresasTyc";
import Pricing from "./pages/Pricing";
import Empresas from "./pages/Empresas";
import EmpresasV2 from "./pages/EmpresasV2";
import AboutUs from "./pages/AboutUs";
import GraciasPlanBasico from "./pages/GraciasPlanBasico";
import PagoCancelado from "./pages/PagoCancelado";

// Calendly Widget Component - Only shows on homepage
const CalendlyWidget = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Only initialize Calendly widget on the homepage
    if (location.pathname !== '/') {
      return;
    }

    // Function to initialize Calendly widget
    const initializeCalendly = () => {
      if (window.Calendly) {
        console.log('Initializing Calendly badge widget...');
        try {
          // Add custom CSS to position the Calendly button better on mobile
          const style = document.createElement('style');
          style.textContent = `
            /* Custom positioning for Calendly button to avoid overlap */
            .calendly-badge-widget {
              bottom: 120px !important; /* Move up to avoid overlap with bottom CTA */
              right: 20px !important;
              z-index: 30 !important; /* Lower than the main CTA which has z-40 */
            }
            
            /* On mobile, position it at the top center */
            @media (max-width: 768px) {
              .calendly-badge-widget {
                bottom: auto !important;
                top: 20px !important;
                right: auto !important;
                left: 50% !important;
                transform: translateX(-50%) scale(0.9) !important;
              }
            }
            
            /* On very small screens, position it at the top center with smaller scale */
            @media (max-width: 480px) {
              .calendly-badge-widget {
                bottom: auto !important;
                top: 15px !important;
                right: auto !important;
                left: 50% !important;
                transform: translateX(-50%) scale(0.8) !important;
              }
            }
          `;
          document.head.appendChild(style);

          window.Calendly.initBadgeWidget({
            url: 'https://calendly.com/kevin-closwork/30min',
            text: '🚀 ¡Agenda tu consulta GRATIS!',
            color: '#0069ff',
            textColor: '#ffffff',
            branding: false
          });
          console.log('Calendly widget initialized successfully');
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      } else {
        console.log('Calendly not available yet, retrying in 500ms...');
        setTimeout(initializeCalendly, 500);
      }
    };

    // Start initialization
    initializeCalendly();
  }, [location.pathname]);

  return null; // This component doesn't render anything visible
};

// Add Calendly types to window object
declare global {
  interface Window {
    Calendly: {
      initBadgeWidget: (config: any) => void;
    };
  }
}

const queryClient = new QueryClient();

// App Content Component that uses routing
const AppContent = () => (
  <>
    <CalendlyWidget />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/empresas" element={<Empresas />} />
      <Route path="/empresas-v2" element={<EmpresasV2 />} />
      <Route path="/calculadora" element={<Calculator />} />
      <Route path="/solicitud" element={<Solicitud />} />
      <Route path="/gracias-empresa" element={<GraciasEmpresa />} />
      <Route path="/gracias-closer" element={<GraciasCloser />} />
      <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
      <Route path="/closer-tyc" element={<CloserTyc />} />
      <Route path="/empresas-tyc" element={<EmpresasTyc />} />
      <Route path="/precios" element={<Pricing />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/gracias-plan-basico" element={<GraciasPlanBasico />} />
      <Route path="/pago-cancelado" element={<PagoCancelado />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

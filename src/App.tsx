import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import GraciasPlanGrowth from "./pages/GraciasPlanGrowth";
import GraciasPlanScale from "./pages/GraciasPlanScale";
import PagoCancelado from "./pages/PagoCancelado";
import EmpresasTycBasicoLegacy from "./pages/EmpresasTycBasico";
import EmpresasTycGrowthLegacy from "./pages/EmpresasTycGrowth";
import EmpresasTycScaleLegacy from "./pages/EmpresasTycScale";
import EmpresasTyC from "./pages/EmpresasTyc";
import Privacidad from "./pages/Privacidad";

const queryClient = new QueryClient();

// App Content Component that uses routing
const AppContent = () => (
  <>
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
      <Route path="/gracias-plan-growth" element={<GraciasPlanGrowth />} />
      <Route path="/gracias-plan-scale" element={<GraciasPlanScale />} />
      <Route path="/pago-cancelado" element={<PagoCancelado />} />
      <Route path="/empresas-tyc-basico" element={<EmpresasTyC planKey="basico" />} />
      <Route path="/empresas-tyc-growth" element={<EmpresasTyC planKey="growth" />} />
      <Route path="/empresas-tyc-scale" element={<EmpresasTyC planKey="scale" />} />
      <Route path="/privacidad" element={<Privacidad />} />
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

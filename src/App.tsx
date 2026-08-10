import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import EmpresasTyC from "./pages/EmpresasTyc";
import Privacidad from "./pages/Privacidad";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import LegalIndex from "./pages/LegalIndex";
import LegalContratoMarco, { LegalContratoMarcoRedirect } from "./pages/LegalContratoMarco";
import LegalOrdenServicio, { LegalOrdenServicioRedirect } from "./pages/LegalOrdenServicio";
import Contratar from "./pages/Contratar";
import ContratarConfirmacion from "./pages/ContratarConfirmacion";

const queryClient = new QueryClient();

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
      <Route path="/empresas-tyc-growth" element={<Navigate to="/contratar" replace />} />
      <Route path="/empresas-tyc-scale" element={<EmpresasTyC planKey="scale" />} />
      <Route path="/tyc-concierge" element={<Navigate to="/contratar" replace />} />
      <Route path="/tyc-concierge2" element={<Navigate to="/contratar" replace />} />
      <Route path="/legal" element={<LegalIndex />} />
      <Route path="/legal/contrato-marco" element={<LegalContratoMarcoRedirect />} />
      <Route path="/legal/contrato-marco/:versionSlug" element={<LegalContratoMarco />} />
      <Route path="/legal/orden-servicio/concierge" element={<LegalOrdenServicioRedirect />} />
      <Route path="/legal/orden-servicio/:planSlug/:versionSlug" element={<LegalOrdenServicio />} />
      <Route path="/contratar" element={<Contratar />} />
      <Route path="/contratar/confirmacion" element={<ContratarConfirmacion />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
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
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

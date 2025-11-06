import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Users, X } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const handleEmpresaClick = () => {
    window.location.href = "/solicitud?type=empresa";
  };

  const handleCloserClick = () => {
    window.location.href = "/solicitud?type=closer";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-secondary">
            ¿Cómo quieres unirte?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-6">
          <Button
            onClick={handleEmpresaClick}
            variant="hero"
            size="lg"
            className="w-full h-16 text-lg group"
          >
            <Building2 className="mr-3 h-6 w-6" />
            Soy Empresa
            <span className="ml-2 text-sm opacity-80">
              Busco closers para mi negocio
            </span>
          </Button>
          
          <Button
            onClick={handleCloserClick}
            variant="secondary"
            size="lg"
            className="w-full h-16 text-lg group"
          >
            <Users className="mr-3 h-6 w-6" />
            Soy Closer
            <span className="ml-2 text-sm opacity-80">
              Quiero vender para empresas
            </span>
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Únete gratis y comienza a generar resultados</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;

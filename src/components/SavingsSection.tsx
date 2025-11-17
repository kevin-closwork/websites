import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Calculator, DollarSign, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { pixelEvents } from "@/lib/pixelEvents";

const SavingsSection = () => {
  const handleCalculatorClick = () => {
    pixelEvents.viewContent('Savings Calculator CTA', 'cta');
    pixelEvents.lead('Savings Calculator CTA', 0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TrendingDown className="h-4 w-4" />
              Ahorro Garantizado
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cuánto puedes <span className="text-brand">ahorrar</span> con Closwork?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compara el costo real de contratar socios comerciales tradicionales vs nuestro modelo de pago por resultados. 
              Descubre el ahorro real para tu empresa.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sin Salarios Fijos</h3>
                <p className="text-muted-foreground">
                  No pagas salarios mensuales. Solo pagas por resultados y socios comerciales activos trabajando para ti.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ahorro Promedio 60-80%</h3>
                <p className="text-muted-foreground">
                  Las empresas ahorran entre 60% y 80% comparado con contratar socios comerciales con salario fijo tradicional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Calcula Tu Ahorro</h3>
                <p className="text-muted-foreground">
                  Usa nuestra calculadora interactiva para ver exactamente cuánto ahorrarías según tu escenario específico.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand mb-2">60-80%</div>
              <div className="text-sm text-muted-foreground">Ahorro promedio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-sm text-muted-foreground">Salarios fijos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Pago por resultados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Disponibilidad</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-brand/10 to-green-500/10 border-brand/20 p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Descubre cuánto puedes ahorrar
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Nuestra calculadora te muestra el ahorro exacto comparando el modelo tradicional vs Closwork. 
                  Personaliza según tu cantidad de socios comerciales y ciclo de ventas.
                </p>
                <Link to="/calculadora" onClick={handleCalculatorClick}>
                  <Button 
                    size="lg" 
                    className="bg-brand hover:bg-brand/90 text-white"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calcular Mi Ahorro
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsSection;


import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, Clock, DollarSign, Target, Zap, CheckCircle, XCircle } from "lucide-react";
import { pixelEvents } from "@/lib/pixelEvents";

const Calculator = () => {
  const [closersCount, setClosersCount] = useState<number>(3);
  const [salesCycle, setSalesCycle] = useState<number>(3);

  // Track page view
  useEffect(() => {
    pixelEvents.viewContent('Calculator Page', 'tool');
  }, []);

  // Constants
  const MEXICAN_MIN_WAGE = 8500; // MXN per month
  const AVERAGE_SALARY_MULTIPLIER = 1.5; // Most companies pay more than minimum wage

  // Planes de Closwork (precios mensuales)
  const PLAN_STARTER = 899; // 1 socio comercial
  const PLAN_GROWTH = 1900; // 2 socios comerciales ($950 por socio)
  const PLAN_SCALE = 2400; // 3 socios comerciales ($800 por socio)
  const ADDON_PRICE = 199; // Por cada socio adicional después de 3

  // Calcular precio mensual de Closwork basado en número de socios
  const getClosworkMonthlyPrice = (sociosCount: number): number => {
    if (sociosCount === 1) {
      return PLAN_STARTER; // $899/mes
    } else if (sociosCount === 2) {
      return PLAN_GROWTH; // $1,900/mes
    } else if (sociosCount === 3) {
      return PLAN_SCALE; // $2,400/mes
    } else {
      // 4+ socios: SCALE + addons
      const addonsCount = sociosCount - 3;
      return PLAN_SCALE + (addonsCount * ADDON_PRICE);
    }
  };

  // Calcular precio por socio comercial
  const getPricePerSocio = (sociosCount: number): number => {
    return getClosworkMonthlyPrice(sociosCount) / sociosCount;
  };

  const calculations = useMemo(() => {
    const traditionalSalary = MEXICAN_MIN_WAGE * AVERAGE_SALARY_MULTIPLIER;
    const traditionalCost = traditionalSalary * closersCount * salesCycle;
    const closworkMonthlyPrice = getClosworkMonthlyPrice(closersCount);
    const closworkCost = closworkMonthlyPrice * salesCycle;
    const savings = traditionalCost - closworkCost;
    const savingsPercentage = ((savings / traditionalCost) * 100).toFixed(1);
    const pricePerSocio = getPricePerSocio(closersCount);
    
    return {
      traditionalCost,
      closworkCost,
      closworkMonthlyPrice,
      pricePerSocio,
      savings,
      savingsPercentage,
      traditionalSalary
    };
  }, [closersCount, salesCycle]);

  return (
    <div className="container py-16">
      <Helmet>
        <title>Calculadora de Ahorro | Closwork</title>
        <meta name="description" content="Calcula cuánto ahorras con Closwork vs contratar closers tradicionales. Comparativa real con salarios mexicanos." />
        <link rel="canonical" href="/calculadora" />
      </Helmet>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ¿Cuánto ahorras con <span className="text-brand">Closwork</span>?
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Compara el costo real de contratar socios comerciales tradicionales vs nuestro modelo de planes mensuales
        </p>
      </div>

      {/* Calculator Inputs */}
      <Card className="max-w-2xl mx-auto mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Configura tu escenario
          </CardTitle>
          <CardDescription>
            Ajusta los parámetros para ver el ahorro real
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cantidad de socios comerciales</label>
              <Input 
                type="number" 
                value={closersCount} 
                onChange={(e) => setClosersCount(parseInt(e.target.value || "1", 10))}
                min="1"
                max="20"
              />
              <p className="text-xs text-muted-foreground">
                {closersCount} {closersCount === 1 ? 'socio comercial' : 'socios comerciales'} trabajando para ti
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ciclo de ventas (meses)</label>
              <Input 
                type="number" 
                value={salesCycle} 
                onChange={(e) => setSalesCycle(parseInt(e.target.value || "1", 10))}
                min="1"
                max="12"
              />
              <p className="text-xs text-muted-foreground">
                Tiempo para ver resultados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Traditional Model */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-red-700 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Modelo Tradicional
              </CardTitle>
              <Badge variant="destructive">Costoso</Badge>
            </div>
            <CardDescription className="text-red-600">
              Contratas socios comerciales con salario fijo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Salario por socio comercial:</span>
                <span className="font-medium">${calculations.traditionalSalary.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total socios comerciales:</span>
                <span className="font-medium">{closersCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duración:</span>
                <span className="font-medium">{salesCycle} meses</span>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Costo total</p>
              <div className="text-3xl font-bold text-red-700">
                ${calculations.traditionalCost.toLocaleString('es-MX')} MXN
              </div>
            </div>
            <div className="text-xs text-red-600 bg-red-100 p-3 rounded-lg">
              <strong>⚠️ Riesgo:</strong> Pagas salarios fijos sin importar si venden o no
            </div>
          </CardContent>
        </Card>

        {/* Closwork Model */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-700 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Closwork
              </CardTitle>
              <Badge variant="default" className="bg-green-600">Inteligente</Badge>
            </div>
            <CardDescription className="text-green-600">
              Pago por resultados, sin salarios fijos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Plan mensual ({closersCount} {closersCount === 1 ? 'socio' : 'socios'}):</span>
                <span className="font-medium">${calculations.closworkMonthlyPrice.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Precio por socio comercial:</span>
                <span className="font-medium">${calculations.pricePerSocio.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total socios comerciales:</span>
                <span className="font-medium">{closersCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duración:</span>
                <span className="font-medium">{salesCycle} meses</span>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Costo total</p>
              <div className="text-3xl font-bold text-green-700">
                ${calculations.closworkCost.toLocaleString('es-MX')} MXN
              </div>
            </div>
            <div className="text-xs text-green-600 bg-green-100 p-3 rounded-lg">
              <strong>✅ Ventaja:</strong> Solo pagas por socios comerciales activos, sin salarios fijos
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Summary */}
      <Card className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-blue-700 flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8" />
            ¡Ahorras ${calculations.savings.toLocaleString('es-MX')} MXN!
          </CardTitle>
          <CardDescription className="text-lg">
            Un ahorro del <strong>{calculations.savingsPercentage}%</strong> vs el modelo tradicional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-700">
                ${(calculations.savings / 12).toLocaleString('es-MX')}
              </div>
              <p className="text-sm text-muted-foreground">Ahorro mensual promedio</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-700">
                ${(calculations.savings / 1000).toFixed(1)}K
              </div>
              <p className="text-sm text-muted-foreground">Ahorro en miles de pesos</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-700">
                {closersCount * salesCycle}
              </div>
              <p className="text-sm text-muted-foreground">Socios-mes totales</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          ¿Listo para ahorrar ${calculations.savings.toLocaleString('es-MX')} MXN?
        </h2>
        <p className="text-muted-foreground mb-6">
          Únete a las empresas que ya están ahorrando con Closwork
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="success" 
            size="lg" 
            asChild
            onClick={() => pixelEvents.lead('Calculator CTA - Save Now', 0)}
          >
            <a href="/solicitud?type=empresa">
              <Zap className="h-4 w-4 mr-2" />
              Quiero ahorrar ahora
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            asChild
            onClick={() => pixelEvents.viewContent('More Benefits', 'navigation')}
          >
            <a href="/">
              <Users className="h-4 w-4 mr-2" />
              Ver más beneficios
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

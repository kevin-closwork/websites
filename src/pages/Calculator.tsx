import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Clock, DollarSign, Target, Zap, CheckCircle, XCircle } from "lucide-react";
import { pixelEvents } from "@/lib/pixelEvents";

type PlanType = 'STARTER' | 'GROWTH' | 'SCALE';

const Calculator = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('GROWTH');
  const [addonsCount, setAddonsCount] = useState<number>(0);
  const [salesCycle, setSalesCycle] = useState<number>(3);

  // Track page view
  useEffect(() => {
    pixelEvents.viewContent('Calculator Page', 'tool');
  }, []);

  // Constants
  const MEXICAN_MIN_WAGE = 8500; // MXN per month
  const AVERAGE_SALARY_MULTIPLIER = 1.5; // Most companies pay more than minimum wage
  
  // Nuevos planes Closwork
  const PLAN_CONFIG = {
    STARTER: {
      name: 'STARTER',
      price: 899, // MXN/mes
      closersIncluded: 1,
      addonPrice: 699, // MXN/mes por socio adicional
      emoji: '🎯'
    },
    GROWTH: {
      name: 'GROWTH',
      price: 1900, // MXN/mes
      closersIncluded: 2,
      addonPrice: 499, // MXN/mes por socio adicional
      emoji: '🚀'
    },
    SCALE: {
      name: 'SCALE',
      price: 2400, // MXN/mes
      closersIncluded: 3,
      addonPrice: 199, // MXN/mes por socio adicional
      emoji: '💎'
    }
  };

  // Calcular costo total y detalles del plan
  const planDetails = useMemo(() => {
    const plan = PLAN_CONFIG[selectedPlan];
    const totalClosers = plan.closersIncluded + addonsCount;
    const addonsCost = addonsCount * plan.addonPrice;
    const monthlyCost = plan.price + addonsCost;
    const pricePerCloser = monthlyCost / totalClosers;
    
    return {
      planName: plan.name,
      planPrice: plan.price,
      closersIncluded: plan.closersIncluded,
      addonsCount,
      addonPrice: plan.addonPrice,
      addonsCost,
      monthlyCost,
      totalClosers,
      pricePerCloser,
      emoji: plan.emoji
    };
  }, [selectedPlan, addonsCount]);

  const calculations = useMemo(() => {
    const traditionalSalary = MEXICAN_MIN_WAGE * AVERAGE_SALARY_MULTIPLIER;
    const traditionalCost = traditionalSalary * planDetails.totalClosers * salesCycle;
    const closworkCost = planDetails.monthlyCost * salesCycle;
    const savings = traditionalCost - closworkCost;
    const savingsPercentage = ((savings / traditionalCost) * 100).toFixed(1);
    
    return {
      traditionalCost,
      closworkCost,
      savings,
      savingsPercentage,
      traditionalSalary
    };
  }, [planDetails, salesCycle]);

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
          Compara el costo real de contratar socios comerciales tradicionales vs nuestro modelo de pago por resultados
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
              <label className="text-sm font-medium">Selecciona tu plan</label>
              <Select value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as PlanType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STARTER">
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      <span>STARTER - $899 MXN/mes (1 socio)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="GROWTH">
                    <div className="flex items-center gap-2">
                      <span>🚀</span>
                      <span>GROWTH - $1,900 MXN/mes (2 socios)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="SCALE">
                    <div className="flex items-center gap-2">
                      <span>💎</span>
                      <span>SCALE - $2,400 MXN/mes (3 socios)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Plan {planDetails.planName} - {planDetails.closersIncluded} {planDetails.closersIncluded === 1 ? 'socio comercial' : 'socios comerciales'} incluidos
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Socios comerciales adicionales</label>
              <Input 
                type="number" 
                value={addonsCount} 
                onChange={(e) => setAddonsCount(Math.max(0, parseInt(e.target.value || "0", 10)))}
                min="0"
                max="20"
              />
              <p className="text-xs text-muted-foreground">
                {addonsCount === 0 ? 'Sin addons' : `${addonsCount} ${addonsCount === 1 ? 'addon' : 'addons'} (+$${planDetails.addonPrice.toLocaleString('es-MX')} MXN/mes ${addonsCount === 1 ? 'cada uno' : 'cada uno'})`}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Total de socios comerciales</label>
              <div className="h-10 flex items-center px-3 bg-muted rounded-md border border-input">
                <span className="text-lg font-semibold">{planDetails.totalClosers}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  {planDetails.totalClosers === 1 ? 'socio comercial' : 'socios comerciales'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {planDetails.closersIncluded} del plan + {addonsCount} {addonsCount === 1 ? 'addon' : 'addons'}
              </p>
            </div>
          </div>

          {/* Plan Details */}
          <Separator />
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Resumen del plan:</span>
              <Badge variant="outline" className="font-semibold">
                <span className="mr-1">{planDetails.emoji}</span>
                {planDetails.planName}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Socios incluidos en plan:</span>
                <div className="font-semibold mt-1">
                  {planDetails.closersIncluded} {planDetails.closersIncluded === 1 ? 'socio' : 'socios'}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Precio base del plan:</span>
                <div className="font-semibold mt-1">
                  ${planDetails.planPrice.toLocaleString('es-MX')} MXN/mes
                </div>
              </div>
            </div>

            {addonsCount > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-blue-900">Socios adicionales (Addons):</span>
                  <span className="font-semibold text-blue-700">{addonsCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Precio por addon:</span>
                  <span className="font-semibold text-blue-900">${planDetails.addonPrice.toLocaleString('es-MX')} MXN/mes</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-blue-200">
                  <span className="font-medium text-blue-900">Total addons:</span>
                  <span className="font-bold text-blue-900">${planDetails.addonsCost.toLocaleString('es-MX')} MXN/mes</span>
                </div>
              </div>
            )}

            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Precio mensual total:</span>
                <div className="text-lg font-bold text-brand mt-1">
                  ${planDetails.monthlyCost.toLocaleString('es-MX')} MXN
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Precio por socio comercial:</span>
                <div className="text-lg font-bold text-brand mt-1">
                  ${Math.round(planDetails.pricePerCloser).toLocaleString('es-MX')} MXN
                </div>
              </div>
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
                <span className="font-medium">{planDetails.totalClosers}</span>
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
              <strong>⚠️ Riesgo:</strong> Pagas salarios sin importar si venden o no
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
                <span>Plan seleccionado:</span>
                <Badge variant="outline" className="font-medium">{planDetails.planName}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Precio mensual del plan:</span>
                <span className="font-medium">${planDetails.monthlyCost.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Precio por socio comercial:</span>
                <span className="font-medium">${Math.round(planDetails.pricePerCloser).toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total socios comerciales:</span>
                <span className="font-medium">{planDetails.totalClosers}</span>
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
              <strong>✅ Ventaja:</strong> Solo pagas por socios comerciales activos y resultados. Sin salarios fijos.
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
                {planDetails.totalClosers * salesCycle}
              </div>
              <p className="text-sm text-muted-foreground">Socios comerciales-mes totales</p>
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

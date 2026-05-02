import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Target, Zap, CheckCircle, XCircle } from "lucide-react";
import { pixelEvents } from "@/lib/pixelEvents";
import {
  PRICING_TIERS,
  convertUsdToCurrencyAmount,
  EXCHANGE_RATE,
} from "@/components/pricing/pricing.data";

const COMMISSION_RATE_MANAGED = 0.03;

function getTierByPlanKey(planKey: string) {
  return PRICING_TIERS.find((t) => t.id === planKey) ?? PRICING_TIERS[1];
}

function monthlyMembershipMxn(tier: (typeof PRICING_TIERS)[number]) {
  return tier.monthlyPriceMxn;
}

function setupFeeMxn(tier: (typeof PRICING_TIERS)[number]) {
  if (tier.setupFeeUSD == null) return 0;
  return convertUsdToCurrencyAmount(tier.setupFeeUSD, "MXN");
}

function commissionRateForTier(tierId: string) {
  return tierId === "acceso-directo" ? 0 : COMMISSION_RATE_MANAGED;
}

/** Closers equivalentes para comparar vs salario fijo (Enterprise: promedio conservador 2). */
function closersForTraditionalCompare(tierId: string) {
  return tierId === "enterprise" ? 2 : 1;
}

type PlanKey = (typeof PRICING_TIERS)[number]["id"];

const Calculator = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("concierge");
  const [salesCycle, setSalesCycle] = useState<number>(3);
  const [avgDealValueMxn, setAvgDealValueMxn] = useState<number>(50000);
  const [dealsPerMonth, setDealsPerMonth] = useState<number>(2);

  useEffect(() => {
    pixelEvents.viewContent("Calculator Page", "tool");
  }, []);

  const MEXICAN_MIN_WAGE = 8500;
  const AVERAGE_SALARY_MULTIPLIER = 1.5;

  const tier = useMemo(() => getTierByPlanKey(selectedPlan), [selectedPlan]);

  const planDetails = useMemo(() => {
    const membership = monthlyMembershipMxn(tier);
    const setup = setupFeeMxn(tier);
    const rate = commissionRateForTier(tier.id);
    const closersTrad = closersForTraditionalCompare(tier.id);

    return {
      tierId: tier.id,
      planName: tier.name,
      membershipMonthlyMxn: membership,
      setupFeeMxn: setup,
      commissionRate: rate,
      closersForTraditional: closersTrad,
      commissionLabel:
        rate > 0 ? `${(rate * 100).toFixed(0)}% sobre ventas cerradas` : "Sin comisión Closwork sobre ventas",
    };
  }, [tier]);

  const closworkBreakdown = useMemo(() => {
    const { membershipMonthlyMxn, setupFeeMxn, commissionRate } = planDetails;
    const membershipTotal = membershipMonthlyMxn * salesCycle;
    const monthlyCommission = avgDealValueMxn * dealsPerMonth * commissionRate;
    const commissionTotal = monthlyCommission * salesCycle;
    const total = membershipTotal + setupFeeMxn + commissionTotal;

    return {
      membershipTotal,
      setupFeeMxn,
      monthlyCommission,
      commissionTotal,
      total,
    };
  }, [planDetails, salesCycle, avgDealValueMxn, dealsPerMonth]);

  const calculations = useMemo(() => {
    const traditionalSalary = MEXICAN_MIN_WAGE * AVERAGE_SALARY_MULTIPLIER;
    const closers = planDetails.closersForTraditional;
    const traditionalCost = traditionalSalary * closers * salesCycle;
    const closworkCost = closworkBreakdown.total;
    const savings = traditionalCost - closworkCost;
    const savingsPercentage =
      traditionalCost > 0 ? ((savings / traditionalCost) * 100).toFixed(1) : "0.0";

    return {
      traditionalCost,
      closworkCost,
      savings,
      savingsPercentage,
      traditionalSalary,
    };
  }, [planDetails.closersForTraditional, salesCycle, closworkBreakdown.total]);

  const savingsPositive = calculations.savings >= 0;

  return (
    <div className="container py-16">
      <Helmet>
        <title>Calculadora de Ahorro | Closwork</title>
        <meta
          name="description"
          content="Calcula cuánto ahorras con Closwork vs contratar closers tradicionales, incluyendo membresía, comisiones y setup."
        />
        <link rel="canonical" href="/calculadora" />
      </Helmet>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ¿Cuánto ahorras con <span className="text-brand">Closwork</span>?
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Compara salarios fijos vs membresía, comisiones por venta (Concierge y Enterprise) y setup cuando
          aplica. Referencia ${EXCHANGE_RATE} MXN por USD, alineado a la página de planes.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Configura tu escenario
          </CardTitle>
          <CardDescription>
            Ajusta plan, volumen de cierres y ticket promedio para ver el costo total estimado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Plan</label>
              <Select
                value={selectedPlan}
                onValueChange={(value) => setSelectedPlan(value as PlanKey)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRICING_TIERS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} · $
                      {monthlyMembershipMxn(t).toLocaleString("es-MX")} MXN/mes
                      {t.id !== "acceso-directo" ? " + comisión" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{planDetails.commissionLabel}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ciclo (meses)</label>
              <Input
                type="number"
                value={salesCycle}
                onChange={(e) =>
                  setSalesCycle(Math.min(24, Math.max(1, parseInt(e.target.value || "1", 10))))
                }
                min="1"
                max="24"
              />
              <p className="text-xs text-muted-foreground">Ventana para sumar costos y comparar</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ticket promedio por venta (MXN)</label>
              <Input
                type="number"
                value={avgDealValueMxn}
                onChange={(e) =>
                  setAvgDealValueMxn(Math.max(0, parseInt(e.target.value || "0", 10)))
                }
                min="0"
              />
              <p className="text-xs text-muted-foreground">Usado para estimar comisiones (3% si aplica)</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ventas cerradas al mes (total)</label>
              <Input
                type="number"
                value={dealsPerMonth}
                onChange={(e) =>
                  setDealsPerMonth(Math.max(0, parseInt(e.target.value || "0", 10)))
                }
                min="0"
                max="500"
              />
              <p className="text-xs text-muted-foreground">Cierres que atribuyes al closer o al equipo</p>
            </div>
          </div>

          <Separator />

          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Resumen Closwork (estimado)</span>
              <Badge variant="outline" className="font-semibold">
                {planDetails.planName}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Membresía mensual (referencia)</span>
                <div className="font-semibold mt-1">
                  ${planDetails.membershipMonthlyMxn.toLocaleString("es-MX")} MXN
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Closers vs salario fijo (comparativa)</span>
                <div className="font-semibold mt-1">
                  {planDetails.closersForTraditional}{" "}
                  {planDetails.closersForTraditional === 1 ? "puesto" : "puestos"}
                  {tier.id === "enterprise" ? " (2 de 2-3 en plan Enterprise)" : ""}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Membresía × {salesCycle} meses</span>
                <span className="font-medium">
                  ${closworkBreakdown.membershipTotal.toLocaleString("es-MX")} MXN
                </span>
              </div>
              {closworkBreakdown.setupFeeMxn > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Setup único (Enterprise)</span>
                  <span className="font-medium">
                    ${closworkBreakdown.setupFeeMxn.toLocaleString("es-MX")} MXN
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Comisiones ({planDetails.commissionRate > 0 ? "3%" : "0%"}) × {salesCycle} meses
                </span>
                <span className="font-medium">
                  ${closworkBreakdown.commissionTotal.toLocaleString("es-MX")} MXN
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                ~$
                {closworkBreakdown.monthlyCommission.toLocaleString("es-MX")} MXN/mes en comisiones (
                {dealsPerMonth} ventas × ticket ${avgDealValueMxn.toLocaleString("es-MX")})
              </p>
            </div>

            <Separator />

            <div className="flex justify-between items-baseline">
              <span className="font-medium">Total estimado Closwork</span>
              <span className="text-lg font-bold text-brand">
                ${closworkBreakdown.total.toLocaleString("es-MX")} MXN
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              No incluye promociones (p. ej. membresía gratis si la comisión del mes supera el umbral). El cobro
              final en Stripe puede usar precios en MXN según el producto activo.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-red-700 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Modelo tradicional
              </CardTitle>
              <Badge variant="destructive">Costoso</Badge>
            </div>
            <CardDescription className="text-red-600">
              Salario fijo estimado ({planDetails.closersForTraditional}{" "}
              {planDetails.closersForTraditional === 1 ? "puesto" : "puestos"})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Salario mensual por puesto (estim.)</span>
                <span className="font-medium">
                  ${calculations.traditionalSalary.toLocaleString("es-MX")} MXN
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Puestos</span>
                <span className="font-medium">{planDetails.closersForTraditional}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Meses</span>
                <span className="font-medium">{salesCycle}</span>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Costo total estimado</p>
              <div className="text-3xl font-bold text-red-700">
                ${calculations.traditionalCost.toLocaleString("es-MX")} MXN
              </div>
            </div>
            <div className="text-xs text-red-600 bg-red-100 p-3 rounded-lg">
              <strong>Riesgo:</strong> Pagas nómina aunque no se cierren ventas.
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-700 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Closwork
              </CardTitle>
              <Badge variant="default" className="bg-green-600">
                Variable + membresía
              </Badge>
            </div>
            <CardDescription className="text-green-600">
              Membresía, comisiones por cierre cuando aplica y setup Enterprise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Membresía acumulada</span>
                <span className="font-medium">
                  ${closworkBreakdown.membershipTotal.toLocaleString("es-MX")} MXN
                </span>
              </div>
              {closworkBreakdown.setupFeeMxn > 0 && (
                <div className="flex justify-between">
                  <span>Setup</span>
                  <span className="font-medium">
                    ${closworkBreakdown.setupFeeMxn.toLocaleString("es-MX")} MXN
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Comisiones estimadas</span>
                <span className="font-medium">
                  ${closworkBreakdown.commissionTotal.toLocaleString("es-MX")} MXN
                </span>
              </div>
              <div className="flex justify-between">
                <span>Meses</span>
                <span className="font-medium">{salesCycle}</span>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Costo total estimado</p>
              <div className="text-3xl font-bold text-green-700">
                ${calculations.closworkCost.toLocaleString("es-MX")} MXN
              </div>
            </div>
            <div className="text-xs text-green-600 bg-green-100 p-3 rounded-lg">
              <strong>Ventaja:</strong> Comisiones solo cuando cierras; Acceso Directo sin comisión Closwork
              sobre ventas en este modelo.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card
        className={`max-w-4xl mx-auto mb-12 border-2 ${
          savingsPositive ? "bg-gradient-to-r from-blue-50 to-green-50 border-blue-200" : "bg-amber-50/80 border-amber-200"
        }`}
      >
        <CardHeader className="text-center">
          <CardTitle
            className={`text-2xl md:text-3xl flex items-center justify-center gap-2 flex-wrap ${
              savingsPositive ? "text-blue-700" : "text-amber-900"
            }`}
          >
            <TrendingUp className="h-8 w-8 shrink-0" />
            {savingsPositive ? (
              <>Ahorras ${calculations.savings.toLocaleString("es-MX")} MXN (estimado)</>
            ) : (
              <>
                Costo Closwork mayor por $
                {Math.abs(calculations.savings).toLocaleString("es-MX")} MXN vs el tradicional estimado
              </>
            )}
          </CardTitle>
          <CardDescription className="text-lg">
            {savingsPositive ? (
              <>
                Diferencia aproximada del <strong>{calculations.savingsPercentage}%</strong> frente al modelo
                tradicional en el periodo.
              </>
            ) : (
              <>
                Con mucho volumen o ticket alto, las comisiones pueden superar el ahorro vs nómina estimada.
                Ajusta ventas al mes o ticket para explorar otros escenarios.
              </>
            )}
          </CardDescription>
        </CardHeader>
        {savingsPositive && (
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-700">
                  ${(calculations.savings / Math.max(salesCycle, 1)).toLocaleString("es-MX")}
                </div>
                <p className="text-sm text-muted-foreground">Diferencia mensual promedio</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-700">
                  ${(calculations.savings / 1000).toFixed(1)}K
                </div>
                <p className="text-sm text-muted-foreground">Diferencia en miles de pesos</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-700">
                  {planDetails.closersForTraditional * salesCycle}
                </div>
                <p className="text-sm text-muted-foreground">Puestos-mes (tradicional)</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          {savingsPositive
            ? `¿Listo para explorar Closwork?`
            : "Ajusta ticket o ventas al mes para ver otros escenarios"}
        </h2>
        <p className="text-muted-foreground mb-6">
          Únete a las empresas que operan ventas con comisiones y sin nómina fija de closers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="success"
            size="lg"
            asChild
            onClick={() => pixelEvents.lead("Calculator CTA - Save Now", 0)}
          >
            <a href="/solicitud?type=empresa">
              <Zap className="h-4 w-4 mr-2" />
              Quiero empezar
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/#pricing" onClick={() => pixelEvents.viewContent("Calculator to Pricing", "navigation")}>
              <Users className="h-4 w-4 mr-2" />
              Ver planes
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

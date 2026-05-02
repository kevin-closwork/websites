import type { BillingPeriod, ComparisonRow, Currency, PricingTier } from "./pricing.types";

export const EXCHANGE_RATE = 20;
export const ANNUAL_DISCOUNT = 0.2;

export function convertUsdToCurrencyAmount(usd: number, currency: Currency): number {
  if (currency === "MXN") return Math.round(usd * EXCHANGE_RATE);
  return Math.round(usd);
}

/** Equivalente mensual con descuento anual (20%), redondeado. */
export function getAdjustedMonthlyMxn(monthlyPriceMxn: number, period: BillingPeriod): number {
  if (period === "annual") return Math.round(monthlyPriceMxn * (1 - ANNUAL_DISCOUNT));
  return monthlyPriceMxn;
}

export function getDisplayMonthlyMxn(
  monthlyPriceMxn: number,
  period: BillingPeriod
): number {
  return getAdjustedMonthlyMxn(monthlyPriceMxn, period);
}

export function getStrikethroughMonthlyMxn(
  monthlyPriceMxn: number,
  period: BillingPeriod
): number | null {
  if (period !== "annual") return null;
  return monthlyPriceMxn;
}

/** Número con separador de miles (México). */
export function formatMxnNumber(amount: number): string {
  return amount.toLocaleString("es-MX", { maximumFractionDigits: 0 });
}

/** Ej. $799 MXN/mes */
export function formatMxnPerMonth(amount: number): string {
  return `$${formatMxnNumber(amount)} MXN/mes`;
}

/** Solo importe + MXN, para líneas que añaden “/mes” aparte. */
export function formatMxnMoney(amount: number): string {
  return `$${formatMxnNumber(amount)} MXN`;
}

export function formatMoney(amount: number, currency: Currency, withSuffix = true): string {
  const formatted =
    currency === "MXN"
      ? formatMxnNumber(amount)
      : amount.toLocaleString("en-US");
  if (currency === "USD") return `$${formatted}`;
  return withSuffix ? `$${formatted} MXN` : `$${formatted}`;
}

export function formatMoneyCompactUSD(usd: number, currency: Currency): string {
  return formatMoney(convertUsdToCurrencyAmount(usd, currency), currency);
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "acceso-directo",
    name: "Acceso Directo",
    tag: "Prueba gratis",
    monthlyPriceMxn: 799,
    priceSubtitle: "7 días gratis para probar",
    description:
      "Publica tu oportunidad y elige entre closers verificados que aplican a tu vacante. Tú gestionas la relación.",
    commissionLine: undefined,
    features: [
      { text: "Pool de closers verificados", included: true },
      { text: "Hasta 2 oportunidades activas", included: true },
      { text: "Checklist automatizado de oferta", included: true },
      { text: "Dashboard básico", included: true },
      { text: "Sin closers certificados HTC", included: false },
      { text: "Sin garantía de match", included: false },
    ],
    idealFor: "Ideal para: Empresas que quieren probar el modelo o ya saben gestionar closers.",
    ctaText: "Empezar gratis",
    ctaVariant: "secondary-green",
    stripePlanKey: "planBasico",
  },
  {
    id: "concierge",
    name: "Concierge",
    tag: "Closer certificado",
    monthlyPriceMxn: 4900,
    priceSubtitle: "+ 3% sobre cada venta cerrada",
    description:
      "Closwork selecciona y asigna un Closer Certificado HTC. Revisamos tu oferta antes de activar.",
    commissionLine: "+ 3% sobre cada venta cerrada",
    featured: true,
    popularBadge: "Más popular",
    promo: {
      title: "PROMO DE LANZAMIENTO",
      description:
        "Si el 3% de comisión Closwork es de {threshold} o más en el mes, la membresía de ese mes es gratis.",
      limit: "Aplica los primeros 3 meses. Primeros 50 clientes o hasta agosto 2026.",
      thresholdMXN: 4000,
      exampleRevenueMXN: 140000,
    },
    features: [
      { text: "Closer Certificado HTC asignado", included: true },
      { text: "Revisión de tu oferta comercial", included: true },
      { text: "1 cambio gratis en 30 días", included: true },
      { text: "Onboarding con tu proceso", included: true },
      { text: "Dashboard de métricas", included: true },
      { text: "Soporte WhatsApp prioritario", included: true },
    ],
    idealFor:
      "Ideal para: Infoproductores, coaches y agencias que generan leads pero necesitan cerrar más.",
    ctaText: "Comenzar ahora",
    ctaVariant: "primary",
    stripePlanKey: "planGrowth",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "Equipo completo",
    monthlyPriceMxn: 0,
    contactSalesOnly: true,
    priceSubtitle: "+ 3% sobre ventas cerradas · Propuesta según volumen",
    description:
      "Armamos tu equipo comercial externo. Evaluamos tu oferta, diseñamos el proceso y asignamos closers de élite.",
    commissionLine: "+ 3% sobre ventas cerradas",
    setupFeeUSD: 1500,
    setupInfo: {
      description:
        "Assessment de oferta, diseño de proceso de ventas, selección de equipo y onboarding conjunto.",
    },
    features: [
      { text: "2-3 closers certificados HTC", included: true },
      { text: "Consultoría de oferta comercial", included: true },
      { text: "Diseño de proceso de ventas", included: true },
      { text: "Onboarding conjunto", included: true },
      { text: "Cambios ilimitados 60 días", included: true },
      { text: "Account manager dedicado", included: true },
      { text: "Reportes quincenales", included: true },
    ],
    idealFor:
      "Ideal para: Empresas con volumen, universidades, corporativos que necesitan un equipo listo.",
    ctaText: "Contactar ventas",
    ctaVariant: "secondary-blue",
    stripePlanKey: "planScale",
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "Precio",
    cells: ["", "", ""],
  },
  {
    label: "Setup fee",
    cells: ["-", "-", ""],
  },
  {
    label: "Promo",
    cells: ["-", "", "-"],
  },
  {
    label: "Tipo de closer",
    cells: ["Verificado", "Certificado HTC", "Certificado HTC"],
    cellEmphasis: [false, true, true],
  },
  {
    label: "Validación de oferta",
    cells: ["Automatizada", "Manual", "Consultoría"],
    cellEmphasis: [false, true, true],
  },
  {
    label: "Cambios de closer",
    cells: ["-", "1 gratis (30d)", "Ilimitados (60d)"],
    cellEmphasis: [false, false, true],
  },
  {
    label: "Soporte",
    cells: ["Dashboard", "WhatsApp prioritario", "Account manager"],
    cellEmphasis: [false, false, true],
  },
  {
    label: "Riesgo",
    cells: ["Cliente", "Compartido", "Closwork"],
    cellEmphasis: [false, true, true],
  },
];

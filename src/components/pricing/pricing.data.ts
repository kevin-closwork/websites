import type {
  BillingPeriod,
  ComparisonRow,
  Currency,
  Money,
  PricingTier,
} from "./pricing.types";

/** Referencia de tipo de cambio usada para fijar los importes de cada plan. */
export const EXCHANGE_RATE = 20;
export const ANNUAL_DISCOUNT = 0.2;

export const CURRENCY_LABELS: Record<Currency, string> = {
  MXN: "Pesos MXN",
  USD: "Dólares USD",
};

export function amountIn(money: Money, currency: Currency): number {
  return currency === "MXN" ? money.mxn : money.usd;
}

/** Equivalente mensual con descuento anual (20%), redondeado. */
export function getAdjustedMonthly(base: number, period: BillingPeriod): number {
  if (period === "annual") return Math.round(base * (1 - ANNUAL_DISCOUNT));
  return base;
}

export function getStrikethroughMonthly(
  base: number,
  period: BillingPeriod
): number | null {
  if (period !== "annual") return null;
  return base;
}

/** Ej. $1,200 MXN · $60 USD. Muestra centavos solo si el importe los tiene. */
export function formatMoney(amount: number, currency: Currency): string {
  const locale = currency === "MXN" ? "es-MX" : "en-US";
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;
  const formatted = amount.toLocaleString(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return `$${formatted} ${currency}`;
}

/** Ej. $1,200 MXN/mes */
export function formatPerMonth(amount: number, currency: Currency): string {
  return `${formatMoney(amount, currency)}/mes`;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "acceso-directo",
    name: "Acceso Directo",
    tag: "Prueba gratis",
    monthlyPrice: { usd: 40, mxn: 799 },
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
    monthlyPrice: { usd: 60, mxn: 1200 },
    priceSubtitle: "+ 3% sobre cada venta cerrada",
    description:
      "Closwork selecciona y asigna hasta 2 Closers Certificados HTC. Revisamos tu oferta antes de activar.",
    commissionLine: "+ 3% sobre cada venta cerrada",
    featured: true,
    popularBadge: "Más popular",
    setupFee: { usd: 999, mxn: 19980 },
    setupInfo: {
      label: "Instalación única",
      description:
        "Assessment de tu oferta, diseño del proceso de ventas, selección del equipo y onboarding conjunto.",
      installments: 12,
    },
    promo: {
      title: "PROMO DE LANZAMIENTO",
      description:
        "Si el 3% de comisión Closwork es de {threshold} o más en el mes, la membresía de ese mes es gratis.",
      limit: "Aplica los primeros 3 meses. Primeros 50 clientes o hasta agosto 2026.",
      threshold: { usd: 200, mxn: 4000 },
      exampleRevenue: { usd: 7000, mxn: 140000 },
    },
    features: [
      { text: "Hasta 2 Closers Certificados HTC", included: true },
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
    stripePlanKey: "planConcierge2",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "Equipo completo",
    monthlyPrice: { usd: 0, mxn: 0 },
    contactSalesOnly: true,
    priceSubtitle: "+ 3% sobre ventas cerradas · Propuesta según volumen",
    description:
      "Armamos tu equipo comercial externo. Evaluamos tu oferta, diseñamos el proceso y asignamos closers de élite.",
    commissionLine: "+ 3% sobre ventas cerradas",
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
    label: "Instalación",
    cells: ["-", "", "-"],
  },
  {
    label: "Promo",
    cells: ["-", "", "-"],
  },
  {
    label: "Closers incluidos",
    cells: ["Autogestionado", "Hasta 2 HTC", "2-3 HTC"],
    cellEmphasis: [false, true, true],
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

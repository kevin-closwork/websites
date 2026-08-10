import type {
  BillingPeriod,
  ComparisonRow,
  Currency,
  Money,
  PricingTier,
} from "./pricing.types";
import { getCurrentOrder } from "@/lib/legal/registry";

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

/** Precio Concierge desde Orden de Servicio vigente (frontmatter pricing.base_amount). */
function conciergeMonthlyPrice(): Money {
  const order = getCurrentOrder("concierge");
  const usd = order?.pricing?.base_amount;
  if (usd == null) return { usd: 0, mxn: 0 };
  return { usd, mxn: Math.round(usd * EXCHANGE_RATE) };
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
    monthlyPrice: conciergeMonthlyPrice(),
    priceSubtitle: "Cuota fija mensual · Sin comisión por venta",
    description:
      "Closwork selecciona y asigna hasta 2 Closers Certificados HTC. Revisamos tu oferta antes de activar.",
    featured: true,
    popularBadge: "Más popular",
    features: [
      { text: "2 closers incluidos (hasta 5 en total)", included: true },
      { text: "Revisión de tu oferta comercial", included: true },
      { text: "Supervisión y reporte mensual", included: true },
      { text: "Garantías de colocación y reemplazo", included: true },
      { text: "Soporte en horario hábil", included: true },
      { text: "Sin cuota de implementación", included: true },
    ],
    idealFor:
      "Ideal para: Empresas B2B que necesitan fuerza comercial externa sin nómina fija.",
    ctaText: "Contratar en línea",
    ctaVariant: "primary",
    stripePlanKey: "planConcierge",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "Equipo completo",
    monthlyPrice: { usd: 0, mxn: 0 },
    contactSalesOnly: true,
    priceSubtitle: "Propuesta según volumen · Sin comisión por venta",
    description:
      "Armamos tu equipo comercial externo. Evaluamos tu oferta, diseñamos el proceso y asignamos closers de élite.",
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
    cells: ["-", "No aplica", "-"],
  },
  {
    label: "Closers incluidos",
    cells: ["Autogestionado", "Hasta 5", "2-3 HTC"],
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
    cells: ["-", "Garantía de reemplazo", "Ilimitados (60d)"],
    cellEmphasis: [false, false, true],
  },
  {
    label: "Soporte",
    cells: ["Dashboard", "Horario hábil", "Account manager"],
    cellEmphasis: [false, false, true],
  },
  {
    label: "Riesgo",
    cells: ["Cliente", "Compartido", "Closwork"],
    cellEmphasis: [false, true, true],
  },
];

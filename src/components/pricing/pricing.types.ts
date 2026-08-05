export type Currency = "USD" | "MXN";

export type BillingPeriod = "monthly" | "annual";

export type StripePlanKey =
  | "planBasico"
  | "planGrowth"
  | "planScale"
  | "planConcierge"
  | "planConcierge2";

export type CtaVariant = "primary" | "secondary-green" | "secondary-blue";

/** Importe fijado en ambas monedas para poder mostrar cifras redondas en cada una. */
export interface Money {
  usd: number;
  mxn: number;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PromoCopy {
  title: string;
  description: string;
  limit: string;
  threshold: Money;
  exampleRevenue: Money;
}

export interface SetupInfo {
  description: string;
  /** Encabezado del bloque. Por defecto "Setup fee único". */
  label?: string;
  /** Máximo de meses sin intereses para diferir el pago. */
  installments?: number;
}

export interface PricingTier {
  id: string;
  name: string;
  tag: string;
  /** Tarifa de lista por mes (0 si solo cotización). */
  monthlyPrice: Money;
  /** Sin importe fijo; los switches no cambian el precio mostrado. */
  contactSalesOnly?: boolean;
  priceSubtitle: string;
  description: string;
  features: PricingFeature[];
  idealFor: string;
  ctaText: string;
  ctaVariant: CtaVariant;
  stripePlanKey: StripePlanKey;
  featured?: boolean;
  popularBadge?: string;
  commissionLine?: string;
  promo?: PromoCopy;
  setupFee?: Money;
  setupInfo?: SetupInfo;
}

export interface ComparisonRow {
  label: string;
  /** Plain or 'bold' for emphasis in concierge/enterprise columns */
  cells: [string, string, string];
  cellEmphasis?: [boolean, boolean, boolean];
}

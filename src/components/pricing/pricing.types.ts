export type Currency = "USD" | "MXN";

export type BillingPeriod = "monthly" | "annual";

export type StripePlanKey = "planBasico" | "planGrowth" | "planScale";

export type CtaVariant = "primary" | "secondary-green" | "secondary-blue";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PromoCopy {
  title: string;
  description: string;
  limit: string;
  thresholdMXN: number;
  exampleRevenueMXN: number;
}

export interface SetupInfo {
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tag: string;
  /** Tarifa de lista en MXN/mes (0 si solo cotización). */
  monthlyPriceMxn: number;
  /** Sin importe fijo; el switch no cambia el precio mostrado. */
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
  setupFeeUSD?: number;
  setupInfo?: SetupInfo;
}

export interface ComparisonRow {
  label: string;
  /** Plain or 'bold' for emphasis in concierge/enterprise columns */
  cells: [string, string, string];
  cellEmphasis?: [boolean, boolean, boolean];
}

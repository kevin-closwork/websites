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
  thresholdUSD: number;
  exampleCloseUSD: number;
}

export interface SetupInfo {
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tag: string;
  monthlyPriceUSD: number;
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

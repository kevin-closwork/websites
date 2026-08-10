import type { OrderPricing } from "./registry";

export type PricingBreakdown = {
  additionalClosers: number;
  subtotalUsd: number;
  ivaUsd: number;
  totalUsd: number;
  currency: string;
};

const IVA_RATE = 0.16;

/** Única fuente de cálculo — lee pricing del frontmatter vía OrderPricing. */
export function calculateOrderTotal(
  pricing: OrderPricing,
  additionalClosers: number,
  currency = "USD"
): PricingBreakdown {
  const extra = Math.max(
    0,
    Math.min(additionalClosers, pricing.max_additional_closers)
  );
  const subtotalUsd =
    pricing.base_amount + extra * pricing.additional_closer_amount;
  const ivaUsd = subtotalUsd * IVA_RATE;
  const totalUsd = subtotalUsd + ivaUsd;
  return {
    additionalClosers: extra,
    subtotalUsd,
    ivaUsd,
    totalUsd,
    currency,
  };
}

export function formatUsd(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export function noExtraFeesLine(pricing: OrderPricing): string {
  const parts: string[] = [];
  if (pricing.implementation_fee === 0) {
    parts.push("cuota de implementación");
  }
  if (pricing.sales_commission_pct === 0) {
    parts.push("comisión alguna sobre sus ventas");
  }
  if (parts.length === 0) return "";
  return `Ésta es la única cantidad a su cargo. Closwork no cobra ${parts.join(" ni ")}.`;
}

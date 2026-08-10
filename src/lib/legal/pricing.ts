import type { OrderPricing } from "./registry";

export type PricingBreakdown = {
  additionalClosers: number;
  /** Importe sin impuesto (base gravable). */
  subtotalUsd: number;
  /** I.V.A. contenido en el total cuando el precio lo incluye. */
  ivaUsd: number;
  /** Importe que se cobra al Cliente. */
  totalUsd: number;
  taxIncluded: boolean;
  taxRate: number;
  currency: string;
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

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
  const listed = round2(
    pricing.base_amount + extra * pricing.additional_closer_amount
  );
  const rate = pricing.tax_rate;

  // Los importes publicados ya incluyen el impuesto: se desglosa hacia atrás.
  const totalUsd = pricing.tax_included ? listed : round2(listed * (1 + rate));
  const subtotalUsd = round2(totalUsd / (1 + rate));
  const ivaUsd = round2(totalUsd - subtotalUsd);

  return {
    additionalClosers: extra,
    subtotalUsd,
    ivaUsd,
    totalUsd,
    taxIncluded: pricing.tax_included,
    taxRate: rate,
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

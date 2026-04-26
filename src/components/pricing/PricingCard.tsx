import { Check, X } from "lucide-react";
import type { BillingPeriod, Currency, PricingTier } from "./pricing.types";
import {
  formatMoney,
  convertUsdToCurrencyAmount,
  getDisplayMonthlyAmount,
  getStrikethroughMonthlyAmount,
} from "./pricing.data";

interface PricingCardProps {
  tier: PricingTier;
  currency: Currency;
  period: BillingPeriod;
  animationDelay: number;
  visible: boolean;
  onSelectPlan: (tier: PricingTier) => void;
}

export function PricingCard({
  tier,
  currency,
  period,
  animationDelay,
  visible,
  onSelectPlan,
}: PricingCardProps) {
  const displayMonthly = getDisplayMonthlyAmount(tier.monthlyPriceUSD, period, currency);
  const strike = getStrikethroughMonthlyAmount(tier.monthlyPriceUSD, period, currency);

  const thresholdAmt = tier.promo
    ? formatMoney(convertUsdToCurrencyAmount(tier.promo.thresholdUSD, currency), currency)
    : "";
  const closeAmt = tier.promo
    ? formatMoney(convertUsdToCurrencyAmount(tier.promo.exampleCloseUSD, currency), currency)
    : "";
  const commAmt = tier.promo
    ? formatMoney(
        convertUsdToCurrencyAmount(tier.promo.exampleCloseUSD * 0.03, currency),
        currency
      )
    : "";

  const promoDescription = tier.promo
    ? tier.promo.description.replace("{threshold}", thresholdAmt)
    : "";

  const promoExample = tier.promo
    ? `Ejemplo: Tu closer cierra ${closeAmt}. 3% = ${commAmt}. Supera ${thresholdAmt}, no pagas membresía. Solo pagas ${commAmt}.`
    : "";

  const setupFeeFormatted =
    tier.setupFeeUSD != null
      ? formatMoney(convertUsdToCurrencyAmount(tier.setupFeeUSD, currency), currency)
      : "";

  const isPrimary = tier.ctaVariant === "primary";
  const isGreenOutline = tier.ctaVariant === "secondary-green";
  const isBlueOutline = tier.ctaVariant === "secondary-blue";

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-white px-6 pb-6 shadow-[0_1px_3px_rgba(0,20,60,0.04),0_8px_24px_rgba(0,20,60,0.06)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,20,60,0.12)] min-[420px]:max-w-none max-w-[420px] mx-auto w-full ${
        tier.featured ? "pt-10" : "pt-6"
      } ${
        tier.featured ? "border-2 border-[#4AAB6F]" : "border border-[#E2E5EA]"
      } ${visible ? "animate-pricing-fade-up" : "translate-y-4 opacity-0"}`}
      style={{
        animationDelay: visible ? `${animationDelay}s` : undefined,
        fontFamily: "'Manrope', system-ui, sans-serif",
      }}
    >
      {tier.popularBadge && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#4AAB6F] px-4 py-1.5 text-xs font-bold text-white shadow-md">
          ★ {tier.popularBadge}
        </div>
      )}

      <div className="mb-4">
        <span className="inline-block rounded-md bg-[#F2F4F7] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#5A6170]">
          {tier.tag}
        </span>
        <h3
          className="mt-3 text-[1.4rem] font-extrabold tracking-tight text-[#1A1A2E]"
          style={{ fontWeight: 800 }}
        >
          {tier.name}
        </h3>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap items-baseline gap-2">
          {period === "annual" && strike != null && (
            <span className="text-xl font-extrabold text-[#8C919A] line-through decoration-[#8C919A]">
              {formatMoney(strike, currency)}
            </span>
          )}
          <span
            className="text-[2.4rem] font-extrabold leading-none tracking-tight text-[#1A1A2E]"
            style={{ fontWeight: 800, letterSpacing: "-1.5px" }}
          >
            {formatMoney(displayMonthly, currency)}
          </span>
          <span className="text-sm font-semibold text-[#5A6170]">/mes</span>
        </div>
        {period === "annual" && (
          <p className="mt-1 text-[11px] font-medium text-[#8C919A]">Cobrado anualmente</p>
        )}
        <p className="mt-2 text-[13px] font-medium text-[#5A6170]">{tier.priceSubtitle}</p>
      </div>

      <p className="mb-4 text-[13px] leading-relaxed text-[#5A6170]">{tier.description}</p>

      {tier.promo && (
        <div
          className="mb-4 rounded-[10px] border border-[#FDDCAB] p-4"
          style={{ backgroundColor: "#FEF6E7" }}
        >
          <p className="text-[12px] font-bold uppercase tracking-wide text-[#B54708]">
            {tier.promo.title}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#1A1A2E]">{promoDescription}</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#1A1A2E]">{promoExample}</p>
          <p className="mt-2 text-[11px] text-[#5A6170]">{tier.promo.limit}</p>
        </div>
      )}

      {tier.setupFeeUSD != null && tier.setupInfo && (
        <div
          className="mb-4 rounded-[10px] border border-[#C5D6EC] p-4"
          style={{ backgroundColor: "#E6EFF8" }}
        >
          <p className="text-[13px] font-bold text-[#003976]">
            Setup fee único: {setupFeeFormatted}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#5A6170]">
            {tier.setupInfo.description}
          </p>
        </div>
      )}

      <ul className="mb-6 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li key={f.text} className="flex gap-2 text-[12.5px] leading-snug text-[#1A1A2E]">
            {f.included ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4AAB6F]" strokeWidth={2.5} />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-[#8C919A]" strokeWidth={2} />
            )}
            <span className={f.included ? "" : "text-[#8C919A]"}>{f.text}</span>
          </li>
        ))}
      </ul>

      <p className="mb-4 text-[11px] leading-relaxed text-[#5A6170]">{tier.idealFor}</p>

      <button
        type="button"
        onClick={() => onSelectPlan(tier)}
        className={`mt-auto w-full rounded-xl py-3.5 text-sm font-semibold transition-colors duration-300 ${
          isPrimary
            ? "bg-[#4AAB6F] text-white hover:bg-[#2D7A4A]"
            : isGreenOutline
              ? "border-2 border-[#4AAB6F] bg-white text-[#2D7A4A] hover:bg-[#E8F5EE]"
              : "border-2 border-[#003976] bg-white text-[#003976] hover:bg-[#E6EFF8]"
        }`}
      >
        {tier.ctaText}
      </button>
    </article>
  );
}

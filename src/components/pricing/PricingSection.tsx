import { useCallback, useEffect, useRef, useState } from "react";
import { PricingCard } from "./PricingCard";
import { PricingToggle } from "./PricingToggle";
import { CurrencySelector } from "./CurrencySelector";
import { ComparisonTable } from "./ComparisonTable";
import { PRICING_TIERS, EXCHANGE_RATE } from "./pricing.data";
import type { BillingPeriod, Currency, PricingTier, StripePlanKey } from "./pricing.types";
import { getStripePrice, getStripeTracking } from "@/lib/stripeConfig";
import { pixelEvents } from "@/lib/pixelEvents";

const TYC_ROUTES: Record<StripePlanKey, string> = {
  planBasico: "/empresas-tyc-basico",
  planGrowth: "/empresas-tyc-growth",
  planScale: "/empresas-tyc-scale",
};

export function PricingSection() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cardsVisible, setCardsVisible] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCardsVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSelectPlan = useCallback((tier: PricingTier) => {
    const key = tier.stripePlanKey;
    const tracking = getStripeTracking(key);
    const price = getStripePrice(key);
    pixelEvents.initiateCheckout(tracking.checkoutType, price);
    pixelEvents.lead(tracking.leadType, price);
    window.location.href = TYC_ROUTES[key];
  }, []);

  const footnote =
    currency === "USD"
      ? `Todos los precios en USD. Equivalentes en MXN al tipo de cambio ~$${EXCHANGE_RATE} MXN/USD. Precios sujetos a cambio.`
      : `Todos los precios en MXN. Tipo de cambio referencia: $${EXCHANGE_RATE} MXN/USD.`;

  return (
    <section
      id="pricing"
      className="scroll-mt-24 bg-[#FAFBFC] py-16 min-[900px]:py-20"
      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <header className="mb-10 text-center">
          <h2
            className="text-[#1A1A2E]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
            }}
          >
            Planes que se adaptan a tu etapa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-[#5A6170] min-[900px]:text-[14px]">
            Resultados con comisión por venta. Elige autoservicio, acompañamiento con closer certificado o un
            equipo completo.
          </p>
        </header>

        <div className="mb-12 flex flex-col items-stretch gap-4 min-[900px]:mb-14 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <div className="flex justify-center min-[900px]:flex-1">
            <PricingToggle period={period} onChange={setPeriod} />
          </div>
          <div className="flex justify-center min-[900px]:justify-end">
            <CurrencySelector currency={currency} onChange={setCurrency} />
          </div>
        </div>

        <div
          ref={revealRef}
          className="grid grid-cols-1 gap-[18px] min-[900px]:grid-cols-3"
        >
          {PRICING_TIERS.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              currency={currency}
              period={period}
              animationDelay={0.1 * (index + 1)}
              visible={cardsVisible}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>

        <ComparisonTable currency={currency} period={period} />

        <p className="mx-auto mt-10 max-w-3xl text-center text-[11px] leading-relaxed text-[#8C919A]">
          {footnote}
        </p>
      </div>
    </section>
  );
}

export default PricingSection;

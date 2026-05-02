import type { BillingPeriod } from "./pricing.types";

interface PricingToggleProps {
  period: BillingPeriod;
  onChange: (p: BillingPeriod) => void;
}

export function PricingToggle({ period, onChange }: PricingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
      <div
        className="inline-flex rounded-full bg-[#F2F4F7] p-1 transition-all duration-300"
        role="group"
        aria-label="Periodo de facturación"
      >
        {(["monthly", "annual"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              period === p
                ? "bg-white text-[#1A1A2E] shadow-[0_1px_4px_rgba(0,20,60,0.08)]"
                : "text-[#5A6170] hover:text-[#1A1A2E]"
            }`}
          >
            {p === "monthly" ? "Mensual" : "Anual"}
          </button>
        ))}
      </div>
      {period === "annual" && (
        <span className="max-w-[min(100%,280px)] rounded-full bg-[#E8F5EE] px-2.5 py-1 text-center text-[11px] font-semibold leading-snug text-[#2D7A4A] transition-opacity duration-300 sm:max-w-none">
          Ahorra 20% en la tarifa mensual equivalente
        </span>
      )}
    </div>
  );
}

import type { Currency } from "./pricing.types";
import { CURRENCY_LABELS } from "./pricing.data";

interface CurrencyToggleProps {
  currency: Currency;
  onChange: (c: Currency) => void;
}

export function CurrencyToggle({ currency, onChange }: CurrencyToggleProps) {
  return (
    <div
      className="inline-flex rounded-full bg-[#F2F4F7] p-1 transition-all duration-300"
      role="group"
      aria-label="Moneda"
    >
      {(["MXN", "USD"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={currency === c}
          className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
            currency === c
              ? "bg-white text-[#1A1A2E] shadow-[0_1px_4px_rgba(0,20,60,0.08)]"
              : "text-[#5A6170] hover:text-[#1A1A2E]"
          }`}
        >
          {CURRENCY_LABELS[c]}
        </button>
      ))}
    </div>
  );
}

export default CurrencyToggle;

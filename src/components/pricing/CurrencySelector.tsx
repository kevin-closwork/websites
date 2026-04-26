import type { Currency } from "./pricing.types";

interface CurrencySelectorProps {
  currency: Currency;
  onChange: (c: Currency) => void;
}

export function CurrencySelector({ currency, onChange }: CurrencySelectorProps) {
  return (
    <div
      className="inline-flex rounded-full bg-[#F2F4F7] p-0.5 text-xs font-semibold transition-all duration-300"
      role="group"
      aria-label="Divisa"
    >
      {(["USD", "MXN"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`rounded-full px-3 py-1.5 transition-all duration-300 ${
            currency === c
              ? "bg-white text-[#1A1A2E] shadow-[0_1px_3px_rgba(0,20,60,0.06)]"
              : "text-[#5A6170] hover:text-[#1A1A2E]"
          }`}
        >
          {c === "USD" ? "🇺🇸 USD" : "🇲🇽 MXN"}
        </button>
      ))}
    </div>
  );
}

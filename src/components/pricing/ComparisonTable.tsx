import { useMemo } from "react";
import type { BillingPeriod, Currency } from "./pricing.types";
import {
  COMPARISON_ROWS,
  PRICING_TIERS,
  convertUsdToCurrencyAmount,
  formatMoney,
  getDisplayMonthlyAmount,
} from "./pricing.data";

interface ComparisonTableProps {
  currency: Currency;
  period: BillingPeriod;
}

export function ComparisonTable({ currency, period }: ComparisonTableProps) {
  const rows = useMemo(() => {
    const tiers = PRICING_TIERS;
    const fmt = (idx: number) =>
      formatMoney(
        getDisplayMonthlyAmount(tiers[idx].monthlyPriceUSD, period, currency),
        currency
      );

    const priceCells: [string, string, string] = [
      `7d gratis → ${fmt(0)}/mes`,
      `${fmt(1)}/mes + 3%`,
      `${fmt(2)}/mes + 3%`,
    ];

    const setupCells: [string, string, string] = [
      "-",
      "-",
      formatMoney(convertUsdToCurrencyAmount(1500, currency), currency),
    ];

    const thr = formatMoney(convertUsdToCurrencyAmount(200, currency), currency);
    const promoCells: [string, string, string] = [
      "-",
      `Membresía gratis si comisión ≥ ${thr}`,
      "-",
    ];

    const dynamic: {
      label: string;
      cells: [string, string, string];
      cellEmphasis?: [boolean, boolean, boolean];
    }[] = [
      { label: "Precio", cells: priceCells },
      { label: "Setup fee", cells: setupCells },
      { label: "Promo", cells: promoCells },
    ];

    return [...dynamic, ...COMPARISON_ROWS.slice(3)];
  }, [currency, period]);

  return (
    <div className="mt-14 w-full" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <h3
        className="mb-6 text-center text-xl font-extrabold tracking-tight text-[#1A1A2E] min-[900px]:text-2xl"
        style={{ fontWeight: 800 }}
      >
        Comparativa rápida
      </h3>

      <div className="-mx-4 overflow-x-auto px-4 min-[900px]:mx-0 min-[900px]:px-0">
        <div className="inline-block min-w-full rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,20,60,0.04),0_8px_24px_rgba(0,20,60,0.06)] min-[900px]:block">
          <table className="w-full min-w-[640px] border-collapse text-left text-[12.5px] text-[#1A1A2E]">
            <thead>
              <tr className="border-b border-[#E2E5EA]">
                <th className="px-4 py-4 font-bold text-[#5A6170]" scope="col" />
                <th className="px-4 py-4 font-extrabold text-[#1A1A2E]" scope="col" style={{ fontWeight: 800 }}>
                  Acceso Directo
                </th>
                <th
                  className="bg-[#f6fdf9] px-4 py-4 font-extrabold text-[#1A1A2E]"
                  scope="col"
                  style={{ fontWeight: 800 }}
                >
                  Concierge
                </th>
                <th className="px-4 py-4 font-extrabold text-[#1A1A2E]" scope="col" style={{ fontWeight: 800 }}>
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-[#E2E5EA] last:border-0">
                  <th
                    className="whitespace-nowrap px-4 py-3.5 font-semibold text-[#5A6170]"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => {
                    const emph = row.cellEmphasis?.[i];
                    return (
                      <td
                        key={i}
                        className={`px-4 py-3.5 ${i === 1 ? "bg-[#f6fdf9]" : ""} ${
                          emph ? "font-bold text-[#1A1A2E]" : "text-[#5A6170]"
                        }`}
                        style={emph ? { fontWeight: 700 } : undefined}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

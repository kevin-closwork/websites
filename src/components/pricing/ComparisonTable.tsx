import { useMemo } from "react";
import type { BillingPeriod, Currency } from "./pricing.types";
import {
  COMPARISON_ROWS,
  PRICING_TIERS,
  amountIn,
  formatMoney,
  formatPerMonth,
  getAdjustedMonthly,
} from "./pricing.data";

interface ComparisonTableProps {
  period: BillingPeriod;
  currency: Currency;
}

export function ComparisonTable({ period, currency }: ComparisonTableProps) {
  const rows = useMemo(() => {
    const tiers = PRICING_TIERS;

    const fmt = (idx: number) => {
      const t = tiers[idx];
      if (t.contactSalesOnly) return "Cotización a medida";
      const m = getAdjustedMonthly(amountIn(t.monthlyPrice, currency), period);
      return formatPerMonth(m, currency);
    };

    const priceCells: [string, string, string] = [
      `7 días gratis → ${fmt(0)}`,
      `${fmt(1)} + 3%`,
      fmt(2),
    ];

    const setupCell = (idx: number) => {
      const fee = tiers[idx].setupFee;
      if (!fee) return "-";
      const amount = amountIn(fee, currency);
      const installments = tiers[idx].setupInfo?.installments;
      const base = formatMoney(amount, currency);
      if (!installments) return base;
      return `${base} · hasta ${installments} MSI de ${formatMoney(amount / installments, currency)}`;
    };

    const setupCells: [string, string, string] = [
      setupCell(0),
      setupCell(1),
      setupCell(2),
    ];

    const thr = formatMoney(amountIn(tiers[1].promo!.threshold, currency), currency);
    const promoCells: [string, string, string] = [
      "-",
      `Membresía gratis si comisión Closwork ≥ ${thr} en el mes`,
      "-",
    ];

    const dynamic: {
      label: string;
      cells: [string, string, string];
      cellEmphasis?: [boolean, boolean, boolean];
    }[] = [
      { label: "Precio", cells: priceCells },
      { label: "Instalación", cells: setupCells, cellEmphasis: [false, true, false] },
      { label: "Promo", cells: promoCells },
    ];

    return [...dynamic, ...COMPARISON_ROWS.slice(3)];
  }, [period, currency]);

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

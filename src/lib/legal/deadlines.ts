/** Festivos oficiales México — ampliar por año. */
const MX_HOLIDAYS_2026 = new Set([
  "2026-01-01",
  "2026-02-02",
  "2026-03-16",
  "2026-05-01",
  "2026-09-16",
  "2026-11-16",
  "2026-12-25",
]);

function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isBusinessDay(d: Date): boolean {
  const dow = d.getDay();
  if (dow === 0 || dow === 6) return false;
  return !MX_HOLIDAYS_2026.has(toYmd(d));
}

/** Días hábiles desde `from` (Cláusula 3.4 — arranca en onboardingCompleteAt). */
export function addBusinessDays(from: Date, days: number): Date {
  const result = new Date(from);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (isBusinessDay(result)) added++;
  }
  return result;
}

/** Bonificación Cláusula 6.2 — días naturales de crédito proporcional. */
export function calculatePlacementCreditDays(
  delayNaturalDays: number,
  delayedPositions: number,
  totalClosers: number
): number {
  if (totalClosers <= 0 || delayNaturalDays <= 0) return 0;
  return delayNaturalDays * (delayedPositions / totalClosers);
}

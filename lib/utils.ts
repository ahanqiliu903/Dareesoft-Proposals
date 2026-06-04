// "Today" is fixed for the prototype so the 30-day deadline logic stays stable.
export const TODAY = new Date("2026-06-04");

export function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const ms = target.getTime() - TODAY.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function isDeadlineSoon(dateStr: string | null): boolean {
  const days = daysUntil(dateStr);
  return days !== null && days <= 30 && days >= 0;
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr || dateStr === "—") return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

import type { OutreachStatus } from "@/lib/types";

const STATUS_STYLES: Record<OutreachStatus, string> = {
  "Not Contacted": "bg-gray-100 text-gray-700 border-gray-300",
  Contacted: "bg-blue-50 text-blue-700 border-blue-200",
  "In Discussion": "bg-amber-50 text-amber-800 border-amber-200",
  "Proposal Sent": "bg-purple-50 text-purple-700 border-purple-200",
  Closed: "bg-green-50 text-green-700 border-green-200",
};

export function StatusBadge({ status }: { status: OutreachStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export function YesNoBadge({
  value,
  variant = "default",
}: {
  value: boolean;
  variant?: "default" | "roadbotics";
}) {
  if (variant === "roadbotics") {
    return value ? (
      <span className="inline-flex items-center rounded border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
        Yes
      </span>
    ) : (
      <span className="inline-flex items-center rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500">
        No
      </span>
    );
  }

  return value ? (
    <span className="inline-flex items-center rounded border border-navy/20 bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy">
      Yes
    </span>
  ) : (
    <span className="inline-flex items-center rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500">
      No
    </span>
  );
}

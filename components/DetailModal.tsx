"use client";

import type { Municipality } from "@/lib/types";
import { OUTREACH_STATUSES } from "@/lib/types";
import { StatusBadge, YesNoBadge } from "./Badge";
import { formatDate, isDeadlineSoon } from "@/lib/utils";

export function DetailModal({
  municipality,
  onClose,
}: {
  municipality: Municipality;
  onClose: () => void;
}) {
  const m = municipality;

  return (
    <div
      className="fixed inset-0 z-[1200] flex justify-end bg-black/30"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-y-auto bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 bg-navy px-6 py-4 text-white">
          <div>
            <h2 className="text-lg font-semibold">
              {m.city}, {m.state}
            </h2>
            <p className="text-sm text-gray-300">
              Population {m.population}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-gray-300 hover:bg-navy-light hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          {/* Key facts */}
          <section className="grid grid-cols-2 gap-4">
            <Field label="Road Budget" value={m.roadBudget} />
            <div>
              <Label>RoadBotics Customer</Label>
              <div className="mt-1">
                <YesNoBadge value={m.roadbotics} variant="roadbotics" />
              </div>
            </div>
            <div>
              <Label>Outreach Status</Label>
              <select
                defaultValue={m.status}
                className="mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              >
                {OUTREACH_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <Field label="Last Contact" value={formatDate(m.lastContact)} />
          </section>

          {/* RFP */}
          <section className="rounded border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-navy">
              RFP Status
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <Label>Active</Label>
                <div className="mt-1">
                  <YesNoBadge value={m.rfpActive} />
                </div>
              </div>
              <div>
                <Label>Deadline</Label>
                <p
                  className={`mt-1 ${
                    isDeadlineSoon(m.rfpDeadline)
                      ? "font-semibold text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {formatDate(m.rfpDeadline)}
                </p>
              </div>
            </div>
            {m.rfpLink && (
              <a
                href={m.rfpLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-navy underline hover:text-navy-light"
              >
                View RFP document →
              </a>
            )}
          </section>

          {/* Contact log */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-navy">
              Contact Log
            </h3>
            {m.contactLog.length === 0 ? (
              <p className="text-sm text-gray-500">No interactions logged.</p>
            ) : (
              <ul className="space-y-2 border-l-2 border-gray-200 pl-4">
                {m.contactLog.map((entry, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium text-gray-900">
                      {formatDate(entry.date)}
                    </span>
                    <p className="text-gray-600">{entry.note}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Procurement notes */}
          <section>
            <Label>Procurement Notes</Label>
            <p className="mt-1 text-sm text-gray-700">{m.procurementNotes}</p>
          </section>

          {/* Follow-up */}
          <section>
            <Field
              label="Follow-up Reminder"
              value={formatDate(m.followUpDate)}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
      {children}
    </span>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
  );
}

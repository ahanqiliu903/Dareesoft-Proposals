"use client";

import { OUTREACH_STATUSES } from "@/lib/types";

// Mockup form — does not persist. Closes on submit per spec.
export function AddMunicipalityModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 bg-navy px-6 py-4 text-white">
          <h2 className="text-lg font-semibold">Add Municipality</h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-gray-300 hover:bg-navy-light hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="space-y-4 px-6 py-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField label="City">
              <input type="text" className={inputClass} placeholder="e.g. Boston" />
            </FormField>
            <FormField label="State">
              <input type="text" className={inputClass} placeholder="e.g. MA" />
            </FormField>
            <FormField label="Road Budget">
              <input type="text" className={inputClass} placeholder="e.g. $5.0M" />
            </FormField>
            <FormField label="Outreach Status">
              <select className={inputClass} defaultValue="Not Contacted">
                {OUTREACH_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Notes">
            <textarea className={inputClass} rows={3} placeholder="Initial notes…" />
          </FormField>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
            >
              Add Municipality
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
}

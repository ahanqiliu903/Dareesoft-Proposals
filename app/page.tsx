"use client";

import { useMemo, useState } from "react";
import { municipalities } from "@/lib/data";
import { OUTREACH_STATUSES } from "@/lib/types";
import type { Municipality } from "@/lib/types";
import { StatusBadge, YesNoBadge } from "@/components/Badge";
import { DetailModal } from "@/components/DetailModal";
import { AddMunicipalityModal } from "@/components/AddMunicipalityModal";
import { formatDate, isDeadlineSoon } from "@/lib/utils";

const STATES = Array.from(new Set(municipalities.map((m) => m.state))).sort();

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roadboticsOnly, setRoadboticsOnly] = useState(false);
  const [activeRfpOnly, setActiveRfpOnly] = useState(false);
  const [selected, setSelected] = useState<Municipality | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    return municipalities.filter((m) => {
      if (search && !m.city.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (stateFilter !== "All" && m.state !== stateFilter) return false;
      if (statusFilter !== "All" && m.status !== statusFilter) return false;
      if (roadboticsOnly && !m.roadbotics) return false;
      if (activeRfpOnly && !m.rfpActive) return false;
      return true;
    });
  }, [search, stateFilter, statusFilter, roadboticsOnly, activeRfpOnly]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-navy-dark bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-xl font-semibold">
            Municipality Targeting &amp; Outreach Tracker
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            Dareesoft — U.S. East Coast Market Entry
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Filters */}
        <div className="mb-4 rounded border border-gray-200 bg-white p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
                Search City
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city name…"
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <div className="min-w-[140px]">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
                State
              </label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              >
                <option value="All">All States</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[160px]">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
                Outreach Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              >
                <option value="All">All Statuses</option>
                {OUTREACH_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAdd(true)}
              className="rounded bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
            >
              + Add Municipality
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-6 border-t border-gray-100 pt-3">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={roadboticsOnly}
                onChange={(e) => setRoadboticsOnly(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy"
              />
              Show RoadBotics customers only
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={activeRfpOnly}
                onChange={(e) => setActiveRfpOnly(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy"
              />
              Show active RFPs only
            </label>
          </div>
        </div>

        {/* Result count */}
        <p className="mb-2 text-sm text-gray-500">
          {filtered.length} of {municipalities.length} municipalities
        </p>

        {/* Table */}
        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <th className="px-4 py-3">Municipality</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Road Budget</th>
                <th className="px-4 py-3">RoadBotics</th>
                <th className="px-4 py-3">Outreach Status</th>
                <th className="px-4 py-3">Last Contact</th>
                <th className="px-4 py-3">RFP</th>
                <th className="px-4 py-3">RFP Deadline</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={`cursor-pointer border-b border-gray-100 hover:bg-blue-50/50 ${
                    i % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {m.city}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{m.state}</td>
                  <td className="px-4 py-3 text-gray-700">{m.roadBudget}</td>
                  <td className="px-4 py-3">
                    <YesNoBadge value={m.roadbotics} variant="roadbotics" />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(m.lastContact)}
                  </td>
                  <td className="px-4 py-3">
                    <YesNoBadge value={m.rfpActive} />
                  </td>
                  <td className="px-4 py-3">
                    {m.rfpDeadline ? (
                      <span
                        className={
                          isDeadlineSoon(m.rfpDeadline)
                            ? "font-semibold text-red-600"
                            : "text-gray-700"
                        }
                      >
                        {formatDate(m.rfpDeadline)}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-gray-600">
                    <span className="line-clamp-1">{m.notes}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No municipalities match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {selected && (
        <DetailModal
          municipality={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {showAdd && <AddMunicipalityModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}

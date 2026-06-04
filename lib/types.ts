export type OutreachStatus =
  | "Not Contacted"
  | "Contacted"
  | "In Discussion"
  | "Proposal Sent"
  | "Closed";

export interface ContactLogEntry {
  date: string;
  note: string;
}

export interface Municipality {
  id: number;
  city: string;
  state: string;
  lat: number;
  lng: number;
  population: string;
  roadBudget: string;
  roadbotics: boolean;
  status: OutreachStatus;
  lastContact: string;
  rfpActive: boolean;
  rfpDeadline: string | null;
  rfpLink: string | null;
  notes: string;
  contactLog: ContactLogEntry[];
  procurementNotes: string;
  followUpDate: string | null;
}

export const OUTREACH_STATUSES: OutreachStatus[] = [
  "Not Contacted",
  "Contacted",
  "In Discussion",
  "Proposal Sent",
  "Closed",
];

// Hex colors keyed by status — shared by map markers and the legend.
// Ordered as a completion gradient: gray → blue → amber → purple → green.
export const STATUS_COLORS: Record<OutreachStatus, string> = {
  "Not Contacted": "#9ca3af",
  Contacted: "#2563eb",
  "In Discussion": "#d97706",
  "Proposal Sent": "#7c3aed",
  Closed: "#16a34a",
};

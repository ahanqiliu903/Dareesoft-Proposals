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

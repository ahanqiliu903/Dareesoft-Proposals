# Municipality Targeting and Outreach Tracker
**Dareesoft U.S. Expansion — Technical Fellow Mockup**

## Overview
A simple front-end mockup to demonstrate how Dareesoft could systematically track U.S. municipality outreach for the East Coast market entry. This is a UI prototype hosted on Vercel — no backend required. Use mock/hardcoded data.

---

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for components (table, badge, dialog, button, input)
- Static mock data only — no database, no API calls

---

## Pages

### 1. `/` — Dashboard / Municipality Table
The main view. A filterable, sortable table of U.S. municipalities.

**Table columns:**
| Column | Description |
|---|---|
| Municipality | City name + state |
| State | e.g. NY, NJ, MD, VA |
| Road Budget | Annual road maintenance budget (e.g. "$4.2M") |
| RoadBotics Customer | Yes / No badge |
| Outreach Status | Badge: `Not Contacted` / `Contacted` / `In Discussion` / `Proposal Sent` / `Closed` |
| Last Contact | Date string |
| RFP Active | Yes / No badge |
| RFP Deadline | Date string, highlighted red if within 30 days |
| Notes | Short text snippet |

**Filters (above table):**
- Search by city name
- Filter by State (dropdown)
- Filter by Outreach Status (dropdown)
- Toggle: "Show RoadBotics customers only"
- Toggle: "Show active RFPs only"

**Actions:**
- Click any row to open a side panel or modal with full municipality detail
- "Add Municipality" button (opens a modal form — can be non-functional or just close on submit for mockup)

---

### 2. Row Detail Modal
Opens when a table row is clicked.

**Shows:**
- Municipality name + state + population (mock)
- Road budget
- RoadBotics customer: yes/no
- Outreach status (editable dropdown in mockup)
- Contact log: list of past interactions with date + note (2-3 hardcoded entries)
- RFP section: active yes/no, deadline, link placeholder
- Procurement notes (free text placeholder)
- Follow-up reminder date

---

## Mock Data
Hardcode ~12 municipalities. Mix of:
- Former RoadBotics customers (5-6)
- Active RFPs (3-4)
- Various outreach statuses
- NYC Boroughs or neighborhoods?

Example entries:
```ts
{
  id: 1,
  city: "Manhattan",
  state: "NY",
  roadBudget: "$8.1M",
  roadbotics: true,
  status: "In Discussion",
  lastContact: "2026-05-28",
  rfpActive: true,
  rfpDeadline: "2026-07-15",
  notes: "Spoke with Dir. of Public Works. Interested in pilot."
},
{
  id: 2,
  city: "Brooklyn",
  state: "NY",
  roadBudget: "$12.4M",
  roadbotics: true,
  status: "Contacted",
  lastContact: "2026-06-01",
  rfpActive: false,
  rfpDeadline: null,
  notes: "Initial email sent. Awaiting response."
},
// ... etc
```

---

## Design Notes
- Clean, minimal, professional — this is a B2B internal tool
- Color scheme: dark navy (`#1B2A4A`) header/accents, white background, light gray rows
- Status badges should be color coded:
  - `Not Contacted` → gray
  - `Contacted` → blue
  - `In Discussion` → yellow
  - `Proposal Sent` → purple
  - `Closed` → green
- RFP deadline within 30 days → red text or red badge
- RoadBotics customer badge → orange (signals urgency/opportunity)
- Mobile responsive is nice but not required

---

## What to Skip
- Authentication
- Real database or API
- Form submission logic (modals can close without saving)
- Backend of any kind

---

## Deployment
- Deploy to Vercel
- One command: `vercel --prod`
- No environment variables needed (all mock data)

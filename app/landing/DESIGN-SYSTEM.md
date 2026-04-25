# CleanFlowAI — Design System & Feature Reference

A single-page reference for the official CleanFlowAI brand colors, typography, and the full inventory of pages and features in the platform. Sourced from [app/globals.css](../globals.css), [app/landing/page.tsx](page.tsx), [docs/application-flow.md](../../docs/application-flow.md), and [docs/chatbot-knowledge-base.md](../../docs/chatbot-knowledge-base.md).

---

## 1. Color Palette

### 1.1 Official brand colors (declared in [app/globals.css](../globals.css))

These are the canonical CleanFlowAI brand colors. Comment in the file describes the system as: _"Brand: Deep blue (#2a4477) + Teal (#0cbeb6) + Cyan (#00dfc2). Approach: Clean, accessible, data-focused — for business users."_

| Role | Token | Hex | Meaning |
|---|---|---|---|
| Primary | `--primary` | **`#2a4477`** | Deep blue — trust, authority. Used for headlines, primary buttons, brand mark |
| Accent | `--accent` | **`#0cbeb6`** | Teal — data quality health. Used for success, active states, charts, validators |
| Secondary | `--secondary` | **`#00dfc2`** | Cyan — highlights. Used sparingly for emphasis and signal |
| Background (light) | `--background` | `oklch(0.985 0 0)` | Soft off-white |
| Foreground | `--foreground` | `oklch(0.22 0 0)` | High-contrast text |
| Card | `--card` | `oklch(0.98 0 0)` | Card surface |
| Muted | `--muted` | `oklch(0.95 0 0)` | Subtle backgrounds, hover states |
| Muted foreground | `--muted-foreground` | `oklch(0.40 0 0)` | Secondary text |
| Border | `--border` | `oklch(0.92 0 0)` | Hairline dividers |
| Destructive | `--destructive` | `oklch(0.62 0.25 25)` | Errors, quarantined rows |
| Chart 1–5 | `--chart-1`..`5` | `#2a4477`, `#0cbeb6`, `#00dfc2`, `oklch(0.65 0.12 250)`, `oklch(0.6 0.14 30)` | Recharts series |

### 1.2 Dark theme overrides

Same brand hexes (primary stays `#2a4477`, accent stays `#0cbeb6`, secondary stays `#00dfc2`) — only the neutrals invert:

| Token | Light | Dark |
|---|---|---|
| `--background` | `oklch(0.985 0 0)` | `oklch(0.24 0 0)` |
| `--foreground` | `oklch(0.22 0 0)` | `oklch(0.93 0 0)` |
| `--card` | `oklch(0.98 0 0)` | `oklch(0.26 0 0)` |
| `--border` | `oklch(0.92 0 0)` | `oklch(0.35 0 0)` |
| `--input` | `oklch(0.97 0 0)` | `oklch(0.32 0 0)` |
| `--muted` | `oklch(0.95 0 0)` | `oklch(0.3 0 0)` |
| `--muted-foreground` | `oklch(0.40 0 0)` | `oklch(0.75 0 0)` |

Dark theme also swaps `--chart-1` and `--chart-2` so the teal leads in dark mode and the navy leads in light mode.

### 1.3 Landing page palette (declared inline in [app/landing/page.tsx](page.tsx))

The landing page is intentionally isolated from the main app stylesheet — it defines its own CSS variable set inside a `<style>` block, scoped to `.cf-root`. The palette follows the design system's primary navy (`#2a4477`) but currently aliases the teal tokens to additional blue shades (the marketing surface uses a single-blue ramp; the actual app dashboard mock retains the teal accents).

| Token | Hex | Notes |
|---|---|---|
| `--brand` / `--blue` | **`#2a4477`** | Matches `--primary`. Used for h1 italic accent, h2 italic, primary buttons, navy brand surfaces |
| `--blue-2` | `#1f3258` | Darker primary — pressed states, dense backgrounds |
| `--blue-3` | `#3a5a94` | Mid blue — feature link color, eyebrow dot, accents |
| `--blue-4` | `#5a7fb5` | Light blue — soft glows, gradient stops |
| `--blue-glow` | `rgba(42, 68, 119, 0.28)` | Used for shadows and atmospheric glows |
| `--teal` *(aliased to blue)* | `#3a5a94` | Currently rendered as blue-3, not teal — landing uses a single-blue ramp |
| `--teal-2` *(aliased)* | `#2a4477` | |
| `--teal-3` *(aliased)* | `#5a7fb5` | |
| `--teal-glow` *(aliased)* | `rgba(42, 68, 119, 0.28)` | |
| `--cyan` *(aliased)* | `#3a5a94` | |
| `--bg-0` | `#FFFFFF` | Cards, panels, chrome |
| `--bg-1` | `#FBFBF8` | Page background — warm off-white |
| `--bg-2` | `#F5F5EF` | Alternating section background, cream-slate |
| `--bg-3` | `#ECECE3` | Elevated chips, pill backgrounds |
| `--bg-4` | `#DEDED2` | Hover surfaces |
| `--ink` | `#0A0F1C` | Primary text — near-black navy |
| `--ink-2` | `#1E293B` | Body text |
| `--ink-3` | `#475569` | Secondary text |
| `--ink-4` | `#64748B` | Muted labels |
| `--ink-5` | `#94A3B8` | Disabled / placeholder |
| `--line` | `rgba(15, 23, 42, 0.09)` | Hairline borders |
| `--line-2` | `rgba(15, 23, 42, 0.15)` | Stronger borders, dividers |
| `--line-3` | `rgba(15, 23, 42, 0.25)` | Hover borders |
| `--warn` | `#B45309` | Warning state (e.g., quarantined KPI strip) |

### 1.4 Reconciling the two

| | Official `globals.css` | Landing `page.tsx` |
|---|---|---|
| Primary navy | `#2a4477` | `#2a4477` ✅ |
| Teal accent | `#0cbeb6` (real teal) | aliased to `#3a5a94` (blue) |
| Cyan highlight | `#00dfc2` (real cyan) | aliased to `#3a5a94` (blue) |
| Background | `oklch(0.985 0 0)` (cool white) | `#FBFBF8` (warm off-white) |

The landing page makes a deliberate stylistic departure on accent colors — using a single navy ramp instead of the navy + teal + cyan trio. This was a content decision (per the latest design direction) rather than a design-system mismatch. The real app's dashboard, sign-in page, and authenticated views still use the official navy + teal + cyan from `globals.css`.

### 1.5 Logo colors

The actual SVG logo at [public/android-chrome-512x512.svg](../../public/android-chrome-512x512.svg) is **dual-tone**:
- **Teal swoosh** — `#01B1AE` (close to but slightly different from the design system's `#0cbeb6`)
- **Outer navy** — `#274274`
- **Inner navy** — `#223555`

These are baked into the SVG file directly and are not affected by CSS variable changes. Anywhere the logo is rendered (top bar, sidebar in dashboard mock, footer), the user sees its real teal + navy regardless of what the surrounding palette is doing.

---

## 2. Typography

### 2.1 Official design system fonts ([app/globals.css](../globals.css))

```css
@theme inline {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

The official design system specifies **Inter** for body and **IBM Plex Mono** for monospace. There's no display-only font — Inter handles both body and headings throughout the dashboard, files, jobs, and admin views. Note that the root layout [app/layout.tsx](../layout.tsx#L3) only loads Inter via `next/font/google`; IBM Plex Mono is referenced in CSS but never actually imported, so anywhere the app uses `var(--font-mono)` falls back to the system monospace stack.

### 2.2 Landing page fonts ([app/landing/page.tsx](page.tsx))

The landing page loads its own font set via `next/font/google`. Hero display uses Manrope for personality; everything else aligns with the design system (Inter body + IBM Plex Mono).

| Role | Family | Loaded via | CSS variable | Usage |
|---|---|---|---|---|
| **Display** | **Manrope** (variable, 200–800) | `next/font/google` | `--font-display` | Hero H1, all section H2s, KPI numbers, plan prices, stage titles |
| **Body / sans** | **Inter** | `next/font/google` | `--font-sans` | Body paragraphs, lede, button labels, card text, navigation |
| **Italic accent** | **Instrument Serif** (400, italic) | `next/font/google` | `--font-serif` | Selectively italic phrases inside headlines: _"data quality"_, _"one workspace"_, _"calibrated together"_, etc. |
| **Mono** | **IBM Plex Mono** (400, 500, 600) | `next/font/google` | `--font-mono` | Section tags, KPI labels, eyebrow text, file IDs, status pills, edition strips |

### 2.3 Type scale (landing page)

Approximate rendered sizes — most use `clamp()` so they scale fluidly.

| Element | Family | Weight | Size | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| **H1** (hero) | Manrope | 700 | `clamp(40px, 6.6vw, 92px)` | 0.96 | `-0.035em` |
| **H1 italic accent** | Instrument Serif | 400 italic | inherits H1 | inherits | `-0.015em` |
| **H1 underline accent** | Instrument Serif italic over decorative SVG underline | — | — | — | — |
| **H2** (section heads) | Manrope | 700 | `clamp(34px, 4.4vw, 58px)` | 1.05 | `-0.025em` |
| **H2 italic accent** | Instrument Serif | 400 italic | inherits H2 | inherits | `-0.015em` |
| **H3** (card titles) | Manrope | 700 | `26px` | 1.12 | `-0.022em` |
| **Lede** (hero) | Inter | 400 | `17–18px` | 1.55 | normal |
| **Body** | Inter | 400 | `14.5px` | 1.55 | normal |
| **Mono labels / tags** | IBM Plex Mono | 500 | `9.5–11px` | 1 | `0.14–0.22em` |
| **KPI numbers** | Manrope | 700 | `28–62px` | 0.9 | `-0.025em` |
| **CTA headline** | Manrope | 700 | `clamp(32px, 4.2vw, 56px)` | 1.06 | `-0.026em` |
| **Quote text** | Instrument Serif | 400 | `24px` | 1.38 | `-0.008em` |
| **Quote mark** | Instrument Serif | 400 italic | `108px` | 0.5 | — |
| **Marquee names** | Manrope | 500 | `18px` | normal | `0.06em` |

### 2.4 Font smoothing & rendering

The `.cf-root` wrapper applies:

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

Headings additionally use:

```css
text-rendering: geometricPrecision;
font-feature-settings: "ss01", "cv11";
```

These force OpenType stylistic-set 1 (`ss01`) and character variant 11 (`cv11`) on Manrope and Inter, which gives the lowercase `a`, `g`, and digits a slightly more refined glyph variant.

---

## 3. Pages & Features

Sourced from [docs/application-flow.md](../../docs/application-flow.md) and confirmed against the route structure in [app/](../).

### 3.1 Route map

| Route | Page | Auth required |
|---|---|---|
| `/` | Landing page (currently routes to [LandingPage](page.tsx) for unauth users; redirects to `/dashboard` for authenticated) | No |
| `/landing` | Same `LandingPage` component, accessible directly | No |
| `/auth/login` | Sign in (Cognito) | No |
| `/auth/signup` | Sign up + email verification flow | No |
| `/auth/set-password` | Reset / set password | No |
| `/dashboard` | Main analytics dashboard | Yes |
| `/files` | File Manager (Data Catalog) | Yes |
| `/jobs` | Scheduled jobs | Yes |
| `/jobs/create` | Multi-step job creation wizard | Yes |
| `/admin` | Organization settings + team management | Yes |
| `/connectors/callback` | OAuth callback (e.g., QuickBooks) | Yes |
| `/create-organization` | Org onboarding | Yes |
| `/data-tools` | Legacy data tools page | Yes |

### 3.2 Authentication

- **Sign in** — email + password via AWS Cognito, "remember me" checkbox, forgot password link
- **Sign up** — email + password with strength meter (Very Weak → Strong), enforces minimum 8 chars + uppercase + lowercase + number + special char
- **Email verification** — 6-digit code with 5-minute countdown, resend after expiry
- **Logout** — clears tokens, redirects to `/auth/login`

### 3.3 Dashboard (`/dashboard`)

Real-time overview of data quality metrics across all uploaded files.

- **Header** — page title, "LIVE" badge, refresh button, "Download Report" button (downloads `overall-dq-report.json`), logout
- **4 KPI cards**:
  1. **Total Files** — file count, "X processed" subtitle
  2. **Average DQ Score** — percentage with status badge (Excellent ≥90%, Good ≥70%, Needs Attention <70%)
  3. **Rows Processed** — total input rows, "X clean output" subtitle
  4. **Issues Fixed** — total fixed rows, "X quarantined" subtitle
- **Charts**:
  - **Data Quality Distribution** (pie) — Clean / Fixed / Quarantined rows
  - **DQ Score Distribution** (bar) — files grouped into Excellent / Good / Needs Attention buckets
- **Processing Summary** — monthly trends from the overall DQ report
- **Activity Feed** — recent activity items with type icons (Transform / Upload / Download / Error), description, status, and IST-timezone timestamp

### 3.4 File Manager (`/files`)

Two tabs: **File Upload** + **File Explorer**.

#### File Upload

Source dropdown — local file or one of 13 ERP connectors:

| Source | Status |
|---|---|
| Local File | ✅ Available |
| QuickBooks Online | ✅ Available (live) |
| Oracle Fusion | Coming soon |
| SAP ERP | Coming soon |
| Microsoft Dynamics | Coming soon |
| NetSuite | Coming soon |
| Workday | Coming soon |
| Infor M3 / LN | Coming soon |
| Epicor Kinetic | Coming soon |
| QAD ERP | Coming soon |
| IFS Cloud | Coming soon |
| Sage Intacct | Coming soon |

**Local upload**: drag-and-drop or click-to-browse. Supported formats: **CSV, Excel (.xlsx / .xls), JSON, Parquet** + compressed variants. AI Processing toggle (default On) starts DQ pipeline automatically after upload.

**QuickBooks Online import**: OAuth flow → grant access → import dialog with entity selector (Customers, Invoices, Vendors, Items), max records (default 1000), optional date range. Disconnect button in connection banner.

#### File Explorer

- Search + status filter (All / Uploaded / Processed / Processing / Queued / Failed)
- Table columns: File · Score · Rows · Status · Uploaded · Updated · Actions
- Per-row actions:
  - ▶️ **Start processing** — for UPLOADED, DQ_FAILED, FAILED states
  - 👁️ **View details** — opens File Details dialog (Details / Preview / DQ Report tabs)
  - ⬇️ **Download** — opens format dialog (Cleaned vs Original) → format (CSV/Excel/JSON) → optional ERP transformation
  - ☁️ **Push to ERP** — for DQ_FIXED / COMPLETED files
  - 🗑️ **Delete** — with confirmation dialog

### 3.5 Jobs (`/jobs`)

Scheduled ERP sync jobs and pipeline orchestration.

- **Job list** — search bar, "New Job" button
- **Job creation wizard** (`/jobs/create`) — multi-step: source → schedule → DQ rules → warehouse destination → review
- **Empty state** — "No jobs yet" with illustration and "Create Job" CTA

### 3.6 Admin (`/admin`)

Organization settings + team management. Five tabs:

#### Organization (default tab)

- Logo upload + display
- Org name, primary email, contact number, address
- Subscription plan dropdown: **Free / Pro / Enterprise**
- Preferred data format dropdown: CSV / JSON / XLSX / SQL / Parquet
- "Save Changes" button

#### Members

- Members table: avatar + name + email + owner badge / role / status / joined date / actions menu
- "Invite Member" button → email + role selector
- Role change menu: Make Admin / Editor / Viewer
- Remove member action with confirmation

#### Permissions

Role × permission matrix:

| Permission | Owner | Admin | Editor | Viewer |
|---|:-:|:-:|:-:|:-:|
| File Management | ✅ | ✅ | ✅ | ❌ |
| Data Transformation | ✅ | ✅ | ✅ | ❌ |
| Export Data | ✅ | ✅ | ✅ | ✅ |
| Manage Members | ✅ | ✅ | ❌ | ❌ |
| Billing & Subscription | ✅ | ❌ | ❌ | ❌ |
| Organization Settings | ✅ | ✅ | ❌ | ❌ |
| API Access | ✅ | ✅ | ❌ | ❌ |
| Audit Logs | ✅ | ✅ | ❌ | ❌ |

Owner row is locked. Toggle switches for each cell. "Save Permissions" button at the bottom.

#### Services

Three toggleable services + ERP defaults:

| Service | Description | Default |
|---|---|---|
| **Data Transform** | Transform & normalize data between different ERP formats | On |
| **Data Quality** | Validate, clean, and fix data quality issues automatically | On (default) |
| **CleanDataShield™** | Privacy/security protection layer | Premium tier only |

Plus dropdowns for **Default Input ERP** and **Default Export ERP** — both populated with all 13 supported ERPs.

#### Connectors

Live & coming-soon ERP connectors with credential management.

### 3.7 Data Quality Pipeline

The end-to-end processing flow that runs on every uploaded file. Six real status codes:

| Stage | Status | Description |
|---|---|---|
| 01 | `UPLOADING` → `UPLOADED` | File uploaded to S3 |
| 02 | `VALIDATED` → `QUEUED` | File registered in DynamoDB, added to processing queue |
| 03 | `DQ_DISPATCHED` → `DQ_RUNNING` | AI/deterministic engine analyzing quality |
| 04 | `NORMALIZING` | Standardizing formats, applying transforms |
| 05 | `DQ_FIXED` | Auto-fix complete, rows split into clean / fixed / quarantined |
| 06 | `COMPLETED` | Ready for download or push to ERP |

Failure states: `FAILED`, `DQ_FAILED`, `UPLOAD_FAILED`, `REJECTED`. All retryable.

**Rule library**: 34 deterministic rules (R1–R34) covering type inference, null rate, uniqueness, required fields, format validation (email RFC 5322, country ISO 3166, phone E.164), name casing, etc. LLM-assisted rule suggestions surface in the rule selector but every execution is deterministic — the LLM never runs code.

**Output artifacts**: clean rows file + quarantine file + DQ report (JSON). All three downloadable via the file actions.

### 3.8 Subscription tiers

| Tier | Audience | Notable inclusions |
|---|---|---|
| **Free** | Trial / individual use | CSV & Excel upload, R1–R34 rules, JSON DQ report, Viewer role only |
| **Pro** | Small data teams | All 4 input formats (incl. Parquet), LLM-assisted custom rules, QuickBooks live integration, ERP transform on export, full role set (Owner / Admin / Editor / Viewer) |
| **Enterprise** | Regulated / high-volume | CleanDataShield™ premium, all 13 ERP integrations, SSO + audit logs + API access, dedicated success engineer |

### 3.9 Member roles

| Role | Color | Capabilities |
|---|---|---|
| **Owner** | Default | Full access. Cannot be downgraded |
| **Admin** | Secondary | All access except billing |
| **Editor** | Outline | File operations only (upload, process, download, push to ERP) |
| **Viewer** | Outline | Read-only access |

### 3.10 Member status

| Status | Color | Meaning |
|---|---|---|
| Active | Green | Full access |
| Pending | Yellow | Invite sent, not yet accepted |
| Inactive | Gray | Account disabled |

---

## 4. Tech stack quick reference

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5.7 (App Router) |
| Language | TypeScript 5 |
| UI library | React 19 |
| Styling | Tailwind CSS 4 + custom CSS variables (landing page uses inline `<style>`) |
| Components | shadcn/ui (Radix primitives) |
| State | Redux Toolkit + React Redux |
| Forms | React Hook Form + Zod |
| Tables | AG Grid Community |
| Charts | Recharts |
| Animations | Framer Motion |
| Auth | AWS Cognito |
| Storage | AWS S3 (files) + DynamoDB (metadata) |
| Backend | AWS Lambda + API Gateway (serverless, separate from Next.js) |
| AI | OpenAI (rule suggestions) + Pinecone (RAG chatbot) |
| Hosting | Vercel (frontend) + AWS (backend) |

---

## 5. File locations for editing

| To change... | Edit |
|---|---|
| Official brand colors (used by the real app) | [app/globals.css](../globals.css) — `:root` and `.dark` blocks |
| Landing page colors | [app/landing/page.tsx](page.tsx) — search for `--blue:` inside the `StyleBlock` function |
| Landing page fonts | [app/landing/page.tsx](page.tsx) — top-level `next/font/google` imports |
| Real app fonts | [app/layout.tsx](../layout.tsx) — `next/font/google` import |
| AWS env vars | [app/env.prod](../env.prod) (template) or [.env.local](../../.env.local) (active) |
| Add/remove a route | Create a folder under [app/](../) — Next.js App Router auto-routes |

---

## Document version

**Last updated:** 2026-04-15
**Document purpose:** Single source of truth for design tokens (colors, fonts) and platform feature inventory across CleanFlowAI. Companion to [README.md](README.md) (technical landing-page handoff) and [GUIDE.md](GUIDE.md) (client-facing landing-page walkthrough).

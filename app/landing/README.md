# Landing Page

Marketing landing page for CleanFlowAI. Single-file Next.js App Router route at [page.tsx](page.tsx).

**Route:** `/landing` → http://localhost:3000/landing

## Overview

One-file React client component (`"use client"`) with inlined `<style>` block. All sections, sub-components, glyphs, and CSS live in the same file for portability and easy handoff. Uses Framer Motion for staggered on-scroll reveals.

No external CSS, no Tailwind classes (the app-wide Tailwind 4 setup is not used here — the page is self-contained so restyling won't leak into the rest of the app).

## Design system

**Aesthetic:** Precision White — refined editorial-technical hybrid matching the existing CleanFlowAI dashboard/sign-in palette. Light-mode only.

### Palette (CSS variables on `.cf-root`)

| Token | Value | Use |
|---|---|---|
| `--bg-0` | `#FFFFFF` | Cards, panels, chrome surfaces |
| `--bg-1` | `#FBFBF8` | Page background (warm off-white) |
| `--bg-2` | `#F5F5EF` | Alternating section background |
| `--bg-3` | `#ECECE3` | Elevated chips, pill backgrounds |
| `--ink` | `#0A0F1C` | Primary text, headings |
| `--ink-2` | `#1E293B` | Body text |
| `--ink-3` | `#475569` | Secondary text |
| `--ink-4` | `#64748B` | Muted labels |
| `--brand` | `#1E3A8A` | Primary button hover (matches dashboard "Import") |
| `--teal` | `#0D9488` | Accent, italics, active states, charts |
| `--teal-3` | `#14B8A6` | Highlight variant |
| `--warn` | `#B45309` | Warning KPI strip |
| `--line` | `rgba(15,23,42,0.09)` | Hairline borders |

### Typography

Loaded via `next/font/google` at the route level — does not affect the root layout.

| Role | Font | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** | Variable, distinctive, geometric |
| Accent italic | **Instrument Serif** | Used for emphasis words like _"data quality,"_ _"Indispensable,"_ _"one continuous flow"_ |
| Body | **Geist Sans** | From `geist/font/sans` — already in `package.json` |
| Mono | **JetBrains Mono** | Labels, eyebrows, KPI meta |

### Logo

Uses the real favicon at `/public/favicon_io/android-chrome-192x192.png` (same asset the app uses). Rendered with a soft teal radial-gradient glow behind it in the `Wordmark` component.

## Section structure

```
TopBar         — sticky, blurred, wordmark + nav + dual CTA
Hero           — headline, lede, dual CTA, 4-stat trust bar
TrustBar       — marquee of 8 customer names
DashPreview    — full browser chrome + sidebar + KPI grid + sparkline + activity feed (mirrors real dashboard)
MetricsStrip   — 4 big teal numbers on a slate surface
Features       — 3 cards (Profile / Validate / Export), middle one featured
Pipeline       — 6-stage flow grid (Ingest → Assess → Rule → Repair → Quarantine → Export)
Quote          — editorial pull-quote with oversize italic mark
Pricing        — 3 tiers, Studio featured in teal
CTA            — rounded card with grid + teal glow + dual buttons
Footer         — brand, 3 link columns, connector chips, copyright
```

Each section is a separate function component; find and edit in isolation.

## Link inventory

All links wired to real destinations — no dead `href="#"` left.

### Top nav
- `Platform` → `#platform` (DashPreview section)
- `Features` → `#features`
- `Pipeline` → `#pipeline`
- `Pricing` → `#pricing`
- `Sign in` → `/auth/login`
- `Request access` → `/auth/signup`

### Hero
- `Start free trial` → `/auth/signup`
- `Watch 2-min demo` → `#platform`

### Feature cards — "Learn more"
- Profile → `#platform`
- Validate → `#pipeline`
- Export → `#pricing`

### Pricing CTAs
- Analyst / Studio / Enterprise → `/auth/signup`

### CTA section
- `Upload a file` → `/auth/signup`
- `Talk to an engineer` → `mailto:hello@cleanflowai.com`

### Footer
| Column | Links |
|---|---|
| Product | `/dashboard`, `/files`, `/jobs`, `/admin`, `#pipeline` |
| Resources | `#platform`, `#features`, `#pipeline`, `#pricing` |
| Company | `#features`, `mailto:careers@…`, `mailto:press@…`, `mailto:hello@…` |

### Scroll behavior
- `html { scroll-behavior: smooth }` — anchor clicks glide
- `.cf-root section[id] { scroll-margin-top: 90px }` — sections don't hide under the sticky top bar

## Dependencies

All already in [package.json](../../package.json):

- `next` — App Router, `next/font/google`
- `react` 19
- `framer-motion` — entrance reveals
- `geist` — body font

No new packages required.

## Dev / preview

```bash
npm run dev
# open http://localhost:3000/landing
```

First compile takes ~90s on Windows because the root layout pulls in the full AWS/Cognito/Redux stack. Subsequent HMR reloads are instant.

**Env vars:** `.env.local` at repo root must contain the Cognito + API Gateway values (copied from `app/env.prod`) or the shared `AuthProvider` in [app/layout.tsx](../layout.tsx#L47) will throw on `/landing` too.

## Wire as the public homepage

The app currently redirects `/` to `/auth/login` (unauth) or `/dashboard` (auth) via [app/page.tsx](../page.tsx). To serve the landing page at `/` instead, change that file to:

```tsx
"use client"

import { useAuth } from "@/modules/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LandingPage from "./landing/page"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  return <LandingPage />
}
```

Authenticated users still get bounced to `/dashboard`; everyone else sees the landing page.

## Customization cheat sheet

| Change | Where |
|---|---|
| Headline copy | [page.tsx](page.tsx) → `Hero()` → `<h1 className="cf-h1">` |
| Customer names in marquee | `TrustBar()` → `names` array |
| Stats (hero trust bar & metrics strip) | `Hero()` → `.cf-hero-stats`, `MetricsStrip()` → `.cf-metrics-grid` |
| Pipeline stage labels | `Pipeline()` → `stages` array |
| Feature cards | `Features()` → `items` array |
| Pricing | `Pricing()` → `plans` array |
| Testimonial | `Quote()` |
| Dashboard mock KPIs | `DashMain()` → `<KpiCard>` rows |
| Sparkline data | `Sparkline()` → `pts` array |
| Color tokens | `StyleBlock()` → `.cf-root` CSS variables |
| Font swap | top of [page.tsx](page.tsx) → `next/font/google` imports |

## Responsive breakpoints

- `max-width: 1100px` — feature grid and pricing collapse to single column, pipeline wraps to 3+3, dashboard split stacks, footer top stacks
- `max-width: 780px` — container padding tightens, sidebar nav hides most links, KPI grid goes to 2×2, pipeline to 2×3, dashboard sidebar becomes horizontal

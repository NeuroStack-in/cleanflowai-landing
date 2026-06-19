# CleanFlowAI — Landing Site

Marketing and product landing site for CleanFlowAI by Infiniqon. Built with Next.js 15 App Router and deployed on Vercel.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + scoped CSS-in-JS
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Email:** Nodemailer (Gmail SMTP)
- **Database:** Supabase (form submissions)
- **CRM:** HubSpot API (contact form leads)
- **Analytics:** Google Analytics 4
- **Package Manager:** pnpm
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

HUBSPOT_API_KEY=your_hubspot_api_key

GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
app/
├── landing/          # Home page
├── blog/             # Blog index + 5 blog posts
├── solutions/        # Data quality, profiling, transformation, etc.
├── products/         # Data governance product page
├── about/            # About Infiniqon
├── contact/          # Contact / Request demo form
├── api/
│   ├── contact/      # Contact form handler (HubSpot + Supabase + email)
│   └── newsletter/   # Newsletter signup handler
components/
├── SiteChrome.tsx    # Shared nav and footer
├── GoogleAnalytics.tsx
lib/
└── analytics.ts      # GA4 event tracking helpers
```

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | Production-ready code — deployed to Vercel |
| `feature/kishore` | Active development branch |
| `old-main` | Backup of the original main branch |
| `develop` | Staging / integration branch |

---

## Deployment

The site is deployed on **Vercel**. Pushing to `main` triggers an automatic production deployment.

Add all environment variables in Vercel under **Settings → Environment Variables**.

---

## Contact

Built and maintained by the Infiniqon engineering team.
Email: kparthiban@infiniqon.com

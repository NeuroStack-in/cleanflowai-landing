"use client"

import Link from "next/link"
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

const PILLARS = [
  { title: "AutoMap", body: "Automatic field-type inference and target-schema resolution. Confidence-scored, taxonomy-validated, and surfaced for steward approval before anything fires." },
  { title: "Business Rules Suggestion", body: "AI drafts validation, transformation, and quality rules from your data — every suggestion explainable, version-controlled, and reviewable." },
  { title: "Quarantine Editor", body: "Failed records aren't silently dropped. They land in a reviewer-friendly editor where stewards can fix, re-run, or escalate — with full lineage." },
  { title: "Immutable Audit", body: "Every suggestion, approval, and execution is captured in an append-only ledger. Auditors and regulators see the same trail your stewards do." },
]

const FEATURES = [
  { title: "Suggest → Approve → Execute", body: "The operating model behind every action. AI proposes, stewards approve, deterministic engine executes — no opaque automation, no after-the-fact inference." },
  { title: "Column-level Profiling", body: "Eleven-plus metrics per column — null rate, cardinality, distribution skew, parse rate, pattern coverage — captured in a single profiling pass." },
  { title: "CleanDataShield Rules", body: "Validation rules with deterministic execution and replayable outcomes. Approve once, run consistently across every dataset and every batch." },
  { title: "Version-controlled Blueprints", body: "Transformation logic lives as versioned blueprints. Roll forward, roll back, branch, and compare — your data pipelines treated like code." },
  { title: "OAuth Connectors", body: "Native connectors for SAP, Salesforce, NetSuite, Snowflake, Epicor, MS Dynamics, QuickBooks, Zoho — incremental, stateful, and resilient." },
  { title: "Real-time Jobs", body: "Stream-aware orchestration with retry, checkpoint, and back-pressure handling. Long-running migrations and continuous syncs treated as first-class citizens." },
  { title: "Schema-drift Reconciliation", body: "Detect upstream schema changes the moment they appear. Mappings adapt with reviewer approval, never silently — your pipelines never break in the dark." },
  { title: "Identity-scoped Access", body: "Row-level, column-level, and dataset-level access control tied to user identity. Approval-based change control across every artifact." },
  { title: "Warehouse-native Output", body: "Ship cleaned, validated, governed data directly to your warehouse — Snowflake, BigQuery, Redshift — in formats your downstream tools already trust." },
]

const USERS = [
  {
    title: "Banking, Capital Markets & Insurance",
    body: "Regulatory data quality, KYC enrichment, and reconciliation pipelines — all with provable determinism and the immutable lineage your auditors and regulators demand.",
  },
  {
    title: "Healthcare & Life Sciences",
    body: "Clinical, claims, and patient-master records require fixed, deterministic transformations. CleanFlowAI runs them with steward approval and full audit traceability.",
  },
  {
    title: "Manufacturing, Supply Chain & ERP",
    body: "Migrations and ongoing sync between SAP, NetSuite, Epicor, MS Dynamics, and warehouse targets. AutoMap accelerates field resolution; blueprints keep it reproducible.",
  },
  {
    title: "Public Sector & Compliance-led Enterprises",
    body: "Where every change must be traceable and every rule justifiable, CleanFlowAI&rsquo;s Suggest → Approve → Execute model becomes the operating standard.",
  },
]

export default function DataGovernancePage() {
  return (
    <main className={`pp-root ${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <section className="pp-hero">
        <div className="pp-container">
          <span className="pp-eyebrow">PRODUCT · DATA GOVERNANCE</span>
          <h1 className="pp-h1">
            CleanFlowAI — the <span className="pp-h1-em">data-trust layer</span>
          </h1>
          <p className="pp-lead">
            AI-assisted profiling, deterministic execution, and immutable audit.
            Suggest, approve, execute — the operating model regulated industries
            need to trust their data again.
          </p>
        </div>
      </section>

      <section className="pp-intro">
        <div className="pp-container pp-intro-grid">
          <div>
            <h2 className="pp-h2">
              From messy source <span className="pp-h2-em">to trusted record</span>.
            </h2>
          </div>
          <p className="pp-intro-body">
            CleanFlowAI is the data-quality and governance platform for teams that
            cannot afford silent failures. AutoMap reads your schema. Business Rules
            Suggestion drafts validation. The Quarantine Editor surfaces every failed
            row for steward review. And every action — from a single rule approval
            to a cross-system migration — is captured in an immutable audit trail
            your regulators can read.
          </p>
        </div>
      </section>

      <section className="pp-pillars">
        <div className="pp-container">
          <div className="pp-section-head">
            <span className="pp-tag">FOUR PILLARS</span>
            <h2 className="pp-h2">
              Intelligence with <span className="pp-h2-em">provable determinism</span>.
            </h2>
            <p className="pp-section-sub">
              The combination of AI-assisted suggestion and deterministic, replayable
              execution is exactly the operating model that regulated industries need.
            </p>
          </div>
          <div className="pp-pillars-grid">
            {PILLARS.map((p) => (
              <article key={p.title} className="pp-pillar-card">
                <h3 className="pp-pillar-title">{p.title}</h3>
                <p className="pp-pillar-body">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-features">
        <div className="pp-container">
          <div className="pp-section-head">
            <span className="pp-tag">PLATFORM CAPABILITIES</span>
            <h2 className="pp-h2">
              Everything your stewards need, <span className="pp-h2-em">in one console</span>.
            </h2>
          </div>
          <div className="pp-features-grid">
            {FEATURES.map((f) => (
              <article key={f.title} className="pp-feature-card">
                <h3 className="pp-feature-title">{f.title}</h3>
                <p className="pp-feature-body">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-users">
        <div className="pp-container">
          <div className="pp-section-head">
            <span className="pp-tag">IDEAL FOR</span>
            <h2 className="pp-h2">
              Built for <span className="pp-h2-em">regulated industries</span>.
            </h2>
          </div>
          <div className="pp-users-grid">
            {USERS.map((u) => (
              <article key={u.title} className="pp-user-card">
                <h3 className="pp-user-title">{u.title}</h3>
                <p className="pp-user-body">{u.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-cta">
        <div className="pp-container">
          <div className="pp-cta-card">
            <h2 className="pp-cta-h">
              Bring us your <span className="pp-cta-em">messiest dataset</span>.
            </h2>
            <p className="pp-cta-sub">
              We&rsquo;ll show you exactly what CleanFlowAI can profile, fix,
              quarantine, and automate — with your stewards in the loop.
            </p>
            <Link href="/contact" className="pp-cta-pill">
              <span>Book a Demo</span>
              <span className="pp-cta-pill-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .pp-root {
          --pp-bg: #FAFAF5;
          --pp-bg-2: #F5F3EC;
          --pp-line: rgba(15, 23, 41, 0.08);
          --pp-ink: #0F1729;
          --pp-ink-2: #1E293B;
          --pp-ink-3: #475569;
          --pp-ink-4: #6B6F78;
          --pp-brand: #2A4477;
          --pp-blue: #3A5A94;
          --pp-navy: #141E30;
          background: var(--pp-bg);
          color: var(--pp-ink);
          font-family: var(--font-sans), sans-serif;
          min-height: 100vh;
        }
        .pp-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; }
        @media (max-width: 720px) { .pp-container { padding: 0 22px; } }

        .pp-hero {
          padding: 180px 0 100px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.16) 0%, transparent 60%),
            linear-gradient(180deg, var(--pp-bg) 0%, var(--pp-bg-2) 100%);
        }
        @media (max-width: 768px) { .pp-hero { padding: 110px 0 64px; } }
        @media (max-width: 480px) { .pp-hero { padding: 96px 0 48px; } }
        .pp-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--pp-brand); font-weight: 600;
          text-transform: uppercase;
        }
        .pp-h1 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(40px, 7vw, 76px);
          line-height: 1.05; letter-spacing: -0.02em;
          margin: 16px 0 22px;
          color: var(--pp-ink);
        }
        .pp-h1-em {
          font-family: var(--font-serif), serif;
          font-style: italic; font-weight: 400; color: var(--pp-brand);
        }
        .pp-lead {
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.6; color: var(--pp-ink-3);
          max-width: 680px; margin-bottom: 30px;
        }

        .pp-intro { padding: 70px 0; border-top: 1px solid var(--pp-line); }
        .pp-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 60px; align-items: start;
        }
        @media (max-width: 880px) {
          .pp-intro-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        .pp-tag {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--pp-brand); font-weight: 600;
          text-transform: uppercase;
        }
        .pp-h2 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.15; letter-spacing: -0.015em;
          margin: 12px 0 0;
          color: var(--pp-ink);
        }
        .pp-h2-em {
          font-family: var(--font-serif), serif;
          font-style: italic; font-weight: 400; color: var(--pp-brand);
        }
        .pp-intro-body { font-size: 17px; line-height: 1.7; color: var(--pp-ink-3); }
        .pp-section-sub {
          font-size: 16px; line-height: 1.65;
          color: var(--pp-ink-3); margin: 16px 0 0;
          max-width: 720px;
        }

        .pp-pillars { padding: 90px 0; border-top: 1px solid var(--pp-line); background: var(--pp-bg-2); }
        .pp-section-head { margin-bottom: 50px; }
        .pp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1080px) { .pp-pillars-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .pp-pillars-grid { grid-template-columns: 1fr; } }
        .pp-pillar-card {
          background: #FFFFFF;
          border: 1px solid var(--pp-line);
          border-radius: 16px;
          padding: 28px 24px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .pp-pillar-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -22px rgba(15, 23, 42, 0.18);
          border-color: rgba(90, 127, 181, 0.4);
        }
        .pp-pillar-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: 17px;
          letter-spacing: -0.01em;
          color: var(--pp-brand); margin: 0 0 12px;
        }
        .pp-pillar-body { font-size: 14px; line-height: 1.6; color: var(--pp-ink-4); margin: 0; }

        .pp-features { padding: 90px 0; border-top: 1px solid var(--pp-line); }
        .pp-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 980px) { .pp-features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .pp-features-grid { grid-template-columns: 1fr; } }
        .pp-feature-card {
          background: #FFFFFF;
          border: 1px solid var(--pp-line);
          border-radius: 16px;
          padding: 24px 22px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .pp-feature-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -22px rgba(15, 23, 42, 0.18);
          border-color: rgba(90, 127, 181, 0.4);
        }
        .pp-feature-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: 16.5px;
          letter-spacing: -0.01em;
          color: var(--pp-ink); margin: 0 0 10px;
        }
        .pp-feature-body { font-size: 13.8px; line-height: 1.55; color: var(--pp-ink-4); margin: 0; }

        .pp-users { padding: 90px 0; border-top: 1px solid var(--pp-line); background: var(--pp-bg-2); }
        .pp-users-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }
        @media (max-width: 760px) { .pp-users-grid { grid-template-columns: 1fr; } }
        .pp-user-card {
          padding: 30px 28px;
          border: 1px solid var(--pp-line);
          border-radius: 18px;
          background: #FFFFFF;
        }
        .pp-user-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: 18.5px;
          letter-spacing: -0.01em;
          color: var(--pp-brand); margin: 0 0 12px;
        }
        .pp-user-body { font-size: 15px; line-height: 1.65; color: var(--pp-ink-3); margin: 0; }

        .pp-cta { padding: 90px 0 110px; border-top: 1px solid var(--pp-line); }
        .pp-cta-card {
          background:
            radial-gradient(ellipse at 14% 0%, rgba(90, 127, 181, 0.36) 0%, transparent 58%),
            linear-gradient(155deg, var(--pp-brand) 0%, var(--pp-navy) 100%);
          border-radius: 24px;
          padding: 60px 56px;
          color: #FFFFFF;
          text-align: center;
        }
        @media (max-width: 720px) { .pp-cta-card { padding: 44px 26px; } }
        .pp-cta-h {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.15; letter-spacing: -0.015em;
          margin: 0 0 14px;
        }
        .pp-cta-em {
          font-family: var(--font-serif), serif;
          font-style: italic; font-weight: 400;
          color: #A0C4F0;
        }
        .pp-cta-sub {
          font-size: 16px; line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 580px; margin: 0 auto 26px;
        }
        .pp-cta-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 24px;
          background: #FFFFFF; color: var(--pp-ink);
          border-radius: 999px;
          font-weight: 500; font-size: 14.5px;
          text-decoration: none;
          transition: transform 0.25s, background 0.25s;
        }
        .pp-cta-pill:hover { transform: translateY(-1px); background: #F0F0E8; }
        .pp-cta-pill-arrow { transition: transform 0.25s; }
        .pp-cta-pill:hover .pp-cta-pill-arrow { transform: translateX(3px); }
      `}</style>
    </main>
  )
}

"use client"

import Link from "next/link"
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

const VALUES = [
  { title: "Determinism over magic", body: "We believe AI should propose, never silently decide. Every action our platforms take is reviewable, replayable, and reversible." },
  { title: "Compliance by default", body: "Our products are built for regulated industries — banking, insurance, healthcare, public sector. Audit trails are not an afterthought; they are the substrate." },
  { title: "Stewardship in the loop", body: "The people closest to the data should remain the source of truth. Our tools amplify human judgment instead of bypassing it." },
  { title: "Engineering rigor", body: "Versioning, idempotency, replayability, and observability are non-negotiable across every product we ship." },
]

const STATS = [
  { value: "25+",  label: "Years of industry experience" },
  { value: "Multiple", label: "Industry verticals served" },
  { value: "99.9%", label: "Platform uptime SLA" },
  { value: "24/7", label: "Support coverage" },
]


export default function AboutPage() {
  return (
    <main className={`pp-root ${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <section className="pp-hero">
        <div className="pp-container">
          <span className="pp-eyebrow">ABOUT INFINIQON</span>
          <h1 className="pp-h1">
            We build the <span className="pp-h1-em">trust layer</span><br />
            for regulated industries.
          </h1>
          <p className="pp-lead">
            Infiniqon is a platform company building purpose-built software for
            organizations where data integrity, auditability, and regulatory
            compliance are non-negotiable — across banking, insurance,
            healthcare, telecom, and the public sector.
          </p>
        </div>
      </section>

      <section className="pp-intro">
        <div className="pp-container pp-intro-grid">
          <div>
            <h2 className="pp-h2">
              Built for the <span className="pp-h2-em">long-running, high-stakes systems</span> that run the economy.
            </h2>
          </div>
          <div className="pp-intro-body-stack">
            <p className="pp-intro-body">
              We started Infiniqon because the platforms regulated enterprises
              depend on were either too rigid to adapt or too opaque to trust. Our
              answer: build software where every decision is explainable, every
              action is reversible, and every change is captured in an immutable
              audit trail.
            </p>
            <p className="pp-intro-body">
              Today, our products power end-to-end data governance pipelines
              across regulated industries. Each product carries the same
              commitment: human stewards in the loop, deterministic execution,
              and a permanent, auditable record.
            </p>
          </div>
        </div>
      </section>

      <section className="pp-stats">
        <div className="pp-container">
          <div className="pp-stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="pp-stat-card">
                <div className="pp-stat-value">{s.value}</div>
                <div className="pp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-mission">
        <div className="pp-container pp-mission-grid">
          <div className="pp-mission-block">
            <span className="pp-tag">MISSION</span>
            <h3 className="pp-mission-h">
              To make <span className="pp-h2-em">regulated enterprise data</span> trustworthy, auditable, and operational.
            </h3>
            <p className="pp-mission-body">
              We build the software that lets banks, insurers, healthcare systems,
              and government agencies operate on data they can defend — to
              regulators, to auditors, and to their own customers.
            </p>
          </div>
          <div className="pp-mission-block">
            <span className="pp-tag">VISION</span>
            <h3 className="pp-mission-h">
              A world where <span className="pp-h2-em">every critical decision</span> is backed by traceable, governed data.
            </h3>
            <p className="pp-mission-body">
              No silent failures. No unexplainable automation. No data that no one
              can vouch for. Just a transparent, deterministic, audit-ready path
              from source to decision.
            </p>
          </div>
        </div>
      </section>

      <section className="pp-values">
        <div className="pp-container">
          <div className="pp-section-head">
            <span className="pp-tag">WHAT WE BELIEVE</span>
            <h2 className="pp-h2">
              Principles that <span className="pp-h2-em">shape every product</span>.
            </h2>
          </div>
          <div className="pp-values-grid">
            {VALUES.map((v) => (
              <article key={v.title} className="pp-value-card">
                <h3 className="pp-value-title">{v.title}</h3>
                <p className="pp-value-body">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-cta">
        <div className="pp-container">
          <div className="pp-cta-card">
            <h2 className="pp-cta-h">
              Talk to <span className="pp-cta-em">our team</span>.
            </h2>
            <p className="pp-cta-sub">
              Whether you&rsquo;re evaluating a product, exploring a partnership,
              or just want to know more — we&rsquo;d love to hear from you.
            </p>
            <Link href="/support" className="pp-cta-pill">
              <span>Get in touch</span>
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
          font-size: clamp(40px, 7vw, 72px);
          line-height: 1.06; letter-spacing: -0.02em;
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
          max-width: 720px; margin-bottom: 0;
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
        .pp-intro-body-stack { display: flex; flex-direction: column; gap: 18px; }
        .pp-intro-body { font-size: 17px; line-height: 1.7; color: var(--pp-ink-3); margin: 0; }
        .pp-section-sub {
          font-size: 16px; line-height: 1.65;
          color: var(--pp-ink-3); margin: 16px 0 0;
          max-width: 720px;
        }

        .pp-stats { padding: 70px 0; border-top: 1px solid var(--pp-line); background: var(--pp-bg-2); }
        .pp-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 760px) { .pp-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 380px) { .pp-stats-grid { grid-template-columns: 1fr; } }
        .pp-stat-card {
          background: #FFFFFF;
          border: 1px solid var(--pp-line);
          border-radius: 16px;
          padding: 26px 22px;
          text-align: center;
        }
        .pp-stat-value {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 4vw, 44px);
          letter-spacing: -0.02em;
          color: var(--pp-brand);
        }
        .pp-stat-label {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.18em;
          color: var(--pp-ink-4);
          text-transform: uppercase;
          margin-top: 8px;
        }

        .pp-mission { padding: 90px 0; border-top: 1px solid var(--pp-line); }
        .pp-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 880px) { .pp-mission-grid { grid-template-columns: 1fr; gap: 36px; } }
        .pp-mission-h {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 2.6vw, 28px);
          line-height: 1.25; letter-spacing: -0.01em;
          color: var(--pp-ink);
          margin: 12px 0 16px;
        }
        .pp-mission-body { font-size: 16px; line-height: 1.65; color: var(--pp-ink-3); margin: 0; }

        .pp-values { padding: 90px 0; border-top: 1px solid var(--pp-line); background: var(--pp-bg-2); }
        .pp-section-head { margin-bottom: 50px; }
        .pp-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1080px) { .pp-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .pp-values-grid { grid-template-columns: 1fr; } }
        .pp-value-card {
          background: #FFFFFF;
          border: 1px solid var(--pp-line);
          border-radius: 16px;
          padding: 26px 22px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .pp-value-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -22px rgba(15, 23, 42, 0.18);
          border-color: rgba(90, 127, 181, 0.4);
        }
        .pp-value-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: 16.5px;
          letter-spacing: -0.01em;
          color: var(--pp-brand); margin: 0 0 10px;
        }
        .pp-value-body { font-size: 14px; line-height: 1.6; color: var(--pp-ink-4); margin: 0; }

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
        @media (max-width: 480px) { .pp-cta-card { padding: 36px 20px; border-radius: 18px; } }
        @media (max-width: 480px) { .pp-intro-body { font-size: 15px; } }
        @media (max-width: 480px) { .pp-mission { padding: 60px 0; } .pp-values { padding: 60px 0; } }
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
          max-width: 560px; margin: 0 auto 26px;
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

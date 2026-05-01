"use client"

import Link from "next/link"
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

export const POSTS = [
  {
    slug: "deterministic-execution",
    eyebrow: "DATA QUALITY",
    title: "Why deterministic execution beats opaque AI for regulated data",
    excerpt:
      "AI is a powerful drafter, but a dangerous executor. We unpack why the most defensible data platforms separate intelligence from execution — and what that buys you when regulators come asking.",
    readTime: "9 min read",
    date: "April 22, 2026",
    author: "Infiniqon Engineering",
  },
  {
    slug: "suggest-approve-execute",
    eyebrow: "OPERATING MODEL",
    title: "Suggest → Approve → Execute: a new operating model for data quality",
    excerpt:
      "Most data tools either automate too much or automate nothing. The middle path — AI proposes, humans approve, deterministic engines execute — is the model regulated industries have been waiting for.",
    readTime: "11 min read",
    date: "April 8, 2026",
    author: "Infiniqon Product",
  },
  {
    slug: "schema-drift",
    eyebrow: "PIPELINE RELIABILITY",
    title: "Schema drift in 2026: why your pipelines silently break",
    excerpt:
      "Upstream sources change. Field names rotate. Types coerce. By the time anyone notices, the dashboard has been wrong for weeks. Here's how modern data platforms catch drift the moment it happens.",
    readTime: "8 min read",
    date: "March 27, 2026",
    author: "Infiniqon Engineering",
  },
  {
    slug: "data-lineage",
    eyebrow: "GOVERNANCE",
    title: "Building defensible data lineage: from source to decision",
    excerpt:
      "Lineage isn't a diagram you draw once. It's an immutable record of every transformation, approval, and override that touched a record on its way to a downstream system. We walk through what that takes.",
    readTime: "10 min read",
    date: "March 12, 2026",
    author: "Infiniqon Engineering",
  },
]

export default function BlogIndexPage() {
  const [featured, ...rest] = POSTS
  return (
    <main className={`bp-root ${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <section className="bp-hero">
        <div className="bp-container">
          <span className="bp-eyebrow">INFINIQON BLOG</span>
          <h1 className="bp-h1">
            Field notes on <span className="bp-h1-em">data trust</span>.
          </h1>
          <p className="bp-lead">
            Long-form essays from the engineers and product team building
            CleanFlowAI — on deterministic execution, AI-assisted governance,
            schema drift, lineage, and the operating models that hold up under
            regulatory scrutiny.
          </p>
        </div>
      </section>

      <section className="bp-featured">
        <div className="bp-container">
          <Link href={`/blog/${featured.slug}`} className="bp-featured-card">
            <div className="bp-featured-meta">
              <span className="bp-tag">{featured.eyebrow}</span>
              <span className="bp-meta-dot" aria-hidden>·</span>
              <span className="bp-meta-text">{featured.date}</span>
              <span className="bp-meta-dot" aria-hidden>·</span>
              <span className="bp-meta-text">{featured.readTime}</span>
            </div>
            <h2 className="bp-featured-title">{featured.title}</h2>
            <p className="bp-featured-excerpt">{featured.excerpt}</p>
            <span className="bp-featured-cta">
              Read the essay
              <span className="bp-arrow" aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="bp-grid-section">
        <div className="bp-container">
          <div className="bp-section-head">
            <span className="bp-tag">MORE FROM THE BLOG</span>
            <h2 className="bp-h2">
              Recent <span className="bp-h2-em">essays</span>.
            </h2>
          </div>
          <div className="bp-grid">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="bp-card">
                <div className="bp-card-meta">
                  <span className="bp-tag bp-tag-sm">{p.eyebrow}</span>
                  <span className="bp-meta-dot" aria-hidden>·</span>
                  <span className="bp-meta-text">{p.readTime}</span>
                </div>
                <h3 className="bp-card-title">{p.title}</h3>
                <p className="bp-card-excerpt">{p.excerpt}</p>
                <div className="bp-card-foot">
                  <span className="bp-meta-text">{p.date}</span>
                  <span className="bp-card-arrow" aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .bp-root {
          --bp-bg: #FAFAF5;
          --bp-bg-2: #F5F3EC;
          --bp-line: rgba(15, 23, 41, 0.08);
          --bp-ink: #0F1729;
          --bp-ink-2: #1E293B;
          --bp-ink-3: #475569;
          --bp-ink-4: #6B6F78;
          --bp-brand: #2A4477;
          --bp-blue: #3A5A94;
          --bp-navy: #141E30;
          background: var(--bp-bg);
          color: var(--bp-ink);
          font-family: var(--font-sans), sans-serif;
          min-height: 100vh;
        }
        .bp-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; }
        @media (max-width: 720px) { .bp-container { padding: 0 22px; } }

        .bp-hero {
          padding: 180px 0 80px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.16) 0%, transparent 60%),
            linear-gradient(180deg, var(--bp-bg) 0%, var(--bp-bg-2) 100%);
        }
        .bp-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--bp-brand); font-weight: 600;
          text-transform: uppercase;
        }
        .bp-h1 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(40px, 7vw, 76px);
          line-height: 1.06; letter-spacing: -0.02em;
          margin: 16px 0 22px;
          color: var(--bp-ink);
        }
        .bp-h1-em { font-family: var(--font-serif), serif; font-style: italic; font-weight: 400; color: var(--bp-brand); }
        .bp-lead {
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.6; color: var(--bp-ink-3);
          max-width: 720px;
        }

        .bp-tag {
          display: inline-block;
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--bp-brand); font-weight: 600;
          text-transform: uppercase;
        }
        .bp-tag-sm { font-size: 10px; }
        .bp-meta-dot { color: var(--bp-ink-4); margin: 0 8px; }
        .bp-meta-text { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--bp-ink-4); letter-spacing: 0.06em; }

        .bp-featured { padding: 60px 0 40px; }
        .bp-featured-card {
          display: block;
          background:
            radial-gradient(ellipse at 14% 0%, rgba(90, 127, 181, 0.36) 0%, transparent 58%),
            linear-gradient(155deg, var(--bp-brand) 0%, var(--bp-navy) 100%);
          color: #FFFFFF;
          padding: 56px 56px 50px;
          border-radius: 24px;
          text-decoration: none;
          transition: transform 0.4s, box-shadow 0.4s;
          border: 1px solid rgba(160, 196, 240, 0.2);
        }
        @media (max-width: 720px) { .bp-featured-card { padding: 40px 26px; } }
        .bp-featured-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 30px 70px -30px rgba(15, 23, 42, 0.4);
        }
        .bp-featured-meta { display: flex; align-items: center; flex-wrap: wrap; margin-bottom: 18px; }
        .bp-featured-card .bp-tag { color: #A0C4F0; }
        .bp-featured-card .bp-meta-text { color: rgba(255, 255, 255, 0.62); }
        .bp-featured-card .bp-meta-dot { color: rgba(255, 255, 255, 0.35); }
        .bp-featured-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.18; letter-spacing: -0.015em;
          margin: 0 0 18px;
          max-width: 880px;
        }
        .bp-featured-excerpt {
          font-size: 17px; line-height: 1.65;
          color: rgba(255, 255, 255, 0.78);
          margin: 0 0 24px; max-width: 740px;
        }
        .bp-featured-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono), monospace;
          font-size: 12.5px; letter-spacing: 0.16em;
          color: #FFFFFF; font-weight: 600;
          text-transform: uppercase;
        }
        .bp-arrow { transition: transform 0.3s; display: inline-block; }
        .bp-featured-card:hover .bp-arrow { transform: translateX(4px); }

        .bp-grid-section { padding: 60px 0 110px; }
        .bp-section-head { margin-bottom: 36px; }
        .bp-h2 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(26px, 3.2vw, 36px);
          line-height: 1.18; letter-spacing: -0.015em;
          margin: 12px 0 0;
          color: var(--bp-ink);
        }
        .bp-h2-em { font-family: var(--font-serif), serif; font-style: italic; font-weight: 400; color: var(--bp-brand); }

        .bp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 980px) { .bp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .bp-grid { grid-template-columns: 1fr; } }
        .bp-card {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid var(--bp-line);
          border-radius: 18px;
          padding: 28px 26px;
          text-decoration: none;
          color: var(--bp-ink);
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .bp-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 52px -28px rgba(15, 23, 42, 0.22);
          border-color: rgba(90, 127, 181, 0.4);
        }
        .bp-card-meta { display: flex; align-items: center; margin-bottom: 14px; }
        .bp-card-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: 19px;
          line-height: 1.3; letter-spacing: -0.01em;
          color: var(--bp-ink); margin: 0 0 12px;
        }
        .bp-card-excerpt {
          font-size: 14.5px; line-height: 1.6;
          color: var(--bp-ink-4); margin: 0 0 18px;
          flex: 1;
        }
        .bp-card-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--bp-line);
        }
        .bp-card-arrow {
          font-family: var(--font-mono), monospace;
          color: var(--bp-brand); font-weight: 700;
          transition: transform 0.3s;
        }
        .bp-card:hover .bp-card-arrow { transform: translateX(4px); }
      `}</style>
    </main>
  )
}

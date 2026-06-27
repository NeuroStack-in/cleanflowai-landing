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
    slug: "data-quality-crisis",
    eyebrow: "DATA QUALITY",
    title: "The $12.9 Million Data Quality Crisis Hiding Inside Enterprise Systems",
    excerpt:
      "Organizations have never had more data — yet poor data quality silently costs enterprises an average of $12.9 million annually. Here's why trusted data is no longer an IT concern, but a business requirement.",
    readTime: "8 min read",
    date: "May 28, 2026",
    author: "Infiniqon Engineering",
  },
  {
    slug: "data-quality-issues",
    eyebrow: "DATA GOVERNANCE",
    title: "10 Data Quality Issues Every Enterprise Discovers Too Late",
    excerpt:
      "96% of data professionals believe poor data quality creates significant business risk. From duplicate records to AI readiness gaps, these are the ten issues silently compounding inside enterprise systems.",
    readTime: "7 min read",
    date: "May 19, 2026",
    author: "Infiniqon Product",
  },
  {
    slug: "data-profiling",
    eyebrow: "DATA ENGINEERING",
    title: "How We Profile 1 Million Records in Under 60 Seconds",
    excerpt:
      "Before any modernization, migration, or AI initiative can begin, there is one fundamental challenge: most organizations don't fully understand the data they already have. Here's how CleanFlowAI changes that in seconds.",
    readTime: "10 min read",
    date: "May 8, 2026",
    author: "Infiniqon Engineering",
  },
  {
    slug: "legacy-data-modernization",
    eyebrow: "DATA MODERNIZATION",
    title: "Legacy Data Modernization and Its Strategies: Preparing Enterprise Data for the AI Era",
    excerpt:
      "Legacy data contains decades of business value — but fragmented, inconsistent records block AI adoption, cloud migration, and digital transformation. Here are the five proven strategies for modernizing with confidence.",
    readTime: "7 min read",
    date: "April 24, 2026",
    author: "Infiniqon Engineering",
  },
  {
    slug: "legacy-modernization-stats",
    eyebrow: "INDUSTRY INSIGHTS",
    title: "15 Legacy System Modernization Statistics Every Enterprise Should Know in 2026",
    excerpt:
      "From a $12.9M annual cost of poor data quality to 80% of enterprise data sitting unstructured — these 15 statistics reveal why legacy modernization has become a boardroom-level priority in 2026.",
    readTime: "6 min read",
    date: "April 10, 2026",
    author: "Infiniqon Research",
  },
]

export default function BlogIndexPage() {
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

      <section className="bp-grid-section">
        <div className="bp-container">
          <div className="bp-grid">
            {POSTS.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="bp-card">
                <div className="bp-card-meta">
                  <span className="bp-tag">{p.eyebrow}</span>
                </div>
                <h3 className="bp-card-title">{p.title}</h3>
                <p className="bp-card-excerpt">{p.excerpt}</p>
                <span className="bp-card-cta">
                  Read the essay
                  <span className="bp-arrow" aria-hidden>→</span>
                </span>
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
        @media (max-width: 768px) { .bp-hero { padding: 110px 0 56px; } }
        @media (max-width: 480px) { .bp-hero { padding: 96px 0 44px; } }
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
          color: #A0C4F0; font-weight: 600;
          text-transform: uppercase;
        }
        .bp-meta-dot { color: rgba(255,255,255,0.35); margin: 0 8px; }
        .bp-meta-text { font-family: var(--font-mono), monospace; font-size: 12px; color: rgba(255,255,255,0.62); letter-spacing: 0.06em; }

        .bp-arrow { transition: transform 0.3s; display: inline-block; }

        .bp-grid-section { padding: 40px 0 110px; }
        @media (max-width: 620px) { .bp-grid-section { padding: 28px 0 72px; } }

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
          background:
            radial-gradient(ellipse at 14% 0%, rgba(90, 127, 181, 0.36) 0%, transparent 58%),
            linear-gradient(155deg, var(--bp-brand) 0%, var(--bp-navy) 100%);
          color: #FFFFFF;
          border: 1px solid rgba(160, 196, 240, 0.2);
          border-radius: 20px;
          padding: 32px 30px 28px;
          text-decoration: none;
          transition: transform 0.35s, box-shadow 0.35s;
        }
        .bp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 70px -30px rgba(15, 23, 42, 0.5);
        }
        @media (max-width: 480px) { .bp-card { padding: 24px 20px; border-radius: 16px; } }

        .bp-card-meta { display: flex; align-items: center; flex-wrap: wrap; margin-bottom: 16px; }
        .bp-card-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: clamp(18px, 2vw, 22px);
          line-height: 1.28; letter-spacing: -0.01em;
          color: #FFFFFF; margin: 0 0 14px;
          flex: 1;
        }
        .bp-card-excerpt {
          font-size: 14.5px; line-height: 1.65;
          color: rgba(255,255,255,0.75); margin: 0 0 24px;
          flex: 1;
          text-align: justify;
          hyphens: auto;
        }
        .bp-card-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono), monospace;
          font-size: 12px; letter-spacing: 0.16em;
          color: #FFFFFF; font-weight: 600;
          text-transform: uppercase;
          margin-top: auto;
        }
        .bp-card:hover .bp-arrow { transform: translateX(4px); }
      `}</style>
    </main>
  )
}

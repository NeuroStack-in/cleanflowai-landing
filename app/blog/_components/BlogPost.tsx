"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

export type BlogPostMeta = {
  eyebrow: string
  title: string
  subtitle: string
  date: string
  readTime: string
  author: string
}

export function BlogPost({ meta, children }: { meta: BlogPostMeta; children: ReactNode }) {
  return (
    <main className={`bp-root ${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <article className="bp-article">
        <header className="bp-article-head">
          <div className="bp-container bp-narrow">
            <span className="bp-eyebrow">{meta.eyebrow}</span>
            <h1 className="bp-h1">{meta.title}</h1>
            <p className="bp-subtitle">{meta.subtitle}</p>
            <div className="bp-meta">
              <span className="bp-meta-text">{meta.author}</span>
              <span className="bp-meta-dot" aria-hidden>·</span>
              <span className="bp-meta-text">{meta.date}</span>
              <span className="bp-meta-dot" aria-hidden>·</span>
              <span className="bp-meta-text">{meta.readTime}</span>
            </div>
          </div>
        </header>

        <div className="bp-container bp-narrow">
          <div className="bp-prose">{children}</div>
        </div>

        <div className="bp-container bp-narrow">
          <div className="bp-end-cta">
            <h3 className="bp-end-h">
              Ready to see CleanFlowAI in your stack?
            </h3>
            <p className="bp-end-sub">
              Bring us your messiest dataset. We&rsquo;ll show you what we can
              profile, fix, quarantine, and automate — with your stewards in the
              loop.
            </p>
            <Link href="/contact" className="bp-end-pill">
              <span>Book a demo</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </article>

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
        .bp-narrow { max-width: 780px; }
        @media (max-width: 720px) { .bp-container { padding: 0 22px; } }

        .bp-article-head {
          padding: 160px 0 50px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.16) 0%, transparent 60%),
            linear-gradient(180deg, var(--bp-bg) 0%, var(--bp-bg-2) 100%);
          margin-bottom: 50px;
        }
        .bp-back {
          display: inline-block;
          font-family: var(--font-mono), monospace;
          font-size: 12px; letter-spacing: 0.12em;
          color: var(--bp-ink-3); text-decoration: none;
          margin-bottom: 28px;
          transition: color 0.25s;
        }
        .bp-back:hover { color: var(--bp-brand); }
        .bp-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--bp-brand); font-weight: 600;
          text-transform: uppercase;
        }
        .bp-h1 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 1.1; letter-spacing: -0.018em;
          margin: 14px 0 18px;
          color: var(--bp-ink);
        }
        .bp-subtitle {
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.55; color: var(--bp-ink-3);
          margin: 0 0 28px;
        }
        .bp-meta { display: flex; align-items: center; flex-wrap: wrap; }
        .bp-meta-dot { color: var(--bp-ink-4); margin: 0 8px; }
        .bp-meta-text { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--bp-ink-4); letter-spacing: 0.06em; }

        .bp-prose {
          font-family: var(--font-sans), sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: var(--bp-ink-2);
        }
        .bp-prose p { margin: 0 0 22px; }
        .bp-prose h2 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 2.6vw, 28px);
          line-height: 1.25; letter-spacing: -0.012em;
          color: var(--bp-ink);
          margin: 56px 0 18px;
          padding-top: 8px;
        }
        .bp-prose h3 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: 19px;
          letter-spacing: -0.01em;
          color: var(--bp-ink);
          margin: 36px 0 14px;
        }
        .bp-prose ul, .bp-prose ol {
          padding-left: 22px;
          margin: 0 0 24px;
        }
        .bp-prose li {
          margin: 0 0 10px;
          line-height: 1.7;
        }
        .bp-prose strong { color: var(--bp-ink); font-weight: 700; }
        .bp-prose em { font-family: var(--font-serif), serif; font-style: italic; color: var(--bp-brand); font-size: 1.04em; }
        .bp-prose a { color: var(--bp-brand); text-decoration: underline; text-underline-offset: 3px; }
        .bp-prose blockquote {
          margin: 32px 0;
          padding: 22px 26px;
          border-left: 3px solid var(--bp-brand);
          background: var(--bp-bg-2);
          border-radius: 6px;
          font-family: var(--font-serif), serif;
          font-style: italic;
          font-size: 19px;
          color: var(--bp-ink-2);
          line-height: 1.55;
        }
        .bp-prose blockquote p:last-child { margin-bottom: 0; }
        .bp-callout {
          margin: 32px 0;
          padding: 22px 26px;
          background: linear-gradient(155deg, rgba(90, 127, 181, 0.1) 0%, rgba(160, 196, 240, 0.05) 100%);
          border: 1px solid rgba(90, 127, 181, 0.2);
          border-radius: 12px;
        }
        .bp-callout-label {
          font-family: var(--font-mono), monospace;
          font-size: 10.5px; letter-spacing: 0.2em;
          color: var(--bp-brand); font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .bp-callout p:last-child { margin-bottom: 0; }
        .bp-prose hr {
          border: none;
          border-top: 1px solid var(--bp-line);
          margin: 48px 0;
        }

        .bp-end-cta {
          margin: 80px 0 100px;
          padding: 44px 40px;
          background: linear-gradient(155deg, var(--bp-brand) 0%, var(--bp-navy) 100%);
          color: #FFFFFF;
          border-radius: 20px;
          text-align: center;
        }
        @media (max-width: 720px) { .bp-end-cta { padding: 36px 24px; } }
        .bp-end-h {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 2.8vw, 28px);
          line-height: 1.25; letter-spacing: -0.012em;
          margin: 0 0 12px;
        }
        .bp-end-sub {
          font-size: 15px; line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          margin: 0 auto 22px; max-width: 520px;
        }
        .bp-end-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 22px;
          background: #FFFFFF; color: var(--bp-ink);
          border-radius: 999px;
          font-weight: 500; font-size: 14px;
          text-decoration: none;
          transition: transform 0.25s, background 0.25s;
        }
        .bp-end-pill:hover { transform: translateY(-1px); background: #F0F0E8; }
      `}</style>
    </main>
  )
}

"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"
import { trackEvent } from "@/lib/analytics"
import { POSTS } from "../page"

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

export function BlogPost({ meta, currentSlug, children }: { meta: BlogPostMeta; currentSlug?: string; children: ReactNode }) {
  const otherPosts = POSTS.filter((p) => p.slug !== currentSlug)
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
            <Link
              href="/contact"
              className="bp-end-pill"
              onClick={() => trackEvent({ action: "blog_cta_click", category: "engagement", label: "book_a_demo" })}
            >
              <span>Book a demo</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {otherPosts.length > 0 && (
          <div className="bp-more-section">
            <div className="bp-container">
              <div className="bp-more-head">
                <span className="bp-more-eyebrow">MORE FROM THE BLOG</span>
                <h2 className="bp-more-h2">Continue <span className="bp-more-em">reading</span>.</h2>
              </div>
              <div className="bp-more-grid">
                {otherPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="bp-more-card">
                    <div className="bp-more-card-meta">
                      <span className="bp-more-tag">{p.eyebrow}</span>
                    </div>
                    <h3 className="bp-more-card-title">{p.title}</h3>
                    <p className="bp-more-card-excerpt">{p.excerpt}</p>
                    <span className="bp-more-card-cta">
                      Read the essay <span className="bp-more-arrow" aria-hidden>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
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
        @media (max-width: 768px) { .bp-article-head { padding: 110px 0 40px; margin-bottom: 36px; } }
        @media (max-width: 480px) { .bp-article-head { padding: 96px 0 32px; margin-bottom: 28px; } }
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
        @media (max-width: 600px) {
          .bp-prose blockquote { font-size: 16px; padding: 16px 18px; }
          .bp-prose { font-size: 16px; line-height: 1.65; }
          .bp-prose table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; font-size: 13px; }
          .bp-prose th, .bp-prose td { padding: 9px 12px; }
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
        .bp-prose table {
          width: 100%; border-collapse: collapse;
          margin: 24px 0 32px;
          font-size: 15px;
          border: 1px solid var(--bp-line);
          border-radius: 10px;
          overflow: hidden;
        }
        .bp-prose th {
          background: var(--bp-brand); color: #ffffff;
          font-family: var(--font-mono), monospace;
          font-size: 10.5px; letter-spacing: 0.14em;
          text-transform: uppercase; font-weight: 700;
          padding: 12px 18px; text-align: left;
        }
        .bp-prose td {
          padding: 11px 18px;
          border-bottom: 1px solid var(--bp-line);
          color: var(--bp-ink-2);
        }
        .bp-prose tr:last-child td { border-bottom: none; }
        .bp-prose tr:nth-child(even) td { background: var(--bp-bg-2); }

        .bp-end-cta {
          margin: 80px 0 100px;
          padding: 44px 40px;
          background: linear-gradient(155deg, var(--bp-brand) 0%, var(--bp-navy) 100%);
          color: #FFFFFF;
          border-radius: 20px;
          text-align: center;
        }
        @media (max-width: 720px) { .bp-end-cta { padding: 36px 24px; margin: 56px 0 80px; } }
        @media (max-width: 480px) { .bp-end-cta { padding: 28px 20px; margin: 48px 0 64px; border-radius: 16px; } }
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

        .bp-more-section { padding: 0 0 100px; }
        .bp-more-head { margin-bottom: 28px; }
        .bp-more-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--bp-brand); font-weight: 600;
          text-transform: uppercase;
        }
        .bp-more-h2 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.18; letter-spacing: -0.015em;
          margin: 10px 0 0; color: var(--bp-ink);
        }
        .bp-more-em { font-family: var(--font-serif), serif; font-style: italic; font-weight: 400; color: var(--bp-brand); }

        .bp-more-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1100px) { .bp-more-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .bp-more-grid { grid-template-columns: 1fr; } }

        .bp-more-card {
          display: flex; flex-direction: column;
          background:
            radial-gradient(ellipse at 14% 0%, rgba(90, 127, 181, 0.36) 0%, transparent 58%),
            linear-gradient(155deg, var(--bp-brand) 0%, var(--bp-navy) 100%);
          color: #FFFFFF;
          border: 1px solid rgba(160, 196, 240, 0.2);
          border-radius: 18px;
          padding: 26px 24px 22px;
          text-decoration: none;
          transition: transform 0.35s, box-shadow 0.35s;
        }
        .bp-more-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 60px -28px rgba(15, 23, 42, 0.5);
        }
        @media (max-width: 480px) { .bp-more-card { padding: 20px 18px; border-radius: 14px; } }

        .bp-more-card-meta { margin-bottom: 12px; }
        .bp-more-tag {
          font-family: var(--font-mono), monospace;
          font-size: 10px; letter-spacing: 0.22em;
          color: #A0C4F0; font-weight: 600;
          text-transform: uppercase;
        }
        .bp-more-card-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: 16px;
          line-height: 1.3; letter-spacing: -0.01em;
          color: #FFFFFF; margin: 0 0 12px;
        }
        .bp-more-card-excerpt {
          font-size: 13px; line-height: 1.6;
          color: rgba(255,255,255,0.72);
          margin: 0 0 20px; flex: 1;
        }
        .bp-more-card-cta {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.16em;
          color: #FFFFFF; font-weight: 600;
          text-transform: uppercase;
          margin-top: auto;
        }
        .bp-more-arrow { display: inline-block; transition: transform 0.3s; }
        .bp-more-card:hover .bp-more-arrow { transform: translateX(4px); }
      `}</style>
    </main>
  )
}

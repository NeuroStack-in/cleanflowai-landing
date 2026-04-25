"use client"

/**
 * SiteChrome — shared nav, CTA, and footer used across every marketing page.
 * Visuals mirror the landing page exactly; all classes are prefixed "sc-" so
 * they never collide with page-specific styles. Drop <SiteChromeStyles/> once
 * per page to load the styles alongside the components.
 */

import { useEffect, useState } from "react"
import Link from "next/link"

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */

const CAPABILITIES = [
  { slug: "profiling",      name: "Data Profiling",       blurb: "AutoMap type inference, statistical fingerprinting, AI-drafted rule suggestions." },
  { slug: "quality",        name: "Data Quality",         blurb: "CleanDataShield rules, Quarantine Editor, approval-based remediation." },
  { slug: "transformation", name: "Data Transformation",  blurb: "AutoMap field resolution, version-controlled blueprints, deterministic execution." },
  { slug: "migration",      name: "Data Migration",       blurb: "OAuth connectors, real-time Jobs, stateful incremental sync." },
  { slug: "modernization",  name: "Data Modernization",   blurb: "Encoding normalization, schema-drift reconciliation, warehouse-native output." },
  { slug: "security",       name: "Data Security",        blurb: "Identity-scoped access, approval-based change control, immutable audit lineage." },
]

/* ══════════════════════════════════════════════════════════════════
   WORDMARK
   ══════════════════════════════════════════════════════════════════ */

function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link href="/landing" className={`sc-wordmark sc-wordmark-${size}`} aria-label="CleanFlowAI">
      <span className="sc-logo-wrap">
        <img src="/favicon_io/android-chrome-192x192.png" alt="" className="sc-logo-img" width={40} height={40} />
        <span className="sc-logo-glow" aria-hidden />
      </span>
      <span className="sc-logo-text">
        <span className="sc-logo-name">CleanFlowAI</span>
        <span className="sc-logo-tag">DATA QUALITY PLATFORM</span>
      </span>
    </Link>
  )
}

/* ══════════════════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════════════════ */

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`sc-topbar ${scrolled ? "sc-topbar-solid" : "sc-topbar-glass"}`}>
      <div className="sc-container sc-topbar-inner">
        <Wordmark />
        <nav className="sc-nav">
          <div
            className="sc-nav-dd"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className="sc-nav-dd-trigger"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              <span>Solutions</span>
              <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden className={`sc-nav-dd-caret ${solutionsOpen ? "sc-nav-dd-caret-open" : ""}`}>
                <path d="M1 1 L 5 5 L 9 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className={`sc-nav-dd-menu ${solutionsOpen ? "sc-nav-dd-menu-open" : ""}`} role="menu">
              <div className="sc-nav-dd-inner">
                <div className="sc-nav-dd-head">
                  <span className="sc-nav-dd-eyebrow">SOLUTIONS</span>
                  <span className="sc-nav-dd-hint">Every discipline, one trust layer</span>
                </div>
                <div className="sc-nav-dd-split">
                  <div className="sc-nav-dd-grid">
                    {CAPABILITIES.map((c) => (
                      <Link key={c.slug} href={`/capabilities/${c.slug}`} className="sc-nav-dd-item" role="menuitem">
                        <span className="sc-nav-dd-item-name">{c.name}</span>
                        <span className="sc-nav-dd-item-blurb">{c.blurb}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/cleanai" className="sc-nav-dd-feature" role="menuitem">
                    <div className="sc-nav-dd-feature-head">
                      <span className="sc-nav-dd-feature-icon" aria-hidden>
                        <img src="/brain-removebg-preview.png" alt="" />
                      </span>
                      <span className="sc-nav-dd-feature-tag">CLEANAI</span>
                    </div>
                    <h4 className="sc-nav-dd-feature-h">The intelligence engine</h4>
                    <p className="sc-nav-dd-feature-b">AutoMap, Business Rules Suggestion, and Quarantine reasoning — all governed by Suggest → Approve → Execute.</p>
                    <span className="sc-nav-dd-feature-cta">Explore CleanAI →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="/landing#features">Modules</Link>
          <Link href="/landing#pipeline">Workflow</Link>
          <Link href="/contact" className="sc-nav-cta">
            <span>Request demo</span>
            <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden className="sc-arrow">
              <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════════════════════
   CTA — ring-ripple card
   ══════════════════════════════════════════════════════════════════ */

export function SiteCta() {
  return (
    <section className="sc-cta">
      <div className="sc-container">
        <div className="sc-cta-card">
          <div className="sc-cta-rings" aria-hidden>
            <div className="sc-cta-ring sc-cta-ring-1" />
            <div className="sc-cta-ring sc-cta-ring-2" />
            <div className="sc-cta-ring sc-cta-ring-3" />
            <div className="sc-cta-ring sc-cta-ring-4" />
          </div>
          <div className="sc-cta-content">
            <h2 className="sc-cta-h">
              Bring us your <span className="sc-cta-em">messiest data</span>.
            </h2>
            <p className="sc-cta-sub">
              We&rsquo;ll show you exactly what CleanFlowAI can fix, quarantine, and automate.
            </p>
            <div className="sc-cta-buttons">
              <Link href="/contact" className="sc-cta-pill">
                <span>Book a discovery call</span>
                <span className="sc-cta-pill-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════ */

export function SiteFooter() {
  return (
    <footer className="sc-footer">
      <div className="sc-container">
        <div className="sc-footer-inner">
          <div className="sc-footer-top">
            <div>
              <Wordmark size="lg" />
              <p className="sc-footer-tag">
                The data-trust layer for teams that demand precision. Profile, validate,
                fix, ship — then automate the whole flow.
              </p>
            </div>
            <div className="sc-footer-cols">
              <div>
                <div className="sc-foot-h">Product</div>
                <ul>
                  <li><Link href="/landing#platform">Console</Link></li>
                  <li><Link href="/landing#features">Modules</Link></li>
                  <li><Link href="/landing#pipeline">Workflow</Link></li>
                  <li><Link href="/cleanai">CleanAI Engine</Link></li>
                </ul>
              </div>
              <div>
                <div className="sc-foot-h">Solutions</div>
                <ul>
                  <li><Link href="/capabilities/profiling">Data Profiling</Link></li>
                  <li><Link href="/capabilities/quality">Data Quality</Link></li>
                  <li><Link href="/capabilities/transformation">Data Transformation</Link></li>
                  <li><Link href="/capabilities/migration">Data Migration</Link></li>
                  <li><Link href="/capabilities/modernization">Data Modernization</Link></li>
                  <li><Link href="/capabilities/security">Data Security</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="sc-footer-watermark" aria-hidden>CleanFlowAI</div>
        <div className="sc-footer-bottom">
          <span>© 2026 CleanFlowAI · All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════════════
   STYLES — self-contained. Drop once per page.
   ══════════════════════════════════════════════════════════════════ */

export function SiteChromeStyles() {
  return (
    <style>{`
      /* ─── Shared vars, scoped to these components ─── */
      .sc-topbar, .sc-cta, .sc-footer, .sc-nav-dd-menu {
        --sc-bg: #FAFAF5;
        --sc-bg-2: #F5F3EC;
        --sc-line: rgba(15, 23, 41, 0.08);
        --sc-ink: #0F1729;
        --sc-ink-2: #1E293B;
        --sc-ink-3: #475569;
        --sc-ink-4: #6B6F78;
        --sc-brand: #2A4477;
        --sc-blue: #3A5A94;
        --sc-navy: #141E30;
        --sc-navy-deep: #0F1A29;
        --sc-navy-cta: #1E2E52;
      }
      .sc-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .sc-container { padding: 0 22px; } }

      /* ─── Wordmark ─── */
      .sc-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--sc-ink); }
      .sc-logo-wrap { position: relative; display: inline-flex; width: 38px; height: 38px; }
      .sc-logo-img { width: 38px; height: 38px; display: block; position: relative; z-index: 2; }
      .sc-logo-glow { position: absolute; inset: -6px; background: radial-gradient(circle, rgba(160, 196, 240, 0.35), transparent 60%); filter: blur(10px); z-index: 1; opacity: 0.8; }
      .sc-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .sc-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; color: var(--sc-ink); }
      .sc-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: var(--sc-ink-3); text-transform: uppercase; margin-top: 2px; }
      .sc-wordmark-lg .sc-logo-wrap { width: 48px; height: 48px; }
      .sc-wordmark-lg .sc-logo-img { width: 48px; height: 48px; }
      .sc-wordmark-lg .sc-logo-name { font-size: 22px; }
      .sc-wordmark-lg .sc-logo-tag { font-size: 10px; }

      /* ─── Top bar ─── */
      .sc-topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 60; transition: background 0.4s, border-color 0.4s, box-shadow 0.4s; }
      .sc-topbar-glass {
        background: rgba(250, 250, 245, 0.85);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid var(--sc-line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 42, 0.06);
      }
      .sc-topbar-solid {
        background: rgba(251, 251, 248, 0.92);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid var(--sc-line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 42, 0.06);
      }
      .sc-topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 22px; flex-wrap: nowrap; min-width: 0; }
      @media (min-width: 720px) { .sc-topbar-inner { padding: 16px 36px; } }

      .sc-nav { display: flex; align-items: center; gap: 18px; font-size: 14px; min-width: 0; }
      @media (min-width: 720px) { .sc-nav { gap: 30px; } }
      @media (max-width: 960px) {
        .sc-wordmark .sc-logo-tag { display: none; }      /* drop the "DATA QUALITY PLATFORM" subtitle below tablet */
      }
      @media (max-width: 620px) {
        .sc-nav > a { display: none; }                    /* hide Modules/Workflow text links on phones */
        .sc-nav-cta { padding: 8px 14px; font-size: 12.5px; }
        .sc-nav-cta .sc-arrow { display: none; }
        .sc-nav-dd-trigger { font-size: 13px; }
      }
      .sc-nav > a { text-decoration: none; transition: color 0.25s; font-weight: 450; color: var(--sc-ink-2); }
      .sc-nav > a:hover { color: var(--sc-brand); }
      .sc-nav-cta {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 10px 18px;
        background: var(--sc-ink);
        color: #FFFFFF !important;
        border: 1px solid transparent;
        border-radius: 999px;
        font-weight: 500; font-size: 13.5px;
        text-decoration: none;
        transition: transform 0.25s, background 0.25s, box-shadow 0.25s;
      }
      .sc-nav-cta:hover { transform: translateY(-1px); background: var(--sc-brand); }
      .sc-topbar-solid .sc-nav-cta { box-shadow: 0 6px 20px -10px rgba(10, 15, 28, 0.5); }
      .sc-topbar-solid .sc-nav-cta:hover { background: var(--sc-blue); box-shadow: 0 12px 30px -10px rgba(58, 90, 148, 0.4); }
      .sc-arrow { transition: transform 0.25s; }
      .sc-nav-cta:hover .sc-arrow { transform: translateX(3px); }

      /* Solutions dropdown */
      .sc-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .sc-nav-dd-trigger {
        display: inline-flex; align-items: center; gap: 6px;
        background: transparent; border: none; padding: 0;
        font: inherit; font-weight: 450; cursor: pointer;
        color: var(--sc-ink-2); transition: color 0.25s;
      }
      .sc-nav-dd-trigger:hover { color: var(--sc-brand); }
      .sc-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .sc-nav-dd-caret-open { transform: rotate(180deg); }
      .sc-nav-dd-menu {
        position: absolute;
        top: calc(100% - 2px); left: 50%;
        transform: translateX(-50%) translateY(-6px);
        width: min(900px, calc(100vw - 32px));
        opacity: 0; visibility: hidden;
        transition:
          opacity 0.28s cubic-bezier(0.19, 1, 0.22, 1),
          transform 0.28s cubic-bezier(0.19, 1, 0.22, 1),
          visibility 0s 0.28s;
        z-index: 60;
      }
      .sc-nav-dd-menu-open {
        opacity: 1; visibility: visible;
        transform: translateX(-50%) translateY(0);
        transition:
          opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          transform 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          visibility 0s;
      }
      .sc-nav-dd-inner {
        margin-top: 14px;
        background: #FFFFFF;
        border: 1px solid var(--sc-line);
        border-radius: 18px;
        padding: 24px;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 30px 80px -20px rgba(15, 23, 41, 0.22),
          0 8px 20px -8px rgba(15, 23, 41, 0.12);
      }
      .sc-nav-dd-head {
        display: flex; justify-content: space-between; align-items: baseline;
        padding: 0 4px 14px;
        border-bottom: 1px solid var(--sc-line);
        margin-bottom: 12px;
      }
      .sc-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--sc-brand); font-weight: 600; }
      .sc-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--sc-ink-4); font-weight: 400; }
      .sc-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .sc-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .sc-nav-dd-feature {
        display: flex; flex-direction: column; gap: 8px;
        padding: 18px 18px 16px; border-radius: 12px;
        text-decoration: none; color: #FFFFFF;
        background:
          radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%),
          linear-gradient(155deg, var(--sc-brand) 0%, var(--sc-navy-cta) 60%, var(--sc-navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 12px 30px -14px rgba(15, 23, 41, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        position: relative; overflow: hidden;
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .sc-nav-dd-feature:hover { transform: translateY(-2px); box-shadow: 0 18px 40px -16px rgba(42, 68, 119, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12); }
      .sc-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .sc-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .sc-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .sc-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .sc-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.015em; color: #FFFFFF; margin: 4px 0 0; line-height: 1.15; }
      .sc-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .sc-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }
      .sc-nav-dd-item {
        display: flex; flex-direction: column; gap: 4px;
        padding: 12px 14px; border-radius: 10px;
        text-decoration: none; color: var(--sc-ink);
        transition: background 0.25s cubic-bezier(0.19, 1, 0.22, 1), transform 0.25s;
      }
      .sc-nav-dd-item:hover { background: var(--sc-bg-2); transform: translateX(2px); }
      .sc-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; letter-spacing: -0.01em; color: var(--sc-ink); }
      .sc-nav-dd-item-blurb { font-family: var(--font-sans), sans-serif; font-size: 12.5px; line-height: 1.45; color: var(--sc-ink-4); }
      .sc-nav-dd-item:hover .sc-nav-dd-item-name { color: var(--sc-brand); }
      @media (max-width: 720px) {
        .sc-nav-dd-menu { width: min(440px, calc(100vw - 24px)); left: auto; right: 0; transform: translateX(0) translateY(-6px); }
        .sc-nav-dd-menu-open { transform: translateX(0); }
        .sc-nav-dd-inner { padding: 18px; max-height: calc(100vh - 96px); overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
        .sc-nav-dd-split { grid-template-columns: 1fr; gap: 12px; }
        .sc-nav-dd-grid {
          grid-template-columns: 1fr;
          gap: 2px;
          max-height: 260px;     /* ≈ 3 item rows (each ~80px + gap) — the rest scrolls */
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding-right: 4px;
          scrollbar-width: thin;
        }
        .sc-nav-dd-feature { padding: 14px 14px 12px; }
      }

      /* ─── CTA ─── */
      .sc-cta { padding: 48px 0 100px; background: var(--sc-bg); }
      .sc-cta-card {
        position: relative;
        padding: 44px 48px;
        border-radius: 22px;
        background: var(--sc-brand);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 30px 70px -26px rgba(42, 68, 119, 0.5);
        overflow: hidden;
      }
      .sc-cta-card > * { position: relative; z-index: 2; }
      .sc-cta-rings { position: absolute; top: 50%; right: -5%; transform: translateY(-50%); width: 340px; height: 340px; z-index: 1; pointer-events: none; }
      .sc-cta-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; border: 2.5px solid rgba(255, 255, 255, 0.15); transform: translate(-50%, -50%); }
      .sc-cta-ring-1 { width: 100%; height: 100%; border-width: 2px; border-color: rgba(255, 255, 255, 0.22); animation: sc-ripple 3s ease-in-out infinite; }
      .sc-cta-ring-2 { width: 72%; height: 72%; border-width: 2.5px; border-color: rgba(255, 255, 255, 0.28); animation: sc-ripple 3s ease-in-out infinite 0.4s; }
      .sc-cta-ring-3 { width: 46%; height: 46%; border-width: 3px; border-color: rgba(255, 255, 255, 0.35); animation: sc-ripple 3s ease-in-out infinite 0.8s; }
      .sc-cta-ring-4 { width: 22%; height: 22%; border: none; background: rgba(255, 255, 255, 0.25); animation: sc-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes sc-ripple { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; } }
      @keyframes sc-ripple-core { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; } }
      @media (prefers-reduced-motion: reduce) { .sc-cta-ring, .sc-cta-ring-4 { animation: none !important; } }
      .sc-cta-content { display: flex; flex-direction: column; gap: 6px; max-width: 480px; }
      .sc-cta-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: clamp(26px, 3vw, 36px); line-height: 1.12; letter-spacing: -0.02em; margin: 0; color: #FFFFFF; }
      .sc-cta-em { font-family: var(--font-display), sans-serif; font-style: italic; font-weight: 600; color: rgba(255, 255, 255, 0.85); }
      .sc-cta-sub { font-size: 14.5px; color: rgba(255, 255, 255, 0.86); margin: 0 0 18px; line-height: 1.55; max-width: 42ch; }
      .sc-cta-buttons { display: flex; gap: 10px; }
      .sc-cta-pill {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 13px 22px;
        border-radius: 100px;
        background: #FFFFFF;
        color: var(--sc-brand);
        font-family: var(--font-sans), sans-serif;
        font-size: 14px; font-weight: 600;
        text-decoration: none;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        white-space: nowrap;
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3);
      }
      .sc-cta-pill:hover { background: #FAFAF5; transform: translateY(-2px); box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4); }
      .sc-cta-pill-arrow {
        display: flex; align-items: center; justify-content: center;
        width: 24px; height: 24px;
        border-radius: 50%;
        background: var(--sc-brand);
        color: #FFFFFF;
        font-size: 13px;
        transition: background 0.25s, transform 0.25s;
      }
      .sc-cta-pill:hover .sc-cta-pill-arrow { background: var(--sc-navy-cta); transform: translateX(2px); }
      @media (max-width: 780px) {
        .sc-cta { padding: 0 0 72px; }
        .sc-cta-card { padding: 36px 32px; border-radius: 18px; }
        .sc-cta-rings { width: 260px; height: 260px; right: -8%; }
        .sc-cta-h { font-size: clamp(22px, 6vw, 30px); }
        .sc-cta-sub { font-size: 13px; margin-bottom: 16px; }
        .sc-cta-buttons { flex-wrap: wrap; }
        .sc-cta-pill { font-size: 12.5px; padding: 10px 16px; }
      }
      @media (max-width: 480px) {
        .sc-cta { padding: 0 0 56px; }
        .sc-cta-card { padding: 28px 22px; border-radius: 16px; }
        .sc-cta-rings { width: 200px; height: 200px; right: -12%; top: 60%; }
        .sc-cta-buttons { flex-direction: column; }
        .sc-cta-pill { width: 100%; justify-content: center; }
      }

      /* ─── Footer ─── */
      .sc-footer {
        position: relative;
        background: linear-gradient(180deg, var(--sc-navy-deep) 0%, var(--sc-navy) 55%, #0A1420 100%);
        color: #FFFFFF;
        padding: 96px 0 0;
        margin-top: 100px;
        overflow: hidden;
      }
      .sc-footer::after {
        content: "";
        position: absolute; top: 0; left: 50%;
        transform: translateX(-50%);
        width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .sc-footer > .sc-container { position: relative; z-index: 1; }
      .sc-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .sc-footer-top { display: grid; grid-template-columns: minmax(260px, 1.2fr) auto; gap: 64px; align-items: start; justify-content: space-between; }
      .sc-footer-top > div:first-child { display: flex; flex-direction: column; gap: 20px; }
      .sc-footer-top .sc-logo-name { color: #FFFFFF; }
      .sc-footer-top .sc-logo-tag { color: rgba(160, 196, 240, 0.65); }
      .sc-footer-tag { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .sc-footer-cols { display: grid; grid-template-columns: repeat(2, minmax(160px, max-content)); gap: 80px; }
      .sc-foot-h { font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; margin-bottom: 18px; text-transform: uppercase; }
      .sc-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .sc-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .sc-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .sc-footer-watermark {
        display: block;
        font-family: var(--font-display), sans-serif;
        font-weight: 800;
        font-size: clamp(64px, 14.5vw, 180px);
        letter-spacing: -0.028em;
        line-height: 1;
        text-align: center;
        margin: 56px 0 0;
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(160, 196, 240, 0.34);
        user-select: none; pointer-events: none;
        white-space: nowrap; overflow: hidden;
      }
      .sc-footer-bottom { display: flex; justify-content: center; align-items: center; padding: 22px 0 28px; margin-top: -10px; }
      .sc-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .sc-footer-top { grid-template-columns: 1fr; gap: 40px; justify-content: flex-start; } .sc-footer-cols { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; } }
      @media (max-width: 600px) {
        .sc-footer { padding: 56px 0 0; margin-top: 48px; }
        .sc-footer-cols { grid-template-columns: 1fr; gap: 22px; }
        .sc-footer-watermark { margin: 20px 0 0; font-size: clamp(36px, 13vw, 96px); -webkit-text-stroke-width: 1px; }
      }
      @media (max-width: 420px) {
        .sc-footer-watermark { font-size: clamp(28px, 12vw, 68px); }
      }
    `}</style>
  )
}

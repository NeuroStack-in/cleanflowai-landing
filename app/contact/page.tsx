"use client"

import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { motion, useReducedMotion } from "framer-motion"
import { useRef, useState, type FormEvent } from "react"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"
import { trackEvent } from "@/lib/analytics"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

export default function ContactPage() {
  const reduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const rightRef = useRef<HTMLElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Send failed")
      trackEvent({ action: "generate_lead", category: "engagement", label: "demo_request_form" })
      setSubmitted(true)
      requestAnimationFrame(() => {
        rightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      })
    } catch {
      setError("Something went wrong — please try again or email us directly.")
    } finally {
      setLoading(false)
    }
  }

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 22 },
    animate: reduced ? {} : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  })

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} cx-root`}>
      <SiteNav />

      <main className="cx-main">
        <div className="cx-grid">
          {/* Left — editorial copy */}
          <motion.aside className="cx-left" {...rise(0.05)}>
            <h1 className="cx-h1">
              Bring us your <span className="cx-h1-em">messiest data</span>.
            </h1>
            <p className="cx-lede">
              Tell us about your data. We&rsquo;ll walk you through what
              CleanFlowAI can do for your team — a hands-on demonstration
              against a sample of your own payload, shaped to the way your
              team actually works.
            </p>

            <div className="cx-pts">
              <div className="cx-pt">
                <span className="cx-pt-dot" />
                <div>
                  <b>A walkthrough built around you</b>
                  <span>Bring a sample of your data. Our team will run it through CleanFlowAI live, with your stewards in the room — every step explained in plain language.</span>
                </div>
              </div>
              <div className="cx-pt">
                <span className="cx-pt-dot" />
                <div>
                  <b>Tangible outcomes, not slides</b>
                  <span>You walk away with a clear picture of where your data stands today and the wins your team can land first — delivered in a format you can share internally.</span>
                </div>
              </div>
              <div className="cx-pt">
                <span className="cx-pt-dot" />
                <div>
                  <b>Your data stays your data</b>
                  <span>Anything you share is handled privately, used only for the engagement, and removed when we&rsquo;re done. No surprises, no exposure.</span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Right — form card */}
          <motion.section ref={rightRef} className={`cx-right${submitted ? " cx-right-done" : ""}`} {...rise(0.15)}>
            {!submitted ? (
              <form className="cx-form" onSubmit={handleSubmit}>
                <div className="cx-form-head">
                  <h2 className="cx-form-h">Request your demo</h2>
                  <p className="cx-form-sub">
                    Tell us a bit about your team and we&rsquo;ll set up a tailored walkthrough — focused on the outcomes that matter most for your stewards, your stack, and your priorities.
                  </p>
                </div>

                <fieldset className="cx-group">
                  <legend className="cx-group-legend">Your details</legend>
                  <div className="cx-row">
                    <div className="cx-field">
                      <label htmlFor="first">First name</label>
                      <input id="first" name="first" type="text" required placeholder="Sarah" autoComplete="given-name" />
                    </div>
                    <div className="cx-field">
                      <label htmlFor="last">Last name</label>
                      <input id="last" name="last" type="text" required placeholder="Mitchell" autoComplete="family-name" />
                    </div>
                  </div>

                  <div className="cx-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required placeholder="sarah.mitchell@company.com" autoComplete="email" />
                  </div>
                </fieldset>

                <fieldset className="cx-group">
                  <legend className="cx-group-legend">About your company</legend>
                  <div className="cx-row">
                    <div className="cx-field">
                      <label htmlFor="company">Company</label>
                      <input id="company" name="company" type="text" required placeholder="Acme Industries" autoComplete="organization" />
                    </div>
                    <div className="cx-field">
                      <label htmlFor="role">Your role</label>
                      <select id="role" name="role" required defaultValue="">
                        <option value="" disabled>Select one</option>
                        <option value="data-ops">Data ops / analytics</option>
                        <option value="eng">Engineering</option>
                        <option value="finance">Finance / accounting</option>
                        <option value="leadership">Leadership / executive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="cx-field">
                    <label htmlFor="volume">Approximate data volume</label>
                    <select id="volume" name="volume" defaultValue="">
                      <option value="" disabled>Choose range</option>
                      <option value="small">&lt; 100K records / month</option>
                      <option value="medium">100K – 1M records / month</option>
                      <option value="large">1M – 10M records / month</option>
                      <option value="xlarge">&gt; 10M records / month</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset className="cx-group">
                  <legend className="cx-group-legend">Your requirement</legend>
                  <div className="cx-field">
                    <label htmlFor="message">Describe your data challenge</label>
                    <textarea id="message" name="message" rows={4} placeholder="Briefly outline your current data sources, destinations, and the outcomes you're looking to achieve." />
                  </div>
                </fieldset>

                <label className="cx-consent">
                  <input type="checkbox" required />
                  <span>I consent to CleanFlowAI processing this information to respond to my enquiry, in line with our privacy commitments.</span>
                </label>

                {error && (
                  <p className="cx-form-error">{error}</p>
                )}

                <div className="cx-actions">
                  <button type="submit" className="cx-submit" disabled={loading}>
                    <span>{loading ? "Sending…" : "Request demo"}</span>
                    {!loading && (
                      <svg viewBox="0 0 24 12" width="22" height="11" aria-hidden>
                        <path d="M0 6 H 22 M 16 1 L 22 6 L 16 11" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                className="cx-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="cx-success-mark" aria-hidden>
                  <svg viewBox="0 0 72 72" width="72" height="72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <circle className="cx-tick-ring" cx="36" cy="36" r="30" strokeWidth="2" />
                    <path className="cx-tick-path" d="M22 37 L 32 47 L 50 27" strokeWidth="3.4" />
                  </svg>
                </div>
                <h2 className="cx-success-h">Request received</h2>
                <p className="cx-success-sub">
                  Thanks — our team will review your submission and reach you out.
                </p>
              </motion.div>
            )}
          </motion.section>
        </div>

      </main>

      <SiteFooter />
      <SiteChromeStyles />
      <StyleBlock />
    </div>
  )
}

function StyleBlock() {
  return (
    <style>{`
      /* ===== CleanFlowAI · Contact page — editorial split layout ===== */

      .cx-root {
        /* Tokens aligned with the landing page */
        --bg:        #FAFAF5;
        --bg-2:      #F5F3EC;
        --line:      rgba(15, 23, 41, 0.08);
        --line-2:    rgba(15, 23, 41, 0.14);
        --ink:       #0F1729;
        --ink-2:     #1E293B;
        --ink-3:     #475569;
        --ink-4:     #6B6F78;
        --brand:     #2A4477;
        --navy:      #141E30;
        --navy-cta:  #1E2E52;
        --navy-mid:  #3A5A94;
        --destructive: #DC2626;

        background: var(--bg);
        color: var(--ink);
        font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      .cx-root * { box-sizing: border-box; }

      /* Navbar */
      .cx-nav {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 40;
        transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
        background: rgba(250, 250, 245, 0.72);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid transparent;
      }
      .cx-nav-solid {
        background: rgba(250, 250, 245, 0.94);
        border-bottom-color: var(--line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 41, 0.06);
      }
      .cx-nav-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 16px 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .cx-wordmark {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: var(--ink);
      }
      .cx-logo-wrap {
        display: inline-flex;
        width: 38px;
        height: 38px;
      }
      .cx-logo-wrap img { width: 38px; height: 38px; }
      .cx-logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }
      .cx-logo-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 17px;
        letter-spacing: -0.01em;
      }
      .cx-logo-tag {
        font-family: var(--font-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        color: var(--ink-3);
        text-transform: uppercase;
        margin-top: 2px;
      }
      .cx-back {
        font-family: var(--font-sans), sans-serif;
        font-size: 13.5px;
        color: var(--ink-2);
        text-decoration: none;
        transition: color 0.25s;
      }
      .cx-back:hover { color: var(--brand); }

      /* Nav links container */
      .cx-nav-links {
        display: flex;
        align-items: center;
        gap: 28px;
        font-size: 14px;
      }
      .cx-nav-links > a {
        color: var(--ink-2);
        text-decoration: none;
        transition: color 0.25s;
        font-weight: 450;
      }
      .cx-nav-links > a:hover { color: var(--brand); }

      /* Platform dropdown */
      .cx-nav-dd {
        position: relative;
        padding: 16px 0;
        margin: -16px 0;
      }
      .cx-nav-dd-trigger {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        border: none;
        padding: 0;
        font: inherit;
        font-size: 14px;
        font-weight: 450;
        cursor: pointer;
        color: var(--ink-2);
        transition: color 0.25s;
      }
      .cx-nav-dd-trigger:hover { color: var(--brand); }
      .cx-nav-dd-caret {
        opacity: 0.7;
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .cx-nav-dd-caret-open { transform: rotate(180deg); }
      .cx-nav-dd-menu {
        position: absolute;
        top: calc(100% - 2px);
        left: 50%;
        transform: translateX(-50%) translateY(-6px);
        width: min(900px, calc(100vw - 32px));
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.28s cubic-bezier(0.19, 1, 0.22, 1),
          transform 0.28s cubic-bezier(0.19, 1, 0.22, 1),
          visibility 0s 0.28s;
        z-index: 60;
      }
      .cx-nav-dd-menu-open {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
        transition:
          opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          transform 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          visibility 0s;
      }
      .cx-nav-dd-inner-menu {
        margin-top: 14px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 24px;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 30px 80px -20px rgba(15, 23, 41, 0.22),
          0 8px 20px -8px rgba(15, 23, 41, 0.12);
      }
      .cx-nav-dd-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0 4px 14px;
        border-bottom: 1px solid var(--line);
        margin-bottom: 12px;
      }
      .cx-nav-dd-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 600;
      }
      .cx-nav-dd-hint {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-size: 12.5px;
        color: var(--ink-4);
        font-weight: 400;
      }
      .cx-nav-dd-split {
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 18px;
      }
      .cx-nav-dd-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
      }
      .cx-nav-dd-feature {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 18px 18px 16px;
        border-radius: 12px;
        text-decoration: none;
        color: #FFFFFF;
        background:
          radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 12px 30px -14px rgba(15, 23, 41, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .cx-nav-dd-feature:hover { transform: translateY(-2px); box-shadow: 0 18px 40px -16px rgba(42, 68, 119, 0.55); }
      .cx-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .cx-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .cx-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .cx-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .cx-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.015em; color: #FFFFFF; margin: 4px 0 0; line-height: 1.15; }
      .cx-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .cx-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }
      @media (max-width: 720px) {
        .cx-nav-dd-split { grid-template-columns: 1fr; gap: 12px; }
        .cx-nav-dd-feature { padding: 14px 14px 12px; }
      }
      .cx-nav-dd-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px 14px;
        border-radius: 10px;
        text-decoration: none;
        color: var(--ink);
        transition: background 0.25s cubic-bezier(0.19, 1, 0.22, 1), transform 0.25s;
      }
      .cx-nav-dd-item:hover {
        background: var(--bg-2);
        transform: translateX(2px);
      }
      .cx-nav-dd-item-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 14.5px;
        letter-spacing: -0.01em;
        color: var(--ink);
        transition: color 0.25s;
      }
      .cx-nav-dd-item-blurb {
        font-family: var(--font-sans), sans-serif;
        font-size: 12.5px;
        line-height: 1.45;
        color: var(--ink-4);
      }
      .cx-nav-dd-item:hover .cx-nav-dd-item-name { color: var(--brand); }
      @media (max-width: 720px) {
        .cx-nav-dd-menu { width: min(420px, calc(100vw - 24px)); }
        .cx-nav-dd-grid { grid-template-columns: 1fr; }
        .cx-nav-dd-inner-menu { padding: 18px; }
        .cx-nav-links { gap: 18px; font-size: 13px; }
      }

      /* Main grid */
      .cx-main {
        padding: 120px 36px 80px;
        max-width: 1280px;
        margin: 0 auto;
      }
      .cx-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 72px;
        align-items: start;
      }
      @media (max-width: 900px) {
        .cx-main { padding: 96px 22px 60px; }
        .cx-grid { grid-template-columns: 1fr; gap: 48px; }
      }

      /* Left column — editorial copy */
      .cx-left {
        position: sticky;
        top: 110px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      @media (max-width: 900px) {
        .cx-left { position: static; }
      }
      .cx-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 600;
      }
      .cx-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(38px, 5vw, 64px);
        line-height: 1.02;
        letter-spacing: -0.03em;
        color: var(--ink);
        margin: 0;
        max-width: 14ch;
      }
      .cx-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 600;
        color: var(--brand);
        letter-spacing: -0.022em;
      }
      .cx-lede {
        font-size: 17px;
        line-height: 1.6;
        color: var(--ink-3);
        max-width: 44ch;
        margin: 4px 0 0;
      }

      /* 3 proof points */
      .cx-pts {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 22px 24px;
        background: var(--bg-2);
        border: 1px solid var(--line);
        border-radius: 14px;
        margin-top: 8px;
      }
      .cx-pt {
        display: flex;
        align-items: flex-start;
        gap: 14px;
      }
      .cx-pt-dot {
        flex-shrink: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--brand);
        margin-top: 6px;
        box-shadow: 0 0 0 4px rgba(42, 68, 119, 0.1);
      }
      .cx-pt > div {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .cx-pt b {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 14.5px;
        color: var(--ink);
        letter-spacing: -0.005em;
      }
      .cx-pt span {
        font-size: 13.5px;
        color: var(--ink-4);
        line-height: 1.45;
      }
      .cx-trust {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        padding-top: 8px;
        border-top: 1px dashed var(--line);
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ink-4);
        text-transform: uppercase;
      }

      /* Right column — BLUE form card */
      .cx-right {
        position: relative;
        color: #FFFFFF;
        background:
          radial-gradient(ellipse 420px 280px at 10% 0%, rgba(90, 127, 181, 0.45) 0%, transparent 62%),
          linear-gradient(160deg, var(--brand) 0%, var(--navy-cta) 55%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.24);
        border-radius: 20px;
        padding: 40px 40px 34px;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.1) inset,
          0 40px 90px -28px rgba(15, 23, 41, 0.45),
          0 12px 28px -12px rgba(42, 68, 119, 0.45);
        min-height: 560px;
        overflow: hidden;
      }
      .cx-right-done {
        min-height: 0;
        padding: 64px 40px 68px;
      }
      .cx-right-done .cx-success { padding: 0; }
      .cx-right::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, rgba(160, 196, 240, 0.2) 0%, #a0c4f0 50%, rgba(160, 196, 240, 0.2) 100%);
      }
      @media (max-width: 540px) {
        .cx-right { padding: 30px 24px 26px; border-radius: 16px; }
      }

      .cx-form-head {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 28px;
        padding-bottom: 22px;
        border-bottom: 1px solid rgba(160, 196, 240, 0.18);
      }
      .cx-form-step {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: #a0c4f0;
        font-weight: 700;
        text-transform: uppercase;
      }
      .cx-form-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 26px;
        letter-spacing: -0.02em;
        margin: 2px 0 4px;
        color: #FFFFFF;
      }
      .cx-form-sub {
        font-size: 14px;
        color: rgba(200, 215, 240, 0.78);
        margin: 0;
        line-height: 1.55;
      }

      .cx-form {
        display: flex;
        flex-direction: column;
        gap: 22px;
      }
      .cx-group {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin: 0;
        padding: 0;
        border: none;
      }
      .cx-group-legend {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(200, 215, 240, 0.72);
        font-weight: 700;
        padding: 0 0 4px;
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .cx-group-legend::after {
        content: "";
        flex: 1;
        height: 1px;
        background: rgba(160, 196, 240, 0.18);
        margin-left: 10px;
        min-width: 40px;
      }
      .cx-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      @media (max-width: 540px) {
        .cx-row { grid-template-columns: 1fr; }
      }
      .cx-field {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .cx-field label {
        font-family: var(--font-sans), sans-serif;
        font-size: 13px;
        color: rgba(230, 240, 255, 0.9);
        font-weight: 500;
        letter-spacing: -0.005em;
      }
      .cx-field input,
      .cx-field select,
      .cx-field textarea {
        font-family: var(--font-sans), sans-serif;
        font-size: 14.5px;
        color: #FFFFFF;
        background: rgba(10, 18, 36, 0.45);
        border: 1px solid rgba(160, 196, 240, 0.28);
        border-radius: 10px;
        padding: 13px 15px;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        width: 100%;
      }
      .cx-field textarea {
        resize: vertical;
        min-height: 110px;
        line-height: 1.55;
      }
      .cx-field input::placeholder,
      .cx-field textarea::placeholder {
        color: rgba(200, 215, 240, 0.45);
      }
      .cx-field input:hover,
      .cx-field select:hover,
      .cx-field textarea:hover {
        border-color: rgba(160, 196, 240, 0.5);
      }
      .cx-field input:focus,
      .cx-field select:focus,
      .cx-field textarea:focus {
        border-color: #a0c4f0;
        background: rgba(10, 18, 36, 0.6);
        box-shadow: 0 0 0 4px rgba(160, 196, 240, 0.14);
      }
      .cx-field select {
        appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1 L 6 6 L 11 1' fill='none' stroke='%23a0c4f0' stroke-width='1.6' stroke-linecap='round'/></svg>");
        background-repeat: no-repeat;
        background-position: right 14px center;
        background-size: 12px;
        padding-right: 42px;
        cursor: pointer;
      }
      .cx-field select option { background: var(--navy-deep); color: #FFFFFF; }
      .cx-field-hint {
        font-size: 12px;
        color: rgba(200, 215, 240, 0.62);
        line-height: 1.45;
        margin-top: 2px;
      }

      .cx-consent {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        font-size: 13px;
        color: rgba(220, 232, 250, 0.78);
        line-height: 1.55;
        padding: 14px 16px;
        background: rgba(10, 18, 36, 0.35);
        border: 1px solid rgba(160, 196, 240, 0.18);
        border-radius: 10px;
      }
      .cx-consent a {
        color: #a0c4f0;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 2px;
      }
      .cx-consent input[type="checkbox"] {
        width: 16px;
        height: 16px;
        margin-top: 2px;
        accent-color: #a0c4f0;
        cursor: pointer;
        flex-shrink: 0;
      }

      /* Actions row */
      .cx-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-top: 4px;
        flex-wrap: wrap;
      }
      .cx-actions-note {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.06em;
        color: rgba(200, 215, 240, 0.6);
      }
      .cx-actions-note svg {
        color: #a0c4f0;
      }

      /* Submit button — light pill against blue card */
      .cx-submit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 15px 28px;
        background: #FFFFFF;
        color: var(--brand);
        font-family: var(--font-sans), sans-serif;
        font-size: 14.5px;
        font-weight: 600;
        letter-spacing: -0.005em;
        border: none;
        border-radius: 999px;
        cursor: pointer;
        box-shadow:
          0 10px 24px -10px rgba(10, 18, 36, 0.6),
          inset 0 1px 0 rgba(255, 255, 255, 0.4);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                    box-shadow 0.25s ease,
                    background 0.25s ease;
      }
      .cx-submit:hover {
        transform: translateY(-1px);
        background: #FAFAF5;
        box-shadow:
          0 16px 30px -12px rgba(10, 18, 36, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.5);
      }
      .cx-submit svg { transition: transform 0.25s; }
      .cx-submit:hover svg { transform: translateX(3px); }
      .cx-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
      .cx-form-error { font-size: 13px; color: #fca5a5; background: rgba(220,38,38,0.15); border: 1px solid rgba(220,38,38,0.3); border-radius: 8px; padding: 10px 14px; margin: 0; }

      .cx-alt {
        text-align: center;
        font-size: 12.5px;
        color: var(--ink-4);
        margin: 6px 0 0;
      }
      .cx-alt a {
        color: var(--brand);
        text-decoration: none;
        font-weight: 500;
      }
      .cx-alt a:hover { text-decoration: underline; }

      /* Success state */
      .cx-success {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 16px;
        padding: 40px 20px 24px;
      }
      .cx-success-mark {
        color: #a0c4f0;
        margin-bottom: 8px;
        filter: drop-shadow(0 0 18px rgba(160, 196, 240, 0.4));
      }
      .cx-tick-ring {
        stroke-dasharray: 189;
        stroke-dashoffset: 189;
        animation: cx-tick-ring 0.7s cubic-bezier(0.65, 0, 0.45, 1) 0.05s forwards;
        transform-origin: 36px 36px;
        transform: rotate(-90deg);
      }
      .cx-tick-path {
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: cx-tick-path 0.45s cubic-bezier(0.65, 0, 0.45, 1) 0.55s forwards;
      }
      @keyframes cx-tick-ring {
        to { stroke-dashoffset: 0; }
      }
      @keyframes cx-tick-path {
        to { stroke-dashoffset: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .cx-tick-ring, .cx-tick-path { animation: none; stroke-dashoffset: 0; }
      }
      .cx-success-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 28px;
        letter-spacing: -0.02em;
        color: #FFFFFF;
        margin: 0;
      }
      .cx-success-sub {
        font-size: 15px;
        color: rgba(220, 232, 248, 0.82);
        max-width: 36ch;
        line-height: 1.55;
        margin: 0;
      }

      /* Footer (navy + stencil watermark) */
      .cx-footer {
        position: relative;
        background: linear-gradient(180deg, var(--navy) 0%, #141E30 55%, #0A1420 100%);
        color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden;
      }
      .cx-footer::after {
        content: ""; position: absolute; top: 0; left: 50%;
        transform: translateX(-50%); width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .cx-footer-container {
        position: relative; z-index: 1;
        max-width: 1280px; margin: 0 auto; padding: 0 36px;
      }
      .cx-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .cx-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .cx-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .cx-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .cx-footer-brand-logo { display: inline-flex; width: 40px; height: 40px; }
      .cx-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .cx-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .cx-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .cx-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .cx-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .cx-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .cx-foot-h {
        font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em;
        color: #a0c4f0; font-weight: 700; margin-bottom: 18px;
        text-transform: uppercase;
      }
      .cx-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .cx-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .cx-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .cx-footer-watermark {
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
      .cx-footer-bottom {
        position: relative; z-index: 1;
        display: flex; justify-content: center; align-items: center;
        padding: 22px 0 28px; margin-top: -10px;
      }
      .cx-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .cx-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .cx-footer { padding: 72px 0 0; margin-top: 60px; }
        .cx-footer-container { padding: 0 22px; }
        .cx-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
        .cx-footer-watermark { margin: 28px 0 0; }
      }
    `}</style>
  )
}

"use client"

import Link from "next/link"
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

const FEATURES = [
  { title: "100% Protection", body: "Files stored on immutable blockchain ensure 100% protection against tampering and unauthorized access." },
  { title: "Encryption", body: "Registration process secures data with encrypted OTPs, ensuring safe access to sensitive information." },
  { title: "Hack-proof", body: "Your data is hack-proof, secured with encryption and hashing techniques for utmost protection." },
  { title: "Flexible Integration", body: "We seamlessly integrate third-party services/APIs as required for enhanced functionality and flexibility." },
  { title: "Audit Features", body: "Transaction history and audit features facilitate comprehensive backtracking for enhanced transparency & accountability." },
  { title: "Proof of Origin", body: "We prevent fraudulent activities using the proof-of-origin technique for enhanced security measures." },
  { title: "Compliance Assurance", body: "Unwaveringly reliable, our system ensures adherence to local regulations, guaranteeing consistent compliance with established rules and standards." },
  { title: "Digitization", body: "Digitized process speeds up document issuance and retrieval, removing paperwork for improved efficiency." },
]

const USERS = [
  {
    title: "Finance, Banking & Insurance",
    body: "Sensitive document handling, including multi-step authentication, regulatory compliance, secured encrypted transactions, digital identity verification (KYC), and asset management — seamlessly integrated with CertVault for enhanced security and efficiency.",
  },
  {
    title: "Education, Corporate Training, Online Learning",
    body: "CertVault allows educational institutions and training providers to securely distribute digital certificates upon course completion. Recipients can securely access, download, and share anytime as needed.",
  },
  {
    title: "Legal and Statutory",
    body: "CertVault can be considered a safeguard for legislative records, strengthening digital identity protection and securing biometric data, ensuring comprehensive security and compliance measures.",
  },
  {
    title: "Telecom and E-Commerce",
    body: "Telecom businesses benefit from CertVault for maintaining immutable contracts and managing royalties/assets, while e-commerce can utilize it for product identification and warranty tracking.",
  },
]

export default function CertVaultPage() {
  return (
    <main className={`pp-root ${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <section className="pp-hero">
        <div className="pp-container">
          <span className="pp-eyebrow">PRODUCT · CERTVAULT</span>
          <h1 className="pp-h1">
            Unwavering <span className="pp-h1-em">Digital Protection</span>
          </h1>
          <p className="pp-lead">
            Your one-stop solution for securely storing &amp; accessing your digital
            documents anytime, anywhere — powered by blockchain.
          </p>
        </div>
      </section>

      <section className="pp-intro">
        <div className="pp-container pp-intro-grid">
          <div>
            <h2 className="pp-h2">
              A new standard for <span className="pp-h2-em">document trust</span>.
            </h2>
          </div>
          <p className="pp-intro-body">
            CertVault revolutionizes document management with blockchain technology,
            offering unparalleled advantages. By harnessing blockchain&rsquo;s immutable
            ledger, it ensures tamper-proof records and enhanced transparency. This
            innovative approach not only digitizes manual processes but also fortifies
            data security and privacy, setting a new standard in document management
            solutions.
          </p>
        </div>
      </section>

      <section className="pp-features">
        <div className="pp-container">
          <div className="pp-section-head">
            <span className="pp-tag">CAPABILITIES</span>
            <h2 className="pp-h2">
              Built for <span className="pp-h2-em">regulated environments</span>.
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
              Who benefits from <span className="pp-h2-em">CertVault</span>?
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
              Ready to <span className="pp-cta-em">secure your documents</span>?
            </h2>
            <p className="pp-cta-sub">
              Talk to our team — see how CertVault can replace paper-based and
              centrally-stored workflows in your organization.
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

        /* Hero */
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
          font-style: italic;
          font-weight: 400;
          color: var(--pp-brand);
        }
        .pp-lead {
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.6;
          color: var(--pp-ink-3);
          max-width: 640px;
          margin-bottom: 30px;
        }
        .pp-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .pp-cta-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 24px;
          background: var(--pp-ink); color: #FFFFFF;
          border-radius: 999px;
          font-weight: 500; font-size: 14.5px;
          text-decoration: none;
          transition: transform 0.25s, background 0.25s;
        }
        .pp-cta-pill:hover { transform: translateY(-1px); background: var(--pp-brand); }
        .pp-cta-pill-arrow { transition: transform 0.25s; }
        .pp-cta-pill:hover .pp-cta-pill-arrow { transform: translateX(3px); }

        /* Intro */
        .pp-intro { padding: 70px 0; border-top: 1px solid var(--pp-line); }
        .pp-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 60px;
          align-items: start;
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
        .pp-intro-body {
          font-size: 17px;
          line-height: 1.7;
          color: var(--pp-ink-3);
        }

        /* Features */
        .pp-features { padding: 90px 0; border-top: 1px solid var(--pp-line); background: var(--pp-bg-2); }
        .pp-section-head { margin-bottom: 50px; }
        .pp-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1080px) { .pp-features-grid { grid-template-columns: repeat(2, 1fr); } }
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
        .pp-feature-body {
          font-size: 13.8px; line-height: 1.55;
          color: var(--pp-ink-4); margin: 0;
        }

        /* Users */
        .pp-users { padding: 90px 0; border-top: 1px solid var(--pp-line); }
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
        .pp-user-body {
          font-size: 15px; line-height: 1.65;
          color: var(--pp-ink-3); margin: 0;
        }

        /* CTA */
        .pp-cta { padding: 90px 0 110px; background: var(--pp-bg-2); border-top: 1px solid var(--pp-line); }
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
          max-width: 560px; margin: 0 auto 26px;
        }
        .pp-cta .pp-cta-pill { background: #FFFFFF; color: var(--pp-ink); }
        .pp-cta .pp-cta-pill:hover { background: #F0F0E8; }
      `}</style>
    </main>
  )
}

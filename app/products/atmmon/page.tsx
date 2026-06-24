"use client"

import Link from "next/link"
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

const PILLARS = [
  { title: "ATM Uptime, Transaction Trends", body: "Monitor real-time and historic transaction trends on individual ATMs or across the entire fleet. Track operational and out-of-service ATMs." },
  { title: "Electronic Journal (EJ) files", body: "Smooth operation of onward processes like reconciliation is key. Electronic journals are vital for banks. ATMMON provides access." },
  { title: "Service Faults", body: "Identify ATM errors by card, terminal, and service failures to track key performance indicators and pinpoint root causes." },
  { title: "Cash Availability", body: "Gain ATM cash insights and optimize management by eliminating overstocking and understocking at each terminal." },
]

const FEATURES = [
  { title: "Scalable Architecture", body: "Compatible with various vendors' systems, adaptable to increased usage or data volume seamlessly." },
  { title: "Multiple Connections", body: "Enhances ATMMON Controller-Agent communication, improving system reliability during peak usage." },
  { title: "Smooth Operation", body: "Optimized for low-bandwidth networks like VSAT, ensuring smooth operation in challenging conditions." },
  { title: "Checkpoint Restart", body: "The Checkpoint Restart feature for data transfers, letting it resume from the last point if interrupted." },
  { title: "Port Handling, Encryption", body: "Efficient port management boosts data transfer speed; encryption secures transmitted messages and data integrity." },
  { title: "Remote Access to Agents", body: "Remote access to Agent via Web Services streamlines data transfer, boosting efficiency and reliability." },
  { title: "Auto Agent Update, Restart", body: "The ATMMON Agent automatically updates and restarts, minimizing downtime for continuous operation." },
  { title: "Screen Management", body: "Easily schedule downloads, installations, and rollbacks of screens, optimizing ATM software management." },
  { title: "Responsive Web UI", body: "ATMMON's web-based UI with Ajax ensures user-friendly interaction, enhancing navigation and usability." },
  { title: "Eliminates Manual EJ Retrieval", body: "ATMMON streamlines Electronic Journal transfer from ATMs to the Server, automating for timely and accurate data transfer." },
  { title: "Secured Data Transfer", body: "EJ transfer is securely managed to prevent tampering or unauthorized access, ensuring data integrity." },
  { title: "Reports and Dashboards", body: "ATMMON offers automated reporting and dashboards for real-time insights, improving monitoring and decision-making." },
]

export default function ATMMONPage() {
  return (
    <main className={`pp-root ${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <section className="pp-hero">
        <div className="pp-container">
          <span className="pp-eyebrow">PRODUCT · ATMMON</span>
          <h1 className="pp-h1">
            ATM Monitoring <span className="pp-h1-em">Software</span>
          </h1>
          <p className="pp-lead">
            Empowering ATM operations with next-level monitoring and operational
            oversight — across vendors, networks, and terminals.
          </p>
        </div>
      </section>

      <section className="pp-intro">
        <div className="pp-container pp-intro-grid">
          <div>
            <h2 className="pp-h2">
              Built for <span className="pp-h2-em">fleet-scale oversight</span>.
            </h2>
          </div>
          <div className="pp-intro-body-stack">
            <p className="pp-intro-body">
              ATMMON&rsquo;s system architecture is scalable and flexible, suiting
              diverse customer needs. It seamlessly integrates into different setups,
              from single to multi-server configurations, tailored to the ATM
              fleet&rsquo;s size and requirements.
            </p>
            <p className="pp-intro-body">
              It effectively communicates with ATM controllers, EFT switches, and
              ATMs, ensuring smooth interoperability and custom interfaces if
              needed. This adaptable and interoperable design meets dynamic industry
              needs, making ATMMON a reliable solution for ATM fleet management.
            </p>
          </div>
        </div>
      </section>

      <section className="pp-pillars">
        <div className="pp-container">
          <div className="pp-section-head">
            <span className="pp-tag">MANAGE YOUR FLEET REMOTELY</span>
            <h2 className="pp-h2">
              A centralized hub for <span className="pp-h2-em">every ATM</span>.
            </h2>
            <p className="pp-section-sub">
              ATMMON serves as a centralized data hub for ATMs, gathering and sharing
              information across distributed locations — even with slow network
              connections. Robust networking protocols and layered security safeguard
              sensitive banking data.
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
            <span className="pp-tag">FEATURES</span>
            <h2 className="pp-h2">
              Everything you need, <span className="pp-h2-em">in one platform</span>.
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

      <section className="pp-cta">
        <div className="pp-container">
          <div className="pp-cta-card">
            <h2 className="pp-cta-h">
              See ATMMON <span className="pp-cta-em">in action</span>.
            </h2>
            <p className="pp-cta-sub">
              Get a walkthrough tailored to your fleet — uptime, EJ retrieval, cash
              optimization, and reconciliation, end-to-end.
            </p>
            <Link href="/support" className="pp-cta-pill">
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
          font-style: italic; font-weight: 400; color: var(--pp-brand);
        }
        .pp-lead {
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.6; color: var(--pp-ink-3);
          max-width: 640px; margin-bottom: 30px;
          text-align: justify;
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
        .pp-intro-body {
          font-size: 17px; line-height: 1.7;
          color: var(--pp-ink-3); margin: 0;
          text-align: justify;
        }
        .pp-section-sub {
          font-size: 16px; line-height: 1.65;
          color: var(--pp-ink-3); margin: 16px 0 0;
          max-width: 720px;
        }

        /* Pillars */
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
        .pp-pillar-body {
          font-size: 14px; line-height: 1.6;
          color: var(--pp-ink-4); margin: 0;
        }

        /* Features */
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
        .pp-feature-body {
          font-size: 13.8px; line-height: 1.55;
          color: var(--pp-ink-4); margin: 0;
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
          text-align: center;
        }
        .pp-cta .pp-cta-pill { background: #FFFFFF; color: var(--pp-ink); }
        .pp-cta .pp-cta-pill:hover { background: #F0F0E8; }
      `}</style>
    </main>
  )
}

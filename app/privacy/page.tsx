"use client"

import Link from "next/link"
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

export default function PrivacyPage() {
  return (
    <main className={`pp-root ${manrope.variable} ${inter.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <div className="pp-header">
        <div className="pp-container">
          <span className="pp-eyebrow">Legal</span>
          <h1 className="pp-h1">Privacy Policy</h1>
          <p className="pp-subtitle">Last updated: June 2026</p>
        </div>
      </div>

      <div className="pp-container pp-body">

        <section className="pp-section">
          <p>
            This Privacy Policy explains how Infiniqon (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            collects, uses, and protects information you provide when using the CleanFlowAI website
            (<strong>cleanflowai.com</strong>). By using this site, you agree to the practices described below.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">1. Information We Collect</h2>

          <h3 className="pp-h3">Contact &amp; Demo Request Forms</h3>
          <p>
            When you submit a contact or demo request form, we collect your name, business email address,
            company name, and any message you provide. This information is used solely to respond to your
            inquiry and follow up about CleanFlowAI.
          </p>

          <h3 className="pp-h3">Newsletter Signup</h3>
          <p>
            If you subscribe to our newsletter, we collect your email address to send you updates about
            CleanFlowAI, product news, and data quality insights. You can unsubscribe at any time by
            contacting us.
          </p>

          <h3 className="pp-h3">Usage Data</h3>
          <p>
            We use Google Analytics 4 to collect anonymised data about how visitors interact with our
            website — such as pages visited, time spent, and general geographic region. This data does
            not identify you personally and is used only to improve our website.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">2. How We Use Your Information</h2>
          <ul className="pp-list">
            <li>To respond to your enquiries and demo requests</li>
            <li>To send newsletters you have subscribed to</li>
            <li>To understand how our website is used and improve it</li>
            <li>To manage and organise leads within our CRM</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to any third party.</p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">3. Third-Party Services</h2>
          <p>We use the following trusted third-party services to operate our website:</p>

          <div className="pp-table-wrap">
            <table className="pp-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Purpose</th>
                  <th>Data Shared</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>HubSpot</strong></td>
                  <td>CRM — storing and managing contact form leads</td>
                  <td>Name, email, company, message</td>
                </tr>
                <tr>
                  <td><strong>Supabase</strong></td>
                  <td>Database — storing form submissions securely</td>
                  <td>Name, email, company, message</td>
                </tr>
                <tr>
                  <td><strong>Google Analytics 4</strong></td>
                  <td>Website analytics and usage insights</td>
                  <td>Anonymised usage data, cookies</td>
                </tr>
                <tr>
                  <td><strong>Vercel</strong></td>
                  <td>Website hosting and deployment</td>
                  <td>Standard server logs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Each of these services has its own privacy policy and handles data in accordance with
            applicable data protection regulations.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">4. Cookies</h2>
          <p>
            Our website uses cookies through Google Analytics 4 to collect anonymous usage data.
            These cookies do not store personally identifiable information. You can disable cookies
            at any time through your browser settings. Note that disabling cookies may affect how
            some parts of the website function.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">5. Data Retention</h2>
          <p>
            Form submissions are retained in our systems for as long as necessary to manage your
            enquiry or business relationship. Newsletter email addresses are retained until you
            unsubscribe. Google Analytics data is retained for 14 months in line with GA4 defaults.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="pp-list">
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction or deletion of your personal data</li>
            <li>Opt out of newsletter communications at any time</li>
            <li>Request that we stop processing your data</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a href="mailto:marketing@infiniqon.com" className="pp-link">marketing@infiniqon.com</a>.
            We will respond within 30 days.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">7. Data Security</h2>
          <p>
            We take reasonable steps to protect your information. Form submissions are stored
            securely in Supabase with role-based access controls. We do not store payment information
            of any kind on our systems.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date
            at the top of this page will reflect any changes. Continued use of the website after
            updates constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:marketing@infiniqon.com" className="pp-link">marketing@infiniqon.com</a>{" "}
            or through our <Link href="/contact" className="pp-link">contact page</Link>.
          </p>
        </section>

      </div>

      <SiteFooter />

      <style>{`
        .pp-root {
          --pp-bg: #FAFAF5;
          --pp-bg-2: #F5F3EC;
          --pp-ink: #0F1729;
          --pp-ink-2: #1E293B;
          --pp-ink-3: #475569;
          --pp-brand: #2A4477;
          --pp-navy: #141E30;
          --pp-line: rgba(15, 23, 41, 0.08);
          background: var(--pp-bg);
          color: var(--pp-ink);
          font-family: var(--font-sans), sans-serif;
          min-height: 100vh;
        }

        .pp-container { max-width: 780px; margin: 0 auto; padding: 0 36px; }
        @media (max-width: 600px) { .pp-container { padding: 0 22px; } }

        .pp-header {
          padding: 140px 0 48px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.14) 0%, transparent 60%),
            linear-gradient(180deg, var(--pp-bg) 0%, var(--pp-bg-2) 100%);
          margin-bottom: 48px;
          border-bottom: 1px solid var(--pp-line);
        }
        @media (max-width: 600px) { .pp-header { padding: 110px 0 36px; } }

        .pp-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--pp-brand); font-weight: 600;
          text-transform: uppercase;
          display: block; margin-bottom: 14px;
        }

        .pp-h1 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1.1; letter-spacing: -0.018em;
          color: var(--pp-ink);
          margin: 0 0 12px;
        }

        .pp-subtitle {
          font-family: var(--font-mono), monospace;
          font-size: 12px; letter-spacing: 0.1em;
          color: var(--pp-ink-3);
        }

        .pp-body { padding-bottom: 100px; }

        .pp-section { margin-bottom: 44px; }

        .pp-section > p, .pp-section > ul {
          font-size: 16px;
          line-height: 1.75;
          color: var(--pp-ink-2);
          margin: 0 0 18px;
        }

        .pp-h2 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(18px, 2.2vw, 22px);
          color: var(--pp-ink);
          margin: 0 0 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--pp-line);
        }

        .pp-h3 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--pp-ink);
          margin: 22px 0 8px;
          letter-spacing: -0.01em;
        }

        .pp-list {
          padding-left: 20px;
          margin: 0 0 18px;
        }
        .pp-list li {
          font-size: 16px;
          line-height: 1.75;
          color: var(--pp-ink-2);
          margin-bottom: 8px;
        }

        .pp-link {
          color: var(--pp-brand);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .pp-table-wrap { margin: 18px 0 22px; overflow-x: auto; }
        .pp-table {
          width: 100%; border-collapse: collapse;
          font-size: 14px;
          border: 1px solid var(--pp-line);
          border-radius: 10px;
          overflow: hidden;
        }
        .pp-table th {
          background: var(--pp-brand); color: #fff;
          font-family: var(--font-mono), monospace;
          font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; font-weight: 700;
          padding: 11px 16px; text-align: left;
        }
        .pp-table td {
          padding: 11px 16px;
          border-bottom: 1px solid var(--pp-line);
          color: var(--pp-ink-2);
          vertical-align: top;
        }
        .pp-table tr:last-child td { border-bottom: none; }
        .pp-table tr:nth-child(even) td { background: var(--pp-bg-2); }
      `}</style>
    </main>
  )
}

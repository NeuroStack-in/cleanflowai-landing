"use client"

import Link from "next/link"
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google"
import { SiteNav, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "customer-data-ownership", label: "Customer Data Ownership" },
  { id: "data-security", label: "Data Security and Protection" },
  { id: "user-access", label: "User Access and Authentication" },
  { id: "data-retention", label: "Data Retention and Deletion" },
  { id: "third-party", label: "Third-Party Integrations" },
  { id: "ai-processing", label: "AI and Automated Processing" },
  { id: "compliance", label: "Compliance and Governance" },
  { id: "cookies", label: "Cookies" },
  { id: "children-privacy", label: "Children's Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
]

export default function PrivacyPage() {
  return (
    <main className={`pp-root ${manrope.variable} ${inter.variable} ${mono.variable}`}>
      <SiteChromeStyles />
      <SiteNav />

      <div className="pp-header">
        <div className="pp-container">
          <span className="pp-eyebrow">Legal</span>
          <h1 className="pp-h1">Privacy Policy</h1>
          <span className="pp-subtitle">Latest Updated: 1 July 2026</span>
        </div>
      </div>

      <div className="pp-container pp-body">

        <nav className="pp-toc" aria-label="Table of Contents">
          <div className="pp-toc-h">Table of Contents</div>
          <ol>
            {TOC.map((t) => (
              <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>
            ))}
          </ol>
        </nav>

        <section className="pp-section" id="introduction">
          <h2 className="pp-h2">1. Introduction</h2>
          <p>
            CleanFlowAI is committed to protecting the information entrusted to us by our clients
            and platform users while maintaining the highest standards of data privacy, security,
            and governance. This Privacy Policy explains how CleanFlowAI collects, processes,
            stores, and safeguards information when clients and authorized users access and use
            the platform.
          </p>
          <p>
            Throughout this Privacy Policy, &ldquo;CleanFlowAI&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;, and &ldquo;us&rdquo; refer to CleanFlowAI and its affiliated
            services. &ldquo;Client&rdquo;, &ldquo;customer&rdquo;, &ldquo;user&rdquo;, and
            &ldquo;you&rdquo; refer to any organization, business, individual, or authorized
            representative using the CleanFlowAI platform. CleanFlowAI processes data solely to
            deliver data profiling, data quality, data transformation, data augmentation, data
            migration, data modernization, and data governance services as requested and
            authorized by the client.
          </p>
        </section>

        <section className="pp-section" id="information-we-collect">
          <h2 className="pp-h2">2. Information We Collect</h2>
          <p>
            We collect account information such as name, business email address, organization
            details, and authentication information required to access the platform. We may also
            collect platform usage information to improve platform performance, user experience,
            operational reliability, and security monitoring.
          </p>
          <p>
            Customers may upload or connect business data from files, databases, cloud storage
            platforms, ERP systems, CRM applications, and other enterprise sources. All data
            processed within CleanFlowAI is protected through enterprise-grade security controls.
            CleanData Shield helps safeguard customer information through continuous security
            monitoring, access controls, audit logging, threat detection, and data protection
            mechanisms, ensuring that customer data remains secure, confidential, and accessible
            only to authorized users.
          </p>
        </section>

        <section className="pp-section" id="how-we-use-information">
          <h2 className="pp-h2">3. How We Use Information</h2>
          <p>
            Information is used to provide platform functionality, authenticate users, perform
            data processing activities, and improve service performance. We also use operational
            information to maintain platform security and reliability.
          </p>
          <p>
            Customer data is processed solely to execute data governance workflows, data quality
            validation, transformation, migration, modernization, and related business operations
            authorized by the customer.
          </p>
        </section>

        <section className="pp-section" id="customer-data-ownership">
          <h2 className="pp-h2">4. Customer Data Ownership</h2>
          <p>
            Customers retain full ownership of all data uploaded, connected, processed, or
            generated within CleanFlowAI. We do not claim ownership rights over customer datasets,
            reports, blueprints, rules, or outputs.
          </p>
          <p>
            CleanFlowAI acts as a trusted data processor and handles customer information only
            according to authorized instructions and configured workflows within the platform.
          </p>
        </section>

        <section className="pp-section" id="data-security">
          <h2 className="pp-h2">5. Data Security and Protection</h2>
          <p>
            CleanFlowAI uses enterprise-grade security controls including encryption in transit,
            encryption at rest, secure infrastructure, and continuous monitoring. These measures
            help protect information from unauthorized access, disclosure, or alteration.
          </p>
          <p>
            Security controls are regularly reviewed to maintain a secure operating environment
            and support customer compliance requirements across regulated industries.
          </p>
        </section>

        <section className="pp-section" id="user-access">
          <h2 className="pp-h2">6. User Access and Authentication</h2>
          <p>
            CleanFlowAI supports <strong>Multi-Factor Authentication (MFA)</strong> to strengthen
            account security and reduce the risk of unauthorized access. Additional verification
            methods help ensure that only approved users can access sensitive information.
          </p>
          <p>
            <strong>Role-Based Access Control (RBAC)</strong> allows organizations to define
            permissions based on business responsibilities. Users can only access the data,
            workflows, and functions relevant to their assigned roles.
          </p>
        </section>

        <section className="pp-section" id="data-retention">
          <h2 className="pp-h2">7. Data Retention and Deletion</h2>
          <p>
            Customer information is retained only for as long as necessary to provide services,
            meet contractual obligations, and satisfy applicable legal requirements. Retention
            periods may vary depending on customer configurations and regulatory requirements.
          </p>
          <p>
            Customers may request data export, deletion, or account closure according to
            applicable agreements and platform policies.
          </p>
        </section>

        <section className="pp-section" id="third-party">
          <h2 className="pp-h2">8. Third-Party Integrations</h2>
          <p>
            CleanFlowAI integrates with business applications, databases, cloud storage services,
            and enterprise platforms to facilitate secure data movement and processing. These
            integrations operate through authorized connections and approved permissions.
          </p>
          <p>
            We do not sell customer data to third parties and only share information when necessary
            to provide requested services or comply with legal obligations.
          </p>
        </section>

        <section className="pp-section" id="ai-processing">
          <h2 className="pp-h2">9. AI and Automated Processing</h2>
          <p>
            CleanFlowAI uses artificial intelligence to assist with data profiling, quality rule
            recommendations, field mapping, anomaly detection, and workflow automation. AI
            capabilities are designed to improve efficiency while maintaining user oversight.
          </p>
          <p>
            All AI recommendations remain subject to user review, approval, and control before
            implementation within production workflows.
          </p>
        </section>

        <section className="pp-section" id="compliance">
          <h2 className="pp-h2">10. Compliance and Governance</h2>
          <p>
            CleanFlowAI is built to support the compliance and governance obligations of the
            regulated industries we serve. The platform provides audit logging, access controls,
            and traceable, reversible workflows that help customers demonstrate accountability to
            regulators, auditors, and internal stakeholders.
          </p>
          <p>
            We align our operational and security practices with applicable data protection laws
            and industry standards, and we support customers in meeting their own regulatory and
            governance requirements.
          </p>
        </section>

        <section className="pp-section" id="cookies">
          <h2 className="pp-h2">11. Cookies</h2>
          <p>
            CleanFlowAI uses cookies to maintain secure sessions, improve platform performance,
            and enhance user experience.
          </p>
        </section>

        <section className="pp-section" id="children-privacy">
          <h2 className="pp-h2">12. Children&rsquo;s Privacy</h2>
          <p>
            CleanFlowAI is intended for business use and is not designed for children or minors.
            We do not knowingly collect personal information from children.
          </p>
        </section>

        <section className="pp-section" id="changes">
          <h2 className="pp-h2">13. Changes to This Policy</h2>
          <p>
            This Privacy Policy may be updated periodically to reflect improvements in our
            services, legal obligations, or security practices. Updated versions will be published
            through appropriate communication channels.
          </p>
          <p>
            Continued use of the platform following any updates constitutes acceptance of the
            revised Privacy Policy.
          </p>
        </section>

        <section className="pp-section" id="contact">
          <h2 className="pp-h2">14. Contact Us</h2>
          <p>
            For questions regarding privacy, data protection, or security practices, please
            contact the CleanFlowAI team through the official support channels provided by
            Infiniqon, or through our <Link href="/support" className="pp-link">contact page</Link>.
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

        .pp-toc {
          margin: 0 0 52px;
          padding: 24px 28px;
          background: var(--pp-bg-2);
          border: 1px solid var(--pp-line);
          border-radius: 14px;
        }
        .pp-toc-h {
          font-family: var(--font-display), sans-serif;
          font-weight: 700; font-size: 15px;
          color: var(--pp-ink); margin: 0 0 14px;
        }
        .pp-toc ol {
          margin: 0; padding-left: 20px;
          columns: 2; column-gap: 36px;
        }
        @media (max-width: 600px) { .pp-toc ol { columns: 1; } }
        .pp-toc li {
          margin-bottom: 9px; font-size: 14.5px;
          line-height: 1.5; break-inside: avoid;
          color: var(--pp-ink-3);
        }
        .pp-toc a {
          color: var(--pp-brand); text-decoration: none;
        }
        .pp-toc a:hover { text-decoration: underline; text-underline-offset: 3px; }

        .pp-section { margin-bottom: 44px; scroll-margin-top: 100px; }
        .pp-section:last-of-type > p { text-align: left; hyphens: none; }

        .pp-section > p, .pp-section > ul {
          font-size: 16px;
          line-height: 1.75;
          color: var(--pp-ink-2);
          margin: 0 0 18px;
          text-align: justify;
          hyphens: auto;
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
          text-align: justify;
          hyphens: auto;
        }

        .pp-link {
          color: var(--pp-brand);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </main>
  )
}

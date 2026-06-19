"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import Link from "next/link"
import { BlogPost } from "../_components/BlogPost"
import { trackEvent } from "@/lib/analytics"

const INDUSTRIES = [
  "Banking & Financial Services",
  "Healthcare & Life Sciences",
  "Insurance",
  "Retail & E-commerce",
  "Manufacturing",
  "Telecom",
  "Technology & SaaS",
  "Government & Public Sector",
  "Other",
]

function NewsletterForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    industry: "",
    consent: false,
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const setField =
    (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }))
    }

  const setConsent = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, consent: e.target.checked }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("failed")
      trackEvent({ action: "sign_up", category: "engagement", label: "newsletter_form" })
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <>
        <div className="nl-success">
          <div className="nl-success-icon">✓</div>
          <h3 className="nl-success-h">You&rsquo;re subscribed.</h3>
          <p className="nl-success-p">
            Expect enterprise data quality insights, governance trends, and AI readiness research
            delivered directly to your inbox.
          </p>
        </div>
        <NLStyles />
      </>
    )
  }

  return (
    <>
      <div className="nl-card">
        <div className="nl-card-head">
          <span className="nl-eyebrow">Newsletter</span>
          <h3 className="nl-card-h">Stay Ahead of Emerging Data Quality Risks</h3>
          <p className="nl-card-sub">
            Get expert insights, industry statistics, governance trends, and practical strategies
            delivered directly to your inbox. Join data leaders across banking, healthcare, insurance,
            and enterprise technology.
          </p>
          <div className="nl-benefits">
            <div className="nl-benefit">
              <span className="nl-benefit-dot" />
              Latest Data Quality and Data Governance trends
            </div>
            <div className="nl-benefit">
              <span className="nl-benefit-dot" />
              AI Readiness insights and research
            </div>
            <div className="nl-benefit">
              <span className="nl-benefit-dot" />
              Industry reports and benchmark statistics
            </div>
            <div className="nl-benefit">
              <span className="nl-benefit-dot" />
              Compliance and regulatory updates
            </div>
          </div>
        </div>

        <form className="nl-form" onSubmit={handleSubmit}>
          <div className="nl-row">
            <div className="nl-field">
              <label className="nl-label">
                First Name <span className="nl-req">*</span>
              </label>
              <input
                className="nl-input"
                type="text"
                required
                placeholder="Jane"
                value={values.firstName}
                onChange={setField("firstName")}
              />
            </div>
            <div className="nl-field">
              <label className="nl-label">
                Last Name <span className="nl-req">*</span>
              </label>
              <input
                className="nl-input"
                type="text"
                required
                placeholder="Smith"
                value={values.lastName}
                onChange={setField("lastName")}
              />
            </div>
          </div>

          <div className="nl-field">
            <label className="nl-label">
              Business Email <span className="nl-req">*</span>
            </label>
            <input
              className="nl-input"
              type="email"
              required
              placeholder="jane.smith@company.com"
              value={values.email}
              onChange={setField("email")}
            />
          </div>

          <div className="nl-row">
            <div className="nl-field">
              <label className="nl-label">
                Company Name <span className="nl-req">*</span>
              </label>
              <input
                className="nl-input"
                type="text"
                required
                placeholder="Acme Corp"
                value={values.company}
                onChange={setField("company")}
              />
            </div>
            <div className="nl-field">
              <label className="nl-label">
                Job Title / Designation <span className="nl-req">*</span>
              </label>
              <input
                className="nl-input"
                type="text"
                required
                placeholder="Chief Data Officer"
                value={values.jobTitle}
                onChange={setField("jobTitle")}
              />
            </div>
          </div>

          <div className="nl-field">
            <label className="nl-label">Industry</label>
            <select
              className="nl-input nl-select"
              value={values.industry}
              onChange={setField("industry")}
            >
              <option value="">Select your industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="nl-check-row">
            <input
              id="nl-consent"
              type="checkbox"
              className="nl-check"
              checked={values.consent}
              onChange={setConsent}
            />
            <label htmlFor="nl-consent" className="nl-check-label">
              I would like to receive industry insights, product updates, and enterprise data
              governance resources from Infiniqon.
            </label>
          </div>

          <button
            className="nl-btn"
            type="submit"
            disabled={status === "loading" || !values.consent}
          >
            {status === "loading" ? "Subscribing…" : "Subscribe Now →"}
          </button>

          {status === "error" && (
            <p className="nl-error">Something went wrong. Please try again or email us at marketing@infiniqon.com</p>
          )}
        </form>
      </div>
      <NLStyles />
    </>
  )
}

function NLStyles() {
  return (
    <style>{`
      .nl-card {
        margin: 52px 0 8px;
        background: linear-gradient(155deg, #1a2f54 0%, #141E30 100%);
        border: 1px solid rgba(90, 127, 181, 0.28);
        border-radius: 20px;
        overflow: hidden;
      }
      .nl-card-head {
        padding: 38px 44px 32px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(42, 68, 119, 0.25);
      }
      @media (max-width: 640px) { .nl-card-head { padding: 28px 24px 24px; } }
      .nl-eyebrow {
        display: block;
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.22em; font-weight: 700;
        color: #A0C4F0; text-transform: uppercase; margin-bottom: 12px;
      }
      .nl-card .nl-card-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: clamp(20px, 2.4vw, 26px);
        line-height: 1.25; letter-spacing: -0.01em;
        color: #ffffff; margin: 0 0 12px;
      }
      .nl-card-sub {
        font-size: 14.5px; line-height: 1.65;
        color: rgba(255, 255, 255, 0.6); margin: 0 0 20px;
        max-width: 580px;
      }
      .nl-benefits { display: flex; flex-direction: column; gap: 8px; }
      .nl-benefit {
        display: flex; align-items: center; gap: 10px;
        font-size: 13.5px; color: rgba(255, 255, 255, 0.55);
        font-family: var(--font-sans), sans-serif;
      }
      .nl-benefit-dot {
        width: 5px; height: 5px; border-radius: 50%;
        background: #5A7FB5; flex-shrink: 0;
      }

      .nl-form {
        padding: 34px 44px 40px;
        display: flex; flex-direction: column; gap: 20px;
      }
      @media (max-width: 640px) { .nl-form { padding: 24px 24px 32px; } }
      .nl-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 560px) { .nl-row { grid-template-columns: 1fr; gap: 12px; } }
      .nl-field { display: flex; flex-direction: column; gap: 7px; }
      .nl-label {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.14em; font-weight: 700;
        color: rgba(255, 255, 255, 0.48); text-transform: uppercase;
      }
      .nl-req { color: #A0C4F0; }
      .nl-input {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 9px;
        padding: 12px 15px;
        font-size: 14.5px; color: #ffffff;
        font-family: var(--font-sans), sans-serif;
        outline: none;
        transition: border-color 0.2s, background 0.2s;
        width: 100%;
        box-sizing: border-box;
      }
      .nl-input::placeholder { color: rgba(255, 255, 255, 0.25); }
      .nl-input:focus {
        border-color: rgba(90, 127, 181, 0.65);
        background: rgba(255, 255, 255, 0.09);
      }
      .nl-select { appearance: none; cursor: pointer; }
      .nl-select option { background: #1a2f54; color: #ffffff; }

      .nl-check-row {
        display: flex; gap: 13px; align-items: flex-start;
        padding: 16px 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
      }
      .nl-check {
        appearance: none; width: 19px; height: 19px; min-width: 19px;
        border: 1.5px solid rgba(255, 255, 255, 0.28);
        border-radius: 5px; background: rgba(255, 255, 255, 0.05);
        cursor: pointer; margin-top: 1px;
        transition: background 0.2s, border-color 0.2s;
        position: relative; display: flex; align-items: center; justify-content: center;
      }
      .nl-check:checked { background: #2A4477; border-color: #5A7FB5; }
      .nl-check:checked::after {
        content: '✓';
        position: absolute; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        font-size: 11px; color: #A0C4F0; font-weight: 700; line-height: 1;
      }
      .nl-check-label {
        font-size: 13.5px; line-height: 1.55;
        color: rgba(255, 255, 255, 0.55); cursor: pointer;
      }

      @media (max-width: 480px) {
        .nl-card-head { padding: 24px 18px 20px; }
        .nl-form { padding: 20px 18px 28px; gap: 16px; }
        .nl-btn { align-self: stretch; text-align: center; }
        .nl-success { padding: 36px 20px; }
      }
      .nl-btn {
        align-self: flex-start;
        padding: 13px 30px;
        background: #2A4477;
        color: #ffffff;
        border: 1px solid rgba(160, 196, 240, 0.28);
        border-radius: 999px;
        font-family: var(--font-mono), monospace;
        font-size: 12.5px; font-weight: 700; letter-spacing: 0.1em;
        cursor: pointer;
        transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
      }
      .nl-btn:hover:not(:disabled) {
        background: #3A5A94;
        transform: translateY(-1px);
        box-shadow: 0 8px 24px -8px rgba(42, 68, 119, 0.6);
      }
      .nl-btn:disabled { opacity: 0.45; cursor: not-allowed; }
      .nl-error {
        font-size: 13px; color: #f87171;
        margin: 0; line-height: 1.5;
      }

      .nl-success {
        margin: 52px 0 8px;
        background: linear-gradient(155deg, #1a2f54 0%, #141E30 100%);
        border: 1px solid rgba(90, 127, 181, 0.28);
        border-radius: 20px;
        padding: 52px 40px;
        text-align: center;
      }
      .nl-success-icon {
        width: 52px; height: 52px;
        background: rgba(42, 68, 119, 0.55);
        border: 1px solid rgba(160, 196, 240, 0.28);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 20px; color: #A0C4F0;
        margin: 0 auto 20px;
      }
      .nl-success .nl-success-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 24px;
        color: #ffffff; margin: 0 0 10px;
        letter-spacing: -0.01em;
      }
      .nl-success .nl-success-p {
        font-size: 15px; color: rgba(255, 255, 255, 0.6);
        margin: 0 auto; line-height: 1.65;
        max-width: 420px; text-align: center;
      }
    `}</style>
  )
}

export default function DataQualityIssuesPost() {
  return (
    <BlogPost
      currentSlug="data-quality-issues"
      meta={{
        eyebrow: "DATA GOVERNANCE",
        title: "10 Data Quality Issues Every Enterprise Discovers Too Late",
        subtitle:
          "96% of U.S. data professionals believe poor data quality could lead to widespread business crises if left unaddressed. These are the ten issues most enterprises discover only after the damage is done.",
        date: "May 19, 2026",
        readTime: "7 min read",
        author: "Infiniqon Product",
      }}
    >
      <p>
        Data quality issues are no longer just an IT concern. As organizations accelerate AI adoption,
        analytics initiatives, and digital transformation programs, data quality failures are becoming
        one of the biggest barriers to business success.
      </p>
      <p>
        Recent research found that <strong>96% of U.S. data professionals</strong> believe poor data
        quality could lead to widespread business crises if not addressed proactively. The common thread
        across industries &mdash; banking, healthcare, insurance, manufacturing, and SaaS &mdash; is
        the same: enterprises discover data quality problems late, and the cost compounds with every
        quarter they go unresolved.
      </p>

      <h2>The 10 Most Common Data Quality Issues</h2>

      <h3>1. Missing Data</h3>
      <p>
        Incomplete records create reporting inaccuracies and AI failures. When critical fields are
        absent &mdash; a customer email, a transaction date, an account identifier &mdash; downstream
        systems either fail silently or propagate gaps into reports and models that stakeholders rely on.
      </p>

      <h3>2. Duplicate Records</h3>
      <p>
        Duplicate customer, patient, or financial records remain among the most costly data quality
        issues enterprises face. A single customer appearing three times in a CRM distorts revenue
        metrics, triggers redundant communications, and creates compliance risk when regulators
        expect unique, consolidated records.
      </p>

      <h3>3. Inconsistent Formats</h3>
      <p>
        Different date, currency, and identifier formats create integration challenges across
        systems. When one system stores dates as MM/DD/YYYY and another uses YYYY-MM-DD, joins fail
        silently &mdash; and the error surfaces as a reporting anomaly weeks later.
      </p>

      <h3>4. Data Drift</h3>
      <p>
        Changing source systems often introduce unexpected data quality issues. A vendor updates
        their export format. An upstream application changes a field type. A code table adds new
        values. Without continuous monitoring, these changes propagate downstream undetected.
      </p>

      <h3>5. Invalid Data Entries</h3>
      <p>
        Incorrect emails, phone numbers, and account numbers impact operations at scale. A single
        invalid email field might represent thousands of undeliverable customer communications. Invalid
        account numbers halt payment processing and require manual remediation.
      </p>

      <h3>6. Unstructured Data Challenges</h3>
      <p>
        Emails, PDFs, and documents frequently contain unmanaged information. As enterprises expand
        their data environments to include unstructured sources, the absence of governance and quality
        controls over these assets creates significant risk for AI initiatives and compliance programs.
      </p>

      <h3>7. Poor Data Governance</h3>
      <p>
        Lack of ownership increases data quality issues across departments. When no one is accountable
        for a dataset&rsquo;s accuracy, validation falls through the cracks. <Link href="/products/data-governance">Governance</Link> isn&rsquo;t just
        a policy &mdash; it&rsquo;s the operational framework that keeps data quality consistent over time.
      </p>

      <h3>8. Healthcare Data Errors</h3>
      <p>
        In healthcare, data quality issues can impact patient records, claims processing, and
        compliance requirements. Incorrect diagnoses codes, duplicate patient identifiers, and
        mismatched insurance records don&rsquo;t just create operational problems &mdash; they create
        patient safety risks and regulatory exposure.
      </p>

      <h3>9. Financial Services Data Risks</h3>
      <p>
        Financial institutions face data quality issues related to transactions, customer identities,
        fraud detection, and regulatory reporting. A single inconsistency in a regulatory return can
        trigger an audit. Duplicate customer records can create KYC gaps that regulators treat as
        compliance failures.
      </p>

      <h3>10. AI Readiness Gaps</h3>
      <p>
        Many organizations discover data quality issues only after AI models produce unreliable
        results. Models trained on duplicate-laden, missing-value-heavy, or inconsistently formatted
        data amplify those problems at scale. By the time the model&rsquo;s outputs are questioned,
        the root cause is buried in the training data.
      </p>

      <div className="bp-callout">
        <div className="bp-callout-label">The pattern</div>
        <p>
          These ten issues share a common characteristic: they are <em>invisible until they aren&rsquo;t</em>.
          Proactive profiling, continuous monitoring, and governance frameworks surface them before
          they reach decisions, regulators, or AI models.
        </p>
      </div>

      <h2>Why Data Quality Issues in Enterprise Are Growing</h2>
      <p>
        The volume of enterprise data continues to increase across CRM, ERP, finance, and cloud
        platforms. As a result, data quality issues in organizations are becoming more complex,
        affecting analytics, compliance, and AI outcomes simultaneously rather than in isolation.
      </p>
      <p>
        Organizations that address data quality issues early &mdash; through profiling, governance,
        continuous monitoring, and remediation &mdash; are better positioned to build trusted, AI-ready
        data foundations. Those that defer the work discover it later, at significantly higher cost.
      </p>

      <NewsletterForm />
    </BlogPost>
  )
}

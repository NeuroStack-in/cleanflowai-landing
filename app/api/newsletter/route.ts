import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const RECIPIENTS = ["kparthiban@infiniqon.com", "smahendran@infiniqon.com", "marketing@infiniqon.com", "usudarsan@infiniqon.com"]

async function sendEmail(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  jobTitle: string
  industry: string
}) {
  await transporter.sendMail({
    from: `"Infiniqon Newsletter" <${process.env.GMAIL_USER}>`,
    to: RECIPIENTS.join(", "),
    replyTo: data.email,
    subject: `Newsletter Sign-up — ${data.firstName} ${data.lastName} from ${data.company}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B;">
        <div style="background: #2A4477; padding: 28px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">New Newsletter Sign-up</h1>
          <p style="margin: 6px 0 0; color: rgba(200,215,240,0.8); font-size: 14px;">Submitted via infiniqon.com</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: none; padding: 28px 32px; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #6B6F78; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B6F78;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2A4477;">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6B6F78;">Company</td><td style="padding: 8px 0; font-weight: 600;">${data.company}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B6F78;">Job Title</td><td style="padding: 8px 0;">${data.jobTitle}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B6F78;">Industry</td><td style="padding: 8px 0;">${data.industry || "Not specified"}</td></tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="mailto:${data.email}" style="display: inline-block; padding: 11px 22px; background: #2A4477; color: #ffffff; text-decoration: none; border-radius: 999px; font-size: 13px; font-weight: 600;">Reply to ${data.firstName}</a>
          </div>
        </div>
      </div>
    `,
  })
}

async function saveToHubSpot(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  jobTitle: string
  industry: string
}) {
  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
    },
    body: JSON.stringify({
      properties: {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        company: data.company,
        jobtitle: data.jobTitle,
        industry: data.industry || "",
      },
    }),
  })

  // 409 = contact already exists — treat as success
  if (!res.ok && res.status !== 409) {
    const err = await res.json()
    console.error("[newsletter] HubSpot error:", err)
    throw new Error("HubSpot save failed")
  }
}

async function saveToSupabase(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  jobTitle: string
  industry: string
}) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        company: data.company,
        job_title: data.jobTitle,
        industry: data.industry || null,
      }),
    }
  )

  // 409 = duplicate email — treat as success
  if (!res.ok && res.status !== 409) {
    const err = await res.text()
    console.error("[newsletter] Supabase error:", err)
    throw new Error("Supabase save failed")
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, company, jobTitle, industry } = body

    if (!firstName || !lastName || !email || !company || !jobTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const data = { firstName, lastName, email, company, jobTitle, industry: industry || "" }

    // Save to HubSpot, Supabase, and send email in parallel
    const [hubspotResult, supabaseResult, emailResult] = await Promise.allSettled([
      saveToHubSpot(data),
      saveToSupabase(data),
      sendEmail(data),
    ])

    if (hubspotResult.status === "rejected") {
      console.error("[newsletter] HubSpot failed:", hubspotResult.reason)
    }
    if (supabaseResult.status === "rejected") {
      console.error("[newsletter] Supabase failed:", supabaseResult.reason)
    }
    if (emailResult.status === "rejected") {
      console.error("[newsletter] Email failed:", emailResult.reason)
    }

    // Succeed if at least one destination saved the data
    if (hubspotResult.status === "rejected" && supabaseResult.status === "rejected") {
      return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[newsletter] unexpected error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

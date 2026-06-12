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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { first, last, email, company, role, volume, message } = body

    if (!first || !last || !email || !company || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const roleLabels: Record<string, string> = {
      "data-ops": "Data Ops / Analytics",
      eng: "Engineering",
      finance: "Finance / Accounting",
      leadership: "Leadership / Executive",
      other: "Other",
    }

    const volumeLabels: Record<string, string> = {
      small: "< 100K records / month",
      medium: "100K – 1M records / month",
      large: "1M – 10M records / month",
      xlarge: "> 10M records / month",
    }

    await transporter.sendMail({
      from: `"Infiniqon Demo Requests" <${process.env.GMAIL_USER}>`,
      to: RECIPIENTS.join(", "),
      replyTo: email,
      subject: `Demo Request — ${first} ${last} from ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B;">
          <div style="background: #2A4477; padding: 28px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">New Demo Request</h1>
            <p style="margin: 6px 0 0; color: rgba(200,215,240,0.8); font-size: 14px;">Submitted via infiniqon.com</p>
          </div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: none; padding: 28px 32px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #6B6F78; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${first} ${last}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B6F78;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2A4477;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6B6F78;">Company</td><td style="padding: 8px 0; font-weight: 600;">${company}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B6F78;">Role</td><td style="padding: 8px 0;">${roleLabels[role] ?? role}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B6F78;">Data Volume</td><td style="padding: 8px 0;">${volume ? volumeLabels[volume] ?? volume : "Not specified"}</td></tr>
            </table>
            ${message ? `
            <div style="margin-top: 20px; padding: 16px; background: #F8FAFC; border: 1px solid #e2e8f0; border-radius: 8px;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: #6B6F78; text-transform: uppercase;">Data Challenge</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1E293B;">${message.replace(/\n/g, "<br>")}</p>
            </div>` : ""}
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <a href="mailto:${email}" style="display: inline-block; padding: 11px 22px; background: #2A4477; color: #ffffff; text-decoration: none; border-radius: 999px; font-size: 13px; font-weight: 600;">Reply to ${first}</a>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] email send failed:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

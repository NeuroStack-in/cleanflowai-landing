import { NextRequest, NextResponse } from "next/server"

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

    // Save to both HubSpot and Supabase in parallel
    const [hubspotResult, supabaseResult] = await Promise.allSettled([
      saveToHubSpot(data),
      saveToSupabase(data),
    ])

    if (hubspotResult.status === "rejected") {
      console.error("[newsletter] HubSpot failed:", hubspotResult.reason)
    }
    if (supabaseResult.status === "rejected") {
      console.error("[newsletter] Supabase failed:", supabaseResult.reason)
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

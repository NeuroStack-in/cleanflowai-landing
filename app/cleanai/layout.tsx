import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "CleanAI — The Intelligence Engine | Infiniqon",
  description: "AutoMap field resolution, Business Rules Suggestion, and Quarantine reasoning — all governed by Suggest → Approve → Execute. AI that proposes, never silently decides.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

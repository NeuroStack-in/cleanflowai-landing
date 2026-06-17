import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Enterprise Data Quality Platform | Infiniqon",
  description: "CleanDataShield rules, Quarantine Editor, and approval-based remediation. Fix data quality issues before they reach production — with full audit trail and steward control.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

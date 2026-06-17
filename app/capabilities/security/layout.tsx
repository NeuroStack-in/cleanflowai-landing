import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Enterprise Data Security & Governance | Infiniqon",
  description: "Identity-scoped access, approval-based change control, and immutable audit lineage for regulated industries. Every data action is tracked, attributed, and defensible.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

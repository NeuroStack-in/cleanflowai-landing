import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "CleanFlowAI — Enterprise Data Governance Platform | Infiniqon",
  description: "AI-assisted profiling, deterministic quality rules, and immutable audit for enterprise data governance. Purpose-built for banking, insurance, healthcare, and regulated industries.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

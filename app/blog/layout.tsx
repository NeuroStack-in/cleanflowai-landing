import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Infiniqon Blog — Data Quality & Governance Insights",
  description: "Long-form essays from the engineers building CleanFlowAI — on data profiling, governance, schema drift, AI-assisted quality, and enterprise data modernization.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

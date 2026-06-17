import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "How We Profile 1 Million Records in Under 60 Seconds | Infiniqon",
  description: "CleanFlowAI's profiling engine reveals schema, nulls, duplicates, and outliers across any dataset in seconds. Here is how we built it — and what it means for your data team.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

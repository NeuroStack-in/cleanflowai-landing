import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "15 Legacy System Modernization Statistics for 2026 | Infiniqon",
  description: "From $12.9M annual cost of poor data quality to 80% of enterprise data sitting unstructured — 15 statistics showing why legacy modernization is now a boardroom priority.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

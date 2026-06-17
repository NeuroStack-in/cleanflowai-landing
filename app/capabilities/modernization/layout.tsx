import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Legacy Data Modernization Platform | Infiniqon",
  description: "Encoding normalization, schema-drift reconciliation, and warehouse-native output. Modernize legacy enterprise data for AI adoption and cloud migration — with full audit lineage.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

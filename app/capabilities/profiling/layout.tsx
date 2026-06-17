import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Data Profiling Software for Enterprise | Infiniqon",
  description: "Examine every column, every dataset, every batch. CleanFlowAI profiles 1 million records in under 60 seconds — revealing nulls, data types, duplicates, and outliers instantly.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

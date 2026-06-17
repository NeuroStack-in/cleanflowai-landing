import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "The $12.9 Million Data Quality Crisis in Enterprise Systems | Infiniqon",
  description: "Poor data quality costs enterprises an average of $12.9 million annually. Learn why trusted data is no longer an IT concern — it is a business requirement.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

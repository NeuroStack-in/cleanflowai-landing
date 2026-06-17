import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "10 Data Quality Issues Every Enterprise Discovers Too Late | Infiniqon",
  description: "96% of data professionals believe poor data quality creates significant business risk. These are the 10 issues silently compounding inside enterprise systems right now.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

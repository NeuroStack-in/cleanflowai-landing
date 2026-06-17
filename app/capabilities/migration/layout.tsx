import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Enterprise Data Migration Platform | Infiniqon",
  description: "OAuth connectors, real-time Jobs, and stateful incremental sync for reliable, auditable data migration. Move data confidently with zero silent failures.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

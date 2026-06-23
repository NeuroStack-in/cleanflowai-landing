import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Request a Demo | Infiniqon",
  description: "Book a hands-on walkthrough of CleanFlowAI. Bring your data — we'll show you profiling, quality rules, and automation live with your stewards in the room.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

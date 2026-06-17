import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "About Infiniqon — Enterprise Data Trust Platform",
  description: "Infiniqon builds purpose-built software for regulated industries. Learn about our mission, values, and the team behind CleanFlowAI — the data trust layer for banking, healthcare, and insurance.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

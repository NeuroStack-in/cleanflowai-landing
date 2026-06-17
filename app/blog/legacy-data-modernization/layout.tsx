import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Legacy Data Modernization Strategies for the AI Era | Infiniqon",
  description: "Five proven strategies for modernizing fragmented legacy enterprise data to enable AI adoption, cloud migration, and digital transformation — with your stewards in control.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

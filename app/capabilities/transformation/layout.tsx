import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Enterprise Data Transformation Platform | Infiniqon",
  description: "AutoMap field resolution, version-controlled blueprints, and deterministic execution for enterprise data pipelines. Every transformation is reviewable, replayable, and reversible.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

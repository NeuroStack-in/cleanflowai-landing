"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { GA_ID, pageview } from "@/lib/analytics"

function GAPageTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_ID) return
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    pageview(url)
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', {
          page_path: window.location.pathname,
          send_page_view: true,
          cookie_flags: 'SameSite=None;Secure',
        });
      `}</Script>
      <Suspense fallback={null}>
        <GAPageTracker />
      </Suspense>
    </>
  )
}

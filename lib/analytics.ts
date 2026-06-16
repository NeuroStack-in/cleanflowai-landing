export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return
  window.gtag("config", GA_ID, { page_path: url })
}

type EventParams = {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: unknown
}

export function trackEvent({ action, category, label, value, ...rest }: EventParams) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  })
}

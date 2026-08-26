/* TMF analytics: events carry conversion context only, never email, company name, or other personal data. */
export const GA_MEASUREMENT_ID = "G-Y6BYHGBBZ9";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || localStorage.getItem("tmf-analytics-consent") !== "granted") return;
  window.gtag?.("event", name, params);
}

export function enableAnalytics() {
  if (typeof window === "undefined" || window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

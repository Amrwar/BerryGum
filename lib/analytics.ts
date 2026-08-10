/**
 * A thin, typed wrapper around whatever analytics provider ends up wired in
 * (Google Analytics via gtag, Plausible, etc.). Call sites track *what*
 * happened (a WhatsApp click, a form submission) without knowing or caring
 * which provider is listening — swapping providers later means changing
 * `dispatch()` here once, not hunting down every `gtag(...)` call across the
 * codebase. When no provider is configured (e.g. in development or before
 * a tracking script is added), events are safely dropped rather than
 * throwing, so instrumenting a component never risks breaking it.
 */

export type AnalyticsEvent =
  | { name: "whatsapp_click"; source: "hero" | "navbar" | "footer" | "contact_page" | "service_page" | "cta" | "consultation_page" }
  | { name: "contact_form_submit"; hasBudget: boolean; hasCompany: boolean }
  | { name: "contact_form_error"; reason: "validation" | "network" | "server" }
  | { name: "pricing_estimate_requested"; serviceType: string; estimatedTotal: number }
  | { name: "language_switched"; from: "en" | "ar"; to: "en" | "ar" }
  | { name: "portfolio_item_viewed"; itemName: string }
  | { name: "consultation_requested"; dateKey: string; time: string }
  | { name: "consultation_error"; reason: "validation" | "network" | "server" };

type Dispatcher = (event: AnalyticsEvent) => void;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtagDispatcher(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  const { name, ...params } = event;
  window.gtag("event", name, params);
}

let activeDispatcher: Dispatcher = gtagDispatcher;
let capturedEvents: AnalyticsEvent[] | null = null;

/**
 * Records every event to an in-memory buffer instead of (or in addition to)
 * dispatching it, for tests and for local debugging. Returns a function
 * that stops capturing and restores normal dispatch.
 */
export function captureAnalyticsEvents(): { events: AnalyticsEvent[]; restore: () => void } {
  const events: AnalyticsEvent[] = [];
  capturedEvents = events;
  return {
    events,
    restore: () => {
      capturedEvents = null;
    },
  };
}

export function setAnalyticsDispatcher(dispatcher: Dispatcher): void {
  activeDispatcher = dispatcher;
}

export function resetAnalyticsDispatcher(): void {
  activeDispatcher = gtagDispatcher;
}

export function trackEvent(event: AnalyticsEvent): void {
  if (capturedEvents) {
    capturedEvents.push(event);
  }
  try {
    activeDispatcher(event);
  } catch {
    // Analytics must never be able to break the feature it's instrumenting.
  }
}

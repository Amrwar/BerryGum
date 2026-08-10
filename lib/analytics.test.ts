import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  trackEvent,
  captureAnalyticsEvents,
  setAnalyticsDispatcher,
  resetAnalyticsDispatcher,
} from "./analytics";

beforeEach(() => {
  resetAnalyticsDispatcher();
  vi.unstubAllGlobals();
});

afterEach(() => {
  resetAnalyticsDispatcher();
  vi.unstubAllGlobals();
});

describe("trackEvent", () => {
  it("forwards the event to window.gtag when it's available", () => {
    const gtagMock = vi.fn();
    vi.stubGlobal("window", { ...window, gtag: gtagMock });

    trackEvent({ name: "whatsapp_click", source: "navbar" });

    expect(gtagMock).toHaveBeenCalledWith("event", "whatsapp_click", { source: "navbar" });
  });

  it("Trap: never throws when no analytics provider is configured (window.gtag missing)", () => {
    vi.stubGlobal("window", { ...window, gtag: undefined });
    expect(() => trackEvent({ name: "whatsapp_click", source: "hero" })).not.toThrow();
  });

  it("Trap: never throws even if the dispatcher itself throws, so instrumenting a call site can't break it", () => {
    setAnalyticsDispatcher(() => {
      throw new Error("provider is down");
    });
    expect(() => trackEvent({ name: "whatsapp_click", source: "footer" })).not.toThrow();
  });

  it("separates the event name from its params before dispatching to gtag", () => {
    const gtagMock = vi.fn();
    vi.stubGlobal("window", { ...window, gtag: gtagMock });

    trackEvent({ name: "contact_form_submit", hasBudget: true, hasCompany: false });

    const [, eventName, params] = gtagMock.mock.calls[0];
    expect(eventName).toBe("contact_form_submit");
    expect(params).toEqual({ hasBudget: true, hasCompany: false });
    expect(params).not.toHaveProperty("name");
  });
});

describe("captureAnalyticsEvents", () => {
  it("records every tracked event in order", () => {
    const { events, restore } = captureAnalyticsEvents();

    trackEvent({ name: "language_switched", from: "en", to: "ar" });
    trackEvent({ name: "portfolio_item_viewed", itemName: "Arty Dental" });

    expect(events).toEqual([
      { name: "language_switched", from: "en", to: "ar" },
      { name: "portfolio_item_viewed", itemName: "Arty Dental" },
    ]);
    restore();
  });

  it("stops recording once restored", () => {
    const { events, restore } = captureAnalyticsEvents();
    trackEvent({ name: "contact_form_error", reason: "network" });
    restore();
    trackEvent({ name: "contact_form_error", reason: "server" });

    expect(events).toHaveLength(1);
  });
});

describe("setAnalyticsDispatcher / resetAnalyticsDispatcher", () => {
  it("allows swapping the dispatcher for a different provider", () => {
    const customDispatcher = vi.fn();
    setAnalyticsDispatcher(customDispatcher);

    trackEvent({ name: "pricing_estimate_requested", serviceType: "clinic", estimatedTotal: 25000 });

    expect(customDispatcher).toHaveBeenCalledWith({
      name: "pricing_estimate_requested",
      serviceType: "clinic",
      estimatedTotal: 25000,
    });
  });

  it("restores the default gtag dispatcher", () => {
    setAnalyticsDispatcher(vi.fn());
    resetAnalyticsDispatcher();

    const gtagMock = vi.fn();
    vi.stubGlobal("window", { ...window, gtag: gtagMock });
    trackEvent({ name: "whatsapp_click", source: "cta" });

    expect(gtagMock).toHaveBeenCalled();
  });
});

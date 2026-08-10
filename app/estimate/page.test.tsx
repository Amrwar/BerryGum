import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EstimatePage from "./page";
import { LanguageProvider } from "@/lib/LanguageContext";
import { captureAnalyticsEvents } from "@/lib/analytics";
import { calculateEstimate, formatEstimateAmount } from "@/lib/pricing/estimateCalculator";

function renderEstimatePage() {
  return render(
    <LanguageProvider>
      <EstimatePage />
    </LanguageProvider>
  );
}

function expectedRangeText(overrides: Partial<Parameters<typeof calculateEstimate>[0]>) {
  const estimate = calculateEstimate({
    serviceType: "clinic",
    pageCount: 5,
    selectedAddOnIds: [],
    isRush: false,
    ...overrides,
  });
  return `${formatEstimateAmount(estimate.low)} - ${formatEstimateAmount(estimate.high)}`;
}

describe("EstimatePage", () => {
  it("shows the clinic base estimate by default, with the base service type pressed", () => {
    renderEstimatePage();

    expect(screen.getByTestId("estimate-range").textContent).toBe(expectedRangeText({}));
    expect(screen.getByRole("button", { name: /clinic or medical practice/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("updates the estimate when a different service type is selected", () => {
    renderEstimatePage();

    fireEvent.click(screen.getByRole("button", { name: /restaurant or café/i }));

    expect(screen.getByTestId("estimate-range").textContent).toBe(
      expectedRangeText({ serviceType: "restaurant" })
    );
    expect(screen.getByRole("button", { name: /restaurant or café/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: /clinic or medical practice/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("adds an add-on's cost to the estimate and shows it in the breakdown", () => {
    renderEstimatePage();

    fireEvent.click(screen.getByLabelText(/bilingual content/i));

    expect(screen.getByTestId("estimate-range").textContent).toBe(
      expectedRangeText({ selectedAddOnIds: ["bilingual"] })
    );
    expect(screen.getAllByText(/\+6,000/).length).toBeGreaterThanOrEqual(2);
  });

  it("Trap: only charges for pages beyond the included page count", () => {
    renderEstimatePage();

    const pageInput = screen.getByLabelText(/how many pages do you need/i);
    fireEvent.change(pageInput, { target: { value: "7" } });

    expect(screen.getByTestId("estimate-range").textContent).toBe(
      expectedRangeText({ pageCount: 7 })
    );
    expect(screen.getByText("Extra pages (2)")).toBeInTheDocument();
  });

  it("adds a rush surcharge line and updates the total when rush delivery is checked", () => {
    renderEstimatePage();

    fireEvent.click(screen.getByLabelText(/i need this delivered faster than usual/i));

    expect(screen.getByTestId("estimate-range").textContent).toBe(
      expectedRangeText({ isRush: true })
    );
    expect(screen.getByText("Rush delivery surcharge")).toBeInTheDocument();
  });

  it("builds a WhatsApp link with the shop number and a pre-filled message summarizing the estimate", () => {
    renderEstimatePage();

    const link = screen.getByRole("link", { name: /send this estimate on whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/201107578212?text="));
    expect(link.getAttribute("href")).toContain(encodeURIComponent("Pages: 5"));
  });

  it("Trap: tracks pricing_estimate_requested with the current service type and total only when the WhatsApp CTA is clicked", () => {
    const { events, restore } = captureAnalyticsEvents();
    renderEstimatePage();

    fireEvent.click(screen.getByRole("button", { name: /restaurant or café/i }));
    const link = screen.getByRole("link", { name: /send this estimate on whatsapp/i });
    expect(events).toHaveLength(0);

    fireEvent.click(link);

    const estimate = calculateEstimate({
      serviceType: "restaurant",
      pageCount: 5,
      selectedAddOnIds: [],
      isRush: false,
    });
    expect(events).toContainEqual({
      name: "pricing_estimate_requested",
      serviceType: "restaurant",
      estimatedTotal: estimate.total,
    });
    restore();
  });

  it("links to /contact for visitors who want a precise quote instead", () => {
    renderEstimatePage();

    expect(screen.getByRole("link", { name: /talk to us directly/i })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});

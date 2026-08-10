import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import PricingCards from "./PricingCards";
import { LanguageProvider } from "@/lib/LanguageContext";
import en from "@/messages/en.json";

function renderPricing(showToggle?: boolean) {
  return render(
    <LanguageProvider>
      <PricingCards showToggle={showToggle} />
    </LanguageProvider>
  );
}

const oneTimePlans = Object.values(en.pricing.plans.oneTime);
const monthlyPlans = Object.values(en.pricing.plans.monthly);

describe("PricingCards", () => {
  it("shows the one-time plans by default", () => {
    renderPricing();
    for (const plan of oneTimePlans) {
      expect(screen.getByText(plan.name)).toBeInTheDocument();
    }
  });

  it("Trap: toggling to monthly swaps in the monthly plan set entirely, not just relabeling prices", () => {
    renderPricing();
    fireEvent.click(screen.getByRole("button", { name: "Monthly Management" }));

    for (const plan of monthlyPlans) {
      expect(screen.getByText(plan.name)).toBeInTheDocument();
    }
    // A one-time-only plan name should no longer be on the page unless it's shared verbatim.
    const uniqueOneTimeOnly = oneTimePlans.find(
      (p) => !monthlyPlans.some((m) => m.name === p.name)
    );
    if (uniqueOneTimeOnly) {
      expect(screen.queryByText(uniqueOneTimeOnly.name)).not.toBeInTheDocument();
    }
  });

  it("shows the contract-note badge only in monthly mode", () => {
    renderPricing();
    expect(screen.queryByText(en.pricing.contractNote)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Monthly Management" }));
    expect(screen.getByText(en.pricing.contractNote)).toBeInTheDocument();
  });

  it("Trap: marks exactly the second plan (index 1) as most popular", () => {
    renderPricing();
    const popularBadges = screen.getAllByText(en.pricing.popular);
    expect(popularBadges).toHaveLength(1);

    const popularPlanName = oneTimePlans[1].name;
    const card = screen.getByText(popularPlanName).closest("div.relative.rounded-2xl") as HTMLElement;
    expect(within(card).getByText(en.pricing.popular)).toBeInTheDocument();
  });

  it("hides the one-time/monthly toggle when showToggle is false", () => {
    renderPricing(false);
    expect(screen.queryByRole("button", { name: "Monthly Management" })).not.toBeInTheDocument();
    // Plans still render, defaulting to one-time.
    expect(screen.getByText(oneTimePlans[0].name)).toBeInTheDocument();
  });

  it("each plan's WhatsApp CTA links to the shop number with that plan's name in the message", () => {
    renderPricing();
    const planName = oneTimePlans[0].name;
    const card = screen.getByText(planName).closest("div.relative.rounded-2xl") as HTMLElement;
    const cta = within(card).getByRole("link", { name: /get started/i });
    const href = cta.getAttribute("href")!;

    expect(href).toContain("https://wa.me/201107578212?text=");
    expect(decodeURIComponent(href)).toContain(planName);
  });

  it("the custom-quote link points to the contact page", () => {
    renderPricing();
    expect(screen.getByText(en.pricing.customNote).closest("div")).toBeInTheDocument();
    const contactLink = screen.getAllByRole("link").find((link) => link.getAttribute("href") === "/contact");
    expect(contactLink).toBeDefined();
  });
});

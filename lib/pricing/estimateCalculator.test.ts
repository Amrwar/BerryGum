import { describe, it, expect } from "vitest";
import { calculateEstimate, formatEstimateAmount } from "./estimateCalculator";
import {
  serviceTypeBaseRates,
  addOns,
  includedPages,
  perExtraPageCost,
  rushMultiplier,
  rangeSpreadPercent,
} from "./estimatorConfig";

const baseInput = {
  serviceType: "clinic" as const,
  selectedAddOnIds: [],
  pageCount: includedPages,
  isRush: false,
};

describe("calculateEstimate", () => {
  it("uses the service type's base rate as the subtotal when nothing else is selected", () => {
    const result = calculateEstimate(baseInput);
    expect(result.baseRate).toBe(serviceTypeBaseRates.clinic);
    expect(result.subtotal).toBe(serviceTypeBaseRates.clinic);
  });

  it("looks up the correct base rate for each service type", () => {
    for (const [serviceType, rate] of Object.entries(serviceTypeBaseRates)) {
      const result = calculateEstimate({ ...baseInput, serviceType: serviceType as never });
      expect(result.baseRate).toBe(rate);
    }
  });

  it("adds the cost of every selected add-on to the subtotal", () => {
    const [first, second] = addOns;
    const result = calculateEstimate({
      ...baseInput,
      selectedAddOnIds: [first.id, second.id],
    });
    expect(result.subtotal).toBe(serviceTypeBaseRates.clinic + first.cost + second.cost);
    expect(result.addOnLines).toHaveLength(2);
  });

  it("ignores an unknown add-on id rather than throwing", () => {
    const result = calculateEstimate({ ...baseInput, selectedAddOnIds: ["not-a-real-addon"] });
    expect(result.subtotal).toBe(serviceTypeBaseRates.clinic);
    expect(result.addOnLines).toHaveLength(0);
  });

  it("Trap: the first N pages are already covered by the base rate, so pageCount at exactly the included threshold adds nothing", () => {
    const result = calculateEstimate({ ...baseInput, pageCount: includedPages });
    expect(result.extraPageCount).toBe(0);
    expect(result.extraPagesCost).toBe(0);
  });

  it("Trap: only pages BEYOND the included threshold are charged, not the full page count", () => {
    const result = calculateEstimate({ ...baseInput, pageCount: includedPages + 3 });
    expect(result.extraPageCount).toBe(3);
    expect(result.extraPagesCost).toBe(3 * perExtraPageCost);
    expect(result.subtotal).toBe(serviceTypeBaseRates.clinic + 3 * perExtraPageCost);
  });

  it("Trap: a page count below the included threshold never produces a negative extra-page charge", () => {
    const result = calculateEstimate({ ...baseInput, pageCount: 1 });
    expect(result.extraPageCount).toBe(0);
    expect(result.extraPagesCost).toBe(0);
  });

  it("floors a fractional page count instead of rejecting it", () => {
    const result = calculateEstimate({ ...baseInput, pageCount: includedPages + 2.9 });
    expect(result.extraPageCount).toBe(2);
  });

  it("treats a zero or negative page count as at least 1 page", () => {
    const zero = calculateEstimate({ ...baseInput, pageCount: 0 });
    const negative = calculateEstimate({ ...baseInput, pageCount: -5 });
    expect(zero.extraPageCount).toBe(0);
    expect(negative.extraPageCount).toBe(0);
  });

  it("Trap: the rush surcharge is a percentage of the FULL subtotal (base + add-ons + extra pages), not just the base rate", () => {
    const [addOn] = addOns;
    const withoutRush = calculateEstimate({
      ...baseInput,
      selectedAddOnIds: [addOn.id],
      pageCount: includedPages + 2,
      isRush: false,
    });
    const withRush = calculateEstimate({
      ...baseInput,
      selectedAddOnIds: [addOn.id],
      pageCount: includedPages + 2,
      isRush: true,
    });
    const expectedSurcharge = Math.round(withoutRush.subtotal * (rushMultiplier - 1));
    expect(withRush.rushSurcharge).toBe(expectedSurcharge);
    expect(withRush.total).toBe(withoutRush.subtotal + expectedSurcharge);
  });

  it("applies no rush surcharge when isRush is false", () => {
    const result = calculateEstimate({ ...baseInput, isRush: false });
    expect(result.rushSurcharge).toBe(0);
    expect(result.total).toBe(result.subtotal);
  });

  it("Trap: the displayed range is centered on the total, symmetric above and below by the configured spread", () => {
    const result = calculateEstimate(baseInput);
    const expectedLow = Math.round(result.total * (1 - rangeSpreadPercent));
    const expectedHigh = Math.round(result.total * (1 + rangeSpreadPercent));
    expect(result.low).toBe(expectedLow);
    expect(result.high).toBe(expectedHigh);
    expect(result.low).toBeLessThan(result.total);
    expect(result.high).toBeGreaterThan(result.total);
  });

  it("combines service type, add-ons, extra pages, and rush together correctly end to end", () => {
    const result = calculateEstimate({
      serviceType: "systems",
      selectedAddOnIds: ["ecommerce", "seo"],
      pageCount: includedPages + 4,
      isRush: true,
    });
    const ecommerce = addOns.find((a) => a.id === "ecommerce")!;
    const seo = addOns.find((a) => a.id === "seo")!;
    const expectedSubtotal =
      serviceTypeBaseRates.systems + ecommerce.cost + seo.cost + 4 * perExtraPageCost;
    expect(result.subtotal).toBe(expectedSubtotal);
    expect(result.total).toBe(expectedSubtotal + Math.round(expectedSubtotal * (rushMultiplier - 1)));
  });
});

describe("formatEstimateAmount", () => {
  it("formats a number with thousands separators", () => {
    expect(formatEstimateAmount(32000)).toBe("32,000");
  });

  it("rounds a fractional amount before formatting", () => {
    expect(formatEstimateAmount(31999.6)).toBe("32,000");
  });

  it("formats numbers under 1,000 without a separator", () => {
    expect(formatEstimateAmount(500)).toBe("500");
  });
});

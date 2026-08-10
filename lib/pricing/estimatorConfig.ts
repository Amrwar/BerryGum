/**
 * Starting-point rates for the quote estimator (app/estimate).
 *
 * TODO before launch: these numbers are placeholders based on the price
 * ranges already shown on /pricing (see components/PricingCards.tsx and
 * messages/en.json's `pricing.plans`) — confirm each figure matches your
 * actual current rates and adjust before treating the estimator's output as
 * a real quote. Nothing elsewhere in the codebase depends on these exact
 * values; they're isolated here specifically so they're easy to find and
 * edit in one place.
 */

export type ServiceType = "clinic" | "restaurant" | "startup" | "systems" | "other";

export const serviceTypeBaseRates: Record<ServiceType, number> = {
  clinic: 25000,
  restaurant: 22000,
  startup: 30000,
  systems: 45000,
  other: 20000,
};

export interface AddOn {
  id: string;
  labelKey: string; // matches a messages/*.json translation key, not hardcoded copy
  cost: number;
}

export const addOns: AddOn[] = [
  { id: "bilingual", labelKey: "estimate.addOns.bilingual", cost: 6000 },
  { id: "booking", labelKey: "estimate.addOns.booking", cost: 9000 },
  { id: "ecommerce", labelKey: "estimate.addOns.ecommerce", cost: 15000 },
  { id: "seo", labelKey: "estimate.addOns.seo", cost: 5000 },
  { id: "customIllustration", labelKey: "estimate.addOns.customIllustration", cost: 7000 },
  { id: "monthlyMaintenance", labelKey: "estimate.addOns.monthlyMaintenance", cost: 3000 },
];

/** Extra pages beyond the first 5 (already covered by the base rate). */
export const includedPages = 5;
export const perExtraPageCost = 1200;

/** A rushed timeline (under the studio's normal delivery window) costs more, not less. */
export const rushMultiplier = 1.25;

/**
 * The estimate is deliberately shown as a range, not one falsely-precise
 * number — final scope always shifts a real quote up or down.
 */
export const rangeSpreadPercent = 0.15;

export const currency = "EGP";

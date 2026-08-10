import {
  serviceTypeBaseRates,
  addOns,
  includedPages,
  perExtraPageCost,
  rushMultiplier,
  rangeSpreadPercent,
  currency,
  type ServiceType,
} from "./estimatorConfig";

export interface EstimateInput {
  serviceType: ServiceType;
  selectedAddOnIds: string[];
  pageCount: number;
  isRush: boolean;
}

export interface EstimateLineItem {
  labelKey: string;
  cost: number;
}

export interface EstimateResult {
  baseRate: number;
  addOnLines: EstimateLineItem[];
  extraPagesCost: number;
  extraPageCount: number;
  subtotal: number;
  rushSurcharge: number;
  total: number;
  low: number;
  high: number;
  currency: string;
}

/**
 * Pure calculation with no side effects, so the same logic drives both the
 * live-updating estimate page and (by construction) anything else that
 * needs to reproduce a quote later without re-deriving the rules.
 */
export function calculateEstimate(input: EstimateInput): EstimateResult {
  const baseRate = serviceTypeBaseRates[input.serviceType];

  const addOnLines: EstimateLineItem[] = addOns
    .filter((addOn) => input.selectedAddOnIds.includes(addOn.id))
    .map((addOn) => ({ labelKey: addOn.labelKey, cost: addOn.cost }));
  const addOnsCost = addOnLines.reduce((sum, line) => sum + line.cost, 0);

  const safePageCount = Math.max(1, Math.floor(input.pageCount) || 1);
  const extraPageCount = Math.max(0, safePageCount - includedPages);
  const extraPagesCost = extraPageCount * perExtraPageCost;

  const subtotal = baseRate + addOnsCost + extraPagesCost;
  const rushSurcharge = input.isRush ? Math.round(subtotal * (rushMultiplier - 1)) : 0;
  const total = subtotal + rushSurcharge;

  const low = Math.round(total * (1 - rangeSpreadPercent));
  const high = Math.round(total * (1 + rangeSpreadPercent));

  return {
    baseRate,
    addOnLines,
    extraPagesCost,
    extraPageCount,
    subtotal,
    rushSurcharge,
    total,
    low,
    high,
    currency,
  };
}

/** Formats a number with thousands separators, e.g. 32000 -> "32,000". */
export function formatEstimateAmount(amount: number): string {
  return Math.round(amount).toLocaleString("en-US");
}

import { describe, it, expect } from "vitest";
import en from "./en.json";
import ar from "./ar.json";

function flattenKeys(obj: Record<string, unknown>, prefix = ""): Set<string> {
  const keys = new Set<string>();
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const nested of flattenKeys(value as Record<string, unknown>, path)) {
        keys.add(nested);
      }
    } else {
      keys.add(path);
    }
  }
  return keys;
}

describe("i18n message parity between en.json and ar.json", () => {
  it("Trap: every key present in en.json also exists in ar.json, and vice versa", () => {
    const enKeys = flattenKeys(en);
    const arKeys = flattenKeys(ar);

    const missingFromAr = [...enKeys].filter((k) => !arKeys.has(k));
    const missingFromEn = [...arKeys].filter((k) => !enKeys.has(k));

    expect(missingFromAr).toEqual([]);
    expect(missingFromEn).toEqual([]);
  });

  it("has no blank string values in either locale, since a blank translation renders as invisible UI text", () => {
    function collectBlanks(obj: Record<string, unknown>, prefix = ""): string[] {
      const blanks: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === "object" && !Array.isArray(value)) {
          blanks.push(...collectBlanks(value as Record<string, unknown>, path));
        } else if (typeof value === "string" && value.trim() === "") {
          blanks.push(path);
        }
      }
      return blanks;
    }
    expect(collectBlanks(en)).toEqual([]);
    expect(collectBlanks(ar)).toEqual([]);
  });

  it("shares the same top-level section names between both locales", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(ar).sort());
  });
});

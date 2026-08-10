import { describe, it, expect } from "vitest";
import sitemap, { staticRoutes } from "./sitemap";
import { siteConfig } from "@/lib/config";

describe("sitemap", () => {
  it("emits one entry per static route", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(staticRoutes.length);
  });

  it("prefixes every URL with the configured site origin", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url.startsWith(siteConfig.url)).toBe(true);
    }
  });

  it("includes the homepage at the highest priority", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url === siteConfig.url + "/");
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1);
  });

  it("Trap: every declared route has a priority between 0 and 1 inclusive, since Google ignores values outside that range", () => {
    for (const route of staticRoutes) {
      expect(route.priority).toBeGreaterThanOrEqual(0);
      expect(route.priority).toBeLessThanOrEqual(1);
    }
  });

  it("includes all four service-vertical pages", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${siteConfig.url}/services/clinics`);
    expect(urls).toContain(`${siteConfig.url}/services/restaurants`);
    expect(urls).toContain(`${siteConfig.url}/services/startups`);
    expect(urls).toContain(`${siteConfig.url}/services/systems`);
  });

  it("has no duplicate paths", () => {
    const paths = staticRoutes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("sets a lastModified date on every entry", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });
});

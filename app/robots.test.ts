import { describe, it, expect } from "vitest";
import robots from "./robots";
import { siteConfig } from "@/lib/config";

describe("robots", () => {
  it("allows crawling the whole site by default", () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("Trap: disallows crawling the internal API routes, which have no SEO value and shouldn't be indexed", () => {
    const result = robots();
    expect(result.rules).toMatchObject({ disallow: "/api/" });
  });

  it("points to the sitemap at the configured site origin", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});

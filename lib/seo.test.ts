import { describe, it, expect } from "vitest";
import { generateSEO, structuredData } from "./seo";
import { siteConfig } from "./config";

describe("generateSEO", () => {
  it("falls back to the site name and tagline when no title is given", () => {
    const meta = generateSEO();
    expect(meta.title).toBe(`${siteConfig.name} - ${siteConfig.tagline}`);
  });

  it("appends the site name to a provided title", () => {
    const meta = generateSEO({ title: "Portfolio" });
    expect(meta.title).toBe(`Portfolio | ${siteConfig.name}`);
  });

  it("falls back to the site description when no description is given", () => {
    const meta = generateSEO();
    expect(meta.description).toBe(siteConfig.description);
  });

  it("uses a provided description instead of the default", () => {
    const meta = generateSEO({ description: "Custom page description" });
    expect(meta.description).toBe("Custom page description");
  });

  it("merges provided keywords with the default keyword list rather than replacing it", () => {
    const meta = generateSEO({ keywords: ["custom keyword"] });
    expect(meta.keywords).toContain("custom keyword");
    expect(meta.keywords).toContain("web design Egypt");
    expect((meta.keywords as string[]).length).toBeGreaterThan(1);
  });

  it("uses an empty keyword list plus defaults when none are given", () => {
    const meta = generateSEO();
    expect(meta.keywords).toEqual(
      expect.arrayContaining(["web design Egypt", "website development Cairo"])
    );
  });

  it("defaults ogImage to /og-image.jpg", () => {
    const meta = generateSEO();
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/og-image.jpg" }),
    ]);
    expect(meta.twitter?.images).toEqual(["/og-image.jpg"]);
  });

  it("uses a provided ogImage instead of the default", () => {
    const meta = generateSEO({ ogImage: "/custom.jpg" });
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/custom.jpg" }),
    ]);
  });

  it("indexes and follows by default", () => {
    const meta = generateSEO();
    expect(meta.robots).toMatchObject({ index: true, follow: true });
    expect(meta.robots).toMatchObject({
      googleBot: expect.objectContaining({ index: true, follow: true }),
    });
  });

  it("Trap: noIndex flips both the top-level and googleBot-nested index/follow flags", () => {
    const meta = generateSEO({ noIndex: true });
    expect(meta.robots).toMatchObject({ index: false, follow: false });
    expect(meta.robots).toMatchObject({
      googleBot: expect.objectContaining({ index: false, follow: false }),
    });
  });

  it("sets the canonical alternate to the site root", () => {
    const meta = generateSEO();
    expect(meta.alternates).toEqual({ canonical: "/" });
  });

  it("builds metadataBase from the configured site URL", () => {
    const meta = generateSEO();
    expect(meta.metadataBase?.toString()).toBe(`${siteConfig.url}/`);
  });

  it("mirrors title and description across openGraph and twitter blocks", () => {
    const meta = generateSEO({ title: "Pricing", description: "See our plans" });
    expect(meta.openGraph?.title).toBe(`Pricing | ${siteConfig.name}`);
    expect(meta.openGraph?.description).toBe("See our plans");
    expect(meta.twitter?.title).toBe(`Pricing | ${siteConfig.name}`);
    expect(meta.twitter?.description).toBe("See our plans");
  });

  it("uses the summary_large_image twitter card type", () => {
    const meta = generateSEO();
    const twitter = meta.twitter as { card?: string } | undefined;
    expect(twitter?.card).toBe("summary_large_image");
  });

  it("disables format detection for email, address, and telephone", () => {
    const meta = generateSEO();
    expect(meta.formatDetection).toEqual({
      email: false,
      address: false,
      telephone: false,
    });
  });
});

describe("structuredData.organization", () => {
  it("is a schema.org Organization referencing the configured site identity", () => {
    expect(structuredData.organization["@type"]).toBe("Organization");
    expect(structuredData.organization.name).toBe(siteConfig.name);
    expect(structuredData.organization.url).toBe(siteConfig.url);
  });

  it("lists social links under sameAs", () => {
    expect(structuredData.organization.sameAs).toEqual(
      Object.values(siteConfig.social)
    );
  });

  it("exposes the configured phone number as the sales contact point", () => {
    expect(structuredData.organization.contactPoint).toMatchObject({
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "sales",
    });
  });

  it("advertises both English and Arabic as available languages", () => {
    expect(structuredData.organization.contactPoint.availableLanguage).toEqual([
      "English",
      "Arabic",
    ]);
  });
});

describe("structuredData.localBusiness", () => {
  it("is a schema.org ProfessionalService referencing the configured contact details", () => {
    expect(structuredData.localBusiness["@type"]).toBe("ProfessionalService");
    expect(structuredData.localBusiness.telephone).toBe(siteConfig.phone);
    expect(structuredData.localBusiness.email).toBe(siteConfig.email);
  });

  it("declares a Cairo, Egypt postal address", () => {
    expect(structuredData.localBusiness.address).toMatchObject({
      addressLocality: "Cairo",
      addressCountry: "EG",
    });
  });
});

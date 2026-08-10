import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

interface StaticRoute {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

/**
 * Every statically-generated route on the site, kept in one place so a new
 * page only has to be added here once instead of being forgotten out of the
 * sitemap. `/` gets the highest priority, service-vertical landing pages are
 * weighted just below it since they're the primary conversion paths, and
 * everything else falls back to a moderate default.
 */
export const staticRoutes: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services/clinics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/restaurants", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/startups", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/systems", changeFrequency: "monthly", priority: 0.8 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.7 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.7 },
  { path: "/estimate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

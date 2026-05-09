import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/contact", "/courses"]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.7,
  }))
}

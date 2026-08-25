import type { MetadataRoute } from "next";

const BASE = "https://nineshardwarelab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/equipment", "/industries", "/repair-process", "/failure-analysis", "/knowledge-centre", "/careers", "/contact", "/rma", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" || route === "/services" ? 0.9 : 0.7,
  }));
}

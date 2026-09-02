import type { MetadataRoute } from "next";

const BASE = "https://nineshardwarelab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/equipment", "/industries", "/why-repair", "/gallery", "/repair-process", "/failure-analysis", "/knowledge-centre", "/knowledge-centre/when-repair-beats-replacement", "/knowledge-centre/repair-esg-e-waste", "/knowledge-centre/preparing-equipment-for-assessment", "/careers", "/contact", "/rma", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" || route === "/services" ? 0.9 : 0.7,
  }));
}

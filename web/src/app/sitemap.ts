import { MetadataRoute } from "next";

import { api } from "@/services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await api.get<Orphanage[], 'orphanages'>(`/orphanages`);

  const orphanages = data.orphanages.map(item => ({
    url: `http://localhost:3000/orphanages/${item.id}`,
    changeFrequency: "weekly",
    lastModified: item.updatedAt
  })) as MetadataRoute.Sitemap;

  const routes = ['', 'map', 'orphanages'].map(route => ({
    url: `http://localhost:3000/${route}`,
    changeFrequency: "weekly",
    lastModified: new Date().toISOString()
  })) as MetadataRoute.Sitemap;

  return [...routes, ...orphanages];
}
import { getProvinces, getRegions } from "@/utils/dataUtils";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://phzipcodes.com";

  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/regions`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/provinces`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/municipalities`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Regional pages
  const regions = getRegions();
  const regionPages = regions.map((region) => ({
    url: `${baseUrl}/provinces?region=${encodeURIComponent(region.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Provincial pages
  const provinces = getProvinces();
  const provincePages = provinces.map((province) => ({
    url: `${baseUrl}/municipalities?province=${encodeURIComponent(
      province.name
    )}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...corePages, ...regionPages, ...provincePages];
}

import phZipCodesData from "../data/ph_zip_codes.json";
import { Municipality, Province, Region, ZipCode } from "../types";

// Flatten the hierarchical JSON into an array of ZipCode objects
function flattenZipCodes(
  data: Record<string, Record<string, Record<string, string[]>>>
): ZipCode[] {
  const result: ZipCode[] = [];
  for (const region in data) {
    if (!region) continue;
    const provinces = data[region];
    for (const province in provinces) {
      if (!province) continue;
      const municipalities = provinces[province];
      for (const municipality in municipalities) {
        if (!municipality) continue;
        const zipCodes: string[] = municipalities[municipality];
        for (const zipCode of zipCodes) {
          if (!zipCode) continue;
          result.push({
            region,
            province,
            municipality,
            zipCode,
          });
        }
      }
    }
  }
  return result;
}
const zipCodes = flattenZipCodes(phZipCodesData);

// Get all unique regions
export const getRegions = (): Region[] => {
  const regionMap = new Map<string, Set<string>>();

  zipCodes.forEach((item) => {
    if (!regionMap.has(item.region)) {
      regionMap.set(item.region, new Set());
    }
    regionMap.get(item.region)?.add(item.province);
  });

  return Array.from(regionMap.entries()).map(([name, provinceSet]) => ({
    name,
    provinces: Array.from(provinceSet),
  }));
};

// Get all provinces, optionally filtered by region
export const getProvinces = (regionFilter?: string): Province[] => {
  const provinceMap = new Map<
    string,
    { region: string; municipalities: Set<string> }
  >();

  zipCodes.forEach((item) => {
    if (regionFilter && item.region !== regionFilter) return;

    if (!provinceMap.has(item.province)) {
      provinceMap.set(item.province, {
        region: item.region,
        municipalities: new Set(),
      });
    }
    provinceMap.get(item.province)?.municipalities.add(item.municipality);
  });

  return Array.from(provinceMap.entries()).map(([name, data]) => ({
    name,
    region: data.region,
    municipalities: Array.from(data.municipalities),
  }));
};

// Get all municipalities, optionally filtered by province
export const getMunicipalities = (provinceFilter?: string): Municipality[] => {
  const municipalityMap = new Map<
    string,
    { province: string; zipCode: string }
  >();

  zipCodes.forEach((item) => {
    if (provinceFilter && item.province !== provinceFilter) return;

    const key = `${item.municipality}-${item.province}`;
    if (!municipalityMap.has(key)) {
      municipalityMap.set(key, {
        province: item.province,
        zipCode: item.zipCode,
      });
    }
  });

  return Array.from(municipalityMap.entries()).map(([key, data]) => ({
    name: key.split("-")[0],
    province: data.province,
    region:
      zipCodes.find((item) => item.province === data.province)?.region || "",
    zipCode: data.zipCode,
  }));
};

// Search functionality
export const searchZipCodes = (query: string): ZipCode[] => {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();
  return zipCodes.filter(
    (item) =>
      item.zipCode.includes(lowerQuery) ||
      item.municipality.toLowerCase().includes(lowerQuery) ||
      item.province.toLowerCase().includes(lowerQuery) ||
      item.region.toLowerCase().includes(lowerQuery)
  );
};

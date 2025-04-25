"use client";

import BackButton from "@/components/BackButton";
import BackToTop from "@/components/BackToTop";
import Card from "@/components/Card";
import { ResultsGrid } from "@/components/ResultsGrid";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import Spinner from "@/components/Spinner";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Municipality } from "../../types";
import { getMunicipalities } from "../../utils/dataUtils";

function Municipalities() {
  const searchParams = useSearchParams();
  const provinceParam = searchParams.get("province") || undefined;

  const [allMunicipalities, setAllMunicipalities] = useState<Municipality[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAllMunicipalities(getMunicipalities(provinceParam));
  }, [provinceParam]);

  const debouncedQuery = useDebouncedValue(searchQuery ?? "", 350);

  const filteredMunicipalities = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    if (query.length >= 3) {
      return allMunicipalities.filter(
        (municipality) =>
          municipality.name.toLowerCase().includes(query) ||
          municipality.province.toLowerCase().includes(query) ||
          municipality.zipCode.includes(query)
      );
    }
    return allMunicipalities;
  }, [allMunicipalities, debouncedQuery]);

  const handleClear = () => {
    setSearchQuery(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-muted/40">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
        <div className="w-full flex items-center mb-2">
          <BackButton />
        </div>

        <SectionHeader
          icon={
            <MapPin className="w-12 h-12 text-primary" aria-hidden="true" />
          }
          title="Cities and Municipalities of the Philippines"
          subtitle="Search by name, zip code, or province."
          aria-label="Cities and Municipalities of the Philippines"
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-2xl mx-auto mb-8"
          autoComplete="off"
        >
          <SearchBar
            value={searchQuery ?? ""}
            onChange={setSearchQuery}
            onClear={handleClear}
            onKeyDown={handleKeyDown}
            placeholder="Type a city, municipality, zip code, or province…"
            aria-label="Search cities and municipalities"
            autoFocus
          />
        </form>

        <div className="w-full min-h-[200px] flex items-center justify-center">
          <ResultsGrid
            items={filteredMunicipalities}
            ariaLabel="Municipalities"
            emptyMessage={
              <p className="text-center text-gray-500 mt-8">
                No municipalities found matching your search.
              </p>
            }
            renderItem={(municipality) => (
              <Card
                key={`${municipality.name}-${municipality.zipCode}`}
                title={municipality.name}
                zipCode={municipality.zipCode}
                additionalInfo={`Province: ${municipality.province}`}
              />
            )}
          />
        </div>
      </div>

      <BackToTop />
    </main>
  );
}

export default function MunicipalitiesPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Municipalities />
    </Suspense>
  );
}

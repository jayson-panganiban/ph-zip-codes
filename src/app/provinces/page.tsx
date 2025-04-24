"use client";

import BackButton from "@/components/BackButton";
import BackToTop from "@/components/BackToTop";
import Card from "@/components/Card";
import { ResultsGrid } from "@/components/ResultsGrid";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import Spinner from "@/components/Spinner";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Map } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Province } from "../../types";
import { getProvinces } from "../../utils/dataUtils";

function Provinces() {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region") || undefined;

  const [allProvinces, setAllProvinces] = useState<Province[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAllProvinces(getProvinces(regionParam));
  }, [regionParam]);

  const debouncedQuery = useDebouncedValue(searchQuery ?? "", 350);

  const filteredProvinces = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    if (query.length >= 3) {
      return allProvinces.filter(
        (province) =>
          province.name.toLowerCase().includes(query) ||
          province.region.toLowerCase().includes(query)
      );
    }
    return allProvinces;
  }, [allProvinces, debouncedQuery]);

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
          icon={<Map className="w-12 h-12 text-primary" aria-hidden="true" />}
          title="Provinces of the Philippines"
          subtitle="Search for provinces by name or region."
          aria-label="Provinces of the Philippines"
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
            placeholder="Type a province or region…"
            aria-label="Search provinces"
            autoFocus
          />
        </form>

        <ResultsGrid
          items={filteredProvinces}
          ariaLabel="Provinces"
          emptyMessage={
            <p className="text-center text-gray-500 mt-8">
              No provinces found matching your search.
            </p>
          }
          renderItem={(province) => (
            <Card
              key={province.name}
              title={province.name}
              subtitle={province.region}
              additionalInfo={`${province.municipalities.length} municipalities`}
              link={`/municipalities?province=${encodeURIComponent(
                province.name
              )}`}
              linkText="Browse Municipalities →"
            />
          )}
        />

        <BackToTop />
      </div>
    </main>
  );
}

export default function ProvincesPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Provinces />
    </Suspense>
  );
}

"use client";
import BackButton from "@/components/BackButton";
import BackToTop from "@/components/BackToTop";
import Card from "@/components/Card";
import { ResultsGrid } from "@/components/ResultsGrid";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import Spinner from "@/components/Spinner";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Globe } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Region } from "../../types";
import { getRegions } from "../../utils/dataUtils";

function Regions() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Load all regions on mount
  useEffect(() => {
    const allRegions = getRegions();
    setRegions(allRegions);
    setFilteredRegions(allRegions);
  }, []);

  // Debounced search (min 2 chars)
  const debouncedQuery = useDebouncedValue(searchQuery, 250);

  // Filter regions on search query change
  useEffect(() => {
    const query = debouncedQuery.trim().toLowerCase();
    if (query.length >= 2) {
      setFilteredRegions(
        regions.filter((region) => region.name.toLowerCase().includes(query))
      );
    } else {
      setFilteredRegions(regions);
    }
  }, [debouncedQuery, regions]);

  // Clear search query and reset filtered regions
  const handleClear = () => {
    setSearchQuery("");
    setFilteredRegions(regions);
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
          icon={<Globe className="w-12 h-12 text-primary" aria-hidden="true" />}
          title="Regions of the Philippines"
          subtitle="Browse all regions below."
          aria-label="Regions of the Philippines"
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-2xl mx-auto mb-8"
          autoComplete="off"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleClear}
            onKeyDown={handleKeyDown}
            placeholder="Type a region…"
            aria-label="Search regions"
            autoFocus
          />
        </form>

        <ResultsGrid
          items={filteredRegions}
          ariaLabel="Regions"
          emptyMessage={
            <p className="text-center text-gray-500 mt-8">
              No regions found matching your search.
            </p>
          }
          renderItem={(region) => (
            <Card
              key={region.name}
              title={region.name}
              subtitle={`${region.provinces.length} provinces`}
              link={`/provinces?region=${encodeURIComponent(region.name)}`}
              linkText="Browse Provinces →"
            />
          )}
        />
      </div>
      <BackToTop />
    </main>
  );
}

export default function RegionsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Regions />
    </Suspense>
  );
}

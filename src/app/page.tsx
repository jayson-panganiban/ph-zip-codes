"use client";

import BackToTop from "@/components/BackToTop";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { ZipCode } from "@/types";
import { searchZipCodes } from "@/utils/dataUtils";
import { Globe, Map, MapPin, SearchX } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

function Home() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const debouncedQuery = useDebouncedValue(searchQuery ?? "", 350);

  const results = useMemo<ZipCode[]>(() => {
    const trimmedQuery = debouncedQuery.trim().toLowerCase();
    if (trimmedQuery.length >= 3) {
      return searchZipCodes(trimmedQuery);
    }
    return [];
  }, [debouncedQuery]);

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-muted/40">
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto">
        <h1 className="font-satoshi text-4xl md:text-5xl font-bold mb-4 tracking-tight text-balance text-center">
          Find Philippines Zip Codes
        </h1>
        <p className="text-muted-foreground mb-8 text-center max-w-lg">
          Search for zip codes by location or browse through regions, provinces,
          and municipalities.
        </p>

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

        {/* Navigations */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full max-w-xl">
          <Button
            asChild
            variant="default"
            className="min-w-[160px] transition-transform hover:scale-[1.03] hover:shadow-lg rounded-lg flex items-center gap-2"
          >
            <Link href="/regions">
              <Globe className="w-5 h-5 mr-2" aria-hidden="true" />
              Browse Regions
            </Link>
          </Button>
          <Button
            asChild
            variant="default"
            className="min-w-[160px] transition-transform hover:scale-[1.03] hover:shadow-lg rounded-lg flex items-center gap-2"
          >
            <Link href="/provinces">
              <Map className="w-5 h-5 mr-2" aria-hidden="true" />
              Browse Provinces
            </Link>
          </Button>
          <Button
            asChild
            variant="default"
            className="min-w-[160px] transition-transform hover:scale-[1.03] hover:shadow-lg rounded-lg flex items-center gap-2"
          >
            <Link href="/municipalities">
              <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
              Browse Municipalities
            </Link>
          </Button>
        </div>

        {/* Results */}
        <div className="w-full mt-10">
          {results.length > 0 ? (
            <div
              className="animate-fade-in"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex flex-col items-center mb-4">
                <h2 className="text-xl font-semibold text-center">
                  Found {results.length} result{results.length > 1 ? "s" : ""}{" "}
                  for &quot;{debouncedQuery.trim()}&quot;
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result, index) => (
                  <Card
                    key={`${result.region}-${result.province}-${result.municipality}-${result.zipCode}-${index}`}
                    title={result.municipality}
                    zipCode={result.zipCode}
                    subtitle={result.province}
                    additionalInfo={result.region}
                  />
                ))}
              </div>
            </div>
          ) : (
            debouncedQuery.trim().length >= 3 && (
              <div
                className="flex flex-col items-center mt-8 animate-fade-in"
                aria-live="polite"
                aria-atomic="true"
              >
                <SearchX
                  className="w-10 h-10 text-muted-foreground mb-2"
                  aria-hidden="true"
                />
                <p className="text-center text-gray-500 font-medium">
                  No results found for &quot;{debouncedQuery.trim()}&quot;.
                  <br />
                  <span className="text-sm text-muted-foreground">
                    Try a different search term or check your spelling.
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <BackToTop />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Home />
    </Suspense>
  );
}

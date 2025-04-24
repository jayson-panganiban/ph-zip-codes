"use client";

import BackToTop from "@/components/BackToTop";
import SearchBar from "@/components/SearchBar";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { ZipCode } from "@/types";
import { searchZipCodes } from "@/utils/dataUtils";
import { Globe, Mail, Map, MapPin, SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function Home() {
  const router = useRouter();
  const [query, setQuery] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const debouncedQuery = useDebouncedValue(query ?? "", 250);
  const [results, setResults] = useState<ZipCode[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // On mount, initialize query from search params (client only)
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    if (query === null) return; // Don't run until query is initialized
    const trimmed = debouncedQuery.trim();
    if (trimmed.length >= 3) {
      setResults(searchZipCodes(trimmed));
      router.replace(`/?q=${encodeURIComponent(trimmed)}`);
    } else {
      setResults([]);
      if (trimmed.length === 0) {
        router.replace("/");
      }
    }
  }, [debouncedQuery, router, query]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    router.replace("/");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  if (query === null) return null;

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
            value={query ?? ""}
            onChange={setQuery}
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
                  <div
                    key={`${result.region}-${result.province}-${result.municipality}-${result.zipCode}-${index}`}
                    className="bg-card border border-border rounded-xl shadow p-4 flex flex-col gap-2"
                    aria-label={`Result for ${result.municipality}`}
                  >
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <Mail
                        className="w-5 h-5 text-primary"
                        aria-hidden="true"
                      />
                      {result.municipality}
                    </div>
                    <div className="flex items-center gap-2 text-base">
                      <MapPin
                        className="w-4 h-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="font-mono">{result.zipCode}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Map className="w-4 h-4" aria-hidden="true" />
                      {result.province}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="w-4 h-4" aria-hidden="true" />
                      {result.region}
                    </div>
                  </div>
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

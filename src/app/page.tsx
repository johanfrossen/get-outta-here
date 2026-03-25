"use client";

import { SearchForm } from "@/components/search";
import { ResultsGrid } from "@/components/flights";
import { HeroText } from "@/components/animations";
import { useFlightSearch } from "@/hooks/useFlightSearch";

export default function Home() {
  const { flights, isLoading, hasSearched, source, search } =
    useFlightSearch();

  return (
    <main className="min-h-screen bg-background px-[16px] pt-[48px] xl:px-[24px]">
      <HeroText
        text="GET OUTTA HERE"
        className="text-accent text-[27px] xl:text-[41px] font-extralight italic text-left xl:text-center mb-[48px]"
      />

      <SearchForm onSearch={search} isLoading={isLoading} />

      <div className="mt-[72px]">
        <ResultsGrid
          flights={flights}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
        {source && hasSearched && !isLoading && (
          <p className="text-text-muted text-[10px] font-light italic text-center mt-[16px]">
            {source === "skyscanner"
              ? "Live flight data via Skyscanner"
              : "Showing sample flight data"}
          </p>
        )}
      </div>
    </main>
  );
}

"use client";

import { useCallback } from "react";
import { SearchForm } from "@/components/search";
import { ResultsGrid } from "@/components/flights";
import { HeroText } from "@/components/animations";
import { CurrencySelector } from "@/components/ui";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import { useCurrency, useFavorites } from "@/hooks/useLocalStorage";
import { SearchParams } from "@/types";

export default function Home() {
  const { flights, isLoading, hasSearched, source, message, search } =
    useFlightSearch();
  const [currency, setCurrency] = useCurrency();
  const { isFavorite, toggle: toggleFavorite } = useFavorites();

  const handleSearch = useCallback(
    (params: SearchParams) => {
      search({ ...params, currency });
    },
    [search, currency],
  );

  return (
    <main className="min-h-screen bg-background px-[16px] pt-[48px] xl:px-[24px] pb-[48px]">
      <div className="relative mb-[48px]">
        <HeroText
          text="GET OUTTA HERE"
          className="text-accent text-[27px] xl:text-[41px] font-extralight italic text-left xl:text-center"
        />
        <div className="xl:absolute xl:right-0 xl:top-[8px] mt-[16px] xl:mt-0">
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      <div className="mt-[72px]">
        <ResultsGrid
          flights={flights}
          isLoading={isLoading}
          hasSearched={hasSearched}
          message={message}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
        {source === "aviasales" && flights.length > 0 && !isLoading && (
          <p className="text-text-muted text-[10px] font-light italic text-center mt-[16px]">
            Live flight data via Aviasales
          </p>
        )}
      </div>
    </main>
  );
}

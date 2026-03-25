"use client";

import { useCallback } from "react";
import { SearchForm, RecentSearches, SurpriseMe } from "@/components/search";
import { ResultsGrid } from "@/components/flights";
import { HeroText } from "@/components/animations";
import { CurrencySelector } from "@/components/ui";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import {
  useCurrency,
  useRecentSearches,
  useFavorites,
} from "@/hooks/useLocalStorage";
import { SearchParams } from "@/types";

export default function Home() {
  const { flights, isLoading, hasSearched, source, message, search } =
    useFlightSearch();
  const [currency, setCurrency] = useCurrency();
  const { searches: recentSearches, add: addRecentSearch } =
    useRecentSearches();
  const { isFavorite, toggle: toggleFavorite } = useFavorites();

  const handleSearch = useCallback(
    (params: SearchParams) => {
      addRecentSearch({
        from: params.from,
        fromCode: params.fromCode,
        fromSkyId: params.fromSkyId,
        fromEntityId: params.fromEntityId,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
      });
      search(params);
    },
    [search, addRecentSearch],
  );

  const handleSurprise = useCallback(
    (from: string, fromCode: string, fromSkyId: string, fromEntityId: string) => {
      const today = new Date();
      const depart = new Date(today);
      depart.setDate(today.getDate() + 14);
      const ret = new Date(depart);
      ret.setDate(depart.getDate() + 7);

      const params: SearchParams = {
        from,
        fromCode,
        fromSkyId,
        fromEntityId,
        departureDate: depart.toISOString().split("T")[0],
        returnDate: ret.toISOString().split("T")[0],
      };
      handleSearch(params);
    },
    [handleSearch],
  );

  return (
    <main className="min-h-screen bg-background px-[16px] pt-[48px] xl:px-[24px] pb-[48px]">
      <div className="flex justify-between items-start mb-[48px]">
        <HeroText
          text="GET OUTTA HERE"
          className="text-accent text-[27px] xl:text-[41px] font-extralight italic text-left xl:text-center flex-1"
        />
        <div className="flex items-center gap-[8px] pt-[8px]">
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      <div className="flex justify-center gap-[16px] mt-[16px] items-center">
        <SurpriseMe
          onSurprise={handleSurprise}
          disabled={isLoading}
        />
      </div>

      <RecentSearches searches={recentSearches} onSelect={handleSearch} />

      <div className="mt-[72px]">
        <ResultsGrid
          flights={flights}
          isLoading={isLoading}
          hasSearched={hasSearched}
          message={message}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
        {source === "skyscanner" && flights.length > 0 && !isLoading && (
          <p className="text-text-muted text-[10px] font-light italic text-center mt-[16px]">
            Live flight data via Skyscanner
          </p>
        )}
      </div>
    </main>
  );
}

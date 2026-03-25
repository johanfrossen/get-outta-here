"use client";

import { useState, useCallback } from "react";
import { SearchForm } from "@/components/search";
import { ResultsGrid } from "@/components/flights";
import { searchMockFlights } from "@/lib/mockData";
import { Flight, SearchParams } from "@/types";

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback((params: SearchParams) => {
    setIsLoading(true);
    setHasSearched(true);

    const delay = 600 + Math.random() * 300;
    setTimeout(() => {
      const results = searchMockFlights(params.from);
      setFlights(results);
      setIsLoading(false);
    }, delay);
  }, []);

  return (
    <main className="min-h-screen bg-background px-[16px] pt-[48px] xl:px-[24px]">
      <h1 className="text-accent text-[27px] xl:text-[41px] font-extralight italic text-left xl:text-center mb-[48px]">
        GET OUTTA HERE
      </h1>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      <div className="mt-[72px]">
        <ResultsGrid
          flights={flights}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
      </div>
    </main>
  );
}

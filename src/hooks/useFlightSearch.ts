"use client";

import { useState, useCallback } from "react";
import { Flight, SearchParams } from "@/types";

interface FlightSearchResult {
  flights: Flight[];
  source: "skyscanner" | "mock";
}

export function useFlightSearch() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [source, setSource] = useState<"skyscanner" | "mock" | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const qs = new URLSearchParams({
        from: params.from,
        fromSkyId: params.fromSkyId,
        fromEntityId: params.fromEntityId,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
      });

      const res = await fetch(`/api/flights?${qs}`);
      if (!res.ok) throw new Error("Flight search failed");

      const data: FlightSearchResult = await res.json();
      setFlights(data.flights);
      setSource(data.source);
    } catch (error) {
      console.error("Search error:", error);
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { flights, isLoading, hasSearched, source, search };
}

"use client";

import { useState, useCallback, useRef } from "react";

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export function useAirportSearch() {
  const [results, setResults] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((term: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (term.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/airports?term=${encodeURIComponent(term)}`,
        );
        if (!res.ok) throw new Error("Airport search failed");
        const data = await res.json();
        setResults(data.locations ?? []);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  const clear = useCallback(() => {
    setResults([]);
  }, []);

  return { results, isLoading, search, clear };
}

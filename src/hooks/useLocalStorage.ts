"use client";

import { useState, useCallback } from "react";

function getStorageValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getStorageValue(key, initialValue),
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(next));
        }
        return next;
      });
    },
    [key],
  );

  return [storedValue, setValue] as const;
}

export function useCurrency() {
  return useLocalStorage<string>("currency", "SEK");
}

export interface RecentSearch {
  from: string;
  fromCode: string;
  fromSkyId: string;
  fromEntityId: string;
  departureDate: string;
  returnDate: string;
  timestamp: number;
}

export function useRecentSearches() {
  const [searches, setSearches] = useLocalStorage<RecentSearch[]>(
    "recentSearches",
    [],
  );

  const add = useCallback(
    (search: Omit<RecentSearch, "timestamp">) => {
      setSearches((prev) => {
        const filtered = prev.filter(
          (s) =>
            s.from !== search.from ||
            s.departureDate !== search.departureDate ||
            s.returnDate !== search.returnDate,
        );
        return [{ ...search, timestamp: Date.now() }, ...filtered].slice(0, 5);
      });
    },
    [setSearches],
  );

  return { searches, add };
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "favorites",
    [],
  );

  const toggle = useCallback(
    (flightId: string) => {
      setFavorites((prev) =>
        prev.includes(flightId)
          ? prev.filter((id) => id !== flightId)
          : [...prev, flightId],
      );
    },
    [setFavorites],
  );

  const isFavorite = useCallback(
    (flightId: string) => favorites.includes(flightId),
    [favorites],
  );

  return { favorites, toggle, isFavorite };
}

"use client";

import { RecentSearch } from "@/hooks/useLocalStorage";
import { SearchParams } from "@/types";

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (params: SearchParams) => void;
}

export function RecentSearches({ searches, onSelect }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-[8px] justify-center xl:justify-center mt-[16px]">
      <span className="text-text-muted text-[10px] font-light italic self-center">
        Recent:
      </span>
      {searches.map((s, i) => (
        <button
          key={`${s.from}-${s.departureDate}-${i}`}
          onClick={() =>
            onSelect({
              from: s.from,
              fromCode: s.fromCode,
              departureDate: s.departureDate,
              returnDate: s.returnDate,
            })
          }
          className="px-[8px] py-[4px] border border-accent/40 rounded-card text-accent text-[10px] font-light italic cursor-pointer hover:border-accent transition-colors"
        >
          {s.from} &middot; {s.departureDate}
        </button>
      ))}
    </div>
  );
}

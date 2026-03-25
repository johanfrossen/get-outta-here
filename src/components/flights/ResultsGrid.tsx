"use client";

import { Flight } from "@/types";
import { FlightCard } from "./FlightCard";
import { SkeletonCard } from "./SkeletonCard";
import { EmptyState } from "./EmptyState";
import { StaggerGrid, StaggerItem } from "@/components/animations";

interface ResultsGridProps {
  flights: Flight[];
  isLoading: boolean;
  hasSearched: boolean;
  message?: string | null;
  isFavorite?: (id: string) => boolean;
  onToggleFavorite?: (id: string) => void;
}

export function ResultsGrid({
  flights,
  isLoading,
  hasSearched,
  message,
  isFavorite,
  onToggleFavorite,
}: ResultsGridProps) {
  if (!hasSearched) {
    return <EmptyState />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-[8px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-[72px] gap-[8px]">
        <p className="text-accent text-[18px] font-light italic text-center">
          No flights found for these dates.
        </p>
        {message && (
          <p className="text-text-muted text-[12px] font-light italic text-center">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <StaggerGrid className="grid grid-cols-1 xl:grid-cols-4 gap-[8px]">
      {flights.map((flight) => (
        <StaggerItem key={flight.id}>
          <FlightCard
            flight={flight}
            isFavorite={isFavorite?.(flight.id)}
            onToggleFavorite={
              onToggleFavorite ? () => onToggleFavorite(flight.id) : undefined
            }
          />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}

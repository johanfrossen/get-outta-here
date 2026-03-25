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
}

export function ResultsGrid({
  flights,
  isLoading,
  hasSearched,
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
      <div className="flex items-center justify-center py-[72px]">
        <p className="text-accent text-[18px] font-light italic text-center">
          No flights found. Try a different departure city or dates.
        </p>
      </div>
    );
  }

  return (
    <StaggerGrid className="grid grid-cols-1 xl:grid-cols-4 gap-[8px]">
      {flights.map((flight) => (
        <StaggerItem key={flight.id}>
          <FlightCard flight={flight} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}

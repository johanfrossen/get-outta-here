"use client";

import { Flight } from "@/types";
import { Card, DataRow, Button } from "@/components/ui";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { FlipRow, PriceCounter } from "@/components/animations";

interface FlightCardProps {
  flight: Flight;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

function FlightSection({
  title,
  leg,
  showFromTo = false,
  baseDelay = 0,
}: {
  title: string;
  leg: Flight["outbound"];
  showFromTo?: boolean;
  baseDelay?: number;
}) {
  const rows = showFromTo
    ? [
        { label: "From", value: leg.departureAirport },
        { label: "To", value: leg.arrivalAirport },
        { label: "Departure time", value: leg.departureTime },
        { label: "Landing time", value: leg.landingTime },
      ]
    : [
        { label: "Departure from", value: leg.arrivalAirport },
        { label: "Departure time", value: leg.departureTime },
        { label: "Landing time", value: leg.landingTime },
      ];

  return (
    <div>
      <h3 className="text-accent text-[12px] font-light italic mb-[16px]">
        {title}
      </h3>
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <FlipRow key={row.label} delay={baseDelay + i * 0.08}>
            <DataRow label={row.label} value={row.value} />
          </FlipRow>
        ))}
      </div>
    </div>
  );
}

export function FlightCard({ flight, isFavorite = false, onToggleFavorite }: FlightCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-[48px]">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-accent text-[24px] font-light italic uppercase">
              {flight.destination}
            </h2>
            {onToggleFavorite && (
              <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} />
            )}
          </div>
          <p className="text-accent text-[12px] font-light italic mt-[8px]">
            {flight.description}
          </p>
        </div>

        <div className="hidden xl:block">
          <FlightSection
            title="Flight outta here"
            leg={flight.outbound}
            baseDelay={0.1}
          />
        </div>
        <div className="xl:hidden">
          <FlightSection
            title="Flight outta here"
            leg={flight.outbound}
            showFromTo
            baseDelay={0.1}
          />
        </div>

        <div className="hidden xl:block">
          <FlightSection
            title="Flight back"
            leg={flight.returnFlight}
            baseDelay={0.4}
          />
        </div>
        <div className="xl:hidden">
          <FlightSection
            title="Flight back"
            leg={flight.returnFlight}
            showFromTo
            baseDelay={0.4}
          />
        </div>

        <div>
          <h3 className="text-accent text-[12px] font-light italic mb-[16px]">
            Flight price
          </h3>
          <div className="flex flex-col">
            <FlipRow delay={0.7}>
              <DataRow
                label="Basic"
                value=""
                renderValue={
                  <PriceCounter
                    value={flight.price.basic}
                    suffix={` ${flight.price.currency}`}
                    className="text-accent text-[12px] font-light italic"
                  />
                }
              />
            </FlipRow>
            <FlipRow delay={0.78}>
              <DataRow
                label="With 1 luggage"
                value=""
                renderValue={
                  <PriceCounter
                    value={flight.price.withLuggage}
                    suffix={` ${flight.price.currency}`}
                    className="text-accent text-[12px] font-light italic"
                  />
                }
              />
            </FlipRow>
          </div>
        </div>

        {flight.bookingUrl ? (
          <a
            href={flight.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button>Book: {flight.destination}</Button>
          </a>
        ) : (
          <Button>Book: {flight.destination}</Button>
        )}
      </div>
    </Card>
  );
}

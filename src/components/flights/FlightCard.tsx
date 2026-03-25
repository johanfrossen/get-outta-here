"use client";

import { Flight } from "@/types";
import { Card, DataRow, Button } from "@/components/ui";

interface FlightCardProps {
  flight: Flight;
}

function FlightSection({
  title,
  leg,
  showFromTo = false,
}: {
  title: string;
  leg: Flight["outbound"];
  showFromTo?: boolean;
}) {
  return (
    <div>
      <h3 className="text-accent text-[12px] font-light italic mb-[16px]">
        {title}
      </h3>
      <div className="flex flex-col">
        {showFromTo ? (
          <>
            <DataRow label="From" value={leg.departureAirport} />
            <DataRow label="To" value={leg.arrivalAirport} />
          </>
        ) : (
          <DataRow label="Departure from" value={leg.arrivalAirport} />
        )}
        <DataRow label="Departure time" value={leg.departureTime} />
        <DataRow label="Landing time" value={leg.landingTime} />
      </div>
    </div>
  );
}

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-[48px]">
        <div>
          <h2 className="text-accent text-[24px] font-light italic uppercase">
            {flight.destination}
          </h2>
          <p className="text-accent text-[12px] font-light italic mt-[8px]">
            {flight.description}
          </p>
        </div>

        <div className="hidden xl:block">
          <FlightSection
            title="Flight outta here"
            leg={flight.outbound}
          />
        </div>
        <div className="xl:hidden">
          <FlightSection
            title="Flight outta here"
            leg={flight.outbound}
            showFromTo
          />
        </div>

        <div className="hidden xl:block">
          <FlightSection title="Flight back" leg={flight.returnFlight} />
        </div>
        <div className="xl:hidden">
          <FlightSection
            title="Flight back"
            leg={flight.returnFlight}
            showFromTo
          />
        </div>

        <div>
          <h3 className="text-accent text-[12px] font-light italic mb-[16px]">
            Flight price
          </h3>
          <div className="flex flex-col">
            <DataRow
              label="Basic"
              value={`${flight.price.basic} ${flight.price.currency}`}
            />
            <DataRow
              label="With 1 luggage"
              value={`${flight.price.withLuggage} ${flight.price.currency}`}
            />
          </div>
        </div>

        <Button>Book: {flight.destination}</Button>
      </div>
    </Card>
  );
}

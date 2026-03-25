import { Card, DataRow, Button, Input } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-[16px] pt-[48px] xl:px-[24px]">
      {/* Title */}
      <h1 className="text-accent text-[27px] xl:text-[41px] font-extralight italic text-left xl:text-center mb-[48px]">
        GET OUTTA HERE
      </h1>

      {/* Search Form - Desktop: horizontal row, Mobile: stacked */}
      <div className="flex flex-col xl:flex-row gap-[8px] xl:justify-center mb-[72px] xl:gap-[8px]">
        <div className="xl:w-[225px]">
          <Input label="From" placeholder="Add destination" />
        </div>
        <div className="xl:w-[225px]">
          <Input
            label="To"
            placeholder="Any Mediterranean city"
            disabled
            value="Any Mediterranean city"
          />
        </div>
        <div className="xl:w-[225px]">
          <Input label="Leaving date" placeholder="Add" type="date" />
        </div>
        <div className="xl:w-[225px]">
          <Input label="Return date" placeholder="Add" type="date" />
        </div>
      </div>

      {/* Results Grid - 4 cols desktop, 1 col mobile */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-[8px]">
        {/* Placeholder cards to demo the design system */}
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <div className="flex flex-col gap-[48px]">
              {/* Header */}
              <div>
                <h2 className="text-accent text-[24px] font-light italic uppercase">
                  Destination Name
                </h2>
                <p className="text-accent text-[12px] font-light italic mt-[8px]">
                  Description of destination. Here comes a text on why this
                  destination is a great gett away
                </p>
              </div>

              {/* Flight outta here */}
              <div>
                <h3 className="text-accent text-[12px] font-light italic mb-[16px]">
                  Flight outta here
                </h3>
                <div className="flex flex-col">
                  <DataRow label="Departure from" value="Airport name" />
                  <DataRow label="Departure time" value="XX:XX AM" />
                  <DataRow label="Landing time" value="XX:XX AM" />
                </div>
              </div>

              {/* Flight back */}
              <div>
                <h3 className="text-accent text-[12px] font-light italic mb-[16px]">
                  Flight back
                </h3>
                <div className="flex flex-col">
                  <DataRow label="Departure from" value="Airport name" />
                  <DataRow label="Departure time" value="XX:XX AM" />
                  <DataRow label="Landing time" value="XX:XX AM" />
                </div>
              </div>

              {/* Flight price */}
              <div>
                <h3 className="text-accent text-[12px] font-light italic mb-[16px]">
                  Flight price
                </h3>
                <div className="flex flex-col">
                  <DataRow label="Basic" value="XXXX SEK" />
                  <DataRow label="With 1 luggage" value="XXXX SEK" />
                </div>
              </div>

              {/* CTA */}
              <Button>Book: Destination name</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}

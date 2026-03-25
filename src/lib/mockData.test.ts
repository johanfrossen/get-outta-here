import { describe, it, expect } from "vitest";
import { getMockFlights, searchMockFlights } from "./mockData";

describe("mockData", () => {
  it("returns 18+ destinations", () => {
    const flights = getMockFlights();
    expect(flights.length).toBeGreaterThanOrEqual(18);
  });

  it("all flights have required fields", () => {
    const flights = getMockFlights();
    flights.forEach((f) => {
      expect(f.id).toBeTruthy();
      expect(f.destination).toBeTruthy();
      expect(f.destinationCode).toBeTruthy();
      expect(f.description).toBeTruthy();
      expect(f.outbound.departureTime).toBeTruthy();
      expect(f.returnFlight.landingTime).toBeTruthy();
      expect(f.price.basic).toBeGreaterThan(0);
      expect(f.price.withLuggage).toBeGreaterThan(f.price.basic);
      expect(f.price.currency).toBe("SEK");
    });
  });

  it("searchMockFlights sets departure airport from input", () => {
    const results = searchMockFlights("Gothenburg");
    results.forEach((f) => {
      expect(f.outbound.departureAirport).toBe("Gothenburg");
    });
  });
});

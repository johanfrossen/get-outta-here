import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FlightCard } from "./FlightCard";
import { Flight } from "@/types";

const mockFlight: Flight = {
  id: "test-1",
  destination: "Barcelona",
  destinationCode: "BCN",
  description: "A beautiful Mediterranean city.",
  outbound: {
    departureAirport: "Stockholm Arlanda",
    departureCode: "ARN",
    arrivalAirport: "Barcelona El Prat",
    arrivalCode: "BCN",
    departureTime: "06:45 AM",
    landingTime: "10:15 AM",
    airline: "SAS",
  },
  returnFlight: {
    departureAirport: "Barcelona El Prat",
    departureCode: "BCN",
    arrivalAirport: "Stockholm Arlanda",
    arrivalCode: "ARN",
    departureTime: "03:20 PM",
    landingTime: "06:50 PM",
    airline: "SAS",
  },
  price: { basic: 2490, withLuggage: 3190, currency: "SEK" },
};

describe("FlightCard", () => {
  it("renders destination name with uppercase styling", () => {
    render(<FlightCard flight={mockFlight} />);
    const heading = screen.getByText("Barcelona");
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("uppercase");
  });

  it("renders description", () => {
    render(<FlightCard flight={mockFlight} />);
    expect(
      screen.getByText("A beautiful Mediterranean city."),
    ).toBeInTheDocument();
  });

  it("renders flight sections", () => {
    render(<FlightCard flight={mockFlight} />);
    expect(screen.getAllByText("Flight outta here").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Flight back").length).toBeGreaterThan(0);
    expect(screen.getByText("Flight price")).toBeInTheDocument();
  });

  it("renders price section", () => {
    render(<FlightCard flight={mockFlight} />);
    expect(screen.getByText("Flight price")).toBeInTheDocument();
    expect(screen.getAllByText("Basic").length).toBeGreaterThan(0);
    expect(screen.getAllByText("With 1 luggage").length).toBeGreaterThan(0);
  });

  it("renders book button with destination", () => {
    render(<FlightCard flight={mockFlight} />);
    expect(screen.getByText("Book: Barcelona")).toBeInTheDocument();
  });
});

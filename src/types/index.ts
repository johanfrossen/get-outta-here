export interface Flight {
  id: string;
  destination: string;
  destinationCode: string;
  description: string;
  outbound: FlightLeg;
  returnFlight: FlightLeg;
  price: FlightPrice;
  bookingUrl?: string;
}

export interface FlightLeg {
  departureAirport: string;
  departureCode: string;
  arrivalAirport: string;
  arrivalCode: string;
  departureTime: string;
  landingTime: string;
  airline: string;
}

export interface FlightPrice {
  basic: number;
  withLuggage: number;
  currency: string;
}

export interface SearchParams {
  from: string;
  fromCode: string;
  departureDate: string;
  returnDate: string;
  currency?: string;
}

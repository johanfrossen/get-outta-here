import { Flight } from "@/types";

const PRICES_URL = "https://api.travelpayouts.com/aviasales/v3/prices_for_dates";
const AUTOCOMPLETE_URL = "https://autocomplete.travelpayouts.com/places2";

const MEDITERRANEAN_DESTINATIONS: Record<string, string> = {
  BCN: "Barcelona",
  NCE: "Nice",
  FCO: "Rome",
  ATH: "Athens",
  MLA: "Valletta",
  DBV: "Dubrovnik",
  SPU: "Split",
  PMI: "Palma de Mallorca",
  NAP: "Naples",
  MRS: "Marseille",
  VCE: "Venice",
  LIS: "Lisbon",
  AGP: "Malaga",
};

const DESTINATION_DESCRIPTIONS: Record<string, string> = {
  BCN: "Sun-drenched beaches, Gaudi's masterpieces, and tapas bars that never close.",
  NCE: "The jewel of the French Riviera. Azure waters and pastel-colored old town.",
  FCO: "Ancient ruins, world-class pasta, and 2000 years of history.",
  ATH: "The Acropolis at sunset, souvlaki on every corner, and island ferries at Piraeus.",
  MLA: "Honey-colored limestone fortress city floating in the Mediterranean.",
  DBV: "The Pearl of the Adriatic. Ancient city walls and crystal coast kayaking.",
  SPU: "A Roman emperor's palace turned living city on the Dalmatian coast.",
  PMI: "Hidden coves, Serra de Tramuntana mountains, and year-round sun.",
  NAP: "Raw, chaotic, unforgettable. The birthplace of pizza and gateway to Pompeii.",
  MRS: "France's oldest city. Bouillabaisse by the port and calanques for days.",
  VCE: "A city built on water and dreams. Gondolas and aperol spritz on the Grand Canal.",
  LIS: "Pastel de nata, fado music, and tram 28 rattling through seven hills.",
  AGP: "Picasso's birthplace on the Costa del Sol. Year-round sun and chiringuitos.",
};

function getToken(): string {
  const token = process.env.TRAVELPAYOUTS_TOKEN;
  if (!token) throw new Error("TRAVELPAYOUTS_TOKEN environment variable is not set");
  return token;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${(h % 12 || 12).toString().padStart(2, "0")}:${m} ${ampm}`;
}

interface TravelpayoutsFlight {
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at: string;
  transfers: number;
  return_transfers: number;
  duration: number;
  duration_to: number;
  duration_back: number;
  link: string;
}

interface TravelpayoutsResponse {
  success: boolean;
  data: TravelpayoutsFlight[];
  currency: string;
}

function mapToFlight(
  tp: TravelpayoutsFlight,
  destCode: string,
  currency: string,
): Flight {
  const destName = MEDITERRANEAN_DESTINATIONS[destCode] ?? destCode;

  return {
    id: `${tp.origin_airport}-${tp.destination_airport}-${tp.departure_at}`,
    destination: destName,
    destinationCode: destCode,
    description: DESTINATION_DESCRIPTIONS[destCode] ?? `Escape to ${destName}.`,
    outbound: {
      departureAirport: tp.origin_airport,
      departureCode: tp.origin_airport,
      arrivalAirport: tp.destination_airport,
      arrivalCode: tp.destination_airport,
      departureTime: formatTime(tp.departure_at),
      landingTime: "N/A",
      airline: tp.airline,
    },
    returnFlight: {
      departureAirport: tp.destination_airport,
      departureCode: tp.destination_airport,
      arrivalAirport: tp.origin_airport,
      arrivalCode: tp.origin_airport,
      departureTime: tp.return_at ? formatTime(tp.return_at) : "N/A",
      landingTime: "N/A",
      airline: tp.airline,
    },
    price: {
      basic: Math.round(tp.price),
      withLuggage: Math.round(tp.price * 1.25),
      currency,
    },
    bookingUrl: `https://www.aviasales.com/search${tp.link}`,
  };
}

async function searchOneDest(
  origin: string,
  destCode: string,
  departureDate: string,
  returnDate: string,
  currency: string,
): Promise<Flight[]> {
  const params = new URLSearchParams({
    origin,
    destination: destCode,
    departure_at: departureDate,
    return_at: returnDate,
    currency,
    sorting: "price",
    direct: "false",
    limit: "1",
    one_way: "false",
    token: getToken(),
  });

  const res = await fetch(`${PRICES_URL}?${params}`);
  if (!res.ok) return [];

  const data: TravelpayoutsResponse = await res.json();
  if (!data.success || !data.data?.length) return [];

  return data.data.slice(0, 1).map((tp) => mapToFlight(tp, destCode, currency));
}

export async function searchFlights(
  origin: string,
  departureDate: string,
  returnDate: string,
  currency: string = "SEK",
): Promise<Flight[]> {
  const destinations = Object.keys(MEDITERRANEAN_DESTINATIONS);

  const results = await Promise.allSettled(
    destinations.map((destCode) =>
      searchOneDest(origin, destCode, departureDate, returnDate, currency),
    ),
  );

  const allFlights: Flight[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") allFlights.push(...r.value);
  }

  return allFlights.sort((a, b) => a.price.basic - b.price.basic);
}

export interface AirportResult {
  code: string;
  name: string;
  city: string;
  country: string;
  type: string;
}

interface AutocompletePlace {
  code: string;
  name: string;
  country_name: string;
  city_name: string;
  type: string;
}

export async function searchAirports(term: string): Promise<AirportResult[]> {
  const params = new URLSearchParams({
    term,
    locale: "en",
    "types[]": "airport",
  });
  const url = `${AUTOCOMPLETE_URL}?${params}&types[]=city`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Airport search failed: ${res.status}`);

  const data: AutocompletePlace[] = await res.json();

  return data.slice(0, 8).map((p) => ({
    code: p.code,
    name: p.name,
    city: p.city_name ?? p.name,
    country: p.country_name ?? "",
    type: p.type,
  }));
}

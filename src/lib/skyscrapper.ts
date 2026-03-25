import { Flight } from "@/types";

const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1/flights";
const HOST = "sky-scrapper.p.rapidapi.com";

const MEDITERRANEAN_DESTINATIONS: Record<string, { skyId: string; entityId: string; name: string }> = {
  BCN: { skyId: "BCN", entityId: "95565085", name: "Barcelona" },
  NCE: { skyId: "NCE", entityId: "95565073", name: "Nice" },
  FCO: { skyId: "FCO", entityId: "95565077", name: "Rome" },
  ATH: { skyId: "ATH", entityId: "95565041", name: "Athens" },
  MLA: { skyId: "MLA", entityId: "95565069", name: "Valletta" },
  DBV: { skyId: "DBV", entityId: "95565054", name: "Dubrovnik" },
  SPU: { skyId: "SPU", entityId: "128667592", name: "Split" },
  PMI: { skyId: "PMI", entityId: "95565074", name: "Palma de Mallorca" },
  NAP: { skyId: "NAP", entityId: "95565071", name: "Naples" },
  MRS: { skyId: "MRS", entityId: "95673476", name: "Marseille" },
  VCE: { skyId: "VCE", entityId: "95673653", name: "Venice" },
  LIS: { skyId: "LIS", entityId: "95565067", name: "Lisbon" },
  AGP: { skyId: "AGP", entityId: "95565036", name: "Malaga" },
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

function getApiKey(): string {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) throw new Error("RAPIDAPI_KEY environment variable is not set");
  return key;
}

function headers(): Record<string, string> {
  return {
    "x-rapidapi-key": getApiKey(),
    "x-rapidapi-host": HOST,
  };
}

interface SkyLeg {
  origin: { name: string; displayCode: string };
  destination: { name: string; displayCode: string };
  departure: string;
  arrival: string;
  carriers: { marketing: { name: string }[] };
}

interface SkyItinerary {
  id: string;
  price: { raw: number; formatted: string };
  legs: SkyLeg[];
}

interface SkySearchResponse {
  status: boolean;
  data: {
    itineraries: SkyItinerary[];
    context: { status: string; totalResults: number };
  };
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${(h % 12 || 12).toString().padStart(2, "0")}:${m} ${ampm}`;
}

function mapItineraryToFlight(
  it: SkyItinerary,
  destCode: string,
  destName: string,
  currency: string,
): Flight {
  const outLeg = it.legs[0];
  const retLeg = it.legs[1];
  const airline = outLeg?.carriers?.marketing?.[0]?.name ?? "Unknown";
  const retAirline = retLeg?.carriers?.marketing?.[0]?.name ?? airline;

  return {
    id: it.id,
    destination: destName,
    destinationCode: destCode,
    description: DESTINATION_DESCRIPTIONS[destCode] ?? `Escape to ${destName}.`,
    outbound: {
      departureAirport: outLeg?.origin?.name ?? "Unknown",
      departureCode: outLeg?.origin?.displayCode ?? "",
      arrivalAirport: outLeg?.destination?.name ?? destName,
      arrivalCode: outLeg?.destination?.displayCode ?? destCode,
      departureTime: outLeg ? formatTime(outLeg.departure) : "N/A",
      landingTime: outLeg ? formatTime(outLeg.arrival) : "N/A",
      airline,
    },
    returnFlight: {
      departureAirport: retLeg?.origin?.name ?? destName,
      departureCode: retLeg?.origin?.displayCode ?? destCode,
      arrivalAirport: retLeg?.destination?.name ?? "Unknown",
      arrivalCode: retLeg?.destination?.displayCode ?? "",
      departureTime: retLeg ? formatTime(retLeg.departure) : "N/A",
      landingTime: retLeg ? formatTime(retLeg.arrival) : "N/A",
      airline: retAirline,
    },
    price: {
      basic: Math.round(it.price.raw),
      withLuggage: Math.round(it.price.raw * 1.25),
      currency,
    },
  };
}

export async function searchFlights(
  originSkyId: string,
  originEntityId: string,
  departureDate: string,
  returnDate: string,
  currency: string = "SEK",
): Promise<Flight[]> {
  const allFlights: Flight[] = [];
  const destinations = Object.entries(MEDITERRANEAN_DESTINATIONS);

  const searches = destinations.map(async ([code, dest]) => {
    try {
      const params = new URLSearchParams({
        originSkyId,
        destinationSkyId: dest.skyId,
        originEntityId,
        destinationEntityId: dest.entityId,
        date: departureDate,
        returnDate,
        adults: "1",
        currency,
        market: "SE",
        countryCode: "SE",
      });

      const res = await fetch(`${BASE_URL}/searchFlights?${params}`, {
        headers: headers(),
      });

      if (!res.ok) return [];

      const data: SkySearchResponse = await res.json();
      if (!data.status || !data.data?.itineraries?.length) return [];

      return data.data.itineraries
        .slice(0, 1)
        .map((it) => mapItineraryToFlight(it, code, dest.name, currency));
    } catch {
      return [];
    }
  });

  const results = await Promise.allSettled(searches);
  for (const r of results) {
    if (r.status === "fulfilled") allFlights.push(...r.value);
  }

  return allFlights.sort((a, b) => a.price.basic - b.price.basic);
}

export interface AirportResult {
  code: string;
  name: string;
  skyId: string;
  entityId: string;
  city: string;
  country: string;
}

interface SkyAirportData {
  skyId: string;
  entityId: string;
  presentation: { title: string; suggestionTitle: string; subtitle: string };
  navigation: {
    entityType: string;
    relevantFlightParams: { skyId: string; entityId: string };
  };
}

interface SkyAirportResponse {
  status: boolean;
  data: SkyAirportData[];
}

export async function searchAirports(term: string): Promise<AirportResult[]> {
  const params = new URLSearchParams({ query: term });

  const res = await fetch(`${BASE_URL}/searchAirport?${params}`, {
    headers: headers(),
  });

  if (!res.ok) throw new Error(`Airport search failed: ${res.status}`);

  const data: SkyAirportResponse = await res.json();
  if (!data.status || !data.data) return [];

  return data.data
    .filter((a) => a.navigation.entityType === "AIRPORT" || a.navigation.entityType === "CITY")
    .slice(0, 8)
    .map((a) => ({
      code: a.skyId,
      name: a.presentation.title,
      skyId: a.navigation.relevantFlightParams.skyId,
      entityId: a.navigation.relevantFlightParams.entityId,
      city: a.presentation.title,
      country: a.presentation.subtitle,
    }));
}

import { Flight } from "@/types";

const BASE_URL = "https://api.tequila.kiwi.com";

const MEDITERRANEAN_DESTINATIONS = [
  "BCN", "NCE", "FCO", "ATH", "MLA", "DBV", "SPU", "PMI",
  "NAP", "MRS", "VCE", "JTR", "LIS", "AGP", "OLB", "JMK",
];

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
  JTR: "White-washed clifftop villages, volcanic beaches, and legendary sunsets.",
  LIS: "Pastel de nata, fado music, and tram 28 rattling through seven hills.",
  AGP: "Picasso's birthplace on the Costa del Sol. Year-round sun and chiringuitos.",
  OLB: "Italy's wild island. Emerald waters rivaling the Caribbean.",
  JMK: "Windmills, whitewash, and the best gyros in the Cyclades.",
};

function getApiKey(): string {
  const key = process.env.KIWI_API_KEY;
  if (!key) throw new Error("KIWI_API_KEY environment variable is not set");
  return key;
}

interface KiwiRoute {
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityTo: string;
  local_departure: string;
  local_arrival: string;
  airline: string;
  return: number;
}

interface KiwiResult {
  id: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityTo: string;
  countryTo: { name: string };
  route: KiwiRoute[];
  price: number;
  bags_price: Record<string, number>;
  deep_link: string;
}

interface KiwiSearchResponse {
  data: KiwiResult[];
}

export interface KiwiLocation {
  id: string;
  code: string;
  name: string;
  city?: { name: string };
  country?: { name: string };
  type: string;
}

interface KiwiLocationResponse {
  locations: KiwiLocation[];
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12.toString().padStart(2, "0")}:${minutes} ${ampm}`;
}

function mapToFlight(result: KiwiResult, currency: string): Flight {
  const outboundLegs = result.route.filter((r) => r.return === 0);
  const returnLegs = result.route.filter((r) => r.return === 1);

  const firstOut = outboundLegs[0];
  const lastOut = outboundLegs[outboundLegs.length - 1];
  const firstRet = returnLegs[0];
  const lastRet = returnLegs[returnLegs.length - 1];

  const luggageExtra = result.bags_price?.["1"] ?? 0;

  return {
    id: result.id,
    destination: result.cityTo,
    destinationCode: result.flyTo,
    description:
      DESTINATION_DESCRIPTIONS[result.flyTo] ??
      `Escape to ${result.cityTo}, ${result.countryTo.name}.`,
    outbound: {
      departureAirport: firstOut?.cityFrom ?? result.cityFrom,
      departureCode: firstOut?.flyFrom ?? result.flyFrom,
      arrivalAirport: lastOut?.cityTo ?? result.cityTo,
      arrivalCode: lastOut?.flyTo ?? result.flyTo,
      departureTime: firstOut
        ? formatTime(firstOut.local_departure)
        : "N/A",
      landingTime: lastOut
        ? formatTime(lastOut.local_arrival)
        : "N/A",
      airline: firstOut?.airline ?? "Unknown",
    },
    returnFlight: {
      departureAirport: firstRet?.cityFrom ?? result.cityTo,
      departureCode: firstRet?.flyFrom ?? result.flyTo,
      arrivalAirport: lastRet?.cityTo ?? result.cityFrom,
      arrivalCode: lastRet?.flyTo ?? result.flyFrom,
      departureTime: firstRet
        ? formatTime(firstRet.local_departure)
        : "N/A",
      landingTime: lastRet
        ? formatTime(lastRet.local_arrival)
        : "N/A",
      airline: firstRet?.airline ?? "Unknown",
    },
    price: {
      basic: Math.round(result.price),
      withLuggage: Math.round(result.price + luggageExtra),
      currency,
    },
  };
}

export async function searchFlights(
  fromCode: string,
  departureDate: string,
  returnDate: string,
  currency: string = "SEK",
): Promise<Flight[]> {
  const apiKey = getApiKey();

  const dDate = formatDateForKiwi(departureDate);
  const rDate = formatDateForKiwi(returnDate);
  const flyTo = MEDITERRANEAN_DESTINATIONS.join(",");

  const params = new URLSearchParams({
    fly_from: fromCode,
    fly_to: flyTo,
    date_from: dDate,
    date_to: dDate,
    return_from: rDate,
    return_to: rDate,
    flight_type: "round",
    adults: "1",
    curr: currency,
    limit: "20",
    sort: "price",
    one_for_city: "1",
  });

  const res = await fetch(`${BASE_URL}/v2/search?${params}`, {
    headers: { apikey: apiKey },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Kiwi API error ${res.status}: ${text}`);
  }

  const data: KiwiSearchResponse = await res.json();
  return data.data.map((r) => mapToFlight(r, currency));
}

export async function searchLocations(
  term: string,
): Promise<KiwiLocation[]> {
  const apiKey = getApiKey();

  const params = new URLSearchParams({
    term,
    locale: "en-US",
    location_types: "airport",
    limit: "8",
    active_only: "true",
  });

  const res = await fetch(`${BASE_URL}/locations/query?${params}`, {
    headers: { apikey: apiKey },
  });

  if (!res.ok) {
    throw new Error(`Kiwi location search error ${res.status}`);
  }

  const data: KiwiLocationResponse = await res.json();
  return data.locations;
}

function formatDateForKiwi(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

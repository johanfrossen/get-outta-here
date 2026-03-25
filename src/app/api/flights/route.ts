import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/skyscrapper";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") ?? "";
  const fromSkyId = searchParams.get("fromSkyId") ?? "";
  const fromEntityId = searchParams.get("fromEntityId") ?? "";
  const departureDate = searchParams.get("departureDate") ?? "";
  const returnDate = searchParams.get("returnDate") ?? "";
  const currency = searchParams.get("currency") ?? "SEK";

  if (!from || !departureDate || !returnDate) {
    return NextResponse.json(
      { error: "Missing required parameters: from, departureDate, returnDate" },
      { status: 400 },
    );
  }

  if (!process.env.RAPIDAPI_KEY) {
    return NextResponse.json(
      { flights: [], source: "unavailable", message: "Flight API not configured" },
    );
  }

  if (!fromSkyId || !fromEntityId) {
    return NextResponse.json(
      { flights: [], source: "unavailable", message: "Please select a departure airport from the suggestions" },
    );
  }

  try {
    const flights = await searchFlights(
      fromSkyId,
      fromEntityId,
      departureDate,
      returnDate,
      currency,
    );

    return NextResponse.json({ flights, source: "skyscanner" });
  } catch (error) {
    console.error("Sky Scrapper API error:", error);
    return NextResponse.json(
      { flights: [], source: "error", message: "Flight search temporarily unavailable" },
    );
  }
}

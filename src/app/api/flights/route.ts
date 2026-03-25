import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/travelpayouts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") ?? "";
  const departureDate = searchParams.get("departureDate") ?? "";
  const returnDate = searchParams.get("returnDate") ?? "";
  const currency = searchParams.get("currency") ?? "SEK";

  if (!from || !departureDate || !returnDate) {
    return NextResponse.json(
      { error: "Missing required parameters: from, departureDate, returnDate" },
      { status: 400 },
    );
  }

  if (!process.env.TRAVELPAYOUTS_TOKEN) {
    return NextResponse.json(
      { flights: [], source: "unavailable", message: "Flight API not configured" },
    );
  }

  try {
    const flights = await searchFlights(from, departureDate, returnDate, currency);
    return NextResponse.json({ flights, source: "aviasales" });
  } catch (error) {
    console.error("Travelpayouts API error:", error);
    return NextResponse.json(
      { flights: [], source: "error", message: "Flight search temporarily unavailable" },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/skyscrapper";
import { searchMockFlights } from "@/lib/mockData";

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

  const canUseApi = !!process.env.RAPIDAPI_KEY && !!fromSkyId && !!fromEntityId;

  if (canUseApi) {
    try {
      const flights = await searchFlights(
        fromSkyId,
        fromEntityId,
        departureDate,
        returnDate,
        currency,
      );

      if (flights.length > 0) {
        return NextResponse.json({ flights, source: "skyscanner" });
      }
    } catch (error) {
      console.error("Sky Scrapper API failed, falling back to mock:", error);
    }
  }

  const flights = searchMockFlights(from);
  return NextResponse.json({ flights, source: "mock" });
}

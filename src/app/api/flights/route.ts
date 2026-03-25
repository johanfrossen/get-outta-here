import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/kiwi";
import { searchMockFlights } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") ?? "";
  const fromCode = searchParams.get("fromCode") ?? "";
  const departureDate = searchParams.get("departureDate") ?? "";
  const returnDate = searchParams.get("returnDate") ?? "";
  const currency = searchParams.get("currency") ?? "SEK";

  if (!from || !departureDate || !returnDate) {
    return NextResponse.json(
      { error: "Missing required parameters: from, departureDate, returnDate" },
      { status: 400 },
    );
  }

  const useApi = !!process.env.KIWI_API_KEY && !!fromCode;

  if (useApi) {
    try {
      const flights = await searchFlights(
        fromCode,
        departureDate,
        returnDate,
        currency,
      );
      return NextResponse.json({ flights, source: "kiwi" });
    } catch (error) {
      console.error("Kiwi API failed, falling back to mock data:", error);
    }
  }

  const flights = searchMockFlights(from);
  return NextResponse.json({ flights, source: "mock" });
}

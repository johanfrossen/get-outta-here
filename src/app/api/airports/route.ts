import { NextRequest, NextResponse } from "next/server";
import { searchAirports } from "@/lib/travelpayouts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term") ?? "";

  if (!term || term.length < 2) {
    return NextResponse.json({ locations: [] });
  }

  try {
    const locations = await searchAirports(term);
    return NextResponse.json({ locations });
  } catch (error) {
    console.error("Airport search failed:", error);
    return NextResponse.json({ locations: [] }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { searchLocations } from "@/lib/kiwi";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term") ?? "";

  if (!term || term.length < 2) {
    return NextResponse.json({ locations: [] });
  }

  if (!process.env.KIWI_API_KEY) {
    return NextResponse.json({ locations: [], source: "no-api-key" });
  }

  try {
    const locations = await searchLocations(term);
    return NextResponse.json({
      locations: locations.map((loc) => ({
        code: loc.code,
        name: loc.name,
        city: loc.city?.name ?? "",
        country: loc.country?.name ?? "",
      })),
    });
  } catch (error) {
    console.error("Airport search failed:", error);
    return NextResponse.json({ locations: [] }, { status: 500 });
  }
}

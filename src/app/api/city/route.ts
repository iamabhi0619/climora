// /app/api/city/route.ts (App Router)
// or /pages/api/city.ts (Pages Router)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios"; // Add this import
import { CitySearch } from "@/lib/types/cityData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const endpoint = `https://geocoding-api.open-meteo.com/v1/search`;

  try {
    const response = await axios.get(endpoint, {
      params: {
        name: encodeURIComponent(query),
        count: 10,
        language: "en",
        format: "json",
      },
    }); // Use axios
    const data = response.data;

    const filtered = (data.results || []).map((city: CitySearch) => ({
      id: city.id,
      name: city.name,
      country: city.country,
      admin1: city.admin1 || "",
      admin2: city.admin2 || "",
      latitude: city.latitude,
      longitude: city.longitude,
    }));

    return NextResponse.json({ results: filtered });
  } catch (error) {
    console.error("City API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}

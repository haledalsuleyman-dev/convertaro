import { NextRequest, NextResponse } from "next/server";
import { searchConverters } from "@/lib/search";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limitParam = Number(request.nextUrl.searchParams.get("limit") ?? "8");
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 120) : 8;

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  return NextResponse.json(searchConverters(query, limit));
}

import { NextResponse } from "next/server";
import { collegeService } from "@/services/collegeService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (!query.trim()) {
      return NextResponse.json([], { status: 200 });
    }

    const colleges = await collegeService.searchColleges(query);
    return NextResponse.json(colleges, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during autocomplete search" },
      { status: 500 }
    );
  }
}

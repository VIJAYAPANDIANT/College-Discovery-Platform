import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { savedService } from "@/services/savedService";

// GET /api/saved
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const savedColleges = await savedService.getSavedColleges(session.user.id);
    return NextResponse.json(savedColleges, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while fetching bookmarks" },
      { status: 500 }
    );
  }
}

// POST /api/saved
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { collegeId } = body;

    if (!collegeId) {
      return NextResponse.json({ error: "collegeId parameter is required" }, { status: 400 });
    }

    const bookmark = await savedService.saveCollege(session.user.id, collegeId);
    return NextResponse.json(
      {
        message: "College saved successfully",
        bookmark,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while saving college" },
      { status: 400 }
    );
  }
}

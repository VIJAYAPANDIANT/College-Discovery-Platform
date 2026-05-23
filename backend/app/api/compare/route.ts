import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids") || "";

    const ids = idsParam
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json(
        { error: "No college IDs provided for comparison" },
        { status: 400 }
      );
    }

    // Query database for all compared colleges (including courses)
    const colleges = await prisma.college.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        courses: true,
      },
    });

    // Order colleges to match the order of IDs passed in query parameters
    const orderedColleges = ids
      .map((id) => colleges.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => !!c);

    return NextResponse.json(orderedColleges, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during comparison" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { collegeService } from "@/services/collegeService";
import { reviewSchema } from "@/validations/collegeValidation";

// GET /api/colleges/:id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const college = await collegeService.getCollegeById(id);

    if (!college) {
      return NextResponse.json({ error: "College profile not found" }, { status: 404 });
    }

    return NextResponse.json(college, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while fetching college details" },
      { status: 500 }
    );
  }
}

// POST /api/colleges/:id (Review submission)
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: collegeId } = await params;
    const body = await req.json();

    // Validate review payload using Zod
    const validation = reviewSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Optional user session check to link review to user account
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const review = await collegeService.addReview(collegeId, validation.data, userId);
    return NextResponse.json(
      {
        message: "Review added successfully",
        review,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while saving the review" },
      { status: 400 }
    );
  }
}

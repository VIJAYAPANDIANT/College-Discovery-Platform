import { NextResponse } from "next/server";
import { collegeService } from "@/services/collegeService";
import { collegeQuerySchema } from "@/validations/collegeValidation";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Map URLSearchParams to flat object for Zod validation
    const queryObj: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      queryObj[key] = val;
    });

    // Validate query inputs using Zod
    const validation = collegeQuerySchema.safeParse(queryObj);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const result = await collegeService.getColleges(validation.data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while fetching colleges" },
      { status: 500 }
    );
  }
}

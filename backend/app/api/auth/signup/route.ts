import { NextResponse } from "next/server";
import { authService } from "@/services/authService";
import { signupSchema } from "@/validations/authValidation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request inputs using Zod Schema
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const user = await authService.createUser(validation.data);
    return NextResponse.json(
      {
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during signup" },
      { status: 400 }
    );
  }
}

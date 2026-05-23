import { NextResponse } from "next/server";
import { authService } from "@/services/authService";
import { loginSchema } from "@/validations/authValidation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request inputs using Zod Schema
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const user = await authService.verifyCredentials(
      validation.data.email,
      validation.data.password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Credentials verified successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}

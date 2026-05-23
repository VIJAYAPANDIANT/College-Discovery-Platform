import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { SignupInput } from "@/validations/authValidation";

export const authService = {
  createUser: async (input: SignupInput) => {
    const { name, email, password } = input;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in database
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        passwordHash: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  },

  verifyCredentials: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};

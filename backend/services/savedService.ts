import prisma from "@/lib/prisma";

export const savedService = {
  getSavedColleges: async (userId: string) => {
    const list = await prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: {
          include: {
            courses: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Flatten to return the college objects directly
    return list.map((item) => item.college);
  },

  saveCollege: async (userId: string, collegeId: string) => {
    // Verify the college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      throw new Error("College not found");
    }

    // Check if already bookmarked
    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });

    if (existing) {
      return existing;
    }

    // Save bookmark
    return prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      },
    });
  },

  unsaveCollege: async (userId: string, collegeId: string) => {
    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });

    if (!existing) {
      throw new Error("Bookmark not found");
    }

    // Delete bookmark
    return prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });
  },
};

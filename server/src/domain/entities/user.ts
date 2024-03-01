import { prisma } from "@/lib/prisma";

export class User {
  static async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }
}
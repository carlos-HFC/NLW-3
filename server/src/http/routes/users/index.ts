import { FastifyInstance } from "fastify";
import z from "zod";

import { PASSWORD_REGEX } from "@/core/constants";
import { GlobalError } from "@/core/global-error";
import { User } from "@/domain/entities/user";
import { bcryptHasher } from "@/http/helpers/bcrypt-hasher";
import { prisma } from "@/lib/prisma";

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.patch("/", async (request, reply) => {
    const updateAccountQuery = z.object({
      token: z.string().min(100),
      email: z.string().email()
    });

    const updateAccountBody = z.object({
      password: z.string().refine(value => PASSWORD_REGEX.test(value), "Password must have minimum 8 characters, at least one lowercase letter, one uppercase letter, one number and one special character."),
      confirmPassword: z.string()
    });

    const { email, token } = updateAccountQuery.parse(request.query);

    const user = await User.findUserByEmail(email);

    if (!user || user.tokenResetPassword !== token) {
      return GlobalError(reply, {
        statusCode: 400,
        error: "Bad Request",
        message: "User not exists or invalid token."
      });
    }

    const { password, confirmPassword } = updateAccountBody.parse(request.body);

    if (password !== confirmPassword) {
      return GlobalError(reply, {
        statusCode: 400,
        error: "Bad Request",
        message: "Password and confirm password don't match."
      });
    }

    const hashPassword = await bcryptHasher.hashGenerator(password);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        tokenResetPassword: null,
        password: hashPassword
      }
    });

    reply.code(200).send();
  });
}
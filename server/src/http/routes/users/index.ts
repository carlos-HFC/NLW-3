import { FastifyInstance } from "fastify";
import z from "zod";

import { PASSWORD_REGEX } from "@/core/constants";
import { GlobalError } from "@/core/global-error";
import { User } from "@/domain/entities/user";
import { bcryptHasher } from "@/http/helpers/bcrypt-hasher";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/plugins/authenticate";
import { authorize } from "@/plugins/authorize";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/",
    {
      config: { superUser: true },
      onRequest: [authenticate],
      preHandler: [authorize]
    },
    async (request, reply) => {
      const createUserBody = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().refine(value => PASSWORD_REGEX.test(value), "Password must have minimum 8 characters, at least one lowercase letter, one uppercase letter, one number and one special character."),
        confirmPassword: z.string()
      });

      const { name, email, password, confirmPassword } = createUserBody.parse(request.body);

      if (password !== confirmPassword) {
        return GlobalError(reply, {
          statusCode: 400,
          error: "Bad Request",
          message: "Password and confirm password don't match"
        });
      }

      const exists = await User.findUserByEmail(email);

      if (exists) {
        return GlobalError(reply, {
          statusCode: 400,
          error: "Bad Request",
          message: "User already exists"
        });
      }

      const hashPassword = await bcryptHasher.hashGenerator(password);

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword
        }
      });
    },
  );
}
import { FastifyInstance } from "fastify";
import z from "zod";

import { GlobalError } from "@/core/global-error";
import { User } from "@/domain/entities/user";
import { env } from "@/env/env";
import { bcryptHasher } from "@/http/helpers/bcrypt-hasher";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const handleLoginBody = z.object({
      email: z.string().email(),
      password: z.string().min(1)
    });

    const { email, password } = handleLoginBody.parse(request.body);

    const user = await User.findUserByEmail(email);
    const comparePassword = user && await bcryptHasher.hashComparer(password, user.password);

    if (!user || !comparePassword) {
      return GlobalError(reply, {
        statusCode: 400,
        error: "Bad Request",
        message: "Incorrect credentials."
      });
    }

    const token = await reply.jwtSign({
      superUser: user.superUser
    }, {
      sub: user.id,
      expiresIn: env.EXPIRES_TOKEN
    });

    reply.setCookie(env.COOKIE_NAME, token);
  });

  app.delete("/logout", async (request, reply) => {
    reply.clearCookie(env.COOKIE_NAME);
  });
}
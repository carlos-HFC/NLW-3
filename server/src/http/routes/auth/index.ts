import { FastifyInstance } from "fastify";
import z from "zod";

import { GlobalError } from "@/core/global-error";
import { User } from "@/domain/entities/user";
import { bcryptHasher } from "@/http/helpers/bcrypt-hasher";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const handleLoginBody = z.object({
      email: z.string().email(),
      password: z.string().min(1)
    });

    const { email, password } = handleLoginBody.parse(request.body);

    const user = await User.findUserByEmail(email);

    if (!user) {
      return GlobalError(reply, {
        statusCode: 400,
        error: "Bad Request",
        message: "Incorrect credentials."
      });
    }

    const comparePassword = await bcryptHasher.hashComparer(password, user.password);

    if (!comparePassword) {
      return GlobalError(reply, {
        statusCode: 400,
        error: "Bad Request",
        message: "Incorrect credentials."
      });
    }

    const token = app.jwt.sign({
      superUser: user.superUser
    }, {
      sub: user.id,
      expiresIn: "7d"
    });

    return { token };
  });
}
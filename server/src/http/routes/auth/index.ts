import { FastifyInstance } from "fastify";
import z from "zod";

import { GlobalError } from "@/core/global-error";
import { User } from "@/domain/entities/user";
import { env } from "@/env/env";
import { bcryptHasher } from "@/http/helpers/bcrypt-hasher";
import { randomString } from "@/http/helpers/random-string";
import { prisma } from "@/lib/prisma";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/login", async (request, reply) => {
    const handleLoginBody = z.object({
      email: z.string().email(),
      password: z.string().min(1)
    });

    const { email, password } = handleLoginBody.parse(request.body);

    const user = await User.findUserByEmail(email);
    const comparePassword = user && await bcryptHasher.hashComparer(password, user.password);

    if (!user || Boolean(user?.tokenResetPassword) || !comparePassword) {
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

    reply.code(200).setCookie(env.COOKIE_NAME, token);
  });

  fastify.delete("/logout", async (_, reply) => {
    reply.code(200).clearCookie(env.COOKIE_NAME);
  });

  fastify.post("/forgot-password", async (request, reply) => {
    const forgotPasswordBody = z.object({
      email: z.string().email()
    });

    const { email } = forgotPasswordBody.parse(request.body);

    const user = await User.findUserByEmail(email);

    if (!user) {
      return GlobalError(reply, {
        statusCode: 404,
        error: "Bad Request",
        message: "User not found."
      });
    }

    const tokenResetPassword = randomString({ size: 100, encoding: 'base64' });

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        tokenResetPassword
      }
    });

    const link = `${env.RESET_PASSWORD_URL}?email=${email}&token=${tokenResetPassword}`;

    // await resend.emails.send({
    //   from,
    //   to: email,
    //   subject: "Alteração de senha",
    //   react: ResetPassword({ link, name })
    // });

    reply.code(200).send({
      link,
      tokenResetPassword
    });
  });
}
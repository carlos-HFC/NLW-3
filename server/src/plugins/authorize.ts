import { FastifyReply, FastifyRequest } from "fastify";

import { GlobalError } from "@/core/global-error";

export async function authorize(request: FastifyRequest, reply: FastifyReply) {
  if (request.routeOptions.config.superUser === !request.user.superUser) {
    throw GlobalError(reply, {
      statusCode: 401,
      error: "Unauthorized",
      message: "You're not authorized to do this action"
    });
  }
}
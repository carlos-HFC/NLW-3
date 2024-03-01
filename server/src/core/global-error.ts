import { FastifyReply } from "fastify";

interface GlobalErrorRequest {
  message: string;
  error: string;
  statusCode: number;
}

export async function GlobalError(reply: FastifyReply, params: GlobalErrorRequest) {
  return reply.status(params.statusCode).send(params);
}
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastify from 'fastify';
import multer from 'fastify-multer';
import path from "node:path";
import { ZodError } from "zod";

import { env } from "@/env/env";
import { deleteFiles } from "@/http/helpers";

import { orphanagesRoutes } from "./routes/orphanages";

interface ValidationErros {
  [key: string]: string;
}

const app = fastify();

app.setErrorHandler((error, request, reply) => {
  deleteFiles(request);

  if (error instanceof ZodError) {
    let message: ValidationErros = {};

    error.issues.forEach(err => {
      (message[err.path as never] as unknown as string) = err.message;
    });

    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message
    });
  }

  return reply.send(error);
});

app.register(fastifyCors);

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', '..', 'uploads'),
  prefix: '/uploads'
});

app.register(multer.contentParser);

app.register(orphanagesRoutes, { prefix: "/orphanages" });

app
  .listen({ port: env.PORT })
  .then(() => console.log(`HTTP Server running in http://localhost:${env.PORT}`));
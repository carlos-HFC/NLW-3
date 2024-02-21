import fastify from 'fastify';

import { env } from "@/env/env";
import { orphanagesRoutes } from "./routes/orphanages";

const app = fastify();

app.register(orphanagesRoutes, { prefix: "/orphanages" });

app
  .listen({
    port: env.PORT
  })
  .then(() => console.log(`HTTP Server running in http://localhost:${env.PORT}`));
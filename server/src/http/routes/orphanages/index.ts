import { FastifyInstance } from "fastify";
import z from "zod";

import { prisma } from "@/lib/prisma";

export async function orphanagesRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const orphanages = await prisma.orphanage.findMany();

    return { orphanages };
  });

  fastify.get("/:id", async (request, reply) => {
    const orphanageParamSchema = z.object({
      id: z.string()
    });

    const { id } = orphanageParamSchema.parse(request.params);

    const orphanage = await prisma.orphanage.findUnique({
      where: {
        id
      }
    });

    if (!orphanage) {
      return reply.status(404).send({
        message: "Orphanage not found."
      });
    }

    return { orphanage };
  });

  fastify.post("/", async (request, reply) => {
    const orphanageBodySchema = z.object({
      name: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      about: z.string(),
      instructions: z.string(),
      openingHours: z.string(),
      openOnWeekends: z.boolean().optional().default(false),
    });

    const { about, instructions, latitude, longitude, name, openOnWeekends, openingHours, } = orphanageBodySchema.parse(request.body);

    const orphanage = await prisma.orphanage.create({
      data: {
        about,
        instructions,
        latitude,
        longitude,
        name,
        openOnWeekends,
        openingHours
      }
    });

    return { orphanage };
  });
}
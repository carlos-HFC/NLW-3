import { FastifyInstance } from "fastify";
import z from "zod";

import { OrphanagePresenter } from "@/http/presenters/orphanage-presenter";
import { config } from "@/http/storage/multer";
import { prisma } from "@/lib/prisma";

export async function orphanagesRoutes(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    const orphanages = await prisma.orphanage.findMany({
      include: {
        images: true
      }
    });

    return {
      orphanages: OrphanagePresenter.renderMany(orphanages)
    };
  });

  fastify.get("/:id", async (request, reply) => {
    const orphanageParamSchema = z.object({
      id: z.string()
    });

    const { id } = orphanageParamSchema.parse(request.params);

    const orphanage = await prisma.orphanage.findUnique({
      where: {
        id
      },
      include: {
        images: true
      }
    });

    if (!orphanage) {
      return reply.status(404).send({
        message: "Orphanage not found."
      });
    }

    return {
      orphanage: OrphanagePresenter.render(orphanage)
    };
  });

  fastify.post("/",
    { preHandler: config.array("images") },
    async (request) => {
      const orphanageBodySchema = z.object({
        name: z.string(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
        about: z.string(),
        instructions: z.string(),
        openingHours: z.string(),
        openOnWeekends: z.coerce.boolean().optional().default(false),
      });

      const imageSchema = z.array(
        z.object({
          fieldname: z.enum(["images"]),
          originalname: z.string(),
          destination: z.string(),
          filename: z.string(),
          path: z.string(),
          mimetype: z.enum(["image/jpeg", "image/jpg", "image/png", "image/webp"], {
            errorMap: () => ({ message: "Invalid file type." })
          }),
        }), { required_error: "Images are required to create orphanage." }
      );

      const files = imageSchema.parse(request.files);

      const { about, instructions, latitude, longitude, name, openOnWeekends, openingHours, } = orphanageBodySchema.parse(request.body);

      const orphanage = await prisma.orphanage.create({
        data: {
          about,
          instructions,
          latitude,
          longitude,
          name,
          openOnWeekends,
          openingHours,
        }
      });

      const images = await Promise.all(
        files.map(image => {
          return prisma.image.create({
            data: {
              path: image.filename,
              orphanageId: orphanage.id
            }
          });
        })
      );

      return {
        orphanage: {
          ...orphanage,
          images
        }
      };
    });
}
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
        name: z.string().min(1),
        latitude: z.coerce.number().refine(n => n !== 0),
        longitude: z.coerce.number().refine(n => n !== 0),
        about: z.string().min(1),
        instructions: z.string().min(1),
        openingHours: z.string().min(1),
        openOnWeekends: z.coerce.string().catch('false').transform(v => v === 'true').optional().default('false'),
      });

      const imageSchema = z.array(
        z.object({
          fieldname: z.enum(["images"]),
          originalname: z.string(),
          destination: z.string(),
          filename: z.string(),
          path: z.string(),
          mimetype: z.enum(["image/jpeg", "image/jpg", "image/png", "image/webp"], {
            errorMap: () => ({ message: "Invalid file type." }),
          }),
        }), { required_error: "Images are required to create orphanage." }
      ).min(1).max(6);

      const files = imageSchema.parse(request.files);

      const { about, instructions, latitude, longitude, name, openOnWeekends, openingHours } = orphanageBodySchema.parse(request.body);

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
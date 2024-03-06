import { FastifyInstance } from "fastify";
import z from "zod";

import { GlobalError } from "@/core/global-error";
import { OrphanagePresenter } from "@/http/presenters/orphanage-presenter";
import { config } from "@/http/storage/multer";
import { prisma } from "@/lib/prisma";
import { authenticate } from "@/plugins/authenticate";

export async function orphanagesRoutes(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    const orphanages = await prisma.orphanage.findMany({
      where: {
        aproved: true
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
      return GlobalError(reply, {
        error: "Not Found",
        message: "Orphanage not found.",
        statusCode: 404
      });
    }

    return {
      orphanage: OrphanagePresenter.render(orphanage)
    };
  });

  fastify.post("/",
    {
      preHandler: config.array("images"),
    },
    async (request) => {
      const orphanageBodySchema = z.object({
        name: z.string().min(3),
        latitude: z.coerce.number().refine(n => n !== 0),
        longitude: z.coerce.number().refine(n => n !== 0),
        about: z.string().min(1),
        instructions: z.string().min(1),
        openingHours: z.string().min(1),
        openOnWeekends: z.enum(['true', 'false']).transform(v => v === 'true').optional().default('false'),
        whatsapp: z.string().min(10)
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
      ).min(1).max(5);

      const files = imageSchema.parse(request.files);

      const {
        about,
        instructions,
        latitude,
        longitude,
        name,
        openOnWeekends,
        openingHours,
        whatsapp
      } = orphanageBodySchema.parse(request.body);

      const orphanage = await prisma.orphanage.create({
        data: {
          about,
          instructions,
          latitude,
          longitude,
          name,
          openOnWeekends,
          openingHours,
          whatsapp
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
    }
  );

  fastify.get("/list-all",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const orphanageQuerySchema = z.object({
        aproved: z.enum(['true', 'false']).transform(v => v === 'true')
      });

      const { aproved } = orphanageQuerySchema.parse(request.query);

      const orphanages = await prisma.orphanage.findMany({
        where: {
          aproved
        },
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
        }
      });

      reply.code(200).send({
        orphanages
      });
    }
  );

  fastify.patch("/:id",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const orphanageParamSchema = z.object({
        id: z.string()
      });

      const { id } = orphanageParamSchema.parse(request.params);

      const orphanageBodySchema = z.object({
        name: z.string().min(3).optional(),
        latitude: z.coerce.number().refine(n => n !== 0).optional(),
        longitude: z.coerce.number().refine(n => n !== 0).optional(),
        about: z.string().min(1).optional(),
        instructions: z.string().min(1).optional(),
        openingHours: z.string().min(1).optional(),
        openOnWeekends: z.coerce.boolean().optional(),
        whatsapp: z.string().min(10).optional(),
      });

      const orphanage = await prisma.orphanage.findUnique({
        where: {
          id
        },
      });

      if (!orphanage) {
        return GlobalError(reply, {
          error: "Not Found",
          message: "Orphanage not found.",
          statusCode: 404
        });
      }

      const data = orphanageBodySchema.parse(request.body);

      await prisma.orphanage.update({
        where: {
          id
        },
        data
      });

      reply.code(200).send();
    }
  );

  fastify.patch('/aproved/:id',
    {
      onRequest: [authenticate]
    },
    async (request, reply) => {
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
        return GlobalError(reply, {
          error: "Not Found",
          message: "Orphanage not found.",
          statusCode: 404
        });
      }

      const orphanageBodySchema = z.object({
        aproved: z.coerce.boolean()
      });

      const { aproved } = orphanageBodySchema.parse(request.body);

      if (!aproved) {
        await prisma.orphanage.delete({
          where: {
            id
          }
        });

        reply.code(204).send();

        return;
      }

      await prisma.orphanage.update({
        where: {
          id
        },
        data: {
          aproved
        }
      });

      reply.code(200).send();
    }
  );

  fastify.delete("/:id",
    {
      onRequest: [authenticate]
    },
    async (request, reply) => {
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
        return GlobalError(reply, {
          error: "Not Found",
          message: "Orphanage not found.",
          statusCode: 404
        });
      }

      if (!orphanage.aproved) {
        return GlobalError(reply, {
          error: "Bad Request",
          message: "You cannot delete not aproved orphanage.",
          statusCode: 400
        });
      }

      await prisma.orphanage.delete({
        where: {
          id
        }
      });

      reply.code(204).send();
    }
  );
}
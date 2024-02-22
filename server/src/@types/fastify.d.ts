import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    file: Express.Multer.File;
    files: Express.Multer.File[];
  }
}
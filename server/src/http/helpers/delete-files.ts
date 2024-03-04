import { FastifyRequest } from "fastify";

import { config } from "@/http/storage/multer";

export function deleteFiles(request: FastifyRequest) {
  const files: Array<Express.Multer.File> = [];
  request.files?.length > 0 && files.push(...request?.files);
  request.file && files.push(request?.file);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    config.storage._removeFile(request, file, () => {});
  }
}
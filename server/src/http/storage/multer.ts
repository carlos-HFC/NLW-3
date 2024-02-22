import multer from 'fastify-multer';
import path from "node:path";

export const config = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', '..', 'uploads'),
    filename(_, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
});
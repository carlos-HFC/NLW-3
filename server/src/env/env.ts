import dotenv from 'dotenv';
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  COOKIE_NAME: z.string(),
  EXPIRES_TOKEN: z.coerce.number(),
  RESEND_API_KEY: z.string(),
  RESET_PASSWORD_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
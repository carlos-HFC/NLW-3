import { z } from "zod";

const envSchema = z.object({
  NEXT_API_URL: z.string().url(),
  COOKIE_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
import { Resend } from 'resend';

import { env } from "@/env/env";

const resend = new Resend(env.RESEND_API_KEY);
const from = "Happy <onboarding@resend.dev>";

export {
  resend,
  from
};

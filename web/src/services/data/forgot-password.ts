"use server";

import { api } from "../api";

export async function forgotPassword(data: FormData) {
  const email = data.get("email");

  const response = await api.post('/auth/forgot-password', JSON.stringify({ email }), {
    headers: {
      "Content-Type": "application/json"
    },
  });

  return await response.json();
}
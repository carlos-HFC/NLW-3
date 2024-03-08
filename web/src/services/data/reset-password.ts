"use server";

import { redirect } from "next/navigation";

import { api } from "../api";

interface ResetPasswordRequest {
  body: BodyInit;
  query: string;
}

export async function resetPassword(request: ResetPasswordRequest) {
  const response = await api.patch(`/users?${request.query}`, {
    body: request.body,
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) redirect('/');

  return await response.json();
}
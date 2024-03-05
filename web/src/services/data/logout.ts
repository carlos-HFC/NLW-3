"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/env/env";

import { api } from "../api";

export async function logout() {
  await api.del("/auth/logout");

  cookies().delete(env.COOKIE_NAME);

  redirect('/');
}
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { api } from "../api";

import { env } from "@/env/env";

export async function logout() {
  await api.del("/auth/logout");

  cookies().delete(env.COOKIE_NAME);

  redirect('/');
}
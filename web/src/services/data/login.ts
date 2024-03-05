"use server";

import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

import { api } from "../api";

export async function handleLogin(data: FormData) {
  const email = data.get("email");
  const password = data.get("password");

  const res = await api.post("/auth/login", JSON.stringify({ email, password }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const [keyDefault,] = res.headers.getSetCookie().toString().split(';');
  const [key, value] = keyDefault.split('=');

  cookies().set(key, value);

  redirect('/dashboard');
}
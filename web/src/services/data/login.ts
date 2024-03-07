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

  if (!res.ok) return await res.json();

  const [cookie, ...rest] = res.headers.getSetCookie().toString().split(';');
  const [key, value] = cookie.split('=');
  const [, maxAge] = rest[0].split('=').map(Number);

  cookies().set(key, value, {
    httpOnly: true,
    maxAge,
    secure: true
  });

  redirect('/dashboard');
}
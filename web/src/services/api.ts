import { headers } from "next/headers";

import { env } from "@/env/env";

async function get<T, K extends string>(url: string, init?: RequestInit) {
  const response = await fetch(`${env.NEXT_API_URL}${url}`, {
    headers: headers(),
    ...init
  });

  const data = await response.json() as { [P in K]: T; };

  return { data };
}

async function post(url: string, data: BodyInit, init?: RequestInit) {
  return await fetch(`${env.NEXT_API_URL}${url}`, {
    ...init,
    method: 'POST',
    body: data,
  });
}

async function del(url: string, init?: RequestInit) {
  return await fetch(`${env.NEXT_API_URL}${url}`, {
    headers: headers(),
    ...init
  });
}

export const api = {
  get,
  post,
  del
};
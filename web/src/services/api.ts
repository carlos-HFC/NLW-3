import { env } from "@/env/env";

async function get<T>(url: string, init?: RequestInit) {
  const response = await fetch(`${env.NEXT_API_URL}${url}`, init);

  const data = await response.json() as { [key: string]: T; };

  return { data };
}

async function post(url: string, data: object, init?: RequestInit) {
  return await fetch(`${env.NEXT_API_URL}${url}`, {
    ...init,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export const api = {
  get,
  post
};
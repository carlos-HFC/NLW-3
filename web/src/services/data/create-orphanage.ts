"use server";

import { revalidateTag } from "next/cache";

import { api } from "../api";

export async function createOrphanage(data: FormData) {
  const res = await api.post("/orphanages", data);

  if (res.ok) revalidateTag("orphanages-list");

  return await res.json();
}
"use server";

import { revalidateTag } from "next/cache";

import { api } from "../api";

import { ORPHANAGES_LIST } from "@/constants/next-tags";

export async function createOrphanage(data: FormData) {
  const res = await api.post("/orphanages", data);

  if (res.ok) revalidateTag(ORPHANAGES_LIST);

  return await res.json();
}
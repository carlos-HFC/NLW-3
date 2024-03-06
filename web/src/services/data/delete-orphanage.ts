"use server";

import { revalidateTag } from "next/cache";

import { api } from "../api";

import { ORPHANAGES_APROVED } from "@/constants/next-tags";

interface DeleteOrphanageRequest {
  id: string;
}

export async function deleteOrphanage(request: DeleteOrphanageRequest) {
  const response = await api.del(`/orphanages/${request.id}`);

  if (response.ok) {
    revalidateTag(ORPHANAGES_APROVED);

    return;
  }

  return await response.json();
}
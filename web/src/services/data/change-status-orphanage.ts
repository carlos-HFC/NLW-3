"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from 'next/headers';
import { redirect } from "next/navigation";

import { api } from "../api";

import { ORPHANAGES_LIST } from "@/constants/next-tags";

interface ChangeStatusOrphanageRequest {
  id: string;
  body: BodyInit;
}

export async function changeStatusOrphanage(request: ChangeStatusOrphanageRequest) {
  const headerList = new Headers(headers());
  headerList.set("Content-Type", "application/json");
  headerList.delete("Content-Length");

  const response = await api.patch(`/orphanages/aproved/${request.id}`, {
    body: request.body,
    headers: headerList,
  });

  if (response.ok) {
    revalidatePath("/dashboard");
    revalidateTag(ORPHANAGES_LIST);

    redirect('/dashboard');
  }

  return await response.json();
}
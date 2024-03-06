import { headers } from "next/headers";

import { api } from "../api";

import { ORPHANAGES_APROVED, ORPHANAGES_PENDING } from "@/constants/next-tags";

export async function listAllOrphanages() {
  const aproved = await api.get<Orphanage[], 'orphanages'>(`/orphanages/list-all?aproved=true`, {
    headers: headers(),
    cache: "force-cache",
    next: {
      tags: [ORPHANAGES_APROVED]
    }
  });

  const pending = await api.get<Orphanage[], 'orphanages'>(`/orphanages/list-all?aproved=false`, {
    headers: headers(),
    cache: "force-cache",
    next: {
      tags: [ORPHANAGES_PENDING]
    }
  });

  return {
    aproved: aproved.data.orphanages ?? [],
    pending: pending.data.orphanages ?? [],
  };
}
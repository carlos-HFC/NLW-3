import { ORPHANAGES_APROVED, ORPHANAGES_PENDING } from "@/constants/next-tags";

import { api } from "../api";

export async function listAllOrphanages() {
  const [aproved, pending] = await Promise.all([
    api.get<Orphanage[], 'orphanages'>(`/orphanages/list-all?aproved=true`, {
      cache: "force-cache",
      next: {
        tags: [ORPHANAGES_APROVED]
      }
    }),
    api.get<Orphanage[], 'orphanages'>(`/orphanages/list-all?aproved=false`, {
      cache: "force-cache",
      next: {
        tags: [ORPHANAGES_PENDING]
      }
    }),
  ]);

  return {
    aproved: aproved.data.orphanages,
    pending: pending.data.orphanages,
  };
}
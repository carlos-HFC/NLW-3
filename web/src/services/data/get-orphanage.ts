import { api } from "../api";

export async function getOrphanage(id: string, init?: RequestInit) {
  return await api.get<Orphanage, 'orphanage'>(`/orphanages/${id}`, init);
}
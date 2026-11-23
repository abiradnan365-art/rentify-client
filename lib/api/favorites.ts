import "server-only";
import { authFetch } from "@/lib/core/server";
import type { Equipment } from "@/types/equipment";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getFavorites = async (): Promise<Equipment[]> => {
  const res = await authFetch(`${BASE_URL}/favorites`);

  if (!res.ok) return [];

  return res.json();
};
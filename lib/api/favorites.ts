import "server-only";
import type { Equipment } from "@/types/equipment";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getFavorites = async (userId: string): Promise<Equipment[]> => {
  const params = new URLSearchParams({ userId });
  const res = await fetch(`${BASE_URL}/favorites?${params}`, {
    headers: { "x-internal-key": process.env.INTERNAL_API_KEY! },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
};
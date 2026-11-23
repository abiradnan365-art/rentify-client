"use server";

import { getSession, authFetch } from "@/lib/core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function toggleFavorite(equipmentId: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const res = await authFetch(`${BASE_URL}/favorites/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ equipmentId }),
  });

  if (!res.ok) return { error: "Failed to update favorite" };

  return res.json() as Promise<{ favorited: boolean }>;
}
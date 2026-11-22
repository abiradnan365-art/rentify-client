"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function toggleFavorite(equipmentId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) return { error: "Unauthorized" };

  const res = await fetch(`${BASE_URL}/favorites/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-key": process.env.INTERNAL_API_KEY!,
    },
    body: JSON.stringify({ userId: user.id, equipmentId }),
  });

  if (!res.ok) return { error: "Failed to update favorite" };
  return res.json() as Promise<{ favorited: boolean }>;
}
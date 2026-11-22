import "server-only";
import { authFetch } from "@/lib/core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getBookings = async (query = ""): Promise<unknown> => {
  const res = await authFetch(`${BASE_URL}/bookings?${query}`);
  if (!res.ok) return [];
  return res.json();
};
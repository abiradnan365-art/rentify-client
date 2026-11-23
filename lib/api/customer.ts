import "server-only";
import { getToken } from "../core/server";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type CustomerStats = {
  totalBookings: number;
  activeRentals: number;
  upcomingRentals: number;
  completedRentals: number;
  totalSpent: number;
  favorites: number;
};

export const getCustomerStats = async (): Promise<CustomerStats> => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/customer/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      totalBookings: 0,
      activeRentals: 0,
      upcomingRentals: 0,
      completedRentals: 0,
      totalSpent: 0,
      favorites: 0,
    };
  }

  return res.json();
};
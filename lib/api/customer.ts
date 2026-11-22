import "server-only";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type CustomerStats = {
  totalBookings: number;
  activeRentals: number;
  upcomingRentals: number;
  completedRentals: number;
  totalSpent: number;
  favorites: number;
};

export const getCustomerStats = async (userId: string): Promise<CustomerStats> => {
  const params = new URLSearchParams({ userId });
  const res = await fetch(`${BASE_URL}/customer/stats?${params}`, {
    headers: { "x-internal-key": process.env.INTERNAL_API_KEY! },
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
import "server-only";
import { getToken } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type OwnerStats = {
  myEquipment: number;
  pendingApprovals: number;
  totalRentals: number;
  activeRentals: number;
  completedRentals: number;
  totalEarnings: number;
};

export const getOwnerStats = async (): Promise<OwnerStats> => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/owner/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      myEquipment: 0,
      pendingApprovals: 0,
      totalRentals: 0,
      activeRentals: 0,
      completedRentals: 0,
      totalEarnings: 0,
    };
  }

  return res.json();
};
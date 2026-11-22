import "server-only";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type OwnerStats = {
  myEquipment: number;
  pendingApprovals: number;
  totalRentals: number;
  activeRentals: number;
  completedRentals: number;
  totalEarnings: number;
};

export const getOwnerStats = async (ownerId: string): Promise<OwnerStats> => {
  const params = new URLSearchParams({ ownerId });
  const res = await fetch(`${BASE_URL}/owner/stats?${params}`, {
    headers: { "x-internal-key": process.env.INTERNAL_API_KEY! },
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
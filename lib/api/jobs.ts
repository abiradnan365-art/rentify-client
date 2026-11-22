import type { Equipment } from "@/types/equipment"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getEquipments = async (query?: string): Promise<Equipment[]> => {
    const res = await fetch(`${BASE_URL}/equipments${query ? `?${query}` : ""}`);
    return res.json();
}


export const getEquipmentById = async (equipmentId: string): Promise<Equipment | undefined> => {
    const res = await fetch(`${BASE_URL}/equipments/${equipmentId}`);
    return res.json();
}

export const getEquipmentsByOwner = async (ownerId: string): Promise<Equipment[]> => {
  const params = new URLSearchParams({ ownerId });

  const res = await fetch(`${BASE_URL}/equipments?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
};

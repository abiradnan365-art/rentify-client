import type { Equipment } from "@/types/equipment"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getEquipments = async (): Promise<Equipment[]> => {
    const res = await fetch(`${BASE_URL}/equipments`);
    return res.json();
}

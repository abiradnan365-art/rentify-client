import type { Equipment } from "@/types/equipment"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getEquipments = async (query = ''): Promise<Equipment[]> => {
    const res = await fetch(`${BASE_URL}/equipments?${query}`);
    return res.json();
}



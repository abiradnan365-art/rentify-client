import type { Equipment } from "@/types/equipment"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getEquipments = async (query?: string): Promise<Equipment[]> => {
    const res = await fetch(`${BASE_URL}/equipments${query ? `?${query}` : ""}`);
    return res.json();
}

// The API exposes no single-equipment route, so look it up in the collection.
export const getEquipmentById = async (
    id: string
): Promise<Equipment | undefined> => {
    const equipments = await getEquipments();
    return equipments.find((equipment) => equipment._id === id);
}

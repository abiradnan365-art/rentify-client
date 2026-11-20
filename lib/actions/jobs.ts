const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createEquipment = async (data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/equipments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
};
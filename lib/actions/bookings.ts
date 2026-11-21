const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export async function bookingToAEquipment(data) {
    const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}
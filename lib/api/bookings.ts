const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";



export const getBookings = async (query = ""): Promise<unknown> => {
    const res = await fetch(`${BASE_URL}/bookings?${query}`);
    return res.json();
}
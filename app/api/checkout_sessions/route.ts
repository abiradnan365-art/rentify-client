import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        const user = session?.user;
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { equipmentId, startDate, endDate, quantity, contactNumber, deliveryAddress, notes } =
            await req.json();


        const equipment = await fetch(`${API}/equipments/${equipmentId}`).then((r) => r.json());
        if (equipment.status !== "Approved") {
            return NextResponse.json({ error: "Equipment is not available" }, { status: 400 });
        }

        const days = Math.round((+new Date(endDate) - +new Date(startDate)) / 86400000) + 1;
        const qty = Number(quantity) || 1;
        if (isNaN(days) || days < 1 || qty < 1 || qty > Number(equipment.quantity)) {
            return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
        }

        const type = (equipment.rentalType || "Daily").toLowerCase();
        const units =
            type === "weekly" ? Math.ceil(days / 7)
                : type === "monthly" ? Math.ceil(days / 30)
                    : days;
        const total = units * Number(equipment.rentalPrice) * qty;

        const origin = process.env.NEXT_PUBLIC_APP_URL;
        const checkout = await stripe.checkout.sessions.create({
            mode: "payment",
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: equipment.name },
                        unit_amount: Math.round(total * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                equipmentId,
                equipmentName: equipment.name,
                userId: user.id,
                customerName: user.name,
                startDate,
                endDate,
                quantity: String(qty),
                totalDays: String(days),
                rentalType: equipment.rentalType ?? "Daily",
                contactNumber,
                deliveryAddress,
                notes: notes ?? "",
                ownerId: equipment.ownerId ?? "",
            },
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/payment`,
        });

        return NextResponse.json({ url: checkout.url });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
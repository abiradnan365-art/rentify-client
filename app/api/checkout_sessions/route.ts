import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { authFetch, getSession } from "@/lib/core/server";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "customer") {
      return NextResponse.json({ error: "Only customers can book" }, { status: 403 });
    }

    const { equipmentId, startDate, endDate, quantity, contactNumber, deliveryAddress, notes } =
      await req.json();

   
    const todayStr = new Date().toISOString().split("T")[0];
    if (
      !DATE_RE.test(startDate) ||
      !DATE_RE.test(endDate) ||
      startDate < todayStr ||
      endDate < startDate
    ) {
      return NextResponse.json({ error: "Invalid rental dates" }, { status: 400 });
    }

    const eqRes = await fetch(`${API}/equipments/${equipmentId}`, { cache: "no-store" });
    const equipment = eqRes.ok ? await eqRes.json() : null;
    if (!equipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
    }
    if (equipment.status !== "Approved") {
      return NextResponse.json({ error: "Equipment is not available" }, { status: 400 });
    }

    const days = Math.round((+new Date(endDate) - +new Date(startDate)) / 86400000) + 1;
    const qty = Number(quantity) || 1;
    if (days < 1 || qty < 1 || qty > Number(equipment.quantity)) {
      return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
    }

    const myRes = await authFetch(`${API}/bookings`);
    const myBookings = myRes.ok ? await myRes.json() : [];
    const duplicate = myBookings.some(
      (b: { equipmentId: string; status: string; endDate: string }) =>
        b.equipmentId === equipmentId &&
        b.status !== "Cancelled" &&
        String(b.endDate).slice(0, 10) >= todayStr
    );
    if (duplicate) {
      return NextResponse.json(
        { error: "You have already booked this equipment" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({ startDate, endDate });
    const availRes = await fetch(
      `${API}/equipments/${equipmentId}/availability?${params}`,
      { cache: "no-store" }
    );
    const avail = availRes.ok ? await availRes.json() : { available: 0 };
    if (qty > avail.available) {
      return NextResponse.json(
        {
          error:
            avail.available === 0
              ? "This equipment is not available for the selected dates"
              : `Only ${avail.available} unit(s) available for the selected dates`,
        },
        { status: 400 }
      );
    }

    // total
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
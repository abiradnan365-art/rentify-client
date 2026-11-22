import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import ClearPendingBooking from "@/app/components/ClearPendingBooking";


const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const BOOKINGS_PATH = "/dashboard/customer/bookings";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/browse-equipments");

  const authSession = await auth.api.getSession({ headers: await headers() });
  const user = authSession?.user;
  if (!user) redirect("/login");

  const s = await stripe.checkout.sessions.retrieve(session_id);
  const m = s.metadata ?? {};

  if (s.payment_status !== "paid" || m.userId !== user.id) {
    redirect("/browse-equipments");
  }

  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-key": process.env.INTERNAL_API_KEY!,
    },
    body: JSON.stringify({
      equipmentId: m.equipmentId,
      equipmentName: m.equipmentName,
      userId: m.userId,
      customerName: m.customerName,
      customerEmail: s.customer_email,
      rentalType: m.rentalType,
      startDate: m.startDate,
      endDate: m.endDate,
      bookedAt: new Date().toISOString().split("T")[0],
      quantity: Number(m.quantity),
      contactNumber: m.contactNumber,
      deliveryAddress: m.deliveryAddress,
      notes: m.notes,
      totalDays: Number(m.totalDays),
      totalAmount: (s.amount_total ?? 0) / 100,
      stripeSessionId: s.id,
      paymentStatus: "Paid",
      status: "Confirmed",
    }),
    cache: "no-store",
  });

  if (res.status === 409) {
    const paymentIntentId =
      typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id;

    try {
      if (paymentIntentId) {
        await stripe.refunds.create({ payment_intent: paymentIntentId });
      }
    } catch {
    
    }

    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <ClearPendingBooking />
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-8">
          <h1 className="text-xl font-black">Equipment no longer available</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Someone booked it just before you. Your payment has been refunded.
          </p>
          <Link
            href="/browse-equipments"
            className="mt-5 inline-block text-sm text-teal-700 underline"
          >
            Browse other equipment
          </Link>
        </div>
      </div>
    );
  }

  if (!res.ok) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-8">
          <h1 className="text-xl font-black">Payment received</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            But we could not save your booking. Please contact support with
            this reference:
          </p>
          <p className="mt-1 break-all text-xs font-mono">{s.id}</p>
          <Link
            href={BOOKINGS_PATH}
            className="mt-5 inline-block text-sm text-teal-700 underline"
          >
            Go to my bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-16 text-center">
      <ClearPendingBooking />
      <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-8">
        <p className="text-4xl">✅</p>
        <h1 className="mt-3 text-2xl font-black">Payment Successful</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your booking for {m.equipmentName} is confirmed.
        </p>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Period</dt>
            <dd>{m.startDate} → {m.endDate}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Quantity</dt>
            <dd>{m.quantity}</dd>
          </div>
          <div className="flex justify-between border-t border-teal-200 pt-3">
            <dt className="font-bold">Amount Paid</dt>
            <dd className="text-lg font-black text-teal-700">
              ${((s.amount_total ?? 0) / 100).toFixed(2)}
            </dd>
          </div>
        </dl>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href="/browse-equipments"
            className="flex h-11 items-center justify-center rounded-lg bg-muted text-sm font-semibold hover:bg-muted/70"
          >
            Browse more
          </Link>
          <Link
            href={BOOKINGS_PATH}
            className="flex h-11 items-center justify-center rounded-lg bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700"
          >
            My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
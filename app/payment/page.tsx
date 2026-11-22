"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

type PendingBooking = {
  equipmentId: string;
  equipmentName: string;
  startDate: string;
  endDate: string;
  quantity: number;
  totalDays: number;
  totalAmount: number;
  deliveryAddress: string;
  contactNumber: string;
  notes?: string;
  [key: string]: unknown;
};

const subscribeToPendingBooking = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getPendingBooking = () =>
  window.sessionStorage.getItem("pendingBooking");

const getServerPendingBooking = () => undefined;

export default function PaymentPage() {
  const router = useRouter();
  const pendingBooking = useSyncExternalStore(
    subscribeToPendingBooking,
    getPendingBooking,
    getServerPendingBooking,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const booking = useMemo(
    () =>
      pendingBooking ? (JSON.parse(pendingBooking) as PendingBooking) : null,
    [pendingBooking],
  );

  useEffect(() => {
    if (pendingBooking === null) {
      router.replace("/browse-equipments");
    }
  }, [pendingBooking, router]);

  if (!booking) return null;

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipmentId: booking.equipmentId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          quantity: booking.quantity,
          contactNumber: booking.contactNumber,
          deliveryAddress: booking.deliveryAddress,
          notes: booking.notes,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        setError(data.error || "Could not start payment.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-[10px] font-bold tracking-[0.12em] text-teal-700 uppercase">
          Secure Payment
        </p>
        <h1 className="mt-1 text-xl font-black">{booking.equipmentName}</h1>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Period</dt>
            <dd className="text-right">
              {booking.startDate} → {booking.endDate} ({booking.totalDays} day(s))
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Quantity</dt>
            <dd>{booking.quantity}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Contact</dt>
            <dd>{booking.contactNumber}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Delivery</dt>
            <dd className="max-w-[60%] text-right">{booking.deliveryAddress}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <dt className="font-bold">Total Payable</dt>
            <dd className="text-xl font-black text-teal-700">
              ${booking.totalAmount}
            </dd>
          </div>
        </dl>

        {error ? <p className="mt-3 text-xs text-rose-600">{error}</p> : null}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="h-11 rounded-lg bg-muted text-sm font-semibold hover:bg-muted/70 disabled:opacity-60"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handlePay}
            disabled={loading}
            className="h-11 rounded-lg bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {loading ? "Redirecting to Stripe..." : `Pay $${booking.totalAmount}`}
          </button>
        </div>
      </div>
    </div>
  );
}
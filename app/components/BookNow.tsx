"use client";
import { bookingToAEquipment } from "@/lib/actions/bookings";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type BookNowProps = {
    equipment: {
        _id: string;
        name: string;
        rentalPrice?: number;
        rentalType?: string; // "Daily" | "Weekly" | "Monthly"
        quantity?: number;
    };
};

const DAY_MS = 24 * 60 * 60 * 1000;

const toLocalDateString = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
};

const inputClass =
    "mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20";

const BookNow = ({ equipment }: BookNowProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const today = toLocalDateString(new Date());
    const maxQty = Math.max(equipment.quantity ?? 1, 1);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [quantity, setQuantity] = useState(1);
    const [contactNumber, setContactNumber] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [notes, setNotes] = useState("");

    const rentalType = equipment.rentalType ?? "Daily";
    const type = rentalType.toLowerCase();
    const rate = Number(equipment.rentalPrice) || 0;

    const totalDays = useMemo(() => {
        const diff = Math.round(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / DAY_MS
        );
        return diff >= 0 ? diff + 1 : 0;
    }, [startDate, endDate]);

    const units = useMemo(() => {
        if (totalDays === 0) return 0;
        if (type === "weekly") return Math.ceil(totalDays / 7);
        if (type === "monthly") return Math.ceil(totalDays / 30);
        return totalDays;
    }, [totalDays, type]);

    const cycleLabel =
        type === "weekly" ? "Weekly" : type === "monthly" ? "Monthly" : "Daily";

    const totalAmount = units * rate * quantity;

    const handleOpen = () => {
        if (!user) {
            router.push(`/login?redirectTo=/browse-equipments/${equipment._id}`);
            return;
        }
        if (user.role !== "customer") {
            console.log("User is not a customer.");
            return;
        }
        setError("");
        setOpen(true);

    };

    const handleStartChange = (value: string) => {
        setStartDate(value);
        if (endDate < value) setEndDate(value);
    };

    const handleConfirm = () => {
        if (!user) return;
        if (totalDays === 0) return setError("Please select a valid rental period.");
        if (quantity < 1 || quantity > maxQty)
            return setError(`Quantity must be between 1 and ${maxQty}.`);
        if (!contactNumber.trim()) return setError("Contact number is required.");
        if (!deliveryAddress.trim())
            return setError("Delivery / site address is required.");

        const booking = {
            equipmentId: equipment._id,
            equipmentName: equipment.name,
            userId: user.id,
            customerName: user.name,
            customerEmail: user.email,

            rentalType,
            startDate,
            endDate,
            bookedAt: today,

            quantity,
            contactNumber: contactNumber.trim(),
            deliveryAddress: deliveryAddress.trim(),
            notes: notes.trim(),

            totalDays,
            totalAmount,
        };

        try {
            sessionStorage.setItem("pendingBooking", JSON.stringify(booking));
            setOpen(false);
            router.push("/payment");
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                className="h-11 w-full rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white hover:bg-teal-700"
            >
                Book Now
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader className="border-b border-border pb-4">
                        <p className="text-[10px] font-bold tracking-[0.12em] text-teal-700 uppercase">
                            Rentify Reservation Request
                        </p>
                        <DialogTitle className="text-lg font-black tracking-tight">
                            {equipment.name}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-3">
                        <label className="text-xs font-semibold">
                            Rental Start Date
                            <input
                                type="date"
                                value={startDate}
                                min={today}
                                onChange={(e) => handleStartChange(e.target.value)}
                                className={inputClass}
                            />
                        </label>
                        <label className="text-xs font-semibold">
                            Rental End Date
                            <input
                                type="date"
                                value={endDate}
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className={inputClass}
                            />
                        </label>

                        <label className="text-xs font-semibold">
                            Required Quantity (Max {maxQty})
                            <input
                                type="number"
                                min={1}
                                max={maxQty}
                                value={quantity}
                                onChange={(e) => {
                                    const n = Number(e.target.value);
                                    setQuantity(Math.min(Math.max(n || 1, 1), maxQty));
                                }}
                                className={inputClass}
                            />
                        </label>
                        <label className="text-xs font-semibold">
                            Contact Number
                            <input
                                type="tel"
                                placeholder="+880 1711-234567"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                className={inputClass}
                            />
                        </label>

                        <label className="col-span-2 text-xs font-semibold">
                            Delivery / Site Address
                            <input
                                type="text"
                                placeholder="House 42, Road 11, Banani, Dhaka"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                className={inputClass}
                            />
                        </label>

                        <label className="col-span-2 text-xs font-semibold">
                            Additional Notes (Optional)
                            <textarea
                                rows={2}
                                placeholder="Site access instructions, operator needs..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                            />
                        </label>
                    </div>

                    {/* Summary */}
                    <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-4">
                        <div className="flex items-center justify-between gap-2 border-b border-teal-200 pb-2 text-[11px] text-muted-foreground">
                            <span>
                                Duration: {totalDays} day(s) ({units} {cycleLabel} cycle)
                            </span>
                            <span>
                                ${rate} × {units} × {quantity} unit(s)
                            </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-bold">Total Payable Amount</span>
                            <span className="text-2xl font-black text-teal-700">
                                ${totalAmount}
                            </span>
                        </div>
                    </div>

                    {error ? <p className="text-xs text-rose-600">{error}</p> : null}

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                            className="h-11 rounded-lg bg-muted text-sm font-semibold hover:bg-muted/70"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={loading || totalDays === 0}
                            className="h-11 rounded-lg bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
                        >
                            {loading ? "Processing..." : "Proceed to Stripe →"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookNow;
"use client";
import { useTransition } from "react";
import { updateEquipmentStatus } from "@/lib/actions/admin";

export default function ApproveButton({
  equipmentId,
  status,
}: {
  equipmentId: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();
  const approved = status === "Approved";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await updateEquipmentStatus(equipmentId, approved ? "Pending" : "Approved");
        })
      }
      className={`h-8 rounded-lg px-3 text-xs font-semibold disabled:opacity-60 ${
        approved
          ? "bg-muted hover:bg-muted/70"
          : "bg-teal-600 text-white hover:bg-teal-700"
      }`}
    >
      {pending ? "..." : approved ? "Unapprove" : "Approve"}
    </button>
  );
}
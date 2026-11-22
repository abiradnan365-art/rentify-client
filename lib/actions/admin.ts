"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function updateEquipmentStatus(
  equipmentId: string,
  status: "Approved" | "Pending"
) {
  await requireAdmin(); // admin chhara keu call korle redirect

  const res = await fetch(`${BASE_URL}/equipments/${equipmentId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-internal-key": process.env.INTERNAL_API_KEY!,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) return { error: "Failed to update status" };

  revalidatePath("/dashboard/admin/equipments");
  return { success: true };
}

export async function updateUserRole(
  userId: string,
  role: "customer" | "owner" | "admin"
) {
  const admin = await requireAdmin();

  // admin nijer role bodlate parbe na (nijeke lock-out hoye jete pare)
  if (admin.id === userId) {
    return { error: "You cannot change your own role" };
  }

  const res = await fetch(`${BASE_URL}/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-internal-key": process.env.INTERNAL_API_KEY!,
    },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) return { error: "Failed to update role" };

  revalidatePath("/dashboard/admin/users");
  return { success: true };
}
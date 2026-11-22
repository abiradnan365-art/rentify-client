"use server";
import { revalidatePath } from "next/cache";
import { authFetch, requireRole } from "@/lib/core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function updateEquipmentStatus(
  equipmentId: string,
  status: "Approved" | "Pending"
) {
  await requireRole("admin");

  const res = await authFetch(`${BASE_URL}/equipments/${equipmentId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) return { error: "Failed to update status" };

  revalidatePath("/dashboard/admin/equipments");
  return { success: true as const };
}

export async function updateUserRole(
  userId: string,
  role: "customer" | "owner" | "admin"
) {
  const admin = await requireRole("admin");


  if (admin.id === userId) {
    return { error: "You cannot change your own role" };
  }

  const res = await authFetch(`${BASE_URL}/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) return { error: "Failed to update role" };

  revalidatePath("/dashboard/admin/users");
  return { success: true as const };
}
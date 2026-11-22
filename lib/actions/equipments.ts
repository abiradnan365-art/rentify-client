"use server";
import { revalidatePath } from "next/cache";
import { authFetch, requireRole } from "@/lib/core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createEquipment(values: Record<string, unknown>) {
  await requireRole("owner");

  const res = await authFetch(`${BASE_URL}/equipments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) return { error: data?.message ?? "Failed to create equipment" };

  revalidatePath("/dashboard/owner/equipments");
  return data;
}

export async function updateEquipment(
  equipmentId: string,
  updates: Record<string, unknown>
) {
  await requireRole("owner");

  const res = await authFetch(`${BASE_URL}/equipments/${equipmentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updates }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) return { error: data?.message ?? "Failed to update equipment" };

  revalidatePath("/dashboard/owner/equipments");
  revalidatePath(`/browse-equipments/${equipmentId}`);
  return { success: true as const };
}

export async function deleteEquipment(equipmentId: string) {
  await requireRole("owner", "admin");

  const res = await authFetch(`${BASE_URL}/equipments/${equipmentId}`, {
    method: "DELETE",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) return { error: data?.message ?? "Failed to delete equipment" };

  revalidatePath("/dashboard/owner/equipments");
  return { success: true as const };
}
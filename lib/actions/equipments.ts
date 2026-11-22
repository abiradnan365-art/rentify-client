"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createEquipment(values: Record<string, unknown>) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user || user.role !== "owner") {
    return { error: "Unauthorized" };
  }

  const equipment = {
    ...values,
    ownerId: user.id,
    owner: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  const res = await fetch(`${BASE_URL}/equipments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipment),
  });
  return res.json();
}
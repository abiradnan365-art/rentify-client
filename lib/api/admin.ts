import "server-only";
import { authFetch } from "@/lib/core/server";
import type { Booking } from "@/types/booking";
import type { Equipment } from "@/types/equipment";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  image?: string | null;
  createdAt?: string;
};

export type AdminStats = {
  totalUsers: number;
  totalEquipment: number;
  totalBookings: number;
  pendingApprovals: number;
  completedRentals: number;
  totalRevenue: number;
};

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const res = await authFetch(`${BASE_URL}/admin/users`);
  if (!res.ok) return [];
  return res.json();
};

export const getAllBookings = async (): Promise<Booking[]> => {
  const res = await authFetch(`${BASE_URL}/admin/bookings`);
  if (!res.ok) return [];
  return res.json();
};

export const getAllEquipmentsForAdmin = async (): Promise<Equipment[]> => {
  const res = await authFetch(`${BASE_URL}/admin/equipments`);
  if (!res.ok) return [];
  return res.json();
};

export const getAdminStats = async (): Promise<AdminStats> => {
  const res = await authFetch(`${BASE_URL}/admin/stats`);
  if (!res.ok) {
    return {
      totalUsers: 0,
      totalEquipment: 0,
      totalBookings: 0,
      pendingApprovals: 0,
      completedRentals: 0,
      totalRevenue: 0,
    };
  }
  return res.json();
};
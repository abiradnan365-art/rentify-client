import { requireAdmin } from "@/lib/admin";
import { getAdminStats } from "@/lib/api/admin";

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-3 text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await getAdminStats();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-black tracking-tight">RENTIFY Admin Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Real-time telemetry across users, equipment inventory, bookings, and
        revenue.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Users" value={stats.totalUsers} color="text-foreground" />
        <StatCard label="Total Equipment" value={stats.totalEquipment} color="text-sky-600" />
        <StatCard label="Total Bookings" value={stats.totalBookings} color="text-teal-600" />
        <StatCard label="Pending Approvals" value={stats.pendingApprovals} color="text-amber-600" />
        <StatCard label="Completed Rentals" value={stats.completedRentals} color="text-emerald-600" />
        <StatCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString("en-US")}`}
          color="text-emerald-600"
        />
      </div>
    </div>
  );
}
import { requireRole } from "@/lib/core/server";
import { getOwnerStats } from "@/lib/api/owner";

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


export default async function OwnerDashboardPage() {
  const user = await requireRole("owner");

  const stats = await getOwnerStats(user.id);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-black tracking-tight">Owner Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of your equipment, rentals, and earnings.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="My Equipment" value={stats.myEquipment} color="text-sky-600" />
        <StatCard label="Pending Approvals" value={stats.pendingApprovals} color="text-amber-600" />
        <StatCard label="Total Rentals" value={stats.totalRentals} color="text-teal-600" />
        <StatCard label="Active Rentals" value={stats.activeRentals} color="text-indigo-600" />
        <StatCard label="Completed Rentals" value={stats.completedRentals} color="text-emerald-600" />
        <StatCard
          label="Total Earnings"
          value={`$${stats.totalEarnings.toLocaleString("en-US")}`}
          color="text-emerald-600"
        />
      </div>
    </div>
  );
}
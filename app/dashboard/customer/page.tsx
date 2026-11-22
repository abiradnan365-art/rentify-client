import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCustomerStats } from "@/lib/api/customer";

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

export default async function CustomerDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect("/login");
//   if (user.role !== "customer") redirect("/");

  const stats = await getCustomerStats(user.id);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-black tracking-tight">My Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of your rentals, spending, and saved equipment.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Bookings" value={stats.totalBookings} color="text-teal-600" />
        <StatCard label="Active Rentals" value={stats.activeRentals} color="text-indigo-600" />
        <StatCard label="Upcoming Rentals" value={stats.upcomingRentals} color="text-sky-600" />
        <StatCard label="Completed Rentals" value={stats.completedRentals} color="text-emerald-600" />
        <StatCard
          label="Total Spent"
          value={`$${stats.totalSpent.toLocaleString("en-US")}`}
          color="text-amber-600"
        />
        <StatCard label="Favorites" value={stats.favorites} color="text-rose-600" />
      </div>
    </div>
  );
}

import { getAllUsers } from "@/lib/api/admin";
import RoleSelect from "@/app/components/RoleSelect";
import { requireRole } from "@/lib/core/server";

export default async function AdminUsersPage() {
    const admin = await requireRole("admin");
    const users = await getAllUsers();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
                <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">All Users</h1>
                <p className="mt-1 text-sm text-muted-foreground">{users.length} registered users</p>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-sm">
                        <thead>
                            <tr className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                                <th className="px-3 py-3">Name</th>
                                <th className="px-3 py-3">Email</th>
                                <th className="px-3 py-3">Role</th>
                                <th className="px-3 py-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-t border-border">
                                    <td className="px-3 py-4 font-bold">{u.name}</td>
                                    <td className="px-3 py-4 text-muted-foreground">{u.email}</td>
                                    <td className="px-3 py-4">
                                        <RoleSelect
                                            userId={u._id}
                                            currentRole={u.role ?? "customer"}
                                            disabled={u._id === admin.id}
                                        />
                                    </td>
                                    <td className="px-3 py-4 text-muted-foreground">
                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
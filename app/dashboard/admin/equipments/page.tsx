import { requireAdmin } from "@/lib/admin";

import ApproveButton from "@/app/components/ApproveButton";
import { EquipmentStatusBadge } from "@/components/equipment/equipment-status-badge";
import type { Equipment } from "@/types/equipment";
import { getAllEquipmentsForAdmin } from "@/lib/api/admin";

export default async function AdminEquipmentsPage() {
  await requireAdmin();
  const equipment = await getAllEquipmentsForAdmin();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">All Equipment</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Approve listings to make them visible to customers.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                <th className="px-3 py-3">Equipment</th>
                <th className="px-3 py-3">Owner</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item._id} className="border-t border-border">
                  <td className="px-3 py-4 font-bold">{item.name}</td>
                  <td className="px-3 py-4 text-muted-foreground">
                    {item.owner?.name ?? "-"}
                  </td>
                  <td className="px-3 py-4 font-bold text-teal-700">
                    ${item.rentalPrice}/{item.rentalType}
                  </td>
                  <td className="px-3 py-4">
                    <EquipmentStatusBadge status={item.status} />
                  </td>
                  <td className="px-3 py-4 text-right">
                    <ApproveButton equipmentId={item._id} status={item.status} />
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
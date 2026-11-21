
import { EquipmentBrowseCard } from "@/components/equipment/equipment-browse-card"
import { EquipmentFilterBar } from "@/components/equipment/equipment-filter-bar"
import { getEquipments } from "@/lib/api/jobs"
import type { Equipment } from "@/types/equipment"


type BrowseEquipmentsPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const BrowseEquipmentsPage = async ({
    searchParams,
}: BrowseEquipmentsPageProps) => {
    const search = await searchParams
    const query = new URLSearchParams(search as Record<string, string>).toString()

    const equipments: Equipment[] = await getEquipments(query)

    const categories = [
        ...new Set(equipments.map((equipment) => equipment.category)),
    ]
    const rentalTypes = [
        ...new Set(equipments.map((equipment) => equipment.rentalType)),
    ]

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-xs font-bold tracking-[0.18em] text-teal-600 uppercase">
                Live Catalog
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                All Approved Equipment
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Search by equipment title or city, filter by category and pricing tier,
                and sort results.
            </p>

            <EquipmentFilterBar
                categories={categories}
                rentalTypes={rentalTypes}
                resultCount={equipments.length}
            />

            {equipments.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {equipments.map((equipment) => (

                        <EquipmentBrowseCard
                            key={equipment._id}
                            equipment={equipment}
                        />

                    ))}
                </div>
            ) : (
                <p className="mt-6 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                    No approved equipment matches this catalog yet.
                </p>
            )}
        </div>
    )
}

export default BrowseEquipmentsPage


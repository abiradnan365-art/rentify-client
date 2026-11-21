
import { getEquipments } from '@/lib/api/jobs';
import { Equipment } from '@/types/equipment';
import React from 'react';

const BrowseEquipmentsPage = async ({ searchParams }: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>)
    const query = urlSearch.toString()

    console.log("Search params:", query);
    const equipments: Equipment[] = await getEquipments(query);


    return (
        <div>
            <h2>Browse Equipments</h2>
            <ul>
                {equipments.map((equipment) => (
                    <li key={equipment._id}>
                        <h3>{equipment.name}</h3>
                        <p>{equipment.category}</p>
                        <p>${equipment.rentalPrice} {equipment.rentalType}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrowseEquipmentsPage;
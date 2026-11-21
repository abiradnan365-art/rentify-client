"use client";
import { bookingToAEquipment } from '@/lib/actions/bookings';
import { useSession } from '@/lib/auth-client';
import { Button } from '@base-ui/react';
import { useRouter } from 'next/navigation';

import React from 'react';

type BookNowProps = {
  equipment: { _id: string; name: string };
  session: unknown;
};

const BookNow = ({ equipment}: BookNowProps) => {
    const router = useRouter();
    const {data: session} = useSession();
    const user = session?.user;
    const handleBookNow = async () => {
        if (!user) {
            router.push(`/login?redirectTo=/browse-equipments/${equipment?._id}`);
            return;
        }
        else if(user.role === 'customer') {
           
            const booking = {
                equipmentId: equipment._id,
                userId: user.id,
                email: user.email,
                equipmentTitle: equipment.name,
            }

            const result = await bookingToAEquipment(booking);
            if (typeof result === 'object' && result !== null && 'insertedId' in result && result.insertedId) {
                console.log("Booking successful:", result);
                router.push('/browse-equipments');
            }

        }
        else {
            console.log("User is not a customer. Redirecting to login.");
        }
  }
    return (
         <Button
            onClick={handleBookNow}
              type="button"
              className="h-11 rounded-lg bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Book Now
            </Button>
    );
};

export default BookNow;
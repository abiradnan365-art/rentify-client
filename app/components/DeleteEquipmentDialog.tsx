'use client'
import { Trash2Icon } from "lucide-react"
import { useRouter } from 'next/navigation'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Equipment } from "../dashboard/owner/equipments/page"
import { deleteEquipment } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"

export function DeleteEquipmentDialog({ equipment }: { equipment: Equipment }) {

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const handleDelete = async () => {
        const res = await deleteEquipment(equipment._id);
        console.log("Deleting equipment:", equipment._id, res);
        if (res.deletedCount) {
            setOpen(false);
            toast.add({
                title: "Equipment Deleted",
                description: "The equipment has been successfully deleted.",
            })
            router.refresh();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="destructive">Delete</Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Equipment?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this equipment. View{" "}
                        <a href="#">Settings</a> delete any memories saved during this chat.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

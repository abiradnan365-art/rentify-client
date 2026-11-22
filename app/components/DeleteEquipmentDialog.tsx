'use client'
import { Trash2Icon } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useState } from "react"

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
import { toast } from "@/components/ui/toast"
import { deleteEquipment } from "@/lib/actions/equipments"
import type { Equipment } from "@/types/equipment"

export function DeleteEquipmentDialog({ equipment }: { equipment: Equipment }) {
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        setDeleting(true)
        const res = await deleteEquipment(equipment._id)
        setDeleting(false)

        if ("error" in res) {
            toast.add({
                title: "Delete failed",
                description: String(res.error),
            })
            return
        }

        setOpen(false)
        toast.add({
            title: "Equipment Deleted",
            description: "The equipment has been successfully deleted.",
        })
        router.refresh()
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
                        This will permanently delete this equipment. This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" disabled={deleting}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        variant="destructive"
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
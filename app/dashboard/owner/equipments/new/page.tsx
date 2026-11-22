
"use client"

import { createEquipment } from "@/lib/actions/equipments"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { ImagePlus, Upload, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FormField } from "@/components/form-field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import {
    EQUIPMENT_CATEGORIES,
    RENTAL_TYPES,
    type UploadedImage,
} from "@/types/equipment"

const fieldClass =
    "h-9 w-full rounded-md border-border bg-muted/40 shadow-none"

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const MAX_IMAGES = 6
const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function NewEquipmentPage() {
    const router = useRouter()
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")

    async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files || [])

        // Allow selecting the same file again later
        event.target.value = ""

        setError("")

        if (!files.length) return

        const remainingSlots = MAX_IMAGES - uploadedImages.length

        if (remainingSlots <= 0) {
            setError("You can upload a maximum of 6 images.")
            return
        }

        if (files.length > remainingSlots) {
            setError(`You can select only ${remainingSlots} more image(s).`)
            return
        }

        const validFiles: File[] = []

        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                setError(`${file.name} is not a valid image.`)
                continue
            }

            if (file.size > MAX_FILE_SIZE) {
                setError(`${file.name} exceeds the 10 MB size limit.`)
                continue
            }

            validFiles.push(file)
        }

        if (!validFiles.length) return

        setUploading(true)

        try {
            const results = await Promise.all(
                validFiles.map(async (file) => {
                    const formData = new FormData()
                    formData.append("image", file)

                    const response = await fetch(`${API_URL}/upload-image`, {
                        method: "POST",
                        body: formData,
                    })

                    const result = await response.json()

                    if (!response.ok || !result.success || !result.imageUrl) {
                        throw new Error(result.message || `Failed to upload ${file.name}`)
                    }

                    return {
                        id: `${file.name}-${file.lastModified}-${file.size}`,
                        name: file.name,
                        url: result.imageUrl,
                    }
                }),
            )

            setUploadedImages((previous) => [...previous, ...results])
        } catch (uploadError) {
            console.error("Image upload error:", uploadError)

            setError(
                uploadError instanceof Error
                    ? uploadError.message
                    : "Image upload failed. Please try again.",
            )
        } finally {
            setUploading(false)
        }
    }

    function removeImage(id: string) {
        setUploadedImages((previous) =>
            previous.filter((image) => image.id !== id),
        )
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (uploading) {
            setError("Please wait until image uploads are complete.")
            return
        }

        const formData = new FormData(event.currentTarget)
        const fields = Object.fromEntries(formData.entries())

        const manualUrls = String(fields.imageUrls || "")
            .split("\n")
            .map((url) => url.trim())
            .filter(Boolean)

        delete fields.images
        delete fields.imageUrls

        const values = {
            ...fields,
            rentalPrice: Number(fields.rentalPrice),
            quantity: Number(fields.quantity),
            images: [...uploadedImages.map((image) => image.url), ...manualUrls],
            status: "Pending",
            createdAt: new Date().toISOString(),
        }

        try {
            const result = await createEquipment(values)

            if (result?.success) {
                toast.add({
                    title: "Equipment Submitted",
                    description: "The equipment has been submitted for review.",
                })

                router.push("/dashboard/owner/equipments")
            } else {
                toast.add({
                    title: "Submission Failed",
                    description: result?.message || "Please try again.",
                })
            }
        } catch (error) {
            console.error("Create equipment error:", error)

            toast.add({
                title: "Something went wrong",
                description: "Please try again.",
            })
        }
    }

    return (
        <div className="w-full p-3 sm:p-5 lg:p-6">
            <Card className="w-full max-w-none shadow-sm">
                <CardHeader className="px-5 pt-5 sm:px-7 sm:pt-7">
                    <CardTitle className="text-xl font-bold">
                        List New Equipment on RENTIFY
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        New listings enter Pending status for Admin verification before
                        going live.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-5 pb-5 sm:px-7 sm:pb-7">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <FormField htmlFor="name" label="Equipment Name">
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Bobcat S565 Skid-Steer Loader"
                                className={fieldClass}
                            />
                        </FormField>

                        <FormField htmlFor="category" label="Category">
                            <Select name="category" defaultValue="Construction Equipment">
                                <SelectTrigger id="category" className={fieldClass}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {EQUIPMENT_CATEGORIES.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>

                        <FormField htmlFor="brand" label="Brand">
                            <Input
                                id="brand"
                                name="brand"
                                placeholder="e.g. Bobcat"
                                className={fieldClass}
                            />
                        </FormField>

                        <FormField htmlFor="model" label="Model">
                            <Input
                                id="model"
                                name="model"
                                placeholder="e.g. S565 M-Series"
                                className={fieldClass}
                            />
                        </FormField>

                        <FormField htmlFor="rentalPrice" label="Rental Price (USD)">
                            <Input
                                id="rentalPrice"
                                name="rentalPrice"
                                type="number"
                                min={0}
                                defaultValue={250}
                                className={fieldClass}
                            />
                        </FormField>

                        <FormField htmlFor="rentalType" label="Rental Type">
                            <Select name="rentalType" defaultValue="Daily">
                                <SelectTrigger id="rentalType" className={fieldClass}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {RENTAL_TYPES.map((rentalType) => (
                                        <SelectItem key={rentalType} value={rentalType}>
                                            {rentalType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>

                        <FormField htmlFor="location" label="Location Hub">
                            <Input
                                id="location"
                                name="location"
                                defaultValue="Dhaka"
                                className={fieldClass}
                            />
                        </FormField>

                        <FormField htmlFor="quantity" label="Available Quantity">
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min={1}
                                defaultValue={2}
                                className={fieldClass}
                            />
                        </FormField>

                        <FormField htmlFor="condition" label="Condition">
                            <Input
                                id="condition"
                                name="condition"
                                defaultValue="Excellent"
                                className={fieldClass}
                            />
                        </FormField>

                        <div className="rounded-lg border border-border bg-muted/20 p-5 sm:col-span-2 lg:col-span-3">
                            <div className="flex items-center justify-between gap-3">
                                <p className="flex items-center gap-2 text-sm font-semibold">
                                    <ImagePlus className="size-4 text-orange-500" />
                                    Equipment &amp; Machinery Images (ImgBB Hosted)
                                </p>

                                <span className="text-xs text-muted-foreground">
                                    {uploadedImages.length}/{MAX_IMAGES} photos
                                </span>
                            </div>

                            <label
                                htmlFor="images"
                                className={`mt-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background px-6 py-10 text-center transition-colors hover:border-teal-400 hover:bg-teal-50/30 ${
                                    uploadedImages.length >= MAX_IMAGES || uploading
                                        ? "cursor-not-allowed opacity-60"
                                        : "cursor-pointer"
                                }`}
                            >
                                <span className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-orange-500 shadow-sm">
                                    {uploading ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <Upload className="size-4" />
                                    )}
                                </span>

                                <span className="mt-3 text-sm font-semibold">
                                    {uploading
                                        ? "Uploading images..."
                                        : "Click to browse images"}
                                </span>

                                <span className="mt-1 text-xs text-muted-foreground">
                                    JPEG, PNG, WEBP, GIF — Maximum 10 MB per image
                                </span>

                                <input
                                    id="images"
                                    name="images"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    multiple
                                    disabled={uploading || uploadedImages.length >= MAX_IMAGES}
                                    className="sr-only"
                                    onChange={handleImageChange}
                                />
                            </label>

                            {error && (
                                <p className="mt-2 text-xs font-medium text-red-500">
                                    {error}
                                </p>
                            )}

                            {uploadedImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {uploadedImages.map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative overflow-hidden rounded-lg border border-border"
                                        >
                                            <Image
                                                width={200}
                                                height={200}
                                                src={image.url}
                                                alt={image.name}
                                                className="h-32 w-full object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeImage(image.id)}
                                                className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-600"
                                                aria-label={`Remove ${image.name}`}
                                            >
                                                <X className="size-4" />
                                            </button>

                                            <p className="truncate px-2 py-1.5 text-xs">
                                                {image.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Separator className="my-4" />

                            <FormField
                                htmlFor="imageUrls"
                                label="Or add additional image URLs manually (one per line)"
                            >
                                <Textarea
                                    id="imageUrls"
                                    name="imageUrls"
                                    placeholder="https://..."
                                    className="min-h-20 rounded-md border-border bg-background shadow-none"
                                />
                            </FormField>
                        </div>

                        <FormField
                            htmlFor="description"
                            label="Description"
                            className="sm:col-span-2 lg:col-span-3"
                        >
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Detailed technical specifications, attachments included..."
                                className="min-h-28 rounded-md border-border bg-muted/40 shadow-none"
                            />
                        </FormField>

                        <FormField
                            htmlFor="rentalTerms"
                            label="Rental Terms & Conditions"
                            className="sm:col-span-2 lg:col-span-3"
                        >
                            <Textarea
                                id="rentalTerms"
                                name="rentalTerms"
                                defaultValue="Standard damage waiver and operator certification required."
                                className="min-h-24 rounded-md border-border bg-muted/40 shadow-none"
                            />
                        </FormField>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={uploading}
                            className="justify-self-start bg-teal-600 px-6 text-white hover:bg-teal-700 sm:col-span-2 lg:col-span-3"
                        >
                            Submit Equipment For Approval
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

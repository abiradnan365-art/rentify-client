
"use client"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

const categories = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Event & AV Equipment",
]

const rentalTypes = ["Hourly", "Daily", "Weekly", "Monthly"]

const fieldClass =
  "h-9 w-full rounded-md border-border bg-muted/40 shadow-none"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

const MAX_IMAGES = 6
const MAX_FILE_SIZE = 10 * 1024 * 1024

type UploadedImage = {
  id: string
  name: string
  url: string
}

export default function NewEquipmentPage() {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (uploading) {
      setError("Please wait until image uploads are complete.")
      return
    }

    const formData = new FormData(event.currentTarget)

    const data = {
      ...Object.fromEntries(formData.entries()),
      images: uploadedImages.map((image) => image.url),
    }

    console.log("New equipment form data:", data)

    // Next step: Send this data to your equipment creation API.
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="mx-auto w-full max-w-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            List New Equipment on RENTIFY
          </CardTitle>
          <CardDescription className="text-xs">
            New listings enter Pending status for Admin verification before
            going live.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2"
          >
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[13px] font-semibold">
                Equipment Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Bobcat S565 Skid-Steer Loader"
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-[13px] font-semibold">
                Category
              </Label>
              <Select name="category" defaultValue="Construction Equipment">
                <SelectTrigger id="category" className={fieldClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="brand" className="text-[13px] font-semibold">
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                placeholder="e.g. Bobcat"
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="model" className="text-[13px] font-semibold">
                Model
              </Label>
              <Input
                id="model"
                name="model"
                placeholder="e.g. S565 M-Series"
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rentalPrice" className="text-[13px] font-semibold">
                Rental Price (USD)
              </Label>
              <Input
                id="rentalPrice"
                name="rentalPrice"
                type="number"
                min={0}
                defaultValue={250}
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rentalType" className="text-[13px] font-semibold">
                Rental Type
              </Label>
              <Select name="rentalType" defaultValue="Daily">
                <SelectTrigger id="rentalType" className={fieldClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rentalTypes.map((rentalType) => (
                    <SelectItem key={rentalType} value={rentalType}>
                      {rentalType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-[13px] font-semibold">
                Location Hub
              </Label>
              <Input
                id="location"
                name="location"
                defaultValue="Dhaka"
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quantity" className="text-[13px] font-semibold">
                Available Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                defaultValue={2}
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="condition" className="text-[13px] font-semibold">
                Condition
              </Label>
              <Input
                id="condition"
                name="condition"
                defaultValue="Excellent"
                className={fieldClass}
              />
            </div>

            <div className="rounded-lg border border-border bg-muted/20 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-[13px] font-semibold">
                  <ImagePlus className="size-4 text-orange-500" />
                  Equipment &amp; Machinery Images (ImgBB Hosted)
                </p>

                <span className="text-xs text-muted-foreground">
                  {uploadedImages.length}/{MAX_IMAGES} photos
                </span>
              </div>

              <label
                htmlFor="images"
                className={`mt-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background px-6 py-8 text-center transition-colors hover:border-teal-400 hover:bg-teal-50/30 ${
                  uploadedImages.length >= MAX_IMAGES || uploading
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`}
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-orange-500 shadow-sm">
                  {uploading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                </span>

                <span className="mt-3 text-[13px] font-semibold">
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
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                        className="h-28 w-full object-cover"
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

              <div className="space-y-1.5">
                <Label
                  htmlFor="imageUrls"
                  className="text-[13px] font-semibold"
                >
                  Or add additional image URLs manually (one per line)
                </Label>
                <Textarea
                  id="imageUrls"
                  name="imageUrls"
                  placeholder="https://..."
                  className="min-h-16 rounded-md border-border bg-background shadow-none"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description" className="text-[13px] font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed technical specifications, attachments included..."
                className="min-h-24 rounded-md border-border bg-muted/40 shadow-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label
                htmlFor="rentalTerms"
                className="text-[13px] font-semibold"
              >
                Rental Terms &amp; Conditions
              </Label>
              <Textarea
                id="rentalTerms"
                name="rentalTerms"
                defaultValue="Standard damage waiver and operator certification required."
                className="min-h-20 rounded-md border-border bg-muted/40 shadow-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={uploading}
              className="justify-self-start bg-teal-600 text-white hover:bg-teal-700 sm:col-span-2"
            >
              Submit Equipment For Approval
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

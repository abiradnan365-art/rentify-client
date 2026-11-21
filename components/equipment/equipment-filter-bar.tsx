
"use client"

import { Search } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const sortOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
]

type EquipmentFilterBarProps = {
  categories: string[]
  rentalTypes: string[]
  resultCount: number
  maxRate?: number
}

export function EquipmentFilterBar({
  categories,
  rentalTypes,
  resultCount,
  maxRate = 3500,
}: EquipmentFilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Current filter values from URL
  const currentCategory = searchParams.get("category") || "All Categories"
  const currentRentalType = searchParams.get("rentalType") || "All Rental Types"
  const currentSort = searchParams.get("sort") || "recent"
  const currentMaxRate = Number(searchParams.get("maxPrice") ?? maxRate)
  const inStock = searchParams.get("inStock") === "true"
  const currentSearch = searchParams.get("search") || ""

  
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (
      !value ||
      value === "All Categories" ||
      value === "All Rental Types" ||
      value === "recent" ||
      (key === "inStock" && value === "false")
    ) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    const query = params.toString()

    router.push(query ? `${pathname}?${query}` : pathname)
  }

  // Search submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const search = formData.get("searchField")?.toString().trim() || ""

    updateFilter("search", search)
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">

      
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

        
        <div className="relative sm:col-span-2 lg:col-span-1">
          <form onSubmit={handleSubmit}>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              key={currentSearch}
              name="searchField"
              type="search"
              defaultValue={currentSearch}
              placeholder="Search by name or location (e.g. Dhaka)"
              className="h-10 rounded-lg bg-background pl-9 shadow-none"
            />
          </form>
        </div>

        
        <Select
          value={currentCategory}
          onValueChange={(value) => updateFilter("category", value ?? "")}
        >
          <SelectTrigger className="h-10 w-full rounded-lg bg-background shadow-none">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="All Categories">
              All Categories
            </SelectItem>

            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        
        <Select
          value={currentRentalType}
          onValueChange={(value) => updateFilter("rentalType", value ?? "")}
        >
          <SelectTrigger className="h-10 w-full rounded-lg bg-background shadow-none">
            <SelectValue placeholder="All Rental Types" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="All Rental Types">
              All Rental Types
            </SelectItem>

            {rentalTypes.map((rentalType) => (
              <SelectItem key={rentalType} value={rentalType}>
                {rentalType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        
        <Select
          value={currentSort}
          onValueChange={(value) => updateFilter("sort", value ?? "")}
        >
          <SelectTrigger className="h-10 w-full rounded-lg bg-background shadow-none">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

     
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">

        <div className="flex min-w-0 items-center gap-3">
          <p className="text-sm whitespace-nowrap text-foreground">
            Max Rate:{" "}
            <span className="font-bold text-teal-700">
              ${currentMaxRate}
            </span>
          </p>

          <div className="w-40 shrink-0">
            <Slider
              value={[currentMaxRate]}
              min={0}
              max={5000}
              step={50}
              onValueCommitted={(value) => {
                const maxPrice = Array.isArray(value) ? value[0] : value
                updateFilter("maxPrice", String(maxPrice))
              }}
              className="[&_[data-slot=slider-range]]:bg-teal-600 [&_[data-slot=slider-thumb]]:border-teal-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock-only"
            checked={inStock}
            onCheckedChange={(checked) =>
              updateFilter("inStock", String(checked === true))
            }
          />

          <Label htmlFor="in-stock-only" className="text-sm font-medium">
            Approved Only
          </Label>
        </div>

       
        <p className="ml-auto text-xs text-muted-foreground">
          Showing {resultCount} items
        </p>

      </div>
    </div>
  )
}

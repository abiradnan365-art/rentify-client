import { Search } from "lucide-react"

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
  "Recently Added",
  "Price: Low to High",
  "Price: High to Low",
]

type EquipmentFilterBarProps = {
  categories: string[]
  rentalTypes: string[]
  resultCount: number
  maxRate?: number
}

/**
 * Presentational filter bar. Controls are intentionally uncontrolled until the
 * search/query wiring is added.
 */
export function EquipmentFilterBar({
  categories,
  rentalTypes,
  resultCount,
  maxRate = 3500,
}: EquipmentFilterBarProps) {
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or location (e.g. Dhaka)"
            className="h-10 rounded-lg bg-background pl-9 shadow-none"
          />
        </div>

        <Select defaultValue="All Categories">
          <SelectTrigger className="h-10 w-full rounded-lg bg-background shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="All Rental Types">
          <SelectTrigger className="h-10 w-full rounded-lg bg-background shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Rental Types">All Rental Types</SelectItem>
            {rentalTypes.map((rentalType) => (
              <SelectItem key={rentalType} value={rentalType}>
                {rentalType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue={sortOptions[0]}>
          <SelectTrigger className="h-10 w-full rounded-lg bg-background shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <p className="text-sm whitespace-nowrap text-foreground">
            Max Rate:{" "}
            <span className="font-bold text-teal-700">${maxRate}</span>
          </p>
          <div className="w-40 shrink-0">
            <Slider
              defaultValue={[maxRate]}
              min={0}
              max={5000}
              step={50}
              className="[&_[data-slot=slider-range]]:bg-teal-600 [&_[data-slot=slider-thumb]]:border-teal-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="in-stock-only" />
          <Label htmlFor="in-stock-only" className="text-sm font-medium">
            In Stock Only
          </Label>
        </div>

        <p className="ml-auto text-xs text-muted-foreground">
          Showing {resultCount} items
        </p>
      </div>
    </div>
  )
}

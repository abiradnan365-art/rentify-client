"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateEquipment } from "@/lib/actions/equipments";
import {
  EQUIPMENT_CATEGORIES,
  RENTAL_TYPES,
  type Equipment,
} from "@/types/equipment";
import { toast } from "../ui/toast";

const inputClass =
  "mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20";

const toForm = (e: Equipment) => ({
  name: e.name ?? "",
  category: e.category ?? "",
  brand: e.brand ?? "",
  model: e.model ?? "",
  rentalPrice: String(e.rentalPrice ?? ""),
  rentalType: e.rentalType ?? "Daily",
  quantity: String(e.quantity ?? 1),
  location: e.location ?? "",
  condition: e.condition ?? "",
  description: e.description ?? "",
  rentalTerms: e.rentalTerms ?? "",
});

export function UpdateEquipmentDialog({ equipment }: { equipment: Equipment }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => toForm(equipment));

  const set =
    (key: keyof ReturnType<typeof toForm>) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleOpen = () => {
    setForm(toForm(equipment)); 
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    const price = Number(form.rentalPrice);
    const qty = Number(form.quantity);

    if (!form.name.trim()) return setError("Name is required.");
    if (!(price > 0)) return setError("Price must be greater than 0.");
    if (!Number.isInteger(qty) || qty < 1)
      return setError("Quantity must be at least 1.");

    setSaving(true);
    setError("");

    const result = await updateEquipment(equipment._id, {
      ...form,
      name: form.name.trim(),
      rentalPrice: price,
      quantity: qty,
    });

    setSaving(false);

    if ("error" in result) {
      setError(String(result.error));
      return;
    }

    toast.add({
      title: "Equipment Updated",
      description: "The equipment has been successfully updated.",
    });
    setOpen(false);
  };

  const categories = EQUIPMENT_CATEGORIES.includes(form.category as never)
    ? [...EQUIPMENT_CATEGORIES]
    : [form.category, ...EQUIPMENT_CATEGORIES].filter(Boolean);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="h-9 w-full rounded-lg border border-border bg-amber-50 px-4 text-sm font-medium text-amber-800 hover:bg-amber-100"
      >
        Update
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Update Equipment</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <label className="col-span-2 text-xs font-semibold">
              Name
              <input className={inputClass} value={form.name} onChange={set("name")} />
            </label>

            <label className="text-xs font-semibold">
              Category
              <select className={inputClass} value={form.category} onChange={set("category")}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold">
              Condition
              <input className={inputClass} value={form.condition} onChange={set("condition")} />
            </label>

            <label className="text-xs font-semibold">
              Brand
              <input className={inputClass} value={form.brand} onChange={set("brand")} />
            </label>
            <label className="text-xs font-semibold">
              Model
              <input className={inputClass} value={form.model} onChange={set("model")} />
            </label>

            <label className="text-xs font-semibold">
              Rental Price ($)
              <input type="number" min={1} className={inputClass} value={form.rentalPrice} onChange={set("rentalPrice")} />
            </label>
            <label className="text-xs font-semibold">
              Rental Type
              <select className={inputClass} value={form.rentalType} onChange={set("rentalType")}>
                {RENTAL_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="text-xs font-semibold">
              Quantity
              <input type="number" min={1} className={inputClass} value={form.quantity} onChange={set("quantity")} />
            </label>
            <label className="text-xs font-semibold">
              Location
              <input className={inputClass} value={form.location} onChange={set("location")} />
            </label>

            <label className="col-span-2 text-xs font-semibold">
              Description
              <textarea
                rows={3}
                value={form.description}
                onChange={set("description")}
                className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </label>
            <label className="col-span-2 text-xs font-semibold">
              Rental Terms
              <textarea
                rows={2}
                value={form.rentalTerms}
                onChange={set("rentalTerms")}
                className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </label>
          </div>

          {error ? <p className="text-xs text-rose-600">{error}</p> : null}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={saving}
              className="h-11 rounded-lg bg-muted text-sm font-semibold hover:bg-muted/70"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="h-11 rounded-lg bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
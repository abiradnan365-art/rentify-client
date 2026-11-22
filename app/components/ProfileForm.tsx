"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // apnar auth-client file e jei nam e export ache sheta boshan

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Props = {
  user: { name: string; email: string; image?: string | null; role?: string | null; id: string };
};

export default function ProfileForm({ user }: Props) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API}/upload-image`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) setImage(data.imageUrl);
      else setMessage({ type: "error", text: data.message || "Image upload failed" });
    } catch {
      setMessage({ type: "error", text: "Image upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return setMessage({ type: "error", text: "Name is required" });

    setSaving(true);
    setMessage(null);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image || undefined,
    });
    setSaving(false);

    if (error) {
      setMessage({ type: "error", text: error.message || "Update failed" });
      return;
    }
    setMessage({ type: "ok", text: "Profile updated" });
    router.refresh();
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-black tracking-tight">My Profile</h1>

      <div className="mt-5 flex items-center gap-4">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="size-16 rounded-full object-cover" />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white">
            {name?.[0]?.toUpperCase()}
          </div>
        )}
        <label className="cursor-pointer rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-muted">
          {uploading ? "Uploading..." : "Change photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block text-xs font-semibold">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-normal outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
          />
        </label>

        <label className="block text-xs font-semibold">
          Email
          <input
            value={user.email}
            disabled
            className="mt-1 h-11 w-full rounded-lg border border-border bg-muted px-3 text-sm font-normal text-muted-foreground"
          />
        </label>

        <div className="flex justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">Role</span>
          <span className="font-semibold capitalize">{user.role}</span>
        </div>
      </div>

      {message ? (
        <p className={`mt-4 text-xs ${message.type === "ok" ? "text-teal-700" : "text-rose-600"}`}>
          {message.text}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || uploading}
        className="mt-5 h-11 w-full rounded-lg bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}
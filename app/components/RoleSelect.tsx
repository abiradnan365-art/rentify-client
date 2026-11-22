"use client";
import { useState, useTransition } from "react";
import { updateUserRole } from "@/lib/actions/admin";

type Role = "customer" | "owner" | "admin";

export default function RoleSelect({
  userId,
  currentRole,
  disabled,
}: {
  userId: string;
  currentRole: string;
  disabled?: boolean;
}) {
  const [role, setRole] = useState(currentRole);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const handleChange = (next: Role) => {
    const previous = role;
    setRole(next);
    setError("");

    startTransition(async () => {
      const result = await updateUserRole(userId, next);
      if (result && "error" in result) {
        setRole(previous); // fail hole ager role e fire
        setError(String(result.error));
      }
    });
  };

  return (
    <div>
      <select
        value={role}
        disabled={disabled || pending}
        onChange={(e) => handleChange(e.target.value as Role)}
        className="h-9 rounded-lg border border-border bg-background px-2 text-sm capitalize disabled:opacity-60"
      >
        <option value="customer">Customer</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
      </select>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
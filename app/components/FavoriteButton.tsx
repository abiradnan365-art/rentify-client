"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/favorites";
import { cn } from "@/lib/utils";

type Props = {
  equipmentId: string;
  initialFavorited: boolean;
  loggedIn: boolean;
};

export default function FavoriteButton({ equipmentId, initialFavorited, loggedIn }: Props) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!loggedIn) {
      router.push(`/login?redirectTo=/browse-equipments/${equipmentId}`);
      return;
    }

    const previous = favorited;
    setFavorited(!previous); 

    startTransition(async () => {
      const result = await toggleFavorite(equipmentId);
      if ("error" in result) {
        setFavorited(previous);
        return;
      }
      setFavorited(result.favorited);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 text-sm font-medium hover:bg-muted disabled:opacity-60"
    >
      <Heart
        className={cn("size-4", favorited && "fill-rose-500 text-rose-500")}
      />
      {favorited ? "Favorited" : "Favorite"}
    </button>
  );
}
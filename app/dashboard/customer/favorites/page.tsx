import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { requireRole } from "@/lib/core/server";
import { getFavorites } from "@/lib/api/favorites";

export default async function FavoritesPage() {
  await requireRole("customer");

  const favorites = await getFavorites();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-black tracking-tight sm:text-[26px]">
          My Favorites
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Equipment you have saved for later.
        </p>

        {favorites.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <Link
                key={item._id}
                href={`/browse-equipments/${item._id}`}
                className="overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/10] bg-muted">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <ImageOff className="size-8" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="truncate text-sm font-bold">{item.name}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.category}
                  </p>
                  <p className="mt-2 text-sm font-bold text-teal-700">
                    ${item.rentalPrice}/{item.rentalType}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            You have no favorite equipment yet.
          </p>
        )}
      </section>
    </div>
  );
}
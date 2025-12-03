import type { LucideIcon } from "lucide-react";
import { MapPin, Star, UsersRound } from "lucide-react";

const favorites = [
  { name: "Echo Café", tags: ["#Brunch", "#Terrasse"] },
  { name: "Riviera Bar", tags: ["#Cocktails", "#Sunset"] },
  { name: "Atelier des Arts", tags: ["#Culture", "#DateNight"] },
];

export default function ProfilePage() {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-10 px-4 pb-32 pt-24 md:pt-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 text-white shadow-2xl shadow-black/40">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10 text-2xl font-semibold">
            JL
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Mon profil
            </p>
            <h1 className="text-3xl font-semibold">Julien L.</h1>
            <p className="text-sm text-white/70">@julienl — Explorateur urbain</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
            >
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="mt-2 flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-white/60">
                <stat.icon className="size-4" />
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Lieux favoris
          </p>
          <h2 className="text-2xl font-semibold">Toujours prêts à (re)découvrir</h2>
        </div>
        <div className="grid gap-3">
          {favorites.map((favorite) => (
            <div
              key={favorite.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-lg shadow-black/20 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-pink-300" />
                <p className="font-semibold">{favorite.name}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
                {favorite.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type ProfileStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const stats: ProfileStat[] = [
  { label: "Avis publiés", value: "24", icon: Star },
  { label: "Amis proches", value: "12", icon: UsersRound },
  { label: "Favoris", value: "8", icon: MapPin },
];

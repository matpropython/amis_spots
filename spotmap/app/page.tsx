import { MapPinned, Sparkles, UsersRound } from "lucide-react";

import { SpotMap } from "@/components/map/spot-map";

const filters = [
  { label: "Tous", icon: MapPinned },
  { label: "Mes avis", icon: Sparkles },
  { label: "Amis", icon: UsersRound },
];

const stats = [
  { value: "18", label: "spots relevés" },
  { value: "+6", label: "nouveaux avis amis" },
];

export default function HomePage() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-black text-white">
      <SpotMap />

      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <div className="bg-gradient-to-b from-black/80 via-black/50 to-transparent pt-10">
          <div className="pointer-events-auto space-y-6 px-4">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.4em] text-white/60">
                SpotMap
              </p>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold leading-tight">
                  Ta carte sociale, centrée sur tes amis
                </h1>
                <p className="max-w-md text-sm text-white/70">
                  Consulte uniquement tes propres avis et ceux de tes amis,
                  où qu&apos;ils soient. Tout est synchronisé avec Supabase et
                  Mapbox pour un rendu ultra fluide.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-[9rem] rounded-2xl border border-white/15 bg-white/5 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur"
                >
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none mt-auto hidden px-6 pb-36 text-right text-sm text-white/60 md:block">
          Prototype préliminaire — interactions sociales et drawer arriveront
          dans les prochaines itérations.
        </div>
      </div>
    </section>
  );
}

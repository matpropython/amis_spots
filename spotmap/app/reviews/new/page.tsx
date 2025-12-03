import { Hash, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NewReviewPage() {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 pb-32 pt-24 md:pt-32">
      <header className="space-y-2 text-white">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Nouveau spot
        </p>
        <h1 className="text-3xl font-semibold">Dépose un avis en 4 étapes</h1>
        <p className="text-sm text-white/70">
          Recherche un lieu, ajoute ta note, un commentaire et des tags pour que
          tes amis retrouvent instantanément tes recommandations.
        </p>
      </header>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Lieu
          </label>
          <Button
            variant="outline"
            className="h-12 justify-between rounded-2xl border-white/20 bg-black/20 text-left text-base font-medium text-white"
            disabled
          >
            <span className="flex items-center gap-2 text-white/70">
              <MapPin className="size-4" />
              Recherche Mapbox (bientôt disponible)
            </span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {["1", "2", "3", "4", "5"].map((rating) => (
            <button
              type="button"
              key={rating}
              className="flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-lg font-semibold text-white/70"
              disabled
            >
              <Star className="size-4" />
              <span className="sr-only">{rating} étoiles</span>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Commentaire
          </label>
          <div className="min-h-[6rem] rounded-2xl border border-white/15 bg-black/20 p-4 text-sm text-white/60">
            Champ de saisie riche à intégrer
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {["#Cocktails", "#Romantique", "#ChefKiss"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                <Hash className="size-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Button
          disabled
          className="h-12 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 text-base font-semibold text-white shadow-lg shadow-pink-500/30"
        >
          Valider l&apos;avis (à venir)
        </Button>
      </div>
    </section>
  );
}

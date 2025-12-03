"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import { Loader2, MapPin, Sparkles } from "lucide-react";

import type { Tables } from "@/types/database.types";
import { useSupabaseBrowserClient } from "@/utils/supabase/client";

const DEFAULT_VIEW_STATE = {
  longitude: 2.3522,
  latitude: 48.8566,
  zoom: 12,
};

const SEED_PLACES: Omit<Tables<"places">, "id" | "created_at">[] = [
  {
    name: "Le Vestiaire Secret",
    lat: 48.8637,
    lng: 2.349,
    category: "Bar à cocktails",
    city: "Paris",
  },
  {
    name: "Néon Riviera",
    lat: 48.8573,
    lng: 2.3655,
    category: "Restaurant fusion",
    city: "Paris",
  },
  {
    name: "Atelier Marée",
    lat: 48.8496,
    lng: 2.3326,
    category: "Seafood",
    city: "Paris",
  },
];

type PlaceRow = Tables<"places">;

export function SpotMap() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const supabase = useSupabaseBrowserClient();
  const [places, setPlaces] = useState<PlaceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = useCallback(async () => {
    try {
      const { data, error: supabaseError } = await supabase.from("places").select("*");
      if (supabaseError) {
        setError("Impossible de charger les lieux.");
        setPlaces([]);
      } else {
        setError(null);
        setPlaces(data ?? []);
      }
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const seedPlaces = useCallback(async () => {
    setIsSeeding(true);
    setIsLoading(true);
    setError(null);
    const { error: insertError } = await supabase.from("places").insert(SEED_PLACES);
    if (insertError) {
      setError("Insertion échouée, vérifie les permissions Supabase.");
    }
    await fetchPlaces();
    setIsSeeding(false);
  }, [fetchPlaces, supabase]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const markers = useMemo(
    () =>
      places.map((place) => (
        <Marker key={place.id} latitude={place.lat} longitude={place.lng} anchor="bottom">
          <div className="group flex flex-col items-center gap-1 text-white">
            <div className="rounded-full bg-gradient-to-b from-pink-500 to-orange-400 p-2 shadow-lg shadow-black/30 ring-4 ring-black/20 transition group-hover:scale-105">
              <MapPin className="size-5" strokeWidth={2.4} />
            </div>
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur">
              {place.name}
            </span>
          </div>
        </Marker>
      )),
    [places],
  );

  if (!token) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-center text-sm text-zinc-300">
        <p className="text-base font-semibold text-white">Configure ton token Mapbox</p>
        <p className="max-w-sm text-zinc-400">
          Ajoute la variable <code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> dans ton
          fichier <code className="font-mono">.env.local</code> pour visualiser la carte en temps réel.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Map
        initialViewState={DEFAULT_VIEW_STATE}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={token}
        attributionControl={false}
        pitch={45}
        bearing={-10}
        reuseMaps
        dragRotate={false}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        {markers}
      </Map>

      <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-col gap-3 text-white">
        {error && (
          <p className="pointer-events-auto rounded-2xl border border-red-500/50 bg-red-500/20 px-4 py-2 text-sm backdrop-blur">
            {error}
          </p>
        )}
        {isLoading && (
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.3em] backdrop-blur">
            <Loader2 className="size-4 animate-spin" /> Chargement des spots…
          </div>
        )}
        {!isLoading && places.length === 0 && (
          <button
            type="button"
            onClick={seedPlaces}
            disabled={isSeeding}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] shadow-lg backdrop-blur transition hover:bg-white/10 disabled:opacity-60"
          >
            {isSeeding ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Injection…
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Injecter des spots démo
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

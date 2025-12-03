"use client";

import Map, { Marker, NavigationControl } from "react-map-gl";
import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

type DemoSpot = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: "me" | "friend";
};

const demoSpots: DemoSpot[] = [
  {
    id: "1",
    name: "Casbah Rooftop",
    latitude: 48.8575,
    longitude: 2.3538,
    type: "me",
  },
  {
    id: "2",
    name: "Bar Botaniste",
    latitude: 48.8705,
    longitude: 2.3333,
    type: "friend",
  },
  {
    id: "3",
    name: "Studio 151",
    latitude: 48.8685,
    longitude: 2.3791,
    type: "friend",
  },
  {
    id: "4",
    name: "Echo Café",
    latitude: 48.8469,
    longitude: 2.3524,
    type: "me",
  },
];

const DEFAULT_VIEW_STATE = {
  longitude: 2.3522,
  latitude: 48.8566,
  zoom: 12,
};

const pinStyles: Record<DemoSpot["type"], string> = {
  me: "bg-gradient-to-b from-pink-500 to-rose-500",
  friend: "bg-gradient-to-b from-sky-400 to-cyan-500",
};

export function SpotMap() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-center text-sm text-zinc-300">
        <p className="text-base font-semibold text-white">
          Configure ton token Mapbox
        </p>
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
        {demoSpots.map((spot) => (
          <Marker
            key={spot.id}
            latitude={spot.latitude}
            longitude={spot.longitude}
            anchor="bottom"
          >
            <div
              className={cn(
                "flex size-9 -translate-y-2 items-center justify-center rounded-full shadow-lg shadow-black/40 ring-4 ring-black/20",
                pinStyles[spot.type],
              )}
            >
              <span className="sr-only">{spot.name}</span>
              <MapPin className="size-4 text-white" strokeWidth={2.5} />
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

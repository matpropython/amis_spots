# SpotMap · Social Map entre amis

SpotMap est une application web mobile-first pensée comme un réseau social géolocalisé. L'expérience actuelle met l'accent sur une carte plein écran, une navigation mobile dockée et un premier flow d'ajout d'avis.

## Stack principale
- **Next.js 16 / App Router** + **TypeScript**
- **Tailwind CSS v4** avec tokens personnalisés (shadcn/ui)
- **shadcn/ui** pour les composants (Button installé)
- **Lucide React** pour l'iconographie
- **Mapbox GL** via `react-map-gl` (style sombre `dark-v11`)
- **Supabase client** pré-installé pour la suite (auth + data)
- **Zustand** réservé au futur state partagé

## Démarrage
```bash
npm install
cp .env.example .env.local # crée le fichier d'environnement
npm run dev
```
Puis rends-toi sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement
Crée un fichier `.env.local` et renseigne au minimum :

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

Sans token Mapbox, l'écran carte affiche un message pédagogique.

## Structure initiale
- `app/layout.tsx` : layout global, dock mobile et FAB flottante desktop.
- `app/page.tsx` : carte plein écran + overlay de filtres/stats.
- `app/friends`, `app/profile`, `app/reviews/new` : écrans skeleton pour les prochains flows.
- `components/map/spot-map.tsx` : wrapper `react-map-gl` avec pins démo.
- `components/navigation/*` : dock mobile + bouton d'ajout d'avis.

## Scripts npm
- `npm run dev` : serveur de développement.
- `npm run build` / `npm run start` : build & prod server.
- `npm run lint` : ESLint + React Compiler.

## Prochaines étapes
1. Brancher Supabase (tables users/places/reviews/friendships) et sécuriser l'auth.
2. Intégrer Mapbox Places pour la recherche puis un drawer d'info lieu.
3. Construire le flow complet "Ajouter un avis" (form, upload, validation).
4. Implémenter le système d'amis (recherche, invitations, filtres sur la carte).

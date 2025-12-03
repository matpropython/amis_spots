# SpotMap · Social Map entre amis

SpotMap est une application web mobile-first pensée comme un réseau social géolocalisé. L'expérience actuelle met l'accent sur une carte plein écran, une navigation mobile dockée et un premier flow d'ajout d'avis.

## Stack principale
- **Next.js 16 / App Router** + **TypeScript**
- **Tailwind CSS v4** avec tokens personnalisés (shadcn/ui)
- **shadcn/ui** pour les composants (Button installé)
- **Lucide React** pour l'iconographie
- **Mapbox GL** via `react-map-gl` (style sombre `dark-v11`)
- **Supabase** (Postgres + Auth) avec `@supabase/ssr`
- **Zustand** réservé au futur state partagé

## Démarrage
```bash
npm install
cp .env.example .env.local # crée le fichier d'environnement
npm run dev
```
Puis rends-toi sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement
Crée un fichier `.env.local` (inspiré de `.env.example`) avec :

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=public-anon
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Sans token Mapbox, l'écran carte affiche un message pédagogique. Les clés Supabase sont nécessaires pour l'auth côté client (browser) et côté serveur (API / actions).

## Auth & données
- `types/database.types.ts` : définition stricte des tables (profiles, places, reviews, friendships).
- `utils/supabase/*` : helpers SSR/CSR basés sur `@supabase/ssr`, cookies gérés automatiquement.
- `components/auth/login-form.tsx` + `app/login/page.tsx` : formulaire email/mot de passe + lien magique.
- La navigation mobile récupère le profil Supabase et affiche l'avatar connecté.

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
1. Lire/écrire les données Supabase (afficher les vrais avis, créer les reviews).
2. Intégrer Mapbox Places pour la recherche puis un drawer d'info lieu.
3. Construire le flow complet "Ajouter un avis" (form, upload, validation).
4. Implémenter le système d'amis (recherche, invitations, filtres sur la carte).

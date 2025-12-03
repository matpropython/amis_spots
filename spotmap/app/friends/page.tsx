import { MailPlus, UserRoundPlus, UsersRound } from "lucide-react";

export default function FriendsPage() {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-8 px-4 pb-32 pt-24 md:pt-32">
      <header className="space-y-3 text-white">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Réseau SpotMap
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Synchronise-toi avec tes amis</h1>
          <p className="text-sm text-white/70">
            Recherche un @username, envoie une demande et accepte les nouveaux
            amis pour débloquer leurs avis sur la carte.
          </p>
        </div>
      </header>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-2xl shadow-black/30 backdrop-blur">
        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/60">
          Barre de recherche @username (à venir)
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {actions.map((action) => (
            <div
              key={action.label}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <action.icon className="mt-1 size-5 text-white/70" />
              <div>
                <p className="text-sm font-semibold">{action.label}</p>
                <p className="text-xs text-white/60">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const actions = [
  {
    label: "Ajouter un ami",
    description: "Recherche un utilisateur et envoie-lui une invitation.",
    icon: UserRoundPlus,
  },
  {
    label: "Gérer tes demandes",
    description: "Accepte ou refuse les invitations reçues.",
    icon: MailPlus,
  },
  {
    label: "Voir tes cercles",
    description: "Sélectionne les amis qui apparaissent sur la carte.",
    icon: UsersRound,
  },
];

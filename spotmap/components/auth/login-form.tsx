"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSupabaseBrowserClient } from "@/utils/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const supabase = useSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setEmail("");
    setPassword("");
    router.push("/");
    router.refresh();
  };

  const handleMagicLink = async () => {
    setError(null);
    setIsSubmitting(true);

    const { error: magicLinkError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo:
          process.env.NEXT_PUBLIC_SITE_URL?.concat("/auth/callback") ??
          "http://localhost:3000/auth/callback",
      },
    });

    setIsSubmitting(false);

    if (magicLinkError) {
      setError(magicLinkError.message);
      return;
    }

    setError("📬 Un lien magique vient de t'être envoyé !");
  };

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="ton@email.com"
            className="h-12 w-full rounded-2xl border border-white/15 bg-black/20 px-4 text-base text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-white/60">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="••••••••"
            className="h-12 w-full rounded-2xl border border-white/15 bg-black/20 px-4 text-base text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          />
        </div>
        {error && (
          <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 text-base font-semibold text-white"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Connexion"
          )}
        </Button>
      </form>

      <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
        <div className="flex items-center gap-2 text-white">
          <Mail className="size-4" />
          <p className="font-semibold">Lien magique</p>
        </div>
        <p className="text-xs text-white/60">
          Pas envie de retenir un mot de passe ? Reçois un lien de connexion
          instantané dans ta boîte mail.
        </p>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting || !email}
          onClick={handleMagicLink}
          className="h-11 rounded-2xl border-white/30 bg-white/5 text-white hover:bg-white/10"
        >
          {isSubmitting ? "Envoi..." : "Envoyer le lien"}
        </Button>
      </div>
    </div>
  );
}

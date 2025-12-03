import { ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-8 px-4 pb-32 pt-24 text-white md:pt-32">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          SpotMap Access
        </p>
        <div className="space-y-2">
          <h1 className="flex items-center gap-2 text-3xl font-semibold">
            <ShieldCheck className="size-7 text-pink-400" />
            Connecte-toi pour continuer
          </h1>
          <p className="text-sm text-white/70">
            Ton compte te permet de retrouver tes avis, la carte de tes amis et
            tes cercles privés où que tu sois.
          </p>
        </div>
      </header>
      <LoginForm />
      <p className="text-center text-xs uppercase tracking-[0.3em] text-white/50">
        Sécurisé par Supabase Auth
      </p>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { MapPinned, UserRound, UsersRound } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Tables } from "@/types/database.types";
import { useSupabaseBrowserClient } from "@/utils/supabase/client";

import { AddReviewFab } from "./add-review-fab";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Carte",
    icon: MapPinned,
  },
  {
    href: "/friends",
    label: "Amis",
    icon: UsersRound,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: UserRound,
  },
];

type ProfileRow = Tables<"profiles">;

export function MobileDock() {
  const pathname = usePathname();
  const supabase = useSupabaseBrowserClient();
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (ignore) return;

      if (!user) {
        setProfile(null);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const fallback: ProfileRow = {
        id: user.id,
        created_at: null,
        username:
          (user.user_metadata?.username as string | undefined) ??
          user.email?.split("@")[0] ??
          null,
        avatar_url: (user.user_metadata?.avatar_url as string | undefined) ?? null,
        bio: null,
      };

      setProfile(data ?? fallback);
    };

    fetchProfile();
    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setProfile(null);
        return;
      }
      fetchProfile();
    });

    return () => {
      ignore = true;
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 md:hidden">
      <div className="pointer-events-auto relative flex w-full max-w-md items-center justify-between rounded-[2rem] border border-white/10 bg-zinc-950/85 px-6 py-4 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <nav className="flex w-full items-end justify-between gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 transition",
                  isActive ? "text-white" : "text-white/60 hover:text-white",
                )}
                >
                  {profile && label === "Profil" ? (
                    <ProfileBadge profile={profile} isActive={isActive} />
                  ) : (
                    <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
                  )}
                  <span>{label}</span>
                </Link>
            );
          })}
        </nav>
        <AddReviewFab className="absolute -top-7 left-1/2 -translate-x-1/2 shadow-pink-500/45" />
      </div>
    </div>
  );
}

function ProfileBadge({
  profile,
  isActive,
}: {
  profile: ProfileRow;
  isActive: boolean;
}) {
  const initials =
    profile.username?.slice(0, 2).toUpperCase() ??
    profile.id.slice(0, 2).toUpperCase();

  if (profile.avatar_url) {
    return (
      <span
        className={cn(
          "flex size-10 overflow-hidden rounded-full border-2",
          isActive ? "border-white" : "border-white/30",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatar_url}
          alt="Avatar utilisateur"
          className="size-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center rounded-full border-2 text-xs font-semibold tracking-[0.2em]",
        isActive
          ? "border-white bg-white/20 text-white"
          : "border-white/30 bg-white/10 text-white/70",
      )}
    >
      {initials}
    </span>
  );
}

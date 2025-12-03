"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { MapPinned, UserRound, UsersRound } from "lucide-react";

import { cn } from "@/lib/utils";

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

export function MobileDock() {
  const pathname = usePathname();

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
                <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
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

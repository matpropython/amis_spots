import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AddReviewFabProps = {
  className?: string;
  label?: string;
};

export function AddReviewFab({
  className,
  label = "Ajouter un avis",
}: AddReviewFabProps) {
  return (
    <Button
      asChild
      size="icon-lg"
      className={cn(
        "rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 focus-visible:ring-pink-500/30",
        className,
      )}
    >
      <Link href="/reviews/new" aria-label={label}>
        <Plus className="size-5" />
      </Link>
    </Button>
  );
}

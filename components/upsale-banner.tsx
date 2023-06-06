"use client";
import { ReactElement } from "react";
import { LinkButton } from "@/components/ui/link";
import { useAuth } from "@/context/Auth";
import { useLockBody } from "@/lib/hooks/use-lock-body";
import { userTiers } from "@/config/plans";

export const UpSaleBanner = () => {
  const { currentUser } = useAuth()!;

  if (currentUser?.userPlan && userTiers[currentUser?.userPlan] <= 1) {
    return (
      <div className="w-full h-fit hidden md:flex bg-gradient-to-r text-white from-indigo-500 via-purple-500 to-pink-500  items-center gap-3 justify-center p-1">
        Want access to more features? Upgrade to Pro
        <LinkButton
          href="/settings/upgrade"
          variant="outline"
          size="sm"
          className="text-white border-white hover:bg-white hover:text-black "
        >
          Upgrade
        </LinkButton>
      </div>
    );
  }
  return null;
};

"use client";
import React from "react";
import { Icons } from "@/components/icons";
import { useAuth } from "@/context/user-auth";
import Plans from "@/components/plans";
import { LinkButton } from "@/components/ui/link";

const PlanLayout = () => {
  const { currentUser } = useAuth()!;

  return (
    <div className="z-10 flex items-center flex-col">
      <Plans
        currentUser={currentUser}
        cancel_url="dashboard"
        success_url="dashboard"
      />
      <LinkButton href="/dashboard" variant="link" className="mx-auto mt-6">
        Continue with limited free plan
        <Icons.chevronRight className="ml-2 h-4 w-4" />
      </LinkButton>
    </div>
  );
};

export default PlanLayout;

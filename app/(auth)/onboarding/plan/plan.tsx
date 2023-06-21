"use client";
import React from "react";
import { Icons } from "@/components/icons";
import { useAuth } from "@/context/user-auth";
import Plans from "@/components/plans";
import { LinkButton } from "@/components/ui/link";

const PlanLayout = () => {
  const { currentUser } = useAuth()!;

  return (
    <>
      <div className="z-10 flex items-center flex-col">
        <div className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-md border-theme-blue border px-7 py-2 transition-all ">
          <p className="text-[12px] font-semibold text-theme-blue">
            7 Day Free Trial. Cancel Anytime!
          </p>
        </div>
        <Plans
          currentUser={currentUser}
          cancel_url="dashboard"
          success_url="dashboard"
        />
        {/* <p className="mt-6 text-muted-foreground">
        7 Day Free Trial. Cancel Anytime!
      </p> */}
        {/* <LinkButton href="/dashboard" variant="link" className="mx-auto mt-6">
        Continue with limited free plan
        <Icons.chevronRight className="ml-2 h-4 w-4" />
      </LinkButton> */}
      </div>
    </>
  );
};

export default PlanLayout;

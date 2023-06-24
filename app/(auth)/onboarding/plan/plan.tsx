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
      <div className="z-10 flex items-center flex-col ">
        <div className="mb-6 md:mb-0 mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-md border-theme-blue border px-7 py-2 transition-all ">
          <p className="text-[12px] font-semibold text-theme-blue">
            7 Day Free Trial. Cancel Anytime!
          </p>
        </div>
        <Plans
          currentUser={currentUser}
          cancel_url="dashboard"
          success_url="dashboard"
        />
      </div>
    </>
  );
};

export default PlanLayout;

"use client";
import { ReactElement } from "react";
import { LinkButton } from "@/components/ui/link";
import { useAuth } from "@/context/Auth";
type UserStatus = "base" | "standard" | "premium";

const userTiers = {
  base: 0,
  standard: 1,
  premium: 2,
};

const ProtectFeature = ({
  children,
  planLevel,
}: {
  children: ReactElement;
  planLevel: UserStatus;
}) => {
  const { userPlan } = useAuth()!;

  if (userPlan && userTiers[userPlan] >= userTiers[planLevel]) {
    return children;
  }

  return (
    <div className=" w-full h-full top-0  overflow-hidden ">
      <div className="h-fit p-8 w-fit bg-background border rounded-md z-10 absolute top-[40vh] -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <h1 className="text-primary text-2xl">
          Upgrade to access this feature
        </h1>
        <p className="text-muted-foreground text-sm">
          You need to upgrade to access this feature
        </p>
        <div className="flex flex-row gap-2 mt-2">
          <LinkButton href={"/settings/upgrade"} className="w-fit">
            Upgrade
          </LinkButton>
        </div>
      </div>
      <div className="absolute bg-background backdrop-blur-[8px] h-full w-full" />
    </div>
  );
};

export default ProtectFeature;

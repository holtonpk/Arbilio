"use client";
import { ReactElement } from "react";
import { LinkButton } from "@/components/ui/link";
import { useAuth } from "@/context/Auth";
import { useLockBody } from "@/lib/hooks/use-lock-body";

type UserStatus = "base" | "standard" | "premium";

const userTiers = {
  base: 0,
  standard: 1,
  premium: 2,
};

const ProtectFeature = ({
  children,
  planLevel,
  featureName,
}: {
  children: ReactElement;
  planLevel: UserStatus;
  featureName: string;
}) => {
  const { currentUser } = useAuth()!;

  if (
    currentUser?.userPlan &&
    userTiers[currentUser?.userPlan] >= userTiers[planLevel]
  ) {
    return children;
  } else {
    // useLockBody();
  }

  return (
    <>
      <div className="h-[50vh] w-full flex justify-center  items-center relative">
        <div className="  grid h-fit w-full max-w-lg scale-100  gap-4 bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 sm:rounded-lg sm:zoom-in-90  md:w-full">
          <div className="flex flex-col space-y-2 text-center sm:text-left items-center">
            <h1 className="text-lg font-semibold">
              {`Upgrade to access ${featureName}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              This feature is only available to Pro users.
            </p>
            <LinkButton href={"/settings/upgrade"} className="w-fit mt-4">
              Upgrade
            </LinkButton>
          </div>
          {/* <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"> */}
          {/* </div> */}
        </div>
      </div>
      {/* <div className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm " /> */}
    </>
  );
};

export default ProtectFeature;

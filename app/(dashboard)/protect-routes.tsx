"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import useUserStatus from "@/stripe/useUserStatus";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/ui/link";

type UserStatus = "base" | "standard" | "premium";

const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const { currentUser } = useAuth()!;
  const [userPlan, setUserPlan] = useState<UserStatus>();
  const router = useRouter();

  useEffect(() => {
    async function checkUserStatus() {
      const status = await useUserStatus();
      setUserPlan(status);
    }
    checkUserStatus();
  }, []);

  // if (currentUser && !userPlan) {
  //   // router.push("/onboarding/plan");
  // } else
  if (currentUser) {
    return children;
  }
  return (
    <div className="h-screen w-screen bg-background flex justify-center items-center flex-col">
      <h1 className="text-2xl font-semibold tracking-tight">
        You are not logged in
      </h1>
      <p className="text-sm text-muted-foreground">
        Please login to access this page
      </p>
      <div className="flex flex-row gap-2 mt-2">
        <LinkButton variant="outline" href="/login" className="w-full">
          Login
        </LinkButton>
        <LinkButton href="/register" className="w-full">
          Register
        </LinkButton>
      </div>
    </div>
  );
};

export default ProtectedRoutes;

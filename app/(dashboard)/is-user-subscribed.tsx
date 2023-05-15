"use client";
import React, { ReactElement, ReactNode } from "react";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";

const UserSubscribed = ({ children }: { children: ReactElement }) => {
  const { userPlan } = useAuth()!;
  const router = useRouter();

  if (!userPlan) {
    router.push("/onboarding/plan");
  } else {
    return children;
  }
  return null;
};

export default UserSubscribed;

"use client";
import React, { ReactElement, ReactNode } from "react";
import { useAuth } from "@/context/user-auth";
import { useRouter } from "next/navigation";

const UserSubscribed = ({ children }: { children: ReactElement }) => {
  const { currentUser } = useAuth()!;
  const router = useRouter();

  if (!currentUser?.userPlan) {
    router.push("/onboarding/plan");
  } else {
    return children;
  }
  return null;
};

export default UserSubscribed;

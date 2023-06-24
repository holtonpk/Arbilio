"use client";
import React, { ReactElement } from "react";
import { useAuth } from "@/context/user-auth";
import { LinkButton } from "@/components/ui/link";
import { useRouter } from "next/navigation";
const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const { currentUser } = useAuth()!;
  const router = useRouter();

  if (currentUser) {
    return children;
  } else {
    router.push("/login");
  }

  return null;
  // <div className="h-screen w-screen bg-background flex justify-center items-center flex-col">
  //   <h1 className="text-2xl font-semibold tracking-tight">
  //     You are not logged in
  //   </h1>
  //   <p className="text-sm text-muted-foreground">
  //     Please login to access this page
  //   </p>
  //   <div className="flex flex-row gap-2 mt-2">
  //     <LinkButton variant="outline" href="/login" className="w-full">
  //       Login
  //     </LinkButton>
  //     <LinkButton href="/onboarding/register" className="w-full">
  //       Register
  //     </LinkButton>
  //   </div>
  // </div>
};

export default ProtectedRoutes;

"use client";
import React, { ReactElement } from "react";
import { useAuth } from "@/context/Auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const { currentUser } = useAuth()!;

  if (!currentUser) {
    return (
      <div className="h-screen w-screen bg-background flex justify-center items-center flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">
          You are not logged in
        </h1>
        <p className="text-sm text-muted-foreground">
          Please login to access this page
        </p>
        <div className="flex flex-row gap-2 mt-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
  return children;
};

export default ProtectedRoutes;

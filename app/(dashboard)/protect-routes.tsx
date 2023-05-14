"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import { LinkButton } from "@/components/ui/link";

const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const { currentUser } = useAuth()!;

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

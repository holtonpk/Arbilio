"use client";
import React, { ReactElement, ReactNode } from "react";
import { useAuth } from "@/context/user-auth";
import { useRouter } from "next/navigation";

const UserAdmin = ({ children }: { children: ReactElement }) => {
  const { currentUser } = useAuth()!;

  if (currentUser?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
    return null;
  } else {
    return children;
  }
};

export default UserAdmin;

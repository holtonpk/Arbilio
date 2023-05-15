"use client";
import React from "react";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const LogoutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const router = useRouter();
    const { logOut } = useAuth()!;

    const handleLogout = () => {
      logOut();
      router.push("/");
    };

    return (
      <button
        onClick={handleLogout}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export default LogoutButton;

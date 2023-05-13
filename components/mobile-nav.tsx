import * as React from "react";
import Link from "next/link";

import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0  w-full top-16 z-50 h-[calc(100vh-4rem)]  auto-rows-max overflow-auto   shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 h-full  flex  flex-col gap-4 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4 mr-2"
          )}
        >
          Login
        </Link>
        <Link
          href="/onboarding/register"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "px-4"
          )}
        >
          Sign up
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm divide-y divide-border  ">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center text-lg p-2  font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}

import * as React from "react";
import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/link";
import { useLockBody } from "@/lib/hooks/use-lock-body";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div className="fixed inset-0  w-full top-16 z-50 h-[calc(100vh-4rem)]  auto-rows-max overflow-auto   shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 h-full  flex  flex-col gap-4 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <LinkButton
          href="/login"
          variant="secondary"
          size="sm"
          className="px-4 mr-2"
        >
          Login
        </LinkButton>
        <LinkButton
          href="/onboarding/register"
          variant="default"
          size="sm"
          className="px-4"
        >
          Sign up
        </LinkButton>
        <nav className="grid grid-flow-row auto-rows-max text-sm divide-y divide-border  ">
          {items.map((item, index) => (
            <LinkButton
              key={index}
              href={item.disabled ? "#" : item.href}
              variant={"link"}
              className={cn(
                "flex w-full items-center text-lg p-2  font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </LinkButton>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}

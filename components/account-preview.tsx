"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/Auth";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link";
import { useRouter } from "next/navigation";
import { ModeToggle2 } from "@/components/mode-toggle";

export const AccountInfo = () => {
  const { currentUser } = useAuth()!;
  const router = useRouter();
  const { logOut } = useAuth()!;

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  return (
    <div className="relative w-fit h-fit">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            className="w-fit h-git  flex pb-4  items-center p-2 hover:text-primary hover:bg-background hover:opacity-60 "
            variant="ghost"
            size="lg"
          >
            <div className="aspect-square p-1 mr-2 rounded-full  h-10 w-10  flex justify-center items-center bg-gradient-to-tl from-green-300 to-orange-400"></div>
            <div className="flex flex-col items-start">
              <div className="text-sm capitalize font-bold">
                {currentUser && currentUser.displayName}
              </div>
              <div className="text-[12px] font-muted-foreground">
                {currentUser && currentUser.email}
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <div className="flex justify-between items-center w-full px-2  text-sm">
            Theme <ModeToggle2 />
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button onClick={handleLogout} className="w-full">
              Logout
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/#" className="flex justify-between">
              Homepage
              <Icons.ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <div className="p-3">
            <DropdownMenuItem className=" focus:bg-background" asChild>
              <LinkButton
                href="/settings/upgrade"
                className="w-full focus:bg-primary/90 rounded-md focus:text-primary-foreground"
              >
                Upgrade to pro
              </LinkButton>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

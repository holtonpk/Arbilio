"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/Auth";
import { Icons } from "@/components/icons";

import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import useClickOutside from "@/hooks/use-click-outside";
export const AccountInfo = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const { currentUser } = useAuth()!;
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useClickOutside(menuRef, () => setShowMenu(false));

  return (
    <div className="relative w-fit h-fit">
      <Button
        onClick={handleToggleMenu}
        className="w-fit h-git  flex pb-4  items-center p-2 "
        variant="ghost"
        size="lg"
      >
        <div className="aspect-square p-1 mr-2 rounded-full  bg-accent  flex justify-center items-center">
          <Icons.profile className="h-6 w-6 text-primary   " />
        </div>
        <div className="flex flex-col items-start">
          <div className="text-sm capitalize font-bold">
            {currentUser && currentUser.displayName}
          </div>
          <div className="text-[12px] font-muted-foreground">
            {currentUser && currentUser.email}
          </div>
        </div>
      </Button>
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute fade-in top-full translate-y-2  w-full h-fit gap-1 bg-background p-2 rounded-md border flex flex-col"
        >
          <Link
            href={"/settings"}
            className="hover:bg-accent p-1 rounded-md w-full text-primary test-sm pl-4"
          >
            Settings
          </Link>
          <Link
            href={"/settings"}
            className="hover:bg-accent p-1 rounded-md w-full text-primary pl-4"
          >
            Account
          </Link>
          <Link
            href={"/settings"}
            className="hover:bg-accent p-1 rounded-md w-full text-primary pl-4"
          >
            Help
          </Link>

          <LogoutButton
            className="w-full flex gap-2 items-center p-2 "
            variant="default"
            size="sm"
          >
            <Icons.logout className="h-4 w-4 " />
            Logout
          </LogoutButton>
        </div>
      )}
    </div>
  );
};

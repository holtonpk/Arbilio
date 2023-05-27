"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/Auth";
import { Icons } from "@/components/icons";
import { MoreButton } from "./profile-actions";
import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import useClickOutside from "@/lib/hooks/use-click-outside";
export const AccountInfoMobile = () => {
  // const { data: session, status } = useSession();

  const [showMenu, setShowMenu] = React.useState(false);
  const { currentUser } = useAuth()!;
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useClickOutside(menuRef, () => setShowMenu(false));

  return (
    <div className="relative w-full h-fit ">
      <Button
        onClick={handleToggleMenu}
        variant={"outline"}
        className="w-full h-fit b flex   items-center justify-between p-2 "
      >
        <div className="flex flex-row gap-3 items-center">
          <div className="aspect-square p-1  rounded-full  bg-accent  flex justify-center items-center">
            <Icons.profile className="h-6 w-6 text-primary   " />
          </div>
          <div className="text-sm capitalize font-bold">
            {currentUser && currentUser.displayName}
          </div>
        </div>
      </Button>
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute bg-muted fade-in left-0 rounded-md border -top-3 -translate-y-full w-1/2 divide-y divide-border fade-in h-fit gap-1  p-2 flex flex-col"
        >
          <Link
            href={"/settings"}
            className="hover:underline p-1  w-full text-primary test-sm pl-4"
          >
            Settings
          </Link>
          <Link
            href={"/settings"}
            className="hover:underline p-1  w-full text-primary pl-4"
          >
            Account
          </Link>
          <Link
            href={"/settings"}
            className="hover:underline p-1  w-full text-primary pl-4"
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

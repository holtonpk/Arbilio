"use client";
import Link from "next/link";

import React, { useEffect, useState, useRef, RefObject } from "react";
import { MdOutlinePerson, MdOutlineSettings } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { RiMoreFill } from "react-icons/ri";
import { useAuth } from "@/context/Auth";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
interface MoreButtonProps {
  variant?: "default" | "outline" | "secondary";
  className?: string;
  size?: "sm" | "xsm" | "lg";
  account: any;
}
export const MoreButton = ({ variant, size, className }: MoreButtonProps) => {
  const [showMore, setShowMore] = useState(false);
  const moreButtonRef = useRef(null);

  const { logOut } = useAuth()!;

  useOnClickOutside(moreButtonRef, () => {
    setShowMore(false);
  });

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const logoutUser = () => {
    logOut();
    window.location.href = "/dashboard";
  };

  return (
    <div ref={moreButtonRef} className="relative ml-auto  ">
      <Button
        onClick={toggleShowMore}
        className="flex items-center justify-center whitespace-nowrap"
        variant={variant}
        size={size}
      >
        <Icons.ellipsis className="h-5 w-5 " />
      </Button>

      {showMore && (
        <React.Fragment>
          <div className="absolute top-0   right-1/2 translate-x-full -translate-y-full   w-fit h-fit bg-background border-2 border-border rounded-md shadow-lg  fade-in">
            <div className="flex flex-col items-start gap-2 p-2 w-fit whitespace-nowrap text-base">
              <Link
                href="/Settings"
                className=" font-bold text-primary flex items-center hover:bg-accent w-full rounded-md py-1 px-2"
              >
                <MdOutlineSettings className="h-4 w-4 mr-2" />
                Settings
              </Link>
              <Link
                href="/Settings"
                className=" font-bold text-primary flex items-center hover:bg-accent w-full rounded-md py-1 px-2"
              >
                <MdOutlinePerson className="h-4 w-4mr-2" />
                Manage Account
              </Link>
              <button
                onClick={() => logoutUser()}
                className=" font-bold text-primary flex items-center hover:bg-accent w-full rounded-md py-1 px-2"
              >
                <BiLogOut className="h-4 w-4mr-2" />
                Logout
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

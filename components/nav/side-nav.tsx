"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { dashboardConfig } from "@/config/dashboard";
import { SideNavRoute } from "@/types";
import { Icons } from "../icons";

const Navbar = () => {
  return (
    <nav className=" grid items-start gap-2 ">
      {dashboardConfig.sideNav.map((route, indx) => (
        <Route key={indx} item={route} />
      ))}
    </nav>
  );
};

export default Navbar;

const Logo = () => {
  return (
    <div className="h-fit w-full flex flex-col p-6 justify-center items-center gap-2">
      <Icons.logo className="h-6 w-6" />
      <span className="hidden font-bold sm:inline-block">
        {siteConfig.name}
      </span>
    </div>
  );
};

const Route = ({ item }: { item: SideNavRoute }) => {
  const [showSubPages, setShowSubPages] = useState(false);
  const segment = useSelectedLayoutSegment();

  const onClick = () => {
    setShowSubPages(!showSubPages);
  };

  useEffect(() => {
    if (item.subPages) {
      if (item.href.startsWith(`/${segment}`)) {
        setShowSubPages(true);
      }
    }
  }, [item.href, item.subPages, segment]);

  const Icon = Icons[item.iconName];

  return (
    <span className="flex flex-col gap-2 pr-2 relative h-fit">
      {!item?.subPages ? (
        <Link
          href={item?.href}
          className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground  ${
            item?.disabled && "cursor-not-allowed opacity-80"
          }`}
        >
          <Icon className="h-5 w-5 mr-2" />
          <div className="text-sm ">{item.title}</div>
          {item?.disabled && "Coming soon"}
        </Link>
      ) : (
        <>
          <button
            onClick={onClick}
            disabled={item?.disabled}
            className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground  ${
              item?.disabled && "cursor-not-allowed opacity-40"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <div className="text-sm ">{item.title}</div>
            </div>
            {item?.subPages && (
              <Icons.chevronDown
                className={`${
                  showSubPages ? "rotate-180" : "0"
                } h-4 w-4 transition-all ml-6`}
              />
            )}
          </button>

          {showSubPages && (
            <SubPages subPages={item.subPages} showSubPages={showSubPages} />
          )}
        </>
      )}
    </span>
  );
};

interface SubPagesProps {
  subPages: {
    title: string;
    href: string;
  }[];
  showSubPages: boolean;
}

const SubPages = ({ subPages, showSubPages }: SubPagesProps) => {
  const subPagesRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (subPagesRef.current) {
      setContentHeight(subPagesRef.current.scrollHeight);
    }
  }, [subPages]);

  return (
    <div
      id="subPages"
      ref={subPagesRef}
      className={`flex flex-col gap-1  height-animation ${
        showSubPages ? "show" : ""
      }`}
      style={showSubPages ? { height: `${contentHeight}px` } : {}}
    >
      {subPages.map((subPage, indx) => (
        <SubRoute key={indx} title={subPage.title} href={subPage.href} />
      ))}
    </div>
  );
};

const SubRoute = ({ title, href }: { title: string; href: string }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={` ${
        href == pathname ? "bg-accent " : "bg-transparent hover:bg-accent"
      }group flex items-center ml-4 whitespace-nowrap rounded-md px-3 py-2 text-[12px] font-medium hover:bg-accent hover:text-accent-foreground `}
    >
      {title}
    </Link>
  );
};

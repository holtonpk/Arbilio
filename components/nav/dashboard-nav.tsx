"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { dashboardConfig } from "@/config/dashboard";
import { SideNavRoute, SubRoute as SubRouteType } from "@/types";
import { useSelectedLayoutSegment } from "next/navigation";
import { Icons } from "@/components/icons";
import { AccountInfo } from "@/components/account-preview";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Feedback from "@/components/modals/feedback-modal";
import { siteConfig } from "@/config/site";

const DashboardNav = () => {
  const segment = useSelectedLayoutSegment();
  const [collapseNav, setCollapseNav] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 79) {
      setCollapseNav(true);
    } else {
      setCollapseNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="md:block hidden">
      <div className="w-screen h-20  justify-between px-6 z-40 relative flex">
        <Link href="/" className=" items-center space-x-2 flex w-fit">
          <span className="text-2xl p-2 text-primary font-bold inline-block ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600">
              {siteConfig.name}
            </span>
            .io
          </span>
        </Link>
        <div className="w-fit flex gap-4 items-center relative">
          <Feedback />
          {marketingConfig.mainNav?.length ? (
            <nav className="hidden gap-6 md:flex">
              {marketingConfig.mainNav?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${segment}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
          <AccountInfo />
        </div>
      </div>
      <span className={` h-12  w-screen ${collapseNav ? "block" : "hidden"}`} />

      <nav
        className={` px-4  w-screen z-[35]  h-12 bg-background  pb-[6px]  left-0 
      ${
        collapseNav
          ? "fixed top-0  z-[45] shadow-sm dark:border-b"
          : "relative border-b"
      }
      `}
      >
        <div
          id="row"
          className={` flex items-center gap-2 transition-all justify-end duration-[500ms] 
          ${collapseNav ? "w-[675px]" : "w-[555px]"}
          `}
        >
          {collapseNav ? (
            <Link href="/" className=" items-center space-x-2 flex fade-in2">
              <span className="text-lg p-2 text-primary font-bold inline-block ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {siteConfig.name}
                </span>
                .io
              </span>
            </Link>
          ) : null}

          <NavigationMenuDemo />
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationMenuDemo() {
  const bgGradients = [
    // "from-blue-600 via-sky-500 to-cyan-400 ",
    "from-muted/20 to-muted",
    "from-muted/20 to-muted",
    "from-muted/20 to-muted",
    // "to-amber-400 via-orange-500 from-red-500",
    // "from-purple-600 via-fuchsia-600 to-pink-600",
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {dashboardConfig.navigation.map((route, indx) => (
          <NavigationMenuItem
            key={indx}
            className={`${
              route?.disabled && "cursor-not-allowed  pointer-events-none"
            }`}
          >
            {route.subPages ? (
              <>
                <NavigationMenuTrigger>
                  {route.title}
                  {route?.disabled && (
                    <div className="border p-1 opacity-100  rounded-md ml-2 text-[8px] leading-[8px] text-theme-blue border-theme-blue">
                      Coming soon
                    </div>
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]  lg:w-[600px] lg:grid-cols-[.75fr_1fr]  ">
                    {route.subPages.map((subPage: any) => (
                      <SubRoute
                        key={subPage.title}
                        item={subPage}
                        bgGradient={bgGradients[indx]}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {route.title}
                  {route?.disabled && (
                    <div className="border p-1 opacity-100  rounded-md ml-2 text-[8px] leading-[8px] text-theme-blue border-theme-blue">
                      Coming soon
                    </div>
                  )}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const SubRoute = ({
  item,
  bgGradient,
}: {
  item: SubRouteType;
  bgGradient: string;
}) => {
  const Icon = Icons[item.icon];

  if (!Icon) {
    return null;
  }

  return (
    <>
      {item?.featured ? (
        <li className="row-span-3">
          <NavigationMenuLink asChild>
            <a
              className={`flex h-full text-primary gap- w-full select-none flex-col justify-end rounded-md bg-gradient-to-b ${bgGradient} p-6 no-underline outline-none focus:shadow-md`}
              href={item.href}
            >
              <div className="p-2 rounded-md bg-theme-blue text-primary w-fit  flex justify-center items-center">
                <Icon className="h-5 w-6 text-white" />
              </div>
              <div className=" text-lg font-medium ">{item.title}</div>
              <p className="text-sm leading-tight ">{item.description}</p>
            </a>
          </NavigationMenuLink>
        </li>
      ) : (
        <NavigationMenuLink asChild>
          <a
            href={item.href}
            className={`grid grid-cols-[20px_1fr] gap-6 items-start hover:bg-muted p-2 rounded-md relative
            ${item.disabled && "cursor-not-allowed  pointer-events-none"}
            `}
          >
            {/* {item.disabled && (
              <div className="absolute top-1/2 left-1/2 whitespace-nowrap -translate-x-1/2 -translate-y-1/2 w-fit p-2 items-center border  justify-center flex bg-background/40 blurBack rounded-md text-theme-blue">
                Coming soon
              </div>
            )} */}
            <div className="p-2 rounded-md bg-theme-blue text-primary w-fit text-white  flex justify-center items-center">
              <Icon className="h-5 w-5" />
            </div>
            <div className="grid items-start text-left gap-1">
              <div className="text-sm font-medium leading-none text-primary flex items-center gap-2 ">
                {item.title}
                {item.disabled && (
                  <div className="border p-1 opacity-100 w-fit  rounded-md text-[8px] leading-[8px] text-theme-blue border-theme-blue">
                    Coming soon
                  </div>
                )}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {item.description}
              </p>
            </div>
          </a>
        </NavigationMenuLink>
      )}
    </>
  );
};

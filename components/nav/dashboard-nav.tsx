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

  const hideHoverBar = () => {
    const hoverBar = document.getElementById("hoverBar");
    hoverBar!.style.display = "none";
    hoverBar!.style.transition = "none";
  };

  return (
    <div className="md:block hidden">
      <div className="w-screen h-20  justify-between px-6 z-40 relative flex">
        <Link href="/" className=" items-center space-x-2 flex w-fit">
          <span className="text-2xl p-2 text-primary font-bold inline-block ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600">
              TikDrop
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
          className={` flex items-center gap-2 transition-all  justify-end duration-[500ms] 
          ${collapseNav ? "w-[705px]" : "w-[585px]"}
          `}
        >
          {collapseNav ? (
            <Link href="/" className=" items-center space-x-2 flex fade-in2">
              <span className="text-lg p-2 text-primary font-bold inline-block ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  TikDrop
                </span>
                .io
              </span>
            </Link>
          ) : null}
          <div onMouseLeave={hideHoverBar} className="flex gap">
            {dashboardConfig.sideNav.map((route, indx) => (
              <Route key={indx} item={route} />
            ))}
            <span
              // className="absolute z-10 rounded-md bg-muted transition-all duration-200"
              className="absolute z-10 rounded-md bg-muted "
              id="hoverBar"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;

const Route = ({ item }: { item: SideNavRoute }) => {
  const segment = useSelectedLayoutSegment();
  const elementRef = useRef<HTMLSpanElement>(null); // For a div element

  const onHover = () => {
    if (elementRef.current) {
      const hoverBar = document.getElementById("hoverBar");
      if (hoverBar) {
        hoverBar.style.display = "block";
        // set position before transition
        hoverBar.style.height = `${elementRef.current.offsetHeight}px`;
        hoverBar.style.width = `${elementRef.current.offsetWidth}px`;
        hoverBar.style.left = `${elementRef.current.offsetLeft}px`;
        // Add a short delay to ensure the transition doesn't start until the position is set
        setTimeout(() => {
          hoverBar.style.transition = "all 0.2s ease-in-out";
        }, 0);
      }
    }
  };

  return (
    <span
      ref={elementRef}
      onMouseOver={onHover}
      className={`"flex gap-2 pr-2 relative h-fit items-center
      ${item?.disabled && "pointer-events-none"}
      `}
    >
      {!item?.subPages ? (
        <RouteLink item={item} />
      ) : (
        <RouteButton item={item} />
      )}
      {item?.href.startsWith(`/${segment}`) && (
        <div className="absolute pointer-events-none w-full h-[2px] bg-primary rounded-full -bottom-[6px]" />
      )}
    </span>
  );
};

const RouteLink = ({ item }: { item: SideNavRoute }) => {
  const segment = useSelectedLayoutSegment();
  const Icon = Icons[item.iconName];
  return (
    <Link
      href={item?.href}
      className={`group flex items-center  whitespace-nowrap px-2 py-2 text-sm font-medium  hover:text-primary text-muted-foreground relative z-20 ${
        item?.href.startsWith(`/${segment}`) && "text-primary "
      }
      ${item?.disabled && "cursor-not-allowed opacity-50 pointer-events-none"}
      `}
    >
      <Icon className="h-5 w-5 mr-2" />
      <div className="text-sm ">{item.title}</div>
      {item?.disabled && (
        <div className="border p-1 opacity-100  rounded-md ml-2 text-[8px] leading-[8px] text-theme-blue border-theme-blue">
          Coming soon
        </div>
      )}
    </Link>
  );
};

const RouteButton = ({ item }: { item: SideNavRoute }) => {
  const [showSubPages, setShowSubPages] = useState(false);
  const segment = useSelectedLayoutSegment();
  const Icon = Icons[item.iconName];
  const onClick = () => {
    setShowSubPages(!showSubPages);
  };

  const handleMouseOff = () => {
    setShowSubPages(false);
  };
  const onHover = () => {
    setShowSubPages(true);
  };

  return (
    <div
      onMouseOver={onHover}
      onMouseLeave={handleMouseOff}
      onBlur={handleMouseOff}
    >
      <button
        onClick={onClick}
        disabled={item?.disabled}
        className={`group flex items-center justify-between  whitespace-nowrap px-2 py-2 text-sm font-medium hover:text-primary text-muted-foreground  relative z-20  ${
          item?.href.startsWith(`/${segment}`) && "text-primary "
        }
        ${item?.disabled && "cursor-not-allowed opacity-50 pointer-events-none"}
        
        
        `}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <div className="text-sm ">{item.title}</div>
        </div>
        {item?.disabled ? (
          <div className="border p-1 opacity-100  rounded-md ml-2 text-[8px] leading-[8px] text-theme-blue border-theme-blue">
            Coming soon
          </div>
        ) : null}
      </button>

      {showSubPages && item.subPages && (
        <SubPagesMenu
          mainRoute={item}
          subPages={item.subPages}
          setShowSubPages={setShowSubPages}
        />
      )}
    </div>
  );
};

const SubPagesMenu = ({
  mainRoute,
  subPages,
  setShowSubPages,
}: {
  mainRoute: SideNavRoute;
  subPages: SubRouteType[];
  setShowSubPages: (val: boolean) => void;
}) => {
  return (
    <div className="absolute w-[500px] h-fit bg-background shadow-lg border -bottom-3 translate-y-full  rounded-md">
      <div className="absolute w-[170px] h-10 top-0 z-20 -translate-y-full" />
      <div className="grid gap-2 p-4">
        <h1 className="">{mainRoute.title}</h1>
        {subPages.map((subPage, indx) => (
          <SubRoute
            key={indx}
            item={subPage}
            setShowSubPages={setShowSubPages}
          />
        ))}
      </div>
    </div>
  );
};

const SubRoute = ({
  item,
  setShowSubPages,
}: {
  item: SubRouteType;
  setShowSubPages: (val: boolean) => void;
}) => {
  const Icon = Icons[item.icon];

  if (!Icon) {
    return null;
  }
  const handleClick = () => {
    console.log("clicked");
    setShowSubPages(false);
    const hoverBar = document.getElementById("hoverBar");
    hoverBar!.style.display = "none";
  };

  return (
    <button onClick={handleClick}>
      <Link href={item.href}>
        <div className="grid grid-cols-[28px_1fr] gap-4 items-start hover:bg-muted p-2 rounded-md">
          <div className="p-2 rounded-md bg-muted text-primary w-fit  flex justify-center items-center">
            <Icon className="h-5 w-5" />
          </div>
          <div className="grid items-start text-left">
            <h1>{item.title}</h1>
            <p className="text-muted-foreground/60">{item.description}</p>
          </div>
        </div>
      </Link>
    </button>
  );
};

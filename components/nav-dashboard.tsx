"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { dashboardConfig } from "@/config/dashboard";
import { SideNavRoute, SubRoute as SubRouteType } from "@/types";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { AccountInfo } from "@/components/account-preview";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

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
  };

  useEffect(() => {
    const routeContainer = document.getElementById("routeContainer");

    routeContainer!.addEventListener("mouseleave", hideHoverBar);

    return () => {
      routeContainer!.removeEventListener("mouseleave", hideHoverBar);
    };
  }, []);

  // when the page top is greater than 79px set the collapseNav to true

  return (
    <header>
      <div className="w-screen h-20 flex justify-between px-6">
        <Link href="/" className=" items-center space-x-2 flex w-fit">
          <span className="text-2xl p-2 text-primary font-bold inline-block ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              TikDrop
            </span>
            .io
          </span>
        </Link>
        <div className="w-fit flex gap-4 items-center">
          <Link
            href={"/help"}
            className={cn(
              "flex items-center text-lg font-medium transition-colors border rounded-md p-2 hover:text-foreground/80 sm:text-sm",
              "/help".startsWith(`/${segment}`)
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Feedback
          </Link>
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
      <span
        className={` h-12  w-screen ${collapseNav ? "relative" : "hidden"}`}
      />

      <nav
        className={` px-4  w-screen h-12 z-40 bg-background border-b pb-[6px]  left-0 
      ${collapseNav ? "fixed top-0" : "relative"}
      `}
      >
        <div
          id="row"
          className={` flex items-center gap-2 transition-all justify-end duration-[500ms] 
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
          <div id="routeContainer" className="flex gap">
            {dashboardConfig.sideNav.map((route, indx) => (
              <Route key={indx} item={route} />
            ))}
            <span
              className="absolute z-10 rounded-md bg-muted transition-all duration-200"
              id="hoverBar"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;

const Route = ({ item }: { item: SideNavRoute }) => {
  const segment = useSelectedLayoutSegment();
  const elementRef = useRef<HTMLSpanElement>(null); // For a div element

  const onHover = () => {
    if (elementRef.current) {
      const hoverBar = document.getElementById("hoverBar");
      hoverBar!.style.display = "block";
      hoverBar!.style.height = `${elementRef.current.offsetHeight}px`;
      hoverBar!.style.width = `${elementRef.current.offsetWidth}px`;
      hoverBar!.style.left = `${elementRef.current.offsetLeft}px`;
      console.log(
        "hovering",
        elementRef.current.offsetLeft,
        elementRef.current.offsetWidth,
        elementRef.current.offsetHeight
      );
    }
  };

  useEffect(() => {
    // element ref hover listener
    if (elementRef.current) {
      const element = elementRef.current;
      element.addEventListener("mouseover", onHover, {
        passive: true,
      });
      return () => {
        element.removeEventListener("mouseover", onHover);
      };
    }
  }, [elementRef]); // Added dependency

  return (
    <span ref={elementRef} className="flex gap-2 pr-2 relative h-fit">
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
      }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      <div className="text-sm ">{item.title}</div>
      {item?.disabled && "Coming soon"}
    </Link>
  );
};

const RouteButton = ({ item }: { item: SideNavRoute }) => {
  const [showSubPages, setShowSubPages] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    // element ref hover listener
    if (elementRef.current) {
      const element = elementRef.current;
      element.addEventListener("mouseover", onHover, {
        passive: true,
      });
      return () => {
        element.removeEventListener("mouseover", onHover);
      };
    }
  }, [elementRef]); // Added dependency

  useEffect(() => {
    if (elementRef.current && showSubPages) {
      const element = elementRef.current;
      element.addEventListener("mouseleave", handleMouseOff, {
        passive: true,
      });
      return () => {
        element.removeEventListener("mouseleave", handleMouseOff);
      };
    }
  }, [elementRef, showSubPages]);

  return (
    <div ref={elementRef}>
      <button
        onClick={onClick}
        disabled={item?.disabled}
        className={`group flex items-center justify-between   whitespace-nowrap px-2 py-2 text-sm font-medium hover:text-primary text-muted-foreground  relative z-20  ${
          item?.href.startsWith(`/${segment}`) && "text-primary "
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
            } h-4 w-4 transition-all ml-4`}
          />
        )}
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

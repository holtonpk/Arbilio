"use client";

import * as React from "react";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLockBody } from "@/lib/hooks/use-lock-body";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { AccountInfoMobile } from "../account-preview-mobile";
import { dashboardNavigation } from "@/config/dashboard";
import { SideNavRoute } from "@/types";
import { Button } from "../ui/button";
import { siteConfig } from "@/config/site";
import {useAuth} from "@/context/Auth";
import { Plans } from "@/config/plans";

export function MobileDashboardNav() {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex h-20 fixed items-center justify-between py-6 w-screen z-40 blurBack border-b top-0 left-0 md:hidden">
      <div className="flex container justify-between w-full items-center ">
        <Link href="/" className=" items-center space-x-2 flex">
          <span className="text-lg text-primary font-bold inline-block ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {siteConfig.name}
            </span>
            .io
          </span>
        </Link>
        <button
          className="flex items-center space-x-2 "
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <Icons.menu />}
          <span className="font-bold"></span>
        </button>
        {showMobileMenu && <NavMenu setShowMobileMenu={setShowMobileMenu} />}
      </div>
    </div>
  );
}

const NavMenu = ({ setShowMobileMenu }: { setShowMobileMenu: any }) => {
  const { currentUser } = useAuth()!;

  useLockBody();
  return (
    <div className="fixed inset-0  w-full top-16 z-50 h-[calc(100vh-4rem)]  auto-rows-max overflow-auto   shadow-md animate-in slide-in-from-bottom-80 ">
      <div className="relative z-20 h-full  flex  flex-col gap-4 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row  auto-rows-max text-sm divide-y divide-border ">
          {dashboardNavigation.routes.map((route, indx) => (
            <Route key={indx} item={route} setShowMenu={setShowMobileMenu} currentUser={currentUser} />
          ))}
        </nav>

        <AccountInfoMobile />
      </div>
    </div>
  );
};

const Route = ({
  item,
  setShowMenu,
  currentUser
}: {
  item: SideNavRoute;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
}) => {
  const [showSubPages, setShowSubPages] = React.useState(false);
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const onClick = () => {
    setShowSubPages(!showSubPages);
  };



  const Icon = Icons[item.iconName];

  const handleClick = () => {
    const href =
    typeof item.links === "string"
      ? item.links
      : item.links.find(
          (link) => link.requiredSubscription === currentUser?.userPlan
        )?.href as string;

    router.push(href);
    setShowMenu(false);
  };

  return (
    <span className="flex flex-col gap-2 pr-2 py-4 relative h-fit">
      {!item?.subPages ? (
        <Button
          onClick={handleClick}
          variant="link"
          className={`group flex items-center justify-start text-primary rounded-md px-3 py-2 text-xl font-medium hover:underline  disabled:no-underline ${
            item?.disabled && "cursor-not-allowed opacity-80"
          }`}
        >
          <Icon className="h-5 w-5 mr-2" />
          <div className="text-xl ">{item.title}</div>
          {item?.disabled && "Coming soon"}
        </Button>
      ) : (
        <>
          <button
            onClick={onClick}
            disabled={item?.disabled}
            className={`group flex items-center text-primary justify-between rounded-md px-3 py-2 text-sm font-medium hover:underline disabled:no-underline  ${
              item?.disabled && "cursor-not-allowed opacity-40"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <div className="text-xl ">{item.title}</div>
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
            <SubPages
              subPages={item.subPages}
              showSubPages={showSubPages}
              setShowMenu={setShowMenu}
              currentUser={currentUser}
            />
          )}
        </>
      )}
    </span>
  );
};

interface SubPagesProps {
  subPages: {
    title: string;
    links: {
      href: string;
      requiredSubscription?: Plans;
    }[] | string;
  }[];
  showSubPages: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
}

const SubPages = ({ subPages, showSubPages, setShowMenu }: SubPagesProps) => {
  const subPagesRef = React.useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = React.useState(0);
  const router = useRouter();

  React.useEffect(() => {
    if (subPagesRef.current) {
      setContentHeight(subPagesRef.current.scrollHeight);
    }
  }, [subPages]);

  const href =
  typeof subPages.links === "string"
    ? subPages.links
    : subPages.links.find(
        (link) => link.requiredSubscription === currentUser?.userPlan
      )?.href as string;

  return (
    <div
      id="subPages"
      ref={subPagesRef}
      className={`flex flex-col items-start gap-1 text-primary  height-animation ${
        showSubPages ? "show" : ""
      }`}
      style={showSubPages ? { height: `${contentHeight}px` } : {}}
    >
      {subPages.map((subPage, indx) => (
        <SubRoute
          key={indx}
          title={subPage.title}
          href={href}
          setShowMenu={setShowMenu}
        />
      ))}
    </div>
  );
};

const SubRoute = ({
  title,
  href,
  setShowMenu,
}: {
  title: string;
  href: string;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
    setShowMenu(false);
  };



  return (
    <Button
      onClick={handleClick}
      variant="link"
      className={` ${
        href == pathname ? "underline" : ""
      } group flex items-center ml-4 whitespace-nowrap rounded-md px-3 py-2 text-[12px] font-medium hover:underline `}
    >
      {title}
    </Button>
  );
};

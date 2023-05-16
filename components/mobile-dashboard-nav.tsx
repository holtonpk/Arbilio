import * as React from "react";
import { LinkButton } from "@/components/ui/link";
import Navbar from "@/components/side-nav";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLockBody } from "@/hooks/use-lock-body";
import { Icons } from "@/components/icons";

import { AccountInfoMobile } from "./account-preview-mobile";
import { dashboardConfig } from "@/config/dashboard";
import { SideNavRoute } from "@/types";
import { Button } from "./ui/button";

export function MobileDashboardNav({
  setShowMenu,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useLockBody();

  return (
    <div className="fixed inset-0  w-full top-16 z-50 h-[calc(100vh-4rem)]  auto-rows-max overflow-auto   shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 h-full  flex  flex-col gap-4 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row  auto-rows-max text-sm divide-y divide-border ">
          {dashboardConfig.sideNav.map((route, indx) => (
            <Route key={indx} item={route} setShowMenu={setShowMenu} />
          ))}
        </nav>

        <AccountInfoMobile />
      </div>
    </div>
  );
}

const Route = ({
  item,
  setShowMenu,
}: {
  item: SideNavRoute;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showSubPages, setShowSubPages] = React.useState(false);
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const onClick = () => {
    setShowSubPages(!showSubPages);
  };

  React.useEffect(() => {
    if (item.subPages) {
      if (item.href.startsWith(`/${segment}`)) {
        setShowSubPages(true);
      }
    }
  }, [item.href, item.subPages, segment]);

  const Icon = Icons[item.iconName];

  const handleClick = () => {
    router.push(item.href);
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
    href: string;
  }[];
  showSubPages: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
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
          href={subPage.href}
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

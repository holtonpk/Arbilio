import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        className,
        "bg-background/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur z-40 border-t mt-6"
      )}
    >
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo /> */}
          <p className="text-center text-sm leading-loose md:text-left">
            Copyright © 2023 Arbilio. All Rights Reserved.
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}

"use client";

/***********************************/

/*  Tooltip Contents  */
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
// import { AnimatePresence, motion, useAnimation } from "framer-motion";
// import BlurImage from "#/ui/blur-image";

export default function Tooltip({
  children,
  content,
  fullWidth,
}: {
  children: ReactNode;
  content: ReactNode | string;
  fullWidth?: boolean;
}) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const mobileTooltipRef = useRef(null);

  const transitionProps = { type: "spring", stiffness: 500, damping: 30 };

  return (
    <>
      <button
        type="button"
        className={`${fullWidth ? "w-full" : "inline-flex"} sm:hidden`}
        onClick={() => setOpenTooltip(true)}
      >
        <span className="sr-only">Open tooltip</span>
        {children}
      </button>

      {openTooltip && (
        <>
          <div
            className={`rounded-t-4xl -mb-1 flex h-7 w-full items-center justify-center border-t border-gray-200 bg-white`}
          >
            <div className="-mr-1 h-1 w-6 rounded-full bg-gray-300 transition-all group-active:rotate-12" />
            <div className="h-1 w-6 rounded-full bg-gray-300 transition-all group-active:-rotate-12" />
          </div>
          <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-white align-middle shadow-xl">
            {typeof content === "string" ? (
              <span className="block max-w-xs text-center text-sm text-gray-700">
                {content}
              </span>
            ) : (
              content
            )}
          </div>
        </>
      )}

      <TooltipPrimitive.Provider delayDuration={100}>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger className="hidden sm:inline-flex" asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            sideOffset={4}
            side="top"
            className="z-30 hidden animate-slide-up-fade items-center overflow-hidden rounded-md border border-gray-200 bg-white drop-shadow-lg sm:block"
          >
            <TooltipPrimitive.Arrow className="fill-current text-white" />
            {typeof content === "string" ? (
              <div className="p-5">
                <span className="block max-w-xs text-center text-sm text-gray-700">
                  {content}
                </span>
              </div>
            ) : (
              content
            )}
            <TooltipPrimitive.Arrow className="fill-current text-white" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </>
  );
}

export function TooltipContent({
  title,
  cta,
  href,
  onClick,
}: {
  title: string;
  cta?: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex max-w-xs flex-col items-center space-y-3 p-5 text-center">
      <p className="text-sm text-gray-700">{title}</p>
      {cta &&
        (href ? (
          <Link
            href={href}
            className="mt-4 rounded-md border border-black bg-black px-5 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            {cta}
          </Link>
        ) : onClick ? (
          <button
            className="mt-4 rounded-md border border-black bg-black px-5 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
            onClick={onClick}
          >
            {cta}
          </button>
        ) : null)}
    </div>
  );
}

// export function OGImageProxy() {
//   return (
//     <div className="flex max-w-md flex-col items-center space-y-5 p-5 text-center">
//       <BlurImage
//         alt="Demo GIF for OG Image Proxy"
//         src="https://res.cloudinary.com/dubdotsh/image/upload/v1664425639/og-image-proxy-demo.gif"
//         width={1200}
//         height={1084}
//         className="w-full overflow-hidden rounded-md shadow-md"
//       />
//       <p className="text-sm text-gray-700">
//         Password protection, link expiration, device targeting, custom social
//         media cards, etc. Add a custom OG image in front of your target URL.
//         Bots like Twitter/Facebook will be served this image, while users will
//         be redirected to your target URL.
//       </p>
//     </div>
//   );
// }

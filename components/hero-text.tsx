import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type HeaderProps = {
  text: string;
  gradientClass: string;
};
import { Button } from "./ui/button";

const HeroText: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const headers: HeaderProps[] = [
    {
      text: "Analyze.",
      gradientClass: "bg-gradient-to-r from-purple-400 to-pink-600",
    },
    {
      text: "Create.",
      gradientClass: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      text: "Earn.",
      gradientClass: "bg-gradient-to-r from-red-400 to-yellow-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(
        (prevActiveIndex) => (prevActiveIndex + 1) % headers.length
      );
    }, 3000); // Change gradient every 2 seconds

    return () => {
      clearInterval(timer);
    };
  }, [headers.length]);

  return (
    <div className="container flex max-w-[64rem] flex-col items-center gap-2 text-center md:py-10">
      <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
        7 day free trial
      </div>

      <div className="flex flex-col -gap-4 md:gap-0 md:flex-row items-center">
        {headers.map((header, index) => (
          <div key={index} className="relative overflow-visible pb-2">
            <h1
              className={`relative font-heading text-6xl md:text-6xl  lg:text-8xl font-bold text-transparent bg-clip-text pb-4 ${
                header.gradientClass
              } ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
            >
              {header.text}
            </h1>
            <h1
              className={`absolute top-0 font-heading text-6xl md:text-6xl  lg:text-8xl font-bold text-primary ${
                activeIndex === index ? "opacity-0" : "opacity-100"
              } transition-opacity duration-1000`}
            >
              {header.text}
            </h1>
          </div>
        ))}
      </div>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        The most powerful tool for Tiktok dropshipping. leverage th power of
        data to find winning products, create videos and earn money.
      </p>
      <div className="flex gap-4 mt-4">
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started
        </Link>

        <div
          className={`relative p-[2px] rounded-md before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient-to-r before:left-0 before:top-0 before:blur-[5px] ${
            headers[activeIndex].gradientClass
          }  ${
            activeIndex === 0
              ? "before:from-purple-400 before:to-pink-600"
              : activeIndex === 1
              ? "before:from-green-400 before:to-blue-500"
              : "before:from-red-400 before:to-yellow-500"
          } `}
        >
          <Link
            href={"/dashboard"}
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "bg-background "
            )}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroText;

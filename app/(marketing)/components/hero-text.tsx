import React, { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/link";
import { Icons } from "@/components/icons";
type HeaderProps = {
  text: string;
  gradientClass: string;
};

const HeroText: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const headers: HeaderProps[] = [
    {
      text: "Discover.",
      gradientClass: "bg-gradient-to-r from-purple-400 to-pink-600",
    },
    {
      text: "Analyze.",
      gradientClass: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      text: "Profit.",
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
    <div className="container flex max-w-[64rem] flex-col items-center gap-2 text-center ">
      <div className="relative w-full h-fit bg-accent p-[1px] glow  rounded-md">
        <LinkButton
          href={"/pricing"}
          variant="link"
          className="bg-background border-none  cursor-pointer z-20 flex justify-between md:justify-center items-center text-sm font-medium w-full p-3  rounded-md relative"
        >
          <span className="max-w-[60%] md:text-lg text-sm flex  gap-1 whitespace-nowrap items-start text-muted-foreground">
            Sign up today for a
            <p className="font-bold text-primary">7 day free trial!</p>
          </span>
          <div className="p-1 h-fit border rounded-md md:absolute right-0 md:h-full flex items-center justify-center md:px-6 md:rounded-none md:border-r-0 md:border-y-0  md:border-l">
            <Icons.ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </LinkButton>
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full blur-[10px] bg-accent  "></div> */}
      </div>
      <div className="flex flex-col lg:gap-0 lg:flex-row items-center py-12">
        {headers.map((header, index) => (
          <div key={index} className="relative overflow-visible ">
            <h1
              className={`relative  text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text pb-2 ${
                header.gradientClass
              } ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              } transition-opacity duration-[2000ms]`}
            >
              {header.text}
            </h1>
            <h1
              className={`absolute top-0  text-7xl md:text-8xl  lg:text-7xl xl:text-8xl bg-clip-text bg-gradient-to-b from-primary/80 to-primary  font-bold text-transparent ${
                activeIndex === index ? "opacity-0" : "opacity-100"
              } transition-opacity duration-[2000ms]`}
            >
              {header.text}
            </h1>
          </div>
        ))}
      </div>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Experience the ultimate tool for TikTok dropshipping. Use data to find
        top products, craft engaging videos, and boost your earnings. Simplify
        and succeed with us.
      </p>
      <div className=" flex gap-4 mt-4 flex-col w-full md:w-fit md:flex-row items-center">
        <LinkButton
          size="lg"
          variant={"default"}
          href="/pricing"
          className="w-full md:w-fit"
        >
          View Pricing
        </LinkButton>

        <div className={`relative p-[1px]  rounded-md w-full md:w-fit`}>
          <LinkButton
            href={"/dashboard"}
            variant="ghost"
            size={"lg"}
            className="bg-background   hover:bg-transparent  z-10 w-full  md:w-fit relative "
          >
            Get Started
          </LinkButton>

          <div
            className={`w-full absolute h-full bg-gradient-to-r from-purple-400 to-pink-600 top-0 left-0 rounded-md transition-opacity duration-[3000ms]
          ${activeIndex === 0 ? "opacity-100" : "opacity-0"}
          `}
          />

          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-md blur-[20px]  h-[105%] w-[105%]   transition-opacity duration-[3000ms] 
              ${activeIndex === 0 ? "opacity-100" : "opacity-0"}
              `}
          />
          <div
            className={`w-full absolute h-full bg-gradient-to-r from-green-400 to-blue-500 top-0 left-0 rounded-md transition-opacity duration-[3000ms]
          ${activeIndex === 1 ? "opacity-100" : "opacity-0"}
          `}
          />

          <div
            className={`absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 rounded-md blur-[20px]  h-[105%] w-[105%]   transition-opacity duration-[3000ms]
              ${activeIndex === 1 ? "opacity-100" : "opacity-0"}
                `}
          />

          <div
            className={`w-full absolute h-full bg-gradient-to-r from-red-400 to-yellow-500 top-0 left-0 rounded-md transition-opacity duration-[3000ms]
          ${activeIndex === 2 ? "opacity-100" : "opacity-0"}
          `}
          />

          <div
            className={`absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-400 to-yellow-500 rounded-md blur-[20px]  h-[105%] w-[105%]   transition-opacity duration-[3000ms]
              ${activeIndex === 2 ? "opacity-100" : "opacity-0"}
              `}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroText;

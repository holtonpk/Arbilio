import React, { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
type HeaderProps = {
  text: string;
  gradientClass: string;
};

const HeroText: React.FC = () => {
  return (
    <div className=" flex  flex-col items-center gap-2 text-center ">
      <div className="mx-auto mb-10 mt-20 px-2.5 text-center  sm:px-0">
        <a
          href="https://dub.sh/launch"
          target="_blank"
          rel="noreferrer"
          className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-md border-theme-blue border px-7 py-2 transition-all "
        >
          <p className="text-[12px] font-semibold text-theme-blue">
            7 day free trial
          </p>
        </a>

        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] text-primary sm:text-6xl sm:leading-[1.15] ">
          Dropshipping simplified,
          <br />
          <span className="bg-gradient-to-r whitespace-nowrap to-amber-400 via-orange-500  from-red-500 bg-clip-text text-transparent ">
            profits ignited!
          </span>
        </h1>
        <h2 className="mt-5 text-muted-foreground sm:text-xl">
          {` Harness the power of ${siteConfig.name} to identify trending products, create impactful videos, and amplify your engagement.`}
        </h2>

        <div className="mx-auto mt-10 flex w-full flex-col md:flex-row md:max-w-fit gap-4 ">
          <LinkButton
            size="lg"
            variant={"default"}
            href="/pricing"
            className="w-full md:w-fit whitespace-nowrap  shadow-lg"
          >
            View Pricing
          </LinkButton>
          <LinkButton
            href={"/onboarding/register"}
            variant="outline"
            size={"lg"}
            className="bg-background  shadow-lg whitespace-nowrap  z-10 w-full  md:w-fit relative "
          >
            Get Started
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default HeroText;

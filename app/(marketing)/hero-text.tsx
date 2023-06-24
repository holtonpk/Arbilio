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
    <div className=" flex z-10 flex-col items-center gap-2 text-center ">
      <div className="mx-auto mb-10  px-2.5 text-center flex items-center flex-col max-w-md sm:px-0">
        <a
          href="/onboarding/register"
          target="_blank"
          rel="noreferrer"
          className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-md border-theme-blue border px-7 py-2 transition-all z-10"
        >
          <p className="text-[12px] font-semibold text-theme-blue">
            7 Day Free Trial. Cancel Anytime!
          </p>
        </a>

        {/* <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] sm:text-6xl sm:leading-[1.15] whitespace-nowrap bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent ">
          Redefining Dropshipping 
          <br /> */}
        {/* <span className="bg-gradient-to-r whitespace-nowrap from-[#F66896] to-[#7640DF] bg-clip-text text-transparent ">
          </span> */}
        {/* </h1> */}
        {/* <h2 className="mt-5 text-muted-foreground sm:text-xl w-[70%]">
          {` Harness the power of ${siteConfig.name} to identify trending products, create impactful videos, and amplify your engagement.`}
        </h2> */}

        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] text-primary sm:text-6xl sm:leading-[1.15]">
          Your selling journey
          <br />
          <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            starts here.
          </span>
        </h1>
        <h2 className="mt-5 text-muted-foreground sm:text-xl">
          {` Harness the power of ${siteConfig.name} to identify trending products, create impactful ad creatives, and amplify your engagement.`}
        </h2>

        <div className="mx-auto mt-10 flex w-full flex-col md:flex-row md:max-w-fit gap-4 ">
          <LinkButton
            size="lg"
            variant={"default"}
            href="/onboarding/register"
            className="w-full md:w-fit whitespace-nowrap  shadow-lg"
          >
            Start Free Trial
          </LinkButton>
          <LinkButton
            href={"/#features"}
            variant="outline"
            size={"lg"}
            className="bg-background  shadow-lg whitespace-nowrap  z-10 w-full  md:w-fit relative "
          >
            Learn more
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default HeroText;

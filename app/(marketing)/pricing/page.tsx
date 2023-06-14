import React from "react";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Pricing from "@/components/plans";
import FAQ from "./faq";

export const metadata = constructMetadata({
  title: `Pricing - ${siteConfig.name}`,
});

const page = () => {
  return (
    <div className="pb-10">
      <div className=" text-center mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div id="pricing" className="mx-auto mb-10 sm:max-w-lg">
          <h2 className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Simple,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing.
          </h2>
        </div>
      </div>
      <Pricing />
      <FAQ />
    </div>
  );
};

export default page;

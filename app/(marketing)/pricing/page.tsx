import React from "react";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Pricing from "./pricing";
import FAQ from "./faq";

export const metadata = constructMetadata({
  title: `Pricing - ${siteConfig.name}`,
});

const page = () => {
  return (
    <>
      <Pricing />
      <FAQ />
    </>
  );
};

export default page;

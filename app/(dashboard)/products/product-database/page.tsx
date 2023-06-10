import React from "react";
import { siteConfig } from "@/config/site";
import ProductDataBase from "./product-database";
import { PageHeader } from "@/components/header";
import ProtectFeature from "@/components/protect-feature";

export default async function ProductDatabase() {
  return (
    <ProtectFeature planLevel="standard" featureName="Product Database">
      <>
        <PageHeader
          heading="Product Database"
          text={
            "Browse our collection of over 500 high product that perform well on TikTok"
          }
        />
        <div className="w-full flex flex-col relative  items-center ">
          <ProductDataBase />
        </div>
      </>
    </ProtectFeature>
  );
}

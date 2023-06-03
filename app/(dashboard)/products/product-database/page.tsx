import React from "react";
import { siteConfig } from "@/config/site";
import ProductDataBase from "./product-database";
import { PageHeader } from "@/components/header";

async function getData() {
  const url = `${siteConfig.url}/api/product-database`;
  const response = await fetch(url, {
    cache: "no-cache",
  });
  console.log("res===>", response);
  const data = await response.json();
  return data;
}

export default async function ProductDatabase() {
  return (
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
  );
}

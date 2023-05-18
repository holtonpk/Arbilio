import React from "react";
import { siteConfig } from "@/config/site";
import ProductDataBase from "./product-database";
import { PageHeader } from "@/components/header";

async function getData() {
  const url = `${siteConfig.url}/api/product-database`;
  const response = await fetch(url, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data.data;
}

export default async function ProductDatabasePage() {
  const data = await getData();
  return (
    <>
      <PageHeader
        heading="Product Database"
        text={
          "Browse our collection of over 500 active sellers and 1000+ accounts."
        }
      />
      <div className="w-full rounded-md flex flex-col min-h-screen items-center ">
        <ProductDataBase data={data} />
      </div>
    </>
  );
}

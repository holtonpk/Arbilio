import React from "react";
import AccountDatabase from "./account-database";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
async function getData() {
  const url = `${siteConfig.url}/api/account-database-demo`;
  const response = await fetch(url, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data ${response.text}`);
  }
  return response.json();
}

export default async function AccountDataBase() {
  const data = await getData();

  return (
    <>
      <PageHeader
        heading="Account Database"
        tooltip="Browse our collection of over 500 active sellers and 1000+ accounts."
      />
      <div className="w-full border-t relative">
        <div className="w-full container relative z-[5]  pt-4  flex flex-col min-h-screen items-center  ">
          <AccountDatabase data={data} />
        </div>
      </div>
    </>
  );
}

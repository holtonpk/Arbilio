import React from "react";
import Navbar from "@/components/side-nav";
import AccountDatabase from "./account-database";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";

async function getData() {
  const res = await fetch(`${siteConfig.url}/api/accountDatabase`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function AccountDataBase() {
  const data = await getData();

  return (
    <>
      <PageHeader
        heading="Account Database"
        text={
          "Browse our collection of over 500 active sellers and 1000+ accounts."
        }
      />
      <div className="w-full bg-background rounded-md   flex flex-col min-h-screen items-center  ">
        <AccountDatabase originalData={data} />
      </div>
    </>
  );
}

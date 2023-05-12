import React from "react";
import Navbar from "@/components/side-nav";
import AccountDatabase from "./account-database";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";

class FetchError extends Error {
  status: number;
  info: any;

  constructor(message: any, status: number, info: any) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.info = info;
  }
}

async function getData() {
  const res = await fetch(`${siteConfig.url}/api/accountDatabase`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    const info = await res.json();
    throw new FetchError(
      `Failed to fetch data ${siteConfig.url}`,
      res.status,
      info
    );
  }
  return res.json();
}
// add theis

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

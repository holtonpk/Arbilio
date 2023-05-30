import React from "react";
import Navbar from "@/components/nav/side-nav";
import AccountDatabase from "./account-database";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
import VideoPlayer from "@/components/video-player";
async function getData() {
  const url = `${siteConfig.url}/api/accountDatabase`;
  const response = await fetch(url, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data ${url}`);
  }
  return response.json();
}

export default async function AccountDataBase() {
  // const data = await getData();

  return (
    <>
      <PageHeader
        heading="Account Database"
        tooltip="Browse our collection of over 500 active sellers and 1000+ accounts."
        // text={
        //   "Browse our collection of over 500 active sellers and 1000+ accounts."
        // }
      />
      <div className="w-full border-t bg-muted/60">
        <div className="w-full container   pt-4  flex flex-col min-h-screen items-center  ">
          {/* <AccountDatabase originalData={data} /> */}
        </div>
      </div>
    </>
  );
}

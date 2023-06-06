import React from "react";
import AccountDatabase from "./account-database-demo";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/link";
async function getData() {
  const url = `${siteConfig.url}/api/account-database-demo`;
  // const url = `${siteConfig.url}/api/accountDatabase`;
  // const response = await fetch(url, {
  //   cache: "no-cache",
  // });
  const response = await fetch(url);
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
          <AccountDatabase originalData={data} />
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:grid h-fit w-full max-w-lg scale-100  gap-4 bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 sm:rounded-lg sm:zoom-in-90  md:w-full">
            <div className="flex flex-col space-y-2 text-center sm:text-left items-center">
              <h1 className="text-lg font-semibold">
                Want access to over 1000+ accounts?
              </h1>
              <p className="text-sm text-muted-foreground">
                Upgrade to premium to access our full database of accounts.
              </p>
              <LinkButton href={"/settings/upgrade"} className="w-fit mt-4">
                Upgrade
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

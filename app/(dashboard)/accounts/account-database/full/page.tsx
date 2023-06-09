import React from "react";
import AccountDatabase from "../account-database";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
import { AccountDataType } from "@/types";
import Loading from "./loading";
async function getData() {
  const url = `${siteConfig.url}/api/accountDatabase`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data ${response.text}`);
  }
  return response.json();
}

// async function getData(
//   initialUrl: string,
//   startAfter?: string
// ): Promise<any[]> {
//   // Construct URL with optional startAfter parameter
//   const url = startAfter
//     ? `${initialUrl}?startAfter=${startAfter}`
//     : initialUrl;
//   console.log("url", url);

//   const response = await fetch(url, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch data: ${response.statusText}`);
//   }

//   const fetchedData = await response.json();

//   console.log(
//     "response",
//     fetchedData?.results?.length,
//     fetchedData?.nextStartAfter
//   );

//   // If there is a next page
//   if (fetchedData.nextStartAfter) {
//     // Recursively fetch the next page
//     const nextPageData = await getData(initialUrl, fetchedData.nextStartAfter);

//     // Combine this page's data with the next page's data
//     return [...fetchedData.results, ...nextPageData];
//   }

//   // If there is no next page, return this page's data
//   return fetchedData.results;
// }

export default async function AccountDataBase() {
  // const url = `${siteConfig.url}/api/accountDatabase`;
  // const data = await getData(url);

  const data = await getData();

  return (
    <>
      <PageHeader
        heading="Account Database"
        tooltip="Browse our collection of over 500 active sellers and 1000+ accounts."
      />
      <div className="w-full border-t ">
        <div className="w-full container  pt-4  flex flex-col min-h-screen items-center  ">
          <AccountDatabase data={data} />
        </div>
      </div>
    </>
  );
}

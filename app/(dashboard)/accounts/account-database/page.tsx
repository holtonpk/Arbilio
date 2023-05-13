import React from "react";
import Navbar from "@/components/side-nav";
import AccountDatabase from "./account-database";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";

async function getData() {
  const TIMEOUT = 7000; // Set your desired timeout in milliseconds
  const url = `${siteConfig.url}/api/accountDatabase`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-cache",
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`Failed to fetch data ${url}`);
    }

    return response.json();
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("The request timed out.");
    }
    throw error;
  }
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

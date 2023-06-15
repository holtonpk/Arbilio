import React from "react";
import { Header } from "@/app/(dashboard)/dashboard/header";
import { TrendingPosts } from "@/app/(dashboard)/dashboard/trending-posts";
import { AccountCollectionDisplay } from "@/app/(dashboard)/dashboard/account-collection-display";
import { ProductTrackDisplay } from "@/app/(dashboard)/dashboard/product-track-display";
import { siteConfig } from "@/config/site";
import Loading from "./loading";
import { PageHeader } from "@/components/header";
import Welcome from "@/app/(dashboard)/dashboard/welcome-card";

async function getData() {
  const res = await fetch(`${siteConfig.url}/api/trending-posts`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.slice(0, 5);
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <>
      {/* <PageHeader
        heading="Welcome Back, Patrick"
        text={
          "Track your products and get notified when ae new post or account is found"
        }
      /> */}
      <Welcome />
      <Header />
      <div className="w-full ">
        <div className="grid  gap-4  container max-w-screen overflow-hidden ">
          <div className="flex flex-col gap-4 w-full overflow-hidden">
            <TrendingPosts posts={data} />
            <div className="grid md:grid-cols-2 gap-8 max-w-full mt-4 pb-10">
              <AccountCollectionDisplay />
              <ProductTrackDisplay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

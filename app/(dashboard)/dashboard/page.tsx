import React from "react";
import { Header } from "@/app/(dashboard)/dashboard/header";
import { TrendingPosts } from "@/app/(dashboard)/dashboard/trending-posts";
import { AccountCollectionDisplay } from "@/app/(dashboard)/dashboard/account-collection-display";
import { ProductTrackDisplay } from "@/app/(dashboard)/dashboard/product-track-display";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="grid  gap-4 container max-w-screen overflow-hidden">
        <div className="flex flex-col gap-4 w-full overflow-hidden">
          <TrendingPosts />
          <div className="grid md:grid-cols-2 gap-8 max-w-full mt-4">
            <AccountCollectionDisplay />
            <ProductTrackDisplay />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

"use client";
import React from "react";
import { BarChart } from "@/components/charts";
import { Icons } from "@/components/icons";
import { formatNumber } from "@/lib/utils";
import { ProductType, AccountDataType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { Button } from "@/components/ui/button";
import { RemoveTrackProductButton } from "@/components/buttons/remove-track-product-button";

interface ProductTrackerLayoutProps {
  data: ProductType[];
}
import PostView from "@/components/post-view";

const ProductTrackerLayout = ({ data }: ProductTrackerLayoutProps) => {
  return (
    <div className="container grid gap-4">
      {data.map((item, i) => (
        <div key={i} className="p-8 border rounded-md grid gap-4 relative">
          <RemoveTrackProductButton
            id={item.id}
            className="absolute top-4 right-4"
            variant="destructive"
          >
            Stop Tracking
          </RemoveTrackProductButton>
          <div className="grid gap-4 grid-cols-2">
            <div className="flex flex-col justify-between ">
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <div className="h-20 w-20 rounded-md bg-muted relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt="product image"
                    fill
                    className="rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold">{item.title}</h1>
                  <p className="text-muted-foreground">Tracking since 4/12</p>
                </div>
              </div>
              <StatDisplay accounts={item.accountsData} />
            </div>
            <div className="h-fit">
              <div className="flex justify-between mb-4">
                <div className="flex text-lg font-semibold leading-none tracking-tight gap-3 ">
                  <h1>Views</h1>
                  <p className="text-theme-blue">+12</p>
                </div>
                {/* <div className="flex w-fit items-center ml-auto">
                Monthly
                <Icons.chevronDown className="h-6 w-6 text-muted-foreground" />
              </div> */}
              </div>
              <div className="relative w-full h-[170px]  rounded-md">
                <BarChart
                  data={[12, 19, 3, 5, 2, 3, 17]}
                  labels={[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ]}
                  dataTitle="Posts"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold leading-none tracking-tight">
                Sellers
              </h1>

              <Sellers accounts={item.accountsData} />
            </div>
            <RecentPosts accounts={item.accountsData} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTrackerLayout;

interface RecentPostsProps {
  accounts: AccountDataType[];
}

const RecentPosts = ({ accounts }: RecentPostsProps) => {
  const topPosts = accounts.flatMap((account) => account.topPosts || []);
  topPosts.sort(
    (a: any, b: any) => b.postData.playCount - a.postData.playCount
  );

  return (
    <div className="grid">
      <h1 className="text-lg font-semibold leading-none tracking-tight">
        New Posts
      </h1>
      <div className="grid grid-flow-col gap-4 ">
        {accounts &&
          topPosts.slice(0, 5).map((item: any, i: number) => {
            return <PostView key={i} video={item} />;
          })}
      </div>
    </div>
  );
};

const Sellers = ({ accounts }: RecentPostsProps) => {
  const sortedAccounts = accounts.sort(
    (a: any, b: any) =>
      b.accountStats[0].followerCount - a.accountStats[0].followerCount
  );

  return (
    <div className="h-fit max-h-[200px] overflow-scroll border  rounded-md">
      <div className="grid divide-y divide-border h-fit ">
        {sortedAccounts.map((account, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 cursor-pointer group hover:bg-muted"
          >
            <Link
              href={`accounts/account/${account.id}`}
              className="w-[80%] grid grid-cols-[40px_1fr] items-center space-x-4"
            >
              <div className="aspect-square w-10 h-10 bg-muted rounded-md relative overflow-hidden">
                <Image src={account.avatar} alt="product image" fill />
              </div>
              <div className="flex flex-col max-w-full overflow-hidden">
                <p className="text-sm font-medium leading-none">
                  {account.nickname}
                </p>
                <p className="text-sm text-muted-foreground">
                  {"@" + account.uniqueId}
                </p>
              </div>
            </Link>
            <UpdateCollectionButton
              account={account}
              variant="outline"
              size="sm"
            >
              <Icons.addCollection className="h-5 w-5 " />
            </UpdateCollectionButton>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatDisplay = ({ accounts }: RecentPostsProps) => {
  const averageLikes = accounts.reduce((acc, account) => {
    return acc + account.accountStats[0].heartCount;
  }, 0);
  const averageFollowers = accounts.reduce((acc, account) => {
    return acc + account.accountStats[0].followerCount;
  }, 0);
  const averagePosts = accounts.reduce((acc, account) => {
    return acc + account.accountStats[0].videoCount;
  }, 0);

  return (
    <div className="flex  gap-3 w-full  h-fit items-center rounded-md mt-4 border  p-6">
      <div className="flex items-center gap-3 ">
        <div className="rounded-md bg-theme-blue aspect-square p-2 relative flex justify-center items-center">
          <Icons.likes className="h-8 w-8 text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground whitespace-nowrap">
            Average Likes
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-primary">
            {formatNumber(averageLikes)}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="rounded-md bg-theme-blue aspect-square p-2 relative flex justify-center items-center">
          <Icons.followers className="h-8 w-8 text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground whitespace-nowrap">
            Average Followers
          </h2>
          <h3 className="text-xl md:text-2xl font-bold  text-primary">
            {formatNumber(averageFollowers)}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="rounded-md bg-theme-blue aspect-square p-2 relative flex justify-center items-center">
          <Icons.posts className="h-8 w-8 text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground whitespace-nowrap">
            Average Posts
          </h2>
          <h3 className="text-xl md:text-2xl font-bold  text-primary">
            {formatNumber(averagePosts)}
          </h3>
        </div>
      </div>
    </div>
  );
};

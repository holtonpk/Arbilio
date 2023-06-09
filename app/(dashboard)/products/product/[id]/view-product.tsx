"use client";
import Link from "next/link";
import React from "react";
import { ProductType, AccountDataType } from "@/types";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import PostView from "@/components/post-view";
import Tooltip from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";
interface ViewProductProps {
  item: ProductType;
}
import { DataGraph } from "../../product-database/product-database-cards";
import TrackProductButton from "@/components/buttons/track-product-button";

const ViewProduct = ({ item }: ViewProductProps) => {
  return (
    <div className="grid md:grid-cols-[30%_1fr] gap-4  container">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold capitalize md:block hidden ">
          {item.title}
        </h1>
        <TrackProductButton product={item} />
        <ProductImage images={item.supplierInfo.supplierImages} />
      </div>
      <section className=" rounded-md">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md mt-4">
            <div className="flex  items-center ">
              <div className="rounded-md bg-theme-blue aspect-square p-2 w-fit relative flex justify-center items-center">
                <Icons.likes className=" text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold capitalize text-ellipsis  text-left w-fit text-primary">
                Average likes
              </h1>
              <Tooltip content="Average likes received by the accounts promoting the product ">
                <div className="flex h-4 w-8 justify-center">
                  <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                </div>
              </Tooltip>
            </div>
            <div className="w-full h-[200px] relative mt-3">
              <DataGraph accounts={item.accountsData} field="heartCount" />
            </div>
          </div>
          <div className="p-4 border rounded-md mt-4">
            <div className="flex  items-center ">
              <div className="rounded-md bg-theme-blue aspect-square p-2 w-fit relative flex justify-center items-center">
                <Icons.followers className=" text-white" />
              </div>
              <h1 className=" ml-3 text-xl font-bold capitalize text-ellipsis  text-left w-fit text-primary">
                Average followers
              </h1>
              <Tooltip content="Average followers for accounts promoting the product">
                <div className="flex h-4 w-8 justify-center">
                  <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                </div>
              </Tooltip>
            </div>
            <div className="w-full h-[200px] relative mt-3">
              <DataGraph accounts={item.accountsData} field="followerCount" />
            </div>
          </div>
        </div>
        <AccountInfo accounts={item.accountsData} />
      </section>
    </div>
  );
};

export default ViewProduct;

interface AccountInfoProps {
  accounts: AccountDataType[];
}

const AccountInfo = ({ accounts }: AccountInfoProps) => {
  const topPosts = accounts.flatMap((account) => account.topPosts || []);

  topPosts.sort(
    (a: any, b: any) => b.postData.playCount - a.postData.playCount
  );

  const sortedAccounts = accounts.sort(
    (a: any, b: any) =>
      b.accountStats[0].followerCount - a.accountStats[0].followerCount
  );

  return (
    <div className="grid  gap-4">
      <div className="flex flex-col ">
        <div className="flex items-center mt-4 mb-3">
          <h1 className="text-lg font-semibold leading-none tracking-tight">{`Active Sellers (${accounts.length})`}</h1>
          <Tooltip content="Sellers linked to the product ">
            <div className="flex h-4 w-8 justify-center">
              <Icons.helpCircle className="h-4 w-4 text-gray-600" />
            </div>
          </Tooltip>
        </div>
        <div className="h-fit max-h-[300px] overflow-scroll border rounded-md">
          <div className="grid divide-y divide-border  h-fit   ">
            {sortedAccounts.map((account, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 cursor-pointer group hover:bg-muted"
              >
                <Link
                  href={`accounts/account/${account.id}`}
                  className="w-[80%] grid grid-cols-[40px_1fr] gap-2"
                >
                  <div className="aspect-square w-10 h-10 bg-muted rounded-md relative overflow-hidden">
                    <Image src={account.avatar} alt="product image" fill />
                  </div>
                  <div className="flex flex-col max-w-full overflow-hidden">
                    <h1 className="text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis  text-primary">
                      {account.nickname}
                    </h1>
                    <div className="text-[12px] text-gray-500  text-muted-foreground overflow-hidden text-ellipsis">
                      {"@" + account.uniqueId}
                    </div>
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
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-3">
          <h1 className="text-lg font-semibold leading-none tracking-tight">
            Top Videos
          </h1>
          <Tooltip content="Top performing posts by view count linked to the product ">
            <div className="flex h-4 w-8 justify-center">
              <Icons.helpCircle className="h-4 w-4 text-gray-600" />
            </div>
          </Tooltip>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-3 gap-4 w-full">
          {accounts &&
            topPosts.slice(0, 6).map((item: any, i: number) => {
              return (
                <PostView
                  key={i}
                  postId={item.postId}
                  accountData={item.author}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import Skeleton from "@/components/ui/custom-skeleton";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { ProductDataBaseType, AccountDataType } from "@/types";
import PostView from "@/components/post-view";
interface CardDisplayProps {
  data: ProductDataBaseType[];
}

const CardDisplay = ({ data }: CardDisplayProps) => {
  return (
    <div className="grid grid-cols-2 gap-8 h-full w-full ">
      {/* <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 h-full w-full"> */}
      {data.map((item: any, i: number) => (
        <ProductDisplay key={i} item={item} />
      ))}
    </div>
  );
};

export default CardDisplay;

interface CardProps {
  item: ProductDataBaseType;
}

export const ProductDisplay = ({ item }: CardProps) => {
  return (
    <div className="h-full relative group w-full rounded-md border bg-background  ">
      <div className="grid w-full">
        <Link
          href={`/products/product/${item.id}`}
          className="grid grid-cols-[80px_1fr] border-b  gap-4  w-full h-fit hover:bg-muted sm:gap-2  p-4    "
        >
          <div className="h-20 w-20 relative overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>

          <div className="grid ">
            <h1 className="text-xl font-bold capitalize text-ellipsis  text-left w-fit text-primary">
              {item.title}
            </h1>
            <h1 className="text-sm capitalize text-ellipsis  text-left w-fit text-primary">
              {item?.supplierInfo?.supplierTitle}
            </h1>
            {/* <div className="w-[100px] flex items-center h-fit gap-2 text-muted-foreground">
              <Icons.likes className="h-5 w-5 fill-muted-foreground " />
              234
              <Icons.profile className="h-5 w-5 fill-muted-foreground " />
              {item.accounts?.length}
            </div> */}
          </div>
        </Link>
        <AccountInfo accounts={item.accounts} />
      </div>
    </div>
  );
};

interface AccountInfoProps {
  accounts: AccountDataType[];
}

const AccountInfo = ({ accounts }: AccountInfoProps) => {
  console.log("accounts", accounts);
  const topPosts = accounts.flatMap((account) => account.topPosts || []);

  console.log("topPosts", topPosts);
  topPosts.sort(
    (a: any, b: any) => b.postData.playCount - a.postData.playCount
  );

  const sortedAccounts = accounts.sort(
    (a: any, b: any) =>
      b.accountStats[0].followerCount - a.accountStats[0].followerCount
  );

  return (
    <div className="grid   gap-8 p-4">
      {/* <div className="flex flex-col  h-fit">
        <h1 className="text-xl">Top Videos</h1>
        <div className="grid grid-flow-col gap-4  w-full">
          {accounts &&
            topPosts.slice(0, 3).map((item: any, i: number) => {
              return (
                <PostView
                  key={i}
                  cover={item?.cover}
                  playCount={item.postData.playCount}
                />
              );
            })}
        </div>
      </div> */}
      <div className="flex flex-col ">
        <h1 className="text-xl">{`Active Sellers (${accounts.length})`}</h1>
        <div className=" max-h-[150px] overflow-scroll border rounded-md">
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
                    <h1 className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis  text-primary">
                      {account.nickname}
                    </h1>
                    <div className="text-[12px] text-gray-500  text-muted-foreground overflow-hidden text-ellipsis">
                      {"@" + account.uniqueId}
                    </div>
                  </div>
                </Link>
                {/* <UpdateCollectionButton
                  account={account}
                  variant="outline"
                  size="sm"
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card = ({ item }: CardProps) => {
  return (
    <div className="h-full relative group ">
      <Link
        href={`/products/product/${item.id}`}
        className="w-full   bg-card rounded-md   p-4    pb-2 items-center relative flex flex-col  cursor-pointer "
      >
        <div className="flex  flex-col  w-full  gap-[2px] sm:gap-2   pb-0  rounded-md ">
          <div className="aspect-square w-full bg-muted rounded-md relative overflow-hidden">
            <div className="absolute h-1/2 pointer-events-none bottom-0 w-full bg-gradient-to-t from-black/50 to-black/0  rounded-md z-30 hidden group-hover:block fade-in">
              <div className="flex absolute gap-4 w-fit  bottom-2 pointer-events-auto right-2">
                <Button
                  className="flex items-center justify-center whitespace-nowrap"
                  variant="default"
                  size="sm"
                >
                  <Icons.ellipsis className="h-6 w-6 " />
                </Button>
                <Button
                  className="flex items-center justify-center whitespace-nowrap"
                  variant="default"
                  size="sm"
                >
                  <Icons.crosshair className="h-6 w-6 " />
                </Button>
              </div>
            </div>
            <Image
              src={item.image}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>
          <div className="grid ">
            <h1 className="text-sm capitalize text-ellipsis  text-left w-fit text-primary">
              {item.title}
            </h1>
            <div className="w-[100px] flex items-center h-fit gap-2 text-muted-foreground">
              <Icons.likes className="h-5 w-5 fill-muted-foreground " />
              234
              <Icons.profile className="h-5 w-5 fill-muted-foreground " />
              16
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="w-full bg-background border border-border rounded-md h-fit  pb-2 items-center relative flex flex-col">
      <div className="flex items-center gap-2 w-full pb-0 p-4">
        <Skeleton height={40} width={40} />
        <div className="flex flex-col gap-2 ">
          <Skeleton height={15} width={100} />
          <Skeleton height={10} width={100} />
        </div>
      </div>
      <div className=" p-4">
        <Skeleton height={50} width={200} />
      </div>

      <Skeleton height={60} width={"90%"} />

      <div className="flex flex-col mt-auto w-[90%] pt-8">
        <div className="grid grid-cols-3 gap-2 w-full ">
          <Skeleton height={100} width={"100%"} />
          <Skeleton height={100} width={"100%"} />
          <Skeleton height={100} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

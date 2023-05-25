import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import Skeleton from "@/components/ui/custom-skeleton";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { AccountDataType } from "@/types";
import PostView from "@/components/post-view";
const CardDisplay = ({
  accountDataBaseData,
}: {
  accountDataBaseData: AccountDataType[];
}) => {
  return (
    <div className="grid  lg:grid-cols-4  grid-cols-2 gap-8 h-full  ">
      {accountDataBaseData ? (
        <>
          {accountDataBaseData.map((account: any, i: number) => (
            <AccountCard key={i} item={account} />
          ))}
        </>
      ) : (
        <>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
        </>
      )}
    </div>
  );
};

export default CardDisplay;

export const AccountCard = ({ item }: { item: AccountDataType }) => {
  return (
    <div className="h-full relative group ">
      {/* <div className="absolute h-1/2 pointer-events-none bottom-0 w-full bg-gradient-to-t dark:from-black/60 from-white/60 to-black/0  rounded-md z-40 hidden group-hover:block fade-in">
        <div className="flex absolute gap-2 w-fit  bottom-2 pointer-events-auto right-2">
          <UpdateCollectionButton account={item} size="sm" variant="default" />
        </div>
      </div> */}

      <div className="w-full  bg-card rounded-md h-fit border border-border pt-4  shadow-lg  pb-2 p-2 relative flex flex-col">
        {/* <div className="flex absolute gap-2 w-fit top-2 right-2 ">
          <UpdateCollectionButton account={item} variant="outline" />
        </div> */}

        <Link
          href={`/accounts/account/${item.id}`}
          className="grid grid-cols-[70px_1fr] items-center justify-start gap-[2px] sm:gap-2  w-full pb-0  rounded-md hover:opacity-70"
        >
          <div className="aspect-square w-[70px] h-[70px] bg-muted rounded-md relative overflow-hidden border ">
            <Image
              src={item?.avatar}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>

          <div className="flex flex-col max-w-full gap-1 overflow-hidden ">
            <h1 className="text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis  text-primary">
              {item.userInfo?.user?.nickname}
            </h1>

            <div className="text-[12px] text-gray-500  text-muted-foreground overflow-hidden text-ellipsis">
              {"@" + item.uniqueId}
            </div>
            <div className="flex gap-3 items-center  w-fit ">
              <div className="flex flex-row gap-2 items-center">
                {/* <h2 className="text-[12px] sm:text-sm text-muted-foreground ">
                Likes
              </h2> */}
                <Icons.likes className="w-4 h-4 text-primary fill-primary " />
                <h3 className="text-[12px]  font-bold text-primary">
                  {formatNumber(item.accountStats[0].heartCount)}
                </h3>
              </div>

              <div className="flex flex-row gap-2 items-center">
                {/* <h2 className="text-[12px] sm:text-sm text-muted-foreground">
                Followers
              </h2> */}
                <Icons.followers className="w-4 h-4 text-primary fill-primary" />
                <h3 className="text-[12px]  font-bold text-primary">
                  {formatNumber(item.accountStats[0].followerCount)}
                </h3>
              </div>

              <div className="flex flex-row gap-2 items-center">
                {/* <h2 className="text-[12px] sm:text-sm text-muted-foreground">
                Posts
              </h2> */}
                <Icons.posts className="w-4 h-4 text-primary fill-primary" />
                <h3 className="text-[12px]  font-bold text-primary">
                  {formatNumber(item.accountStats[0].videoCount)}
                </h3>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-col mt-2 w-full ">
          <h1 className="text-sm ">Product</h1>
          <div className="grid grid-cols-[36px_1fr] relative gap-2 items-center rounded-md p-1 ">
            <Link
              href={`/products/product/${item.product?.id}`}
              className="w-full h-full z-10 rounded-md absolute hover:bg-muted"
            ></Link>
            <div className="h-9 w-9 relative overflow-hidden rounded-md z-20 pointer-events-none">
              <Image
                src={item?.product?.image || ""}
                alt="img"
                fill
                sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
              />
            </div>
            <div className="grid">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis relative z-20 pointer-events-none">
                {item.product?.title}
              </p>
              <p className="whitespace-nowrap text-muted-foreground text-[12px] overflow-hidden text-ellipsis relative z-20 pointer-events-none">
                {item.product?.title}
              </p>
            </div>
            {/* <Button
              variant={"outline"}
              className="w-fit relative z-20 bg-background"
              size="xsm"
            >
              <Icons.ellipsis className="text-primary h-3 w-3" />
            </Button> */}
          </div>
        </div>
        <div className="flex flex-col mt-2 w-full">
          <h1 className="text-sm mb-2">Top Posts</h1>
          <div className="grid grid-cols-3 gap-4 w-full ">
            {Array(3)
              .fill(0)
              .map((_, i: number) => {
                return (
                  <div
                    key={i}
                    className=" w-full aspect-[9/16] bg-muted rounded-md relative overflow-hidden "
                  >
                    {item.topPosts && item.topPosts.length > i && (
                      <PostView
                        key={i}
                        cover={item.topPosts[i]?.cover}
                        playCount={item.topPosts[i]?.postData.playCount}
                      />
                    )}
                    <Icons.media className="text-primary h-8 w-8 md:h-8 md:w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
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

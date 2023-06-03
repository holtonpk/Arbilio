import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { formatDateShort, formatNumber } from "@/lib/utils";
import { LineChart, BarChart } from "@/components/charts";
import { ProductDataBaseType, AccountDataType, ProductType } from "@/types";
import { Icons } from "@/components/icons";
import Tooltip from "@/components/ui/tooltip";
import { ProductOperations } from "@/components/buttons/product-operations";
import TrackProductButton from "@/components/buttons/track-product-button";

interface CardProps {
  item: ProductDataBaseType;
}

export const ProductDisplay = ({ item }: CardProps) => {
  return (
    <div className="h-full relative group w-full rounded-md border bg-background  ">
      <div className="grid w-full gap-4 md:gap-0 p-4 md:p-0">
        <div className="grid  grid-cols-[80px_1fr] border items-start gap-4 relative w-full h-fit hover:bg-muted/30 sm:gap-2  p-4    ">
          <Link
            href={`/products/product/${item.id}`}
            className="w-full h-full absolute top-0 left-0 z-10"
          />
          <div className="h-20 w-20 relative overflow-hidden z-20 rounded-md border pointer-events-none">
            <Image
              src={item.image}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>

          <div className="grid gap-0 relative z-20 pointer-events-none">
            <h1 className="text-xl font-bold capitalize text-ellipsis  text-left w-fit text-primary">
              {item.title}
            </h1>
            <h1 className="text-sm capitalize text-ellipsis  text-left w-fit text-primary">
              {item?.supplierInfo?.supplierTitle}
            </h1>
          </div>
        </div>
        <TrackProductButton
          product={item}
          className="md:absolute md:top-4 md:right-4 z-20 w-full md:w-fit  "
        />
        {/* <ProductOperations
            product={item}
            variant="outline"
            className="hidden md:block relative z-20"
          >
            <Icons.ellipsis className="h-5 w-5 fill-muted-foreground  " />
          </ProductOperations> */}

        {/* <AccountInfo accounts={item.accounts} /> */}
        <div className="p-4">
          <div className="flex items-center ">
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
            <DataGraph accounts={item.accounts} field="heartCount" />
          </div>
        </div>
        {/* <div className="w-full p-4 grid gap-3">
          <LinkButton href={`/products/product/${item.id}`} className="w-full">
            View Product
          </LinkButton>
         
        </div> */}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DataGraphProps {
  accounts: AccountDataType[];
  field: "heartCount" | "followerCount" | "followingCount" | "videoCount";
}

export const DataGraph = ({ accounts, field }: DataGraphProps) => {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const combinedStats = combineStats(accounts);

  const combineDays = combineSameDay(combinedStats).reverse();

  const labels = combineDays.map((item) => {
    return formatDateShort(item.dataCollectionTime);
  });

  const data = combineDays.map((item: any) => item[field] / item.totalCombined);

  return (
    <>
      <div className="absolute right-0 -translate-y-full">
        <Button
          onClick={() => setChartType("bar")}
          size="sm"
          variant={chartType === "line" ? "ghost" : "outline"}
          className={`${
            chartType == "bar"
              ? "border-border bg-background hover:bg-background hover:text-primary"
              : "hover:bg-transparent hover:border-border"
          }
          `}
        >
          <Icons.barChart className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setChartType("line")}
          size="sm"
          variant={chartType === "bar" ? "ghost" : "outline"}
          className={`${
            chartType == "line"
              ? "border-border bg-background hover:bg-background hover:text-primary"
              : "hover:bg-transparent hover:border-border"
          }
          `}
        >
          <Icons.lineChart className="h-4 w-4" />
        </Button>
      </div>

      {chartType === "line" ? (
        <LineChart data={data} labels={labels} dataTitle="Likes" />
      ) : (
        <BarChart data={data} labels={labels} dataTitle="Likes" />
      )}
    </>
  );
};

const combineStats = (accounts: AccountDataType[]): DataType[] => {
  const seenDays: Record<string, Record<string, boolean>> = {};

  const combinedStats = accounts.flatMap((account) => {
    return account.accountStats.filter((item) => {
      const dayStart = startOfDay(item.dataCollectionTime).getTime();

      if (!seenDays[account.id]) {
        seenDays[account.id] = {};
      }

      if (!seenDays[account.id][dayStart]) {
        seenDays[account.id][dayStart] = true;
        return true;
      }

      return false;
    });
  });

  return combinedStats;
};
import { startOfDay } from "date-fns";

type DataType = {
  heart?: number;
  heartCount?: number;
  dataCollectionTime: number;
  followerCount?: number;
  videoCount?: number;
  diggCount?: number;
  followingCount?: number;
  totalCombined?: number;
};

const combineSameDay = (data: DataType[]): DataType[] => {
  const combined: Record<string, DataType> = {};

  data.forEach((item) => {
    const dayStart = startOfDay(item.dataCollectionTime).getTime();

    if (!combined[dayStart]) {
      combined[dayStart] = { ...item, totalCombined: 1 };
    } else {
      combined[dayStart].heart =
        (combined[dayStart].heart || 0) + (item.heart || 0);
      combined[dayStart].heartCount =
        (combined[dayStart].heartCount || 0) + (item.heartCount || 0);
      combined[dayStart].followerCount =
        (combined[dayStart].followerCount || 0) + (item.followerCount || 0);
      combined[dayStart].videoCount =
        (combined[dayStart].videoCount || 0) + (item.videoCount || 0);
      combined[dayStart].diggCount =
        (combined[dayStart].diggCount || 0) + (item.diggCount || 0);
      combined[dayStart].followingCount =
        (combined[dayStart].followingCount || 0) + (item.followingCount || 0);
      combined[dayStart].totalCombined =
        (combined[dayStart].totalCombined || 0) + 1;
    }
  });

  return Object.values(combined);
};

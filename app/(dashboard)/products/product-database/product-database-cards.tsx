import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { formatDateShort, formatNumber } from "@/lib/utils";
import { LineChart } from "@/components/charts";
import { ProductDataBaseType, AccountDataType } from "@/types";

interface CardDisplayProps {
  data: ProductDataBaseType[];
}

const CardDisplay = ({ data }: CardDisplayProps) => {
  return (
    <div className="grid  gap-8 h-full w-full ">
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
        {/* <AccountInfo accounts={item.accounts} /> */}
        <div className="p-4">
          <h1 className="text-xl font-bold capitalize text-ellipsis  text-left w-fit text-primary"></h1>
          <div className="w-full h-[200px] relative">
            <DataGraph accounts={item.accounts} title={item.title} />
          </div>
        </div>
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

interface DataGraphProps {
  accounts: AccountDataType[];
  title: string;
}

const DataGraph = ({ accounts, title }: DataGraphProps) => {
  const combinedStats = combineStats(accounts);

  const combineDays = combineSameDay(combinedStats).reverse();

  const view = combineDays.map((item: any) => {
    return {
      data: item.heartCount,
      label: formatDateShort(item.dataCollectionTime),
      total: item.totalCombined,
    };
  });
  console.log("view ==> ", title, accounts.length, view);

  const labels = combineDays.map((item) => {
    return formatDateShort(item.dataCollectionTime);
  });

  const data = combineDays.map(
    (item: any) => item.heartCount / item.totalCombined
  );

  // console.log("data ==> ", data);
  return <LineChart data={data} labels={labels} dataTitle="Likes" />;
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

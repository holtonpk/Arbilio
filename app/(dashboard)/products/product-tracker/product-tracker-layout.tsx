"use client";
import React from "react";
import { BarChart, LineChart } from "@/components/charts";
import { DateRangePicker } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import { Icons } from "@/components/icons";
import { formatNumber } from "@/lib/utils";
import { ProductType, AccountDataType, AccountStatsType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { Button } from "@/components/ui/button";
import { RemoveTrackProductButton } from "@/components/buttons/remove-track-product-button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateShort, combinePostsByDay } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductTrackerLayoutProps {
  data: ProductType[];
}
import PostView from "@/components/post-view";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Car } from "lucide-react";

const ProductTrackerLayout = ({ data }: ProductTrackerLayoutProps) => {
  return (
    <div className="container grid gap-4 pb-4  relative ">
      {data.map((item, i) => (
        <div
          key={i}
          className=" p-8 border rounded-md grid gap-8 grid-cols-[1fr_75%] shadow-lg max-w-[1334px]   relative"
        >
          <div className="flex flex-col justify-between px-8">
            <div className="grid  gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold capitalize">
                  {item.title}
                </h1>
                <RemoveTrackProductButton
                  id={item.id}
                  className=" text-destructive border-destructive hover:bg-destructive hover:text-white"
                  variant="outline"
                >
                  Stop Tracking
                </RemoveTrackProductButton>
              </div>
              <ProductImage images={item.supplierInfo.supplierImages} />
            </div>
          </div>
          <div className="  relative">
            <ProductTabs item={item} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTrackerLayout;

const ProductTabs = ({ item }: { item: ProductType }) => {
  return (
    <Tabs defaultValue="stats" className="w-full  relative">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="posts">Recent Posts</TabsTrigger>
        <TabsTrigger value="sellers">Sellers</TabsTrigger>
      </TabsList>
      <TabsContent value="stats">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Product Stats</CardTitle>
            <CardDescription>
              View the stats for this product based off the tracked accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <StatDisplay accounts={item.accountsData} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="posts" className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              View the most recent posts for this product.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] ">
            <RecentPosts accounts={item.accountsData} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sellers">
        <Card>
          <CardHeader>
            <CardTitle>Active Sellers</CardTitle>
            <CardDescription>
              A list of the sellers that have posted this product.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Sellers accounts={item.accountsData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

interface RecentPostsProps {
  accounts: AccountDataType[];
}

const RecentPosts = ({ accounts }: RecentPostsProps) => {
  const topPosts = accounts.flatMap((account) => account.topPosts || []);
  topPosts.sort(
    (a: any, b: any) => b.postData.playCount - a.postData.playCount
  );

  return (
    <ScrollArea className="h-full w-full relative ">
      <ScrollBar orientation="horizontal" />
      <div className="flex relative gap-4 h-[250px] ">
        {accounts &&
          topPosts.slice(0, 7).map((item: any, i: number) => {
            return (
              <div key={i} className="h-full aspect-[9/16] relative ">
                <PostView
                  key={i}
                  postId={item.postId}
                  accountData={item.author}
                />
              </div>
            );
          })}
      </div>
    </ScrollArea>
    // </>
  );
};

const Sellers = ({ accounts }: RecentPostsProps) => {
  const sortedAccounts = accounts.sort(
    (a: any, b: any) =>
      b.accountStats[0].followerCount - a.accountStats[0].followerCount
  );

  return (
    <ScrollArea className="border rounded-md max-h-full ">
      <div className="flex flex-col divide-y divide-border h-fit ">
        {sortedAccounts.map((account, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 cursor-pointer group hover:bg-muted"
          >
            <Link
              href={`accounts/account/${account.id}`}
              className="w-[80%] grid grid-cols-[40px_1fr] items-center space-x-4"
            >
              <div className="aspect-square w-10 h-10 bg-muted rounded-md relative overflow-hidden border">
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
    </ScrollArea>
  );
};

const StatDisplay = ({ accounts }: RecentPostsProps) => {
  const [dataField, setDataField] = React.useState<string>("followerCount");
  const [chartType, setChartType] = React.useState<"line" | "bar">("line");

  const dataCountStats = accounts.map((account) => {
    return account.accountStats.map((stat) => {
      return {
        date: stat.dataCollectionTime,
        data: stat[dataField as keyof AccountStatsType],
        id: account.id,
      };
    });
  });

  const combinedData = combinePostsByDay(dataCountStats).reverse();

  const data = combinedData.map((item) => item.data);
  const labels = combinedData.map((item) => formatDateShort(item.date));

  return (
    <>
      <div className="absolute top-4 right-4 flex gap-4">
        <Select
          onValueChange={(value) => setDataField(value)}
          defaultValue={dataField}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a stat" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Stats</SelectLabel>
              <SelectItem value="videoCount">Average Posts</SelectItem>
              <SelectItem value="heartCount">Average Likes</SelectItem>
              <SelectItem value="followerCount">Average Followers</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="">
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
      </div>

      <div className="relative w-full h-full   rounded-md">
        <>
          {chartType === "line" ? (
            <LineChart data={data} labels={labels} dataTitle="Avg. Posts" />
          ) : (
            <BarChart data={data} labels={labels} dataTitle="Avg. Posts" />
          )}
        </>
      </div>
    </>
  );
};

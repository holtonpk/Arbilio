"use client";
import React, { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type SortType = "followers" | "likes" | "posts";

const AccountRank = ({ data }: any) => {
  const [expandedAccountData, setExpandedAccountData] = useState<any>({
    rank: 1,
    account: data[0],
  });

  const [timeFrame, setTimeFrame] = useState<"today" | "week">("today");

  return (
    <>
      <div className="flex flex-row  w-full  h-full  gap-8  rounded-md pb-8 ">
        <div className="absolute h-fit gap-2 grid-cols-2 w-fit border rounded-md top-4 right-4  flex flex-row justify-between items-center p-1">
          {/* <div className="absolute h-[90%] w-[50%] bg-foreground rounded-md z-10 left-2" /> */}
          <Button
            variant={timeFrame == "today" ? "default" : "secondary"}
            onClick={() => setTimeFrame("today")}
            className="relative z-20  justify-center flex w-full"
          >
            Today
          </Button>
          <Button
            onClick={() => setTimeFrame("week")}
            variant={timeFrame == "week" ? "default" : "secondary"}
            className="relative z-20  justify-center flex w-full"
          >
            Week
          </Button>
        </div>
        <div className=" w-full  rounded-md h-full relative ">
          <div className="flex flex-col items-center">
            <>
              <div className="lg:grid-cols-3 w-full gap-4 hidden lg:grid  ">
                <TopRank
                  account={data[0]}
                  rank={1}
                  setExpandedAccountData={setExpandedAccountData}
                  expandedAccountData={expandedAccountData}
                />
                <TopRank
                  account={data[1]}
                  rank={2}
                  setExpandedAccountData={setExpandedAccountData}
                  expandedAccountData={expandedAccountData}
                />
                <TopRank
                  account={data[2]}
                  rank={3}
                  setExpandedAccountData={setExpandedAccountData}
                  expandedAccountData={expandedAccountData}
                />
              </div>
            </>
            <div className=" flex flex-row items-center text-muted-foreground  w-full mt-4">
              <div className="relative w-1/2">
                <Input placeholder="Search for an account" className="pl-12" />
                <Icons.search className="absolute top-1/2 transform -translate-y-1/2 left-3" />
              </div>
              <div className="grid grid-cols-3 items-center ml-auto lg:text-base text-[12px]  w-[200px] lg:w-[400px]">
                <h1 className="w-full justify-center flex">Followers</h1>
                <h1 className="w-full justify-center flex">Likes</h1>
                <h1 className="w-full justify-center flex">Posts</h1>
              </div>
            </div>
            <div className="hidden flex-col w-full gap-4 mt-2 lg:flex">
              {data.slice(2, 12).map((account: any, index: number) => (
                <RankRow account={account} rank={index + 4} key={index} />
              ))}
            </div>
            <div className="flex flex-col w-full gap-4 mt-2 lg:hidden">
              {data.slice(0, 12).map((account: any, index: number) => (
                <RankRow account={account} rank={index + 1} key={index} />
              ))}
            </div>
          </div>
        </div>
        {/* <div className="lg:block hidden w-[30%]">
          <ExpandedAccountRank expandedAccountData={expandedAccountData} />
        </div> */}
      </div>
    </>
  );
};

export default AccountRank;

interface OptionButtonProps {
  setRankType: (type: SortType) => void;
  rankType: SortType;
  value: SortType;
  title: string;
}

const TopRank = ({
  account,
  rank,
  setExpandedAccountData,
  expandedAccountData,
}: any) => {
  const handleClick = () => {
    setExpandedAccountData({
      rank: rank,
      account: account,
    });
  };
  return (
    <div
      onClick={handleClick}
      className={`${
        rank == expandedAccountData.rank ? "" : ""
      } w-full bg-muted rounded-md shadow-lg flex gap-6 flex-col items-center relative  cursor-pointer border `}
    >
      <h1 className="font-bold text-2xl absolute top-2 left-2  h-fit flex justify-center items-center  rounded-md p-1 aspect-square">
        {"#" + rank}
      </h1>
      <div className=" flex-col flex  p-6 items-center">
        <div className="h-20 w-20 rounded-md aspect-square relative overflow-hidden">
          <Image
            src={account.avatar}
            alt="Picture of the author"
            fill
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          />
        </div>

        <div className="flex flex-col ml-4 items-center  text-2xl">
          <h1 className="font-bold text-primary text-2xl">
            {account.nickname}
          </h1>

          <Link
            className=" font-bold  text-base hover:opacity-50 text-muted-foreground"
            target="_blank"
            href={`https://www.tiktok.com/@${account.uniqueId}`}
          >
            {"@" + account.uniqueId}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 flex-grow w-full divide-x divide-border border-t ">
        <StatDisplay data={account.followers} icon={"followers"} />
        <StatDisplay data={account.likes} icon={"likes"} />
        <StatDisplay data={account.posts} icon={"posts"} />
      </div>
    </div>
  );
};

const RankRow = ({ account, rank }: any) => {
  return (
    <div className="border-rounded-md bg-muted shadow-lg rounded-md flex flex-row items-center  w-full border">
      <h1 className="font-bold text-sm w-10 pl-3">
        {rank + (rank === 1 ? "st" : "th")}
      </h1>
      <div className="h-12 w-12 ml-4 rounded-md aspect-square relative overflow-hidden">
        <Image
          src={account.avatar}
          alt="Picture of the author"
          fill
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
        />
      </div>
      <h1 className="font-bold text-primary text-sm lg:text-lg ml-4">
        {account.nickname}
      </h1>
      <div className="grid grid-cols-3 divide-x divide-border ml-auto h-20 w-[200px] lg:w-[400px]">
        <StatColumn
          title="Followers"
          value={account.followers.value}
          increase={account.followers.increase}
          percentChange={account.followers.percentChange}
        />
        <StatColumn
          title="Likes"
          value={account.likes.value}
          increase={account.likes.increase}
          percentChange={account.likes.percentChange}
        />
        <StatColumn
          title="Posts"
          value={account.posts.value}
          increase={account.posts.increase}
          percentChange={account.posts.percentChange}
        />
      </div>
    </div>
  );
};

const StatColumn = ({ title, value, increase, percentChange }: any) => {
  return (
    <div className="text-base text-primary font-bold flex items-center gap-1 px-2 justify-center ">
      <div className="flex flex-col items-center  h-fit  p-2">
        <h2 className="text-[12px] text-muted-foreground  ">
          {increase > 0 && "+" + formatNumber(increase)}
        </h2>
        <h1 className="text-base text-primary font-bold flex items-center gap-1">
          {percentChange + "%"}
        </h1>
        <h2 className="text-sm text-muted-foreground hidden lg:block">
          {"Total " + formatNumber(value)}
        </h2>
      </div>
    </div>
  );
};

interface StatDisplayProps {
  data: {
    increase: number;
    percentChange: number;
    value: number;
  };
  icon: keyof typeof Icons;
}

const StatDisplay = ({ data, icon }: StatDisplayProps) => {
  const Icon = Icons[icon] ? Icons[icon] : Icons["followers"];

  return (
    <div className="flex flex-col items-center  h-fit  p-2">
      <Icon />
      <h2 className="text-[12px] text-muted-foreground  ">
        {data.increase > 0 && "+" + formatNumber(data.increase)}
      </h2>
      <h1 className="text-base text-primary font-bold flex items-center gap-1">
        {data.percentChange + "%"}
      </h1>
      <h2 className="text-sm text-muted-foreground">
        {"Total " + formatNumber(data.value)}
      </h2>
    </div>
  );
};

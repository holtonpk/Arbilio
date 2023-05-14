"use client";
import React, { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
type SortType = "followers" | "likes" | "posts";

const AccountRank = ({ data }: any) => {
  const [expandedAccountData, setExpandedAccountData] = useState<any>({
    rank: 1,
    account: data[0],
  });

  return (
    <>
      <div className="flex flex-row mt-4 w-full  h-full  gap-8  rounded-md ">
        <div className=" w-full  rounded-md h-full relative ">
          <div className="flex flex-col items-center">
            <>
              <div className="grid md:grid-cols-3 w-full gap-4  ">
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
            <div className="flex flex-col w-full gap-2 mt-4">
              {data.slice(2, 12).map((account: any, index: number) => (
                <RankRow account={account} rank={index + 4} key={index} />
              ))}
            </div>
          </div>
        </div>
        {/* <div className="md:block hidden w-[30%]">
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

const OptionButton = ({
  setRankType,
  rankType,
  value,
  title,
}: OptionButtonProps) => {
  const handleClick = () => {
    setRankType(value);
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        rankType == value
          ? "bg-indigo-100 text-black"
          : "bg-indigo-200 text-black/60   hover:bg-indigo-100  "
      } w-fit px-8 py-1 text-sm  rounded-md h-10`}
    >
      {title}
    </button>
  );
};

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
      } w-full bg-muted rounded-md flex gap-6 flex-col items-center relative  cursor-pointer border `}
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
    <div className="border-rounded-md rounded-md flex flex-row items-center  w-full border">
      <h1 className="font-bold text-sm w-10 pl-3">{rank + "th"}</h1>
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
      <h1 className="font-bold text-primary text-lg ml-4">
        {account.nickname}
      </h1>
      <div className="grid grid-cols-3 divide-x divide-border ml-auto h-20 w-[400px]">
        <div className="text-base text-primary font-bold flex items-center gap-1 px-2 justify-center ">
          <Icons.followers />
          <div className="flex flex-col   h-fit  p-2">
            <h2 className="text-base text-muted-foreground  ">
              {formatNumber(account.followers.increase)}
            </h2>
            <h1 className="text-base text-primary font-bold flex items-center gap-1">
              {account.followers.percentChange + "%"}
            </h1>
            <h2 className="text-sm text-muted-foreground">
              {"Total " + formatNumber(account.followers.value)}
            </h2>
          </div>
        </div>
        <div className="text-base text-primary font-bold flex items-center gap-1 px-2 justify-center ">
          <Icons.likes />
          <div className="flex flex-col h-fit  p-2">
            <h2 className="text-base text-muted-foreground  ">
              {formatNumber(account.likes.increase)}
            </h2>
            <h1 className="text-base text-primary font-bold flex items-center gap-1">
              {account.likes.percentChange + "%"}
            </h1>
            <h2 className="text-sm text-muted-foreground">
              {"Total " + formatNumber(account.likes.value)}
            </h2>
          </div>
        </div>
        <div className="text-base text-primary font-bold flex items-center gap-1 px-2 justify-center ">
          <Icons.posts />
          <div className="flex flex-col  h-fit  p-2">
            <h2 className="text-base text-muted-foreground  ">
              {formatNumber(account.posts.increase)}
            </h2>
            <h1 className="text-base text-primary font-bold flex items-center gap-1">
              {account.posts.percentChange + "%"}
            </h1>
            <h2 className="text-sm text-muted-foreground">
              {"Total " + formatNumber(account.posts.value)}
            </h2>
          </div>
        </div>
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
      <h2 className="text-base text-muted-foreground  ">
        {formatNumber(data.increase)}
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

"use client";
import React, { useState, useEffect, CSSProperties } from "react";
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from "react-icons/hi";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
type SortType = "followers" | "likes" | "posts";
import { Button } from "@/components/ui/button";

import ExpandedAccountRank from "./expanded-account-rank";
const AccountRank = ({ data }: any) => {
  const [expandedAccountData, setExpandedAccountData] = useState<any>({
    rank: 1,
    account: data[0],
  });

  return (
    <>
      <div className="flex flex-row mt-4 w-full  h-full  gap-8  rounded-md ">
        <div className="w-[70%]  rounded-md h-full relative ">
          <div className="flex flex-col items-center">
            <>
              <div className="flex flex-col w-full gap-4 ">
                {data?.map((accountData: any, indx: number) => (
                  <RankRow
                    key={indx}
                    account={accountData}
                    rank={indx + 1}
                    setExpandedAccountData={setExpandedAccountData}
                    expandedAccountData={expandedAccountData}
                  />
                ))}
              </div>

              <Button className="w-fit mt-4" variant="default">
                Load More
              </Button>
            </>
          </div>
        </div>
        <ExpandedAccountRank expandedAccountData={expandedAccountData} />
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

const RankRow = ({
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
    <div className="flex items-center gap-4 ">
      <h1 className="font-bold text-2xl  w-[16px]">{rank}</h1>
      <div
        onClick={handleClick}
        className={`${
          rank == expandedAccountData.rank
            ? "dark:bg-accent bg-muted  border-2 border-border "
            : "border-2 border-border"
        } w-full p-4 rounded-md flex hover:bg-accent cursor-pointer`}
      >
        <div className="w-[40%]   flex  items-center">
          <div className="h-12 w-12 rounded-md aspect-square relative overflow-hidden">
            <Image
              src={
                "http://127.0.0.1:8090/api/files/vv8h7hq2vne8ab5/" +
                account.recordId +
                "/" +
                account.avatar
              }
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
            />
          </div>

          <div className="flex flex-col ml-4 ">
            <h1 className="font-bold text-primary">{account.nickname}</h1>

            <Link
              className=" font-bold  hover:opacity-50 text-sm text-muted-foreground"
              target="_blank"
              href={`https://www.tiktok.com/@${account.uniqueId}`}
            >
              {"@" + account.uniqueId}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 flex-grow ">
          <StatDisplay data={account.followers} />
          <StatDisplay data={account.likes} />
          <StatDisplay data={account.posts} />
        </div>
      </div>
    </div>
  );
};

const StatDisplay = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center  h-20">
      <h2 className="text-base text-muted-foreground  ">
        {formatNumber(data.increase)}
      </h2>
      <h1 className="text-lg text-primary font-bold flex items-center gap-1">
        {data.percentChange > 0 ? (
          <HiOutlineTrendingUp />
        ) : (
          <HiOutlineTrendingDown />
        )}
        {data.percentChange + "%"}
      </h1>
      <h2 className="text-sm text-muted-foreground">
        {"Total " + formatNumber(data.value)}
      </h2>
    </div>
  );
};

"use client";
import React, { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { siteConfig } from "@/config/site";
import { formatDataAsPercentChange } from "@/lib/utils";
import Skeleton from "@/components/ui/skeleton";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

type SortType = "followers" | "likes" | "posts";

const AccountRank = ({ data }: any) => {
  const rankType = "followers";

  const [expandedAccountData, setExpandedAccountData] = useState<any>({
    rank: 1,
    account: data[0],
  });
  console.log("dd", data);
  const [timeFrame, setTimeFrame] = useState<"today" | "week">("today");

  const [searchData, setSearchData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSearch = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const value = searchInputRef.current?.value;
    console.log("value", `${siteConfig.url}/api/search-accounts/${value}`);
    const res = await fetch(`${siteConfig.url}/api/search-accounts/${value}`);
    const data = await res.json();
    console.log("data", data);
    setIsLoading(false);
    if (data.length == 0) return setSearchData([]);
    const formattedData = await formatDataAsPercentChange(data);
    const orderedData = formattedData
      .sort(
        (a: any, b: any) =>
          b[rankType].percentChange - a[rankType].percentChange
      )
      .slice(0, 7);

    setSearchData(orderedData);
  };

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    setSearchData(undefined);
    searchInputRef.current!.value = "";
  };

  return (
    <>
      <div className="flex flex-row  w-full  h-full  gap-8  rounded-md pb-8 ">
        {/* <div className="absolute h-fit gap-2 grid-cols-2 w-fit border rounded-md top-4 right-4  flex flex-row justify-between items-center p-1">
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
        </div> */}
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
              <form
                onSubmit={handleSearch}
                className="hidden sm:block relative sm:w-1/2 w-full"
              >
                <Input
                  ref={searchInputRef}
                  placeholder="Search for an account"
                  className="pl-12"
                />
                <Icons.search className="absolute top-1/2 transform -translate-y-1/2 left-3" />
              </form>
              <div className="grid grid-cols-3 items-center ml-auto sm:text-sm lg:text-base text-[8px]  w-[60%] sm:w-[50%] lg:w-[400px] translate-y-4 sm:translate-y-0">
                <Tooltip
                  content={`Total gain in the accounts followers given the time frame`}
                >
                  <h1 className="w-full justify-center flex items-center gap-1">
                    Followers
                    <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
                  </h1>
                </Tooltip>
                <Tooltip
                  content={`Total gain in the accounts likes given the time frame`}
                >
                  <h1 className="w-full justify-center flex items-center gap-1">
                    Likes
                    <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
                  </h1>
                </Tooltip>
                <Tooltip
                  content={`Total gain in the accounts posts given the time frame`}
                >
                  <h1 className="w-full justify-center flex items-center gap-1">
                    Posts
                    <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
                  </h1>
                </Tooltip>
              </div>
            </div>

            {isLoading ? (
              <div className="hidden flex-col w-full gap-4 mt-2 lg:flex">
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} className="w-full h-[70px]" />
                  ))}
              </div>
            ) : (
              <>
                {searchData ? (
                  <>
                    {searchData.length == 0 ? (
                      <EmptyPlaceholder className="w-full mt-4 mx-auto">
                        <EmptyPlaceholder.Icon name="accounts" />
                        <EmptyPlaceholder.Title>
                          No Accounts Found
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                          No accounts matched your search, try again.
                        </EmptyPlaceholder.Description>
                        <Button onClick={clearSearch}>Clear search</Button>
                      </EmptyPlaceholder>
                    ) : (
                      <div className="hidden flex-col items-center w-full gap-4 mt-2 lg:flex">
                        {searchData.map((account: any, index: number) => (
                          <RankRow
                            search
                            account={account}
                            rank={index + 4}
                            key={index}
                          />
                        ))}
                        <Button
                          className="w-fit"
                          variant={"outline"}
                          onClick={clearSearch}
                        >
                          Close search
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="hidden flex-col w-full gap-4 mt-2 lg:flex">
                    {data.slice(2, 12).map((account: any, index: number) => (
                      <RankRow account={account} rank={index + 4} key={index} />
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="flex flex-col w-full gap-2 sm:gap-4 sm:mt-2 lg:hidden ">
              {data.slice(0, 12).map((account: any, index: number) => (
                <RankRow account={account} rank={index + 1} key={index} />
              ))}
            </div>
          </div>
        </div>
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
      } w-full bg-background pt-4 rounded-md shadow-lg h-fit flex gap-6 flex-col items-center relative  cursor-pointer border `}
    >
      <h1 className="font-bold text-2xl absolute top-2 left-2  h-fit flex justify-center items-center  rounded-md p-1 aspect-square">
        {"#" + rank}
      </h1>
      <div className=" flex   items-center group ">
        <Link
          className="absolute w-full h-full z-[1]"
          href={`/accounts/account/${account.id}`}
        />
        <div className="h-20 w-20 border rounded-md aspect-square relative overflow-hidden  z-10">
          <Image
            src={account.avatar}
            alt="Picture of the author"
            fill
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          />
        </div>

        <div className="flex flex-col ml-4 items-start  text-2xl">
          <h1 className="font-bold text-primary text-2xl group-hover:underline">
            {account.nickname}
          </h1>
          <div className=" text-base  text-muted-foreground">
            {"@" + account.uniqueId}
          </div>
        </div>
      </div>

      <UpdateCollectionButton
        className="absolute top-3 right-3 z-[4]"
        account={account}
        variant={"outline"}
      >
        <Icons.addCollection className="h-4 w-4" />
      </UpdateCollectionButton>

      <div className="grid grid-cols-3 flex-grow w-full divide-x border-t   ">
        <StatDisplay
          data={account.followers}
          icon={"followers"}
          title="Followers"
        />
        <StatDisplay data={account.likes} icon={"likes"} title="Likes" />
        <StatDisplay data={account.posts} icon={"posts"} title="Posts" />
      </div>
    </div>
  );
};

const RankRow = ({
  account,
  rank,
  search,
}: {
  account: any;
  rank: number;
  search?: boolean;
}) => {
  return (
    <>
      <h1 className="font-bold text-[12px]  sm:hidden">
        {rank + (rank === 1 ? "st" : "th")}
      </h1>
      <div className=" bg-background shadow-lg rounded-md flex flex-row items-center  w-full border relative pl-2 sm:pl-4">
        {!search && (
          <h1 className="font-bold text-[12px] hidden  sm:block sm:top-0 sm:left-0 sm:text-sm mr-4 ">
            {rank + (rank === 1 ? "st" : "th")}
          </h1>
        )}

        <div className="w-[40%] sm:w-[50%] grid grid-cols-[32px_1fr] md:grid-cols-[48px_1fr] items-center group">
          <Link
            className="absolute w-full h-full z-[1]"
            href={`/accounts/account/${account.id}`}
          />
          <div className="h-8 w-8 md:h-12 md:w-12 ml-2 rounded-md aspect-square relative overflow-hidden border">
            <Image
              src={account.avatar}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-primary font-bold text-[10px] sm:text-sm lg:text-lg ml-4 max-w-full overflow-hidden text-ellipsis group-hover:underline">
              {account.nickname}
            </h1>
            <h1 className=" text-muted-foreground  text-[10px] sm:text-sm lg:text-lg ml-4 max-w-full overflow-hidden text-ellipsis group-hover:underline">
              {"@" + account.uniqueId}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x ml-auto h-16 sm:h-20 w-[60%] sm:w-[50%] lg:w-[400px] relative z-[5]">
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
    </>
  );
};

const StatColumn = ({ title, value, increase, percentChange }: any) => {
  return (
    <Tooltip
      content={
        <div className="flex flex-col">
          <div className="">
            {`Total gain in the accounts ${title} given the time frame`}
          </div>
          <div className="flex gap-2">
            <h1 className="flex gap-1">
              Percent change:
              <p className="font-bold">
                {percentChange.toLocaleString() + "%"}
              </p>
            </h1>
            <h1 className="flex gap-1">
              Increase:
              <p className="font-bold">{increase.toLocaleString()}</p>
            </h1>
            <h1 className="flex gap-1">
              Total:
              <p className="font-bold">{value.toLocaleString()}</p>
            </h1>
          </div>
        </div>
      }
    >
      <div className="text-base text-primary font-bold flex items-center px-2 justify-center ">
        <div className="flex flex-col items-center md:gap-2 gap-2  h-fit  sm:p-2">
          <h2 className=" text-[8px] sm:text-[12px] leading-[10px] text-muted-foreground  ">
            {increase > 0 && "+" + formatNumber(increase)}
          </h2>
          <h1 className="text-[10px] leading-[10px]   sm:text-base text-primary font-bold flex items-center gap-1">
            {percentChange + "%"}
          </h1>
          <h2 className="text-[8px] leading-[6px] lg:text-[12px] lg:leading-[12px] whitespace-nowrap text-muted-foreground  lg:block">
            {"Total " + formatNumber(value)}
          </h2>
        </div>
      </div>
    </Tooltip>
  );
};

interface StatDisplayProps {
  data: {
    increase: number;
    percentChange: number;
    value: number;
  };
  icon: keyof typeof Icons;
  title: string;
}

const StatDisplay = ({ data, icon, title }: StatDisplayProps) => {
  const Icon = Icons[icon] ? Icons[icon] : Icons["followers"];

  return (
    <Tooltip
      content={
        <div className="flex flex-col">
          <div className="">
            {`Total gain in the accounts ${title} given the time frame`}
          </div>
          <div className="flex gap-2">
            <h1 className="flex gap-1">
              Percent change:
              <p className="font-bold">
                {data.percentChange.toLocaleString() + "%"}
              </p>
            </h1>
            <h1 className="flex gap-1">
              Increase:
              <p className="font-bold">{data.increase.toLocaleString()}</p>
            </h1>
            <h1 className="flex gap-1">
              Total:
              <p className="font-bold">{data.value.toLocaleString()}</p>
            </h1>
          </div>
        </div>
      }
    >
      <div className="flex  items-center gap-2 h-fit  p-2 relative">
        <div className="rounded-md bg-theme-blue aspect-square p-2 relative flex justify-center items-center text-white">
          <Icon />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base text-primary font-bold flex items-center gap-1">
            + {data.percentChange + "%"}
          </h1>
          <h2 className="text-[12px] text-muted-foreground">
            {"Total " + formatNumber(data.value)}
          </h2>
        </div>
      </div>
    </Tooltip>
  );
};

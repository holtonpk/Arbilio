import React, { useEffect, useState } from "react";
import Navbar from "@/components/side-nav";
import { RiInformationFill } from "react-icons/ri";
import AccountRank from "./account-rank";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
async function getData() {
  const rankType = "followers";
  const res = await fetch(`${siteConfig.url}/api/top-accounts/`);
  const rawData = await res.json();
  const formattedData = await formatData(rawData);
  const sortedData = formattedData
    .sort(
      (a: any, b: any) => b[rankType].percentChange - a[rankType].percentChange
    )
    .slice(0, 7);

  return sortedData;
}

export default async function TopAccounts() {
  const data = await getData();
  return (
    <>
      <PageHeader
        heading={"Top Accounts"}
        text={
          "Discover the top sellers and anylize their performance over time."
        }
      />
      <div className="flex flex-row mt-4 w-full  h-full  gap-8  rounded-md ">
        <AccountRank data={data} />
      </div>
    </>
  );
}

const defaultReturnObject = {
  percentChange: 0,
  value: 0,
  increase: 0,
};

const configData = (account: any, field: string) => {
  try {
    const orderedData = account.accountStats;
    const mostRecentData = orderedData[orderedData.length - 1];
    const oldestData = orderedData[0];

    const percentChange =
      Math.round(
        ((mostRecentData[field] - oldestData[field]) / oldestData[field]) *
          100 *
          100
      ) / 100;

    if (Number.isNaN(percentChange)) {
      return defaultReturnObject;
    }

    return {
      percentChange: percentChange,
      value: mostRecentData[field],
      increase: mostRecentData[field] - oldestData[field],
    };
  } catch (e) {
    return defaultReturnObject;
  }
};

const formatData = (accountData: any) => {
  return accountData.reduce((formattedData: any, account: any) => {
    if (account.accountStats && account.accountStats.length > 0) {
      // Sort the accountStats array upfront
      account.accountStats.sort((a: any, b: any) => {
        return a.dataCollectionTime - b.dataCollectionTime;
      });

      const followers = configData(account, "followerCount");
      const likes = configData(account, "heartCount");
      const posts = configData(account, "videoCount");

      formattedData.push({
        nickname: account.nickname,
        recordId: account.recordId,
        uniqueId: account.uniqueId,
        avatar: account.avatar,
        followers,
        likes,
        posts,
      });
    }
    return formattedData;
  }, []);
};

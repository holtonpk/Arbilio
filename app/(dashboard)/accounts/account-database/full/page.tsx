import React from "react";
import AccountDatabase from "./account-database";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
import { AccountDataType } from "@/types";
import Loading from "./loading";

import { storage } from "@/config/data-storage";

async function getDataFull() {
  const url = `${siteConfig.url}/api/accountDatabase`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  const accountData = await response.json();

  const formattedData = accountData.map(async (record) => {
    let productData: any = null;
    let topPostsData: any = null;

    if (record.product) {
      const productResponse = await fetch(
        `${siteConfig.url}/api/view-product/${record.product}`,
        {
          cache: "no-store",
        }
      );
      productData = await productResponse.json();
    }

    if (record.topPosts && record.topPosts.length) {
      const filteredPost = record?.topPosts.filter(
        (post: any) => post !== null
      );

      const topPosts = filteredPost.map(async (post: any) => {
        if (!post) return;
        const postRes = await fetch(`${siteConfig.url}/api/post/${post}`, {
          cache: "no-store",
        });
        const postData = await postRes.json();

        return {
          ...postData,
          author: {
            avatar: record.avatar,
            id: record.id,
            secUid: record.secUid,
            uniqueId: record.uniqueId,
            nickname: record.userInfo?.user?.nickname,
          },
        };
      });
      topPostsData = await Promise.all(topPosts);
    }

    return {
      accountStats: record.accountStats,
      followerCount: record.accountStats[0]?.followerCount,
      likeCount: record.accountStats[0]?.heartCount,
      postCount: record.accountStats[0]?.videoCount,
      daysTracked: record.accountStats.length,
      nickname: record.userInfo?.user?.nickname,
      // mostViews: (topPostsData && topPostsData[0].postData.playCount) || 0,
      mostViews: 0,
      avatar: record.avatar,
      id: record.id,
      product: productData,
      secUid: record.secUid,
      storeUrl: record.storeUrl,
      topPosts: topPostsData,
      uniqueId: record.uniqueId,
      userInfo: record.userInfo,
    };
  });

  const data = await Promise.all(formattedData);

  if (!response.ok) {
    throw new Error(`Failed to fetch data ${response.text}`);
  }
  return data;
}

async function getData() {
  const url = `${siteConfig.url}/api/accountDatabase`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data ${response.text}`);
  }
  return response.json();
}

// async function getData(
//   initialUrl: string,
//   startAfter?: string
// ): Promise<any[]> {
//   // Construct URL with optional startAfter parameter
//   const url = startAfter
//     ? `${initialUrl}?startAfter=${startAfter}`
//     : initialUrl;
//   console.log("url", url);

//   const response = await fetch(url, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch data: ${response.statusText}`);
//   }

//   const fetchedData = await response.json();

//   console.log(
//     "response",
//     fetchedData?.results?.length,
//     fetchedData?.nextStartAfter
//   );

//   // If there is a next page
//   if (fetchedData.nextStartAfter) {
//     // Recursively fetch the next page
//     const nextPageData = await getData(initialUrl, fetchedData.nextStartAfter);

//     // Combine this page's data with the next page's data
//     return [...fetchedData.results, ...nextPageData];
//   }

//   // If there is no next page, return this page's data
//   return fetchedData.results;
// }

export default async function AccountDataBase() {
  // const url = `${siteConfig.url}/api/accountDatabase`;
  // const data = await getData(url);

  const data = await getData();

  return (
    <>
      <PageHeader
        heading="Account Database"
        tooltip="Browse our collection of over 500 active sellers and 1000+ accounts."
      />
      <div className="w-full border-t ">
        <div className="w-full container  pt-4  flex flex-col min-h-screen items-center  ">
          <AccountDatabase data={data} />
        </div>
      </div>
    </>
  );
}

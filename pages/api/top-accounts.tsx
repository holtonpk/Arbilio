import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { collection, query, getDocs } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const collectionRef = collection(db, "tiktokAccounts");
  const q = query(collectionRef);
  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();

    return {
      recordId: record.id,
      id: record.userInfo.user?.id,
      uniqueId: record.uniqueId,
      nickname: record.userInfo.user?.nickname,
      accountStats: record.accountStats,
      avatar: record.avatar,
    };
  });

  const data = await Promise.all(formattedData);

  //   const accountData = await getData();

  // const configData = (account: any, field: string) => {
  //   try {
  //     // find the most recent data point

  //     const orderedData = account.accountStats.sort((a: any, b: any) => {
  //       return a.dataCollectionTime - b.dataCollectionTime;
  //     });

  //     const mostRecentData = orderedData[orderedData.length - 1];
  //     const oldestData = orderedData[0];

  //     const percentChange =
  //       Math.round(
  //         ((mostRecentData[field] - oldestData[field]) / oldestData[field]) *
  //           100 *
  //           100
  //       ) / 100;

  //     //   const percentChange =
  //     //     Math.round(
  //     //       ((account.accountStats[0][field] -
  //     //         findRelevantData(account.accountStats)?.[field]) /
  //     //         findRelevantData(account.accountStats)?.[field]) *
  //     //         100 *
  //     //         100
  //     //     ) / 100;

  //     if (Number.isNaN(percentChange)) {
  //       return {
  //         percentChange: 0,
  //         value: 0,
  //         increase: 0,
  //       };
  //     }

  //     return {
  //       percentChange: percentChange,
  //       value: mostRecentData[field],
  //       increase: mostRecentData[field] - oldestData[field],
  //       // value: account.accountStats[0][field],
  //       // increase:
  //       //   account.accountStats[0][field] -
  //       //   findRelevantData(account.accountStats)?.[field],
  //     };
  //   } catch (e) {
  //     return {
  //       percentChange: 0,
  //       value: 0,
  //       increase: 0,
  //     };
  //   }
  // };
  // interface Data {
  //   [key: string]: any;
  // }

  // // const findRelevantData = (accountStats: any) => {
  // //   const targetDate = new Date();
  // //   if (timeSpan) {
  // //     targetDate.setDate(targetDate.getDate() - timeSpan);

  // //     const data = accountStats?.find((stat: any) => {
  // //       const date = new Date(stat.dataCollectionTime);
  // //       return (
  // //         date.getFullYear() === targetDate.getFullYear() &&
  // //         date.getMonth() === targetDate.getMonth() &&
  // //         date.getDate() === targetDate.getDate()
  // //       );
  // //     });

  // //     return data;
  // //   }
  // // };

  // const data = accountData.map((account: any) => {
  //   const followers = configData(account, "followerCount");
  //   const likes = configData(account, "heartCount");
  //   const posts = configData(account, "videoCount");
  //   return {
  //     nickname: account.nickname,
  //     recordId: account.recordId,
  //     uniqueId: account.uniqueId,
  //     avatar: account.avatar,
  //     followers,
  //     likes,
  //     posts,
  //   };
  // });

  // function sortByFieldDescending(data: Data[]): Data[] {
  //   return data.sort((a, b) => b[field].percentChange - a[field].percentChange);
  // }

  res.status(200).json(data);
}

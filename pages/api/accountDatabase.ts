import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  where,
} from "firebase/firestore";
import { AccountDataType } from "@/types";
import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountDataType[]>
) {
  const q = query(collection(db, storage.accounts));

  const docs = await getDocs(q);
  const filteredDocs = docs.docs
    .map((doc) => doc.data())
    // Filter the documents on the client side
    .filter(
      (doc) =>
        doc.userInfo != null &&
        doc.userInfo !== null &&
        doc.userInfo !== "" &&
        doc.accountStats != null &&
        doc.accountStats !== null &&
        doc.accountStats !== "" &&
        doc.product != null &&
        doc.product !== null &&
        doc.product !== "" &&
        doc.topPosts != null &&
        doc.topPosts !== null &&
        doc.topPosts.length !== 0
    );

  const formattedData = filteredDocs.map(async (record) => {
    let productData = null;
    let topPostsData = null;

    if (record.product) {
      const productRef = doc(db, storage.products, record.product);
      const productInfo = await getDoc(productRef);
      productData = productInfo.data();
    }

    if (record.topPosts && record.topPosts.length) {
      const filteredPost = record?.topPosts.filter(
        (post: any) => post !== null
      );

      const topPosts = filteredPost.map(async (post: any) => {
        if (!post) return;
        const postRef = doc(db, storage.posts, post);
        const postData = await getDoc(postRef);
        return {
          ...postData.data(),
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
      mostViews: (topPostsData && topPostsData[0].postData.playCount) || 0,
      avatar: record.avatar,
      id: record.id,
      product: productData || record.product,
      secUid: record.secUid,
      storeUrl: record.storeUrl,
      topPosts: topPostsData,
      uniqueId: record.uniqueId,
      userInfo: record.userInfo,
    };
  });

  const data = (await Promise.all(formattedData)) as AccountDataType[];

  res.status(200).json(data);
}

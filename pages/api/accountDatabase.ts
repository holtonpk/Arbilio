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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountDataType[]>
) {
  const collectionRef = collection(db, "tiktok-accounts");
  const q = query(collectionRef, limit(12), where("topPosts", "!=", []));
  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();

    let productData = null;
    let topPostsData = null;

    if (record.product) {
      const productRef = doc(db, "tiktokProducts", record.product);
      const productInfo = await getDoc(productRef);
      productData = productInfo.data();
    }

    if (record.topPosts && record.topPosts.length) {
      const topPosts = record?.topPosts.map(async (post: any) => {
        const postRef = doc(db, "tiktok-posts", post);
        const postData = await getDoc(postRef);
        return postData.data();
      });
      topPostsData = await Promise.all(topPosts);
    }

    return {
      accountStats: record.accountStats,
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

  const data = (await Promise.all(formattedData)) as AccountDataType[];

  res.status(200).json(data);
}

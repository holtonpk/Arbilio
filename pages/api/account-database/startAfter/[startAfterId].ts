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
  startAt,
} from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const startAfter = req.query.startAfterId as string;

  const collectionRef = collection(db, "tiktok-accounts");

  let q;

  const startAfterDoc = doc(db, "tiktok-accounts", startAfter);

  const startAfterSnapshot = await getDoc(startAfterDoc);

  q = query(
    collectionRef,
    where("topPosts", "!=", []),
    limit(12),
    startAt(startAfterSnapshot)
  );

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
      secUid: record.userInfo.user.secUid,
      storeUrl: record.storeUrl,
      topPosts: topPostsData,
      uniqueId: record.uniqueId,
      userInfo: record.userInfo,
    };
  });

  const data = await Promise.all(formattedData);

  res.status(200).json(data);
}

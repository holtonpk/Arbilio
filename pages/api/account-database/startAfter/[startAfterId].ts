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
  orderBy,
} from "firebase/firestore";
import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const startAfter = req.query.startAfterId as string;

  const collectionRef = collection(db, storage.accounts);

  let q;

  const startAfterDoc = doc(db, storage.accounts, startAfter);

  const startAfterSnapshot = await getDoc(startAfterDoc);

  q = query(
    collectionRef,
    where("topPosts", "!=", []),
    limit(12),
    // orderBy("accountStatsLength", "desc"),
    startAt(startAfterSnapshot)
  );

  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();

    let productData = null;
    let topPostsData = null;

    if (record.product) {
      const productRef = doc(db, storage.products, record.product);
      const productInfo = await getDoc(productRef);
      productData = productInfo.data();
    }

    if (record.topPosts && record.topPosts.length) {
      const topPosts = record?.topPosts.map(async (post: any) => {
        const postRef = doc(db, storage.posts, post);
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

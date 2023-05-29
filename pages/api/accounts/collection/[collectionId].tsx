import type { NextApiRequest, NextApiResponse } from "next";
import { CollectionType } from "@/types";
import { app } from "@/firebase";
import { siteConfig } from "@/config/site";
import { AccountCollectionData } from "@/types";
import { db } from "@/context/Auth";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  where,
  orderBy,
} from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountCollectionData>
) {
  const collectionId = req.query.collectionId as string;

  const collectionRef = doc(db, "accountCollections", collectionId);
  const collectionSnap = await getDoc(collectionRef);
  const accountCollection = collectionSnap.data() as CollectionType;
  const q = query(
    collection(db, "tiktok-accounts"),
    where("id", "in", accountCollection.ids)
  );

  const accountsSnap = await getDocs(q);
  const formattedData = accountsSnap.docs.map(async (_doc) => {
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

  const data = (await Promise.all(
    formattedData
  )) as AccountCollectionData["accounts"];

  res.status(200).json({ collection: accountCollection, accounts: data });
}
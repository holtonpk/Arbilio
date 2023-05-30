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
  const collectionRef = collection(db, storage.accounts);
  const q = query(collectionRef, where("topPosts", "!=", []), limit(40));
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

    if (
      record.topPosts &&
      record.topPosts.length &&
      !record.topPosts.includes(null)
    ) {
      const topPosts = record?.topPosts.map(async (post: any) => {
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

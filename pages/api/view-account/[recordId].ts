import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const recordId = req.query.recordId as string;

  const document = await getDoc(doc(db, "tiktok-accounts", recordId));
  const record = document.data();

  let productData = undefined;
  let topPostsData = undefined;

  if (record?.product) {
    const productRef = doc(db, "tiktokProducts", record?.product);
    const productInfo = await getDoc(productRef);
    if (productInfo.data()) productData = productInfo.data() as any;
  }

  if (record?.topPosts) {
    const topPosts = record?.topPosts.map(async (post: any) => {
      const postRef = doc(db, "tiktok-posts", post);
      const postData = await getDoc(postRef);
      return postData.data();
    });
    topPostsData = await Promise.all(topPosts);
  }
  const data = {
    accountStats: record?.accountStats,
    avatar: record?.avatar,
    id: record?.id,
    product: productData,
    secUid: record?.userInfo.user.secUid,
    storeUrl: record?.storeUrl,
    topPosts: topPostsData,
    uniqueId: record?.uniqueId,
    userInfo: record?.userInfo,
  };

  res.status(200).json(data);
}

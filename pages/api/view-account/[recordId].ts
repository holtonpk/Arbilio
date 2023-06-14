import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/user-auth";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const recordId = req.query.recordId as string;

  const document = await getDoc(doc(db, storage.accounts, recordId));
  const record = document.data();

  // let productData = undefined;
  // let topPostsData = undefined;

  // if (record?.product) {
  //   const productRef = doc(db, storage.products, record?.product);
  //   const productInfo = await getDoc(productRef);
  //   if (productInfo.data()) productData = productInfo.data() as any;
  // }

  // if (record?.topPosts) {
  //   const topPosts = record?.topPosts.map(async (post: any) => {
  //     if (!post) return;
  //     const postRef = doc(db, storage.posts, post);
  //     const postData = await getDoc(postRef);
  //     return {
  //       ...postData.data(),
  //       author: {
  //         avatar: record.avatar,
  //         id: record.id,
  //         secUid: record.secUid,
  //         uniqueId: record.uniqueId,
  //         nickname: record.userInfo?.user?.nickname,
  //       },
  //     };
  //   });
  //   topPostsData = await Promise.all(topPosts);
  // }
  const data = {
    accountStats: record?.accountStats,
    avatar: record?.avatar,
    id: record?.id,
    product: record?.product,
    secUid: record?.secUid,
    storeUrl: record?.storeUrl,
    topPosts: record?.topPosts,
    uniqueId: record?.uniqueId,
    userInfo: record?.userInfo,
  };

  res.status(200).json(data);
}

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

  let productData: any = null;
  let topPostsData: any = null;

  if (record?.product) {
    const productRef = doc(db, storage.products, record?.product);
    const productInfo = await getDoc(productRef);
    productData = productInfo.data();
  }

  if (record?.topPosts) {
    const topPosts = record?.topPosts.map(async (post: any) => {
      const postRef = doc(db, storage.posts, post);
      const postData = await getDoc(postRef);
      return postData.data();
    });
    topPostsData = await Promise.all(topPosts);
  }
  const data = {
    recordId: record?.id,
    id: record?.userInfo.user?.id,
    uniqueId: record?.uniqueId,
    nickname: record?.userInfo.user?.nickname,
    accountStats: record?.accountStats,
    stats: {
      likes: record?.userInfo.stats.heartCount,
      followers: record?.userInfo.stats.followerCount,
      following: record?.userInfo.stats.followingCount,
      posts: record?.userInfo.stats.videoCount,
    },
    avatar: record?.avatar,
    secUid: record?.userInfo.user.secUid,
    bio: record?.userInfo.user.signature,
    bioLink: record?.userInfo.user.bioLink?.link
      ? record?.userInfo.user.bioLink.link
      : null,
    userInfo: record?.userInfo,
    posts: record?.posts,
    topPosts: topPostsData,
    product: productData,
  };

  res.status(200).json({ data: data });
}

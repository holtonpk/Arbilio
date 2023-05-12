import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  getDoc,
} from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const collectionRef = collection(db, "tiktokAccounts");
  const q = query(collectionRef, limit(5));
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

    if (record.topPosts) {
      const topPosts = record.topPosts.map(async (post: any) => {
        const postRef = doc(db, "tiktokPosts", post);
        const postData = await getDoc(postRef);
        return postData.data();
      });
      topPostsData = await Promise.all(topPosts);
    }
    return {
      recordId: record.id,
      id: record.userInfo.user?.id,
      uniqueId: record.uniqueId,
      nickname: record.userInfo.user?.nickname,
      stats: {
        likes: record.userInfo.stats.heartCount,
        followers: record.userInfo.stats.followerCount,
        following: record.userInfo.stats.followingCount,
        posts: record.userInfo.stats.videoCount,
      },
      avatar: record.avatar,
      secUid: record.userInfo.user.secUid,
      bio: record.userInfo.user.signature,
      bioLink: record.userInfo.user.bioLink?.link
        ? record.userInfo.user.bioLink.link
        : null,
      userInfo: record.userInfo,
      posts: record.posts,
      topPosts: topPostsData,
      product: productData,
    };
  });

  const data = await Promise.all(formattedData);

  res.status(200).json(data);
}

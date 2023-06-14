import type { NextApiRequest, NextApiResponse } from "next";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  where,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db } from "@/context/user-auth";
import { storage } from "@/config/data-storage";

import { PostType } from "@/types";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType | Error>
) {
  const id = req.query.id as string;

  const postRef = doc(db, storage.posts, id);
  const postData = await getDoc(postRef);
  const record = postData.data();
  if (!record) return res.status(404).json({ message: "Post not found" });
  const data = {
    ...postData.data(),
    // author: {
    //   avatar: record.avatar,
    //   id: record.id,
    //   secUid: record.secUid,
    //   uniqueId: record.uniqueId,
    //   nickname: record.userInfo?.user?.nickname,
    // },
  };

  return res.status(200).json(data as PostType);
}

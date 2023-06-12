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
import { db } from "@/context/Auth";
import { storage } from "@/config/data-storage";

import { PostType } from "@/types";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const uniqueId = req.query.uniqueId as string;

  const q = query(
    collection(db, storage.accounts),
    where("uniqueId", ">=", uniqueId),
    where("uniqueId", "<=", uniqueId + "\uf8ff")
  );

  const docs = await getDocs(q);
  const filteredDocs = docs.docs.map(async (doc) => {
    return {
      id: doc.data().id,
      avatar: doc.data().avatar,
      uniqueId: doc.data().uniqueId,
      nickname: doc.data().userInfo?.user?.nickname,
      accountStats: doc.data().accountStats,
    };
  });
  const data = await Promise.all(filteredDocs);

  return res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/user-auth";
import { collection, query, getDocs, where } from "firebase/firestore";
import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const collectionRef = collection(db, storage.accounts);
  const q = query(collectionRef, where("userInfo", "!=", null));
  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();

    return {
      id: record.id,
      uniqueId: record.uniqueId,
      nickname: record.userInfo?.user?.nickname,
      accountStats: record.accountStats,
      avatar: record.avatar,
    };
  });

  const data = await Promise.all(formattedData);
  res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { collection, query, getDocs } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const collectionRef = collection(db, "tiktokAccounts");
  const q = query(collectionRef);
  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();

    return {
      recordId: record.id,
      id: record.userInfo.user?.id,
      uniqueId: record.uniqueId,
      nickname: record.userInfo.user?.nickname,
      accountStats: record.accountStats,
      avatar: record.avatar,
    };
  });

  const data = await Promise.all(formattedData);
  res.status(200).json(data);
}

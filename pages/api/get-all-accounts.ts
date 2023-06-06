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
  res: NextApiResponse<any[]>
) {
  //   const q = query(
  //     collection(db, storage.accounts),
  //     where("userInfo", "!=", null),
  //     limit(5)
  //   );
  //   const docs = await getDocs(q);

  //   const formattedData = docs.docs.map(async (_doc) => {
  //     const record = _doc.data();
  //     return {
  //       id: record.id,
  //     };
  //   });

  //   const data = (await Promise.all(formattedData)) as AccountDataType[];
  const data = [
    { id: "7208887380605699077" },
    { id: "7211952463829795882" },
    { id: "7167278845606462465" },
    { id: "7206197740939756590" },
  ];

  res.status(200).json(data);
}

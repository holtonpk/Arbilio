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
  const q = query(
    collection(db, storage.accounts),
    where("userInfo", "!=", null),
    limit(5)
  );
  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();
    return {
      id: record.id,
    };
  });

  const data = (await Promise.all(formattedData)) as AccountDataType[];

  res.status(200).json(data);
}

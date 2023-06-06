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

import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const q = query(
    collection(db, storage.accounts),
    where("userInfo", "!=", null)
  );
  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();
    return {
      id: record.id,
    };
  });

  const data = (await Promise.all(formattedData)) as any[];
  res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/user-auth";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = req.query.id as string;

  const document = await getDoc(doc(db, storage.products, id));
  const record = document.data();

  res.status(200).json(record);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = req.query.id as string;

  const document = await getDoc(doc(db, "tiktokProducts", id));
  const record = document.data();

  res.status(200).json(record);
}

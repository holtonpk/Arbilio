import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { collection, getDocs, limit, query } from "firebase/firestore";

interface ResponseData {
  data: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const collectionRef = collection(db, "tiktokProducts");
  const q = query(collectionRef, limit(12));
  const docs = await getDocs(q);
  const formattedData = docs.docs.map(async (doc) => {
    return doc.data();
  });

  // const formattedData = docs.docs.map(async (doc) => {
  //   const docData = doc.data();

  //   const q = query(
  //     collection(db, "tiktokAccounts"),
  //     where("product", "==", docData.id)
  //   );
  //   const sellers = await getDocs(q);
  //   const sellersData = sellers.docs.map((seller) => {
  //     return seller.data().id;
  //   });

  //   return {
  //     ...docData,
  //     sellers: sellersData,
  //   };
  // });

  const data = await Promise.all(formattedData);

  res.status(200).json({ data });
}

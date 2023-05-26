import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { ProductDataBaseType, AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
interface ResponseData {
  data: ProductDataBaseType[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const collectionRef = collection(db, "tiktokProducts");
  const q = query(collectionRef, limit(10));
  const docs = await getDocs(q);
  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();
    const accountDataRes = await fetch(
      `${siteConfig.url}/api/get-product-accounts/${record.id}`,
      {
        cache: "no-cache",
      }
    );
    const accountData: AccountDataType[] = await accountDataRes.json();

    return {
      ...record,
      accounts: accountData,
    };
  });

  const data = (await Promise.all(formattedData)) as ProductDataBaseType[];

  res.status(200).json({ data });
}

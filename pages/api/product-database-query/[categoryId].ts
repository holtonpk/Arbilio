import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { ProductDataBaseType, AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import categories from "@/a.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductDataBaseType[]>
) {
  const categoryId = req.query.categoryId as any;

  // find category with id equal to categoryId and return the ids
  const category = categories.find((category) => category.id === categoryId);
  const ids = category?.ids;

  const collectionRef = collection(db, "tiktokProducts");
  const q = query(collectionRef, limit(5), where("id", "in", ids));
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

  res.status(200).json(data);
}

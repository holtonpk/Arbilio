import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/user-auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { AccountDataType, ProductDataBaseType, ProductType } from "@/types";
import { siteConfig } from "@/config/site";
import categories from "@/categories.json";
import { storage } from "@/config/data-storage";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductType[]>
) {
  const categoryId = req.query.categoryId as any;

  const collectionRef = collection(db, storage.products);
  const q = query(collectionRef, where("category", "==", categoryId));
  const docs = await getDocs(q);
  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data() as ProductType;
    const accountDataRes = await fetch(
      `${siteConfig.url}/api/get-product-accounts/${record.id}`,
      {
        cache: "no-cache",
      }
    );
    const accountData: AccountDataType[] = await accountDataRes.json();
    return {
      ...record,
      accountsData: accountData,
    };
  });

  const data = (await Promise.all(formattedData)) as ProductType[];

  res.status(200).json(data);
}

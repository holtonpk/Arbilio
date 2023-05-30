import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/Auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { ProductDataBaseType, AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import { storage } from "@/config/data-storage";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductDataBaseType[]>
) {
  const collectionRef = collection(db, storage.products);
  const q = query(collectionRef);
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
    // const r = {
    //   id: record.id,
    //   title: record.supplierInfo?.supplierTitle || "",
    // };
    // return r;

    return {
      ...record,
      accounts: accountData,
    };
  });

  const data = (await Promise.all(formattedData)) as ProductDataBaseType[];

  res.status(200).json(data);
}

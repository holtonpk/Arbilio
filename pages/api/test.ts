import type { NextApiRequest, NextApiResponse } from "next";
import { siteConfig } from "@/config/site";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const res2 = await fetch(`${siteConfig.url}/api/get-all-accounts`);
  const data2 = await res2.json();

  const ids = data2.map((item: any) => ({
    id: item.id,
  }));

  const d = ids.map(async (id: any) => {
    const res = await fetch(`${siteConfig.url}/api/view-account/${id.id}`);
    const data = await res.json();
    return data;
  });

  const data = await Promise.all(d);

  res.status(200).json(data);
}

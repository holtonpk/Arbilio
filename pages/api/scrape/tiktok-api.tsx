import type { NextApiRequest, NextApiResponse } from "next";
import TikAPI from "tikapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dailyCredits = 300;
  const api = TikAPI(process.env.NEXT_PUBLIC_TIKTOK_API_KEY);

  let response = await api.key();

  const data = (await response.json.logs_count) as number;

  res.status(200).json(300 - data);
}

import type { NextApiRequest, NextApiResponse } from "next";
import TikAPI from "tikapi";

type TiktokData = {};

type ResponseData = {
  data: TiktokData[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let dataArray: TiktokData[] = [];

  const { secUid }: any = req.query;
  const api = TikAPI(process.env.NEXT_PUBLIC_TIKTOK_API_KEY);

  let response = await api.public.posts({
    secUid: secUid,
  });

  const data = await response.json.itemList;

  res.status(200).json(data);
}

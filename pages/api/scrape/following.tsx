import type { NextApiRequest, NextApiResponse } from "next";
import TikAPI from "tikapi";

const api = TikAPI(process.env.NEXT_PUBLIC_TIKTOK_API_KEY);

type ResponseData = {
  data: any[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let dataArray: any[] = [];

  try {
    let response = await api.public.followingList({
      secUid:
        "MS4wLjABAAAA_ediw4RGtPq0GdtV3QcxqsLvGvIKfTwjUKnntFBH8vk6VwIomHhvcrP-ORvRWjLr",
    });

    while (response && response.nextItems) {
      dataArray.push(response?.json);

      let nextCursor = response?.json?.nextCursor;

      response = await Promise.resolve(response?.nextItems());
    }
    const data = await dataArray.flatMap((item: any) => {
      return item.userList;
    });

    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: [], message: `Error: ${err}` });
  }
}

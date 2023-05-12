import TikAPI from "tikapi";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const uniqueId = req.query.uniqueId as string;
  const api = TikAPI(process.env.NEXT_PUBLIC_TIKTOK_API_KEY);

  try {
    let response = await api.public.check({
      username: uniqueId,
    });

    const data = await response;
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error during API request:", error);

    // Customize the error message or status code as needed
    res.status(500).json({ message: error?.statusText });
  }
}

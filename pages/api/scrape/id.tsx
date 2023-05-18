import type { NextApiRequest, NextApiResponse } from "next";
import TikAPI from "tikapi";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const api = TikAPI(process.env.NEXT_PUBLIC_TIKTOK_API_KEY);

  try {
    let response = await api.public.posts({
      secUid:
        "MS4wLjABAAAAog9WOLPXFNlwN5plc3gMztZVNZ1LBhlWV825tndTJuwndB3cObKgkqOFHt17yXzQ",
    });

    const data = await response;
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error during API request:", error);

    // Customize the error message or status code as needed
    res.status(500).json({ message: error?.statusText });
  }
}

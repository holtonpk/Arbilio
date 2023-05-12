import type { NextApiRequest, NextApiResponse } from "next";

// Scaping TikTok account data
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { uniqueId } = req.query;
  const response = await fetch("https://scraper-api.smartproxy.com/v1/scrape", {
    method: "POST",
    body: JSON.stringify({
      target: "tiktok_profile",
      url: `https://www.tiktok.com/@${uniqueId}`,
      locale: "en",
      geo: "United States",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic UzAwMDAxMDE2MDQ6RGNzZDEyMzQ1",
    },
  }).catch((error) => console.log(error));
  const data = await response?.json();
  res.status(200).json(data.data.content);
}

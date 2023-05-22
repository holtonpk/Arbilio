import type { NextApiRequest, NextApiResponse } from "next";

// Scaping TikTok account data
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { uniqueId, postId }: any = req.query;
  const response = await fetch("https://scraper-api.smartproxy.com/v1/scrape", {
    method: "POST",
    body: JSON.stringify({
      target: "tiktok_post",
      url: `https://www.tiktok.com/@${uniqueId}/video/${postId}?lang=en`,
      locale: "en",
      geo: "United States",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic UzAwMDAxMDE2MDQ6RGNzZDEyMzQ1",
    },
  }).catch((error) => console.log(error));
  const rawData = await response?.json();

  const formattedData = {
    postInfo: rawData.data.content.postInfo,
    video: rawData.data.content.rawJsons.sigiState.ItemModule[postId].video,
  };
  res.status(200).json(formattedData);
}

// const scrape = require("aliexpress-product-scraper");
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;
  // const product = scrape(id);

  // const data = await product;

  res.status(200).json({ data: "data" });
}

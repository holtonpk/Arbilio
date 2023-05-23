import type { NextApiRequest, NextApiResponse } from "next";

const { Configuration, OpenAIApi } = require("openai");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });

  res.status(200).json(response.data);
}

// pages/api/tasks.js

import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { taskSchema } from "@/components/account-table/data/schema";

export default async function handler(req, res) {
  try {
    const filePath = path.join(
      process.cwd(),
      "/components/account-table/data/tasks.json"
    );
    const data = await fs.readFile(filePath, "utf8");
    const tasks = JSON.parse(data);
    const validTasks = z.array(taskSchema).parse(tasks);
    res.status(200).json(validTasks);
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
}

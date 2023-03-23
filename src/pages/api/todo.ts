import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function todo(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    fs.writeFileSync("./public/todoList.json", req.body);

    return res.status(200).json({});
  }

  const memoFile = await fs.readFileSync(`./public/todoList.json`, {
    encoding: "utf8",
  });

  return res.status(200).json({ memoFile: JSON.parse(memoFile) });
}

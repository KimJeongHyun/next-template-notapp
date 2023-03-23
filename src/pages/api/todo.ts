import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function todo(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST" && req.body !== undefined) {
    const { data, type } = JSON.parse(req.body);

    if (type === "EACH") {
      const {
        data: { id },
      } = JSON.parse(req.body);

      const todoList = await fs.readFileSync(`./public/todoList.json`, {
        encoding: "utf8",
      });

      return res.status(200).json(JSON.parse(todoList)[id - 1]);
    }

    if (type === "REG") {
      fs.writeFileSync("./public/todoList.json", JSON.stringify(data));

      return res.status(200).json({});
    }

    if (type === "DEL") {
      const todoList = await fs.readFileSync(`./public/todoList.json`, {
        encoding: "utf8",
      });

      const result = JSON.parse(todoList).filter(
        (i: any) => i.id !== Number(data.id)
      );

      fs.writeFileSync("./public/todoList.json", JSON.stringify(result));

      return res.status(200).json({});
    }

    if (type === "EDIT") {
      const todoList = await fs.readFileSync(`./public/todoList.json`, {
        encoding: "utf8",
      });

      const cloneList = JSON.parse(todoList);

      const {
        data: { id, ...rest },
      } = JSON.parse(req.body);

      const updateIdx = cloneList.findIndex!((i: any) => id === i.id);

      cloneList[updateIdx] = { id, ...rest };

      fs.writeFileSync("./public/todoList.json", JSON.stringify(cloneList));

      return res.status(200).json({});
    }
  }

  const todoList = await fs.readFileSync(`./public/todoList.json`, {
    encoding: "utf8",
  });

  return res.status(200).json(JSON.parse(todoList));
}

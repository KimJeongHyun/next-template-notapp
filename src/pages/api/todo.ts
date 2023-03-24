import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

/**
 * @description http://domainUrl/api/todo 로컬 API를 / 처리로 컨트롤러 역할을 해주는지 몰라서.. 일단 이렇게 구현한다.
 * @param req.type EACH : 개별 조회 || REG : 단건 등록 || DEL : 단건 삭제 || EDIT : 단건 수정
 * @param req 기본 XHR 통신 요청 객체를 의미
 * @param res 클라이언트에 넘겨줄 응답 객체를 의미한다.
 *
 *
 * @returns 케이스에 따른 res.status를 보내준다.
 */

export default async function todo(req: NextApiRequest, res: NextApiResponse) {
  // POST이고, body에 뭔가가 있다면 아래의 명세를 따른다.
  if (req.method === "POST" && req.body !== undefined) {
    const { data, type } = JSON.parse(req.body); // 전달받은 JSON string 객체를 파싱해서 object 형태로 만든다.

    if (type === "EACH") {
      // 단건 조회
      // data : { id }
      const {
        id, // 단건 조회는 해당 건의 id만 body에 포함한다.
      } = data;

      const todoList = await fs.readFileSync(`./public/todoList.json`, {
        encoding: "utf8",
      });

      const result = JSON.parse(todoList).find!(
        (i: any) => Number(i.id) === Number(id)
      );

      // readFile도 가능하긴한데, await readFile이 간헐적으로 잘 안 먹는 이슈가 있어서 readFileSync를 썼다.
      // 한글표현시 응답값이 이상해서 utf8 인코딩을 옵션으로 적용한다.
      // 여기서 읽어들인 파일은 버퍼 자료형으로 읽혀지기 때문에 JSON 파싱으로 object로 변환하고, json 형태로 응답을 내려준다.

      return res.status(200).json(result);
    }

    if (type === "REG") {
      // 단건 등록
      // data : { id, title, content }
      const todoList = await fs.readFileSync(`./public/todoList.json`, {
        encoding: "utf8",
      });

      const result = JSON.parse(todoList);
      result.push(data);
      // 기존 리스트에 전달받은 데이터를 붙인다.

      fs.writeFileSync("./public/todoList.json", JSON.stringify(result));

      return res.status(200).json({});
    }

    if (type === "DEL") {
      // 단건 삭제
      // data : { id }

      const { id } = data;

      const todoList = await fs.readFileSync(`./public/todoList.json`, {
        encoding: "utf8",
      });

      const result = JSON.parse(todoList).filter(
        (i: any) => Number(i.id) !== Number(id)
      );
      // 삭제할 id를 제외한 메모만 빼내어 파일에 쓴다.

      fs.writeFileSync("./public/todoList.json", JSON.stringify(result));

      return res.status(200).json({});
    }

    if (type === "EDIT") {
      // 단건 수정
      // data : { id, title, content}

      const todoList = await fs.readFileSync(`./public/todoList.json`, {
        encoding: "utf8",
      });

      const cloneList = JSON.parse(todoList);
      const { id, ...rest } = data;

      const updateIdx = cloneList.findIndex!((i: any) => id === i.id);
      cloneList[updateIdx] = { id, ...rest };
      // 미리 전체 리스트를 당겨온 뒤, 사본을 만든다.
      // 수정 데이터의 인덱스는 이미 존재하는 id를 전달받기 때문에 없을 수 없으므로 !로 처리한다.
      // sql이었으면 단건 update 쿼리를 돌릴 수 있겠지만... 로컬 json은 이렇게 할 수 밖에..

      fs.writeFileSync("./public/todoList.json", JSON.stringify(cloneList));

      return res.status(200).json({});
    }
  }

  // GET. 전체 리스트 조회에 해당한다.

  try {
    const todoList = await fs.readFileSync(`./public/todoList.json`, {
      encoding: "utf8",
    });

    return res.status(200).json(JSON.parse(todoList));
  } catch (err: any) {
    let newTodoList = JSON.stringify([]);
    if (err.code === "ENOENT") {
      fs.writeFileSync("./public/todoList.json", newTodoList);
    }

    return res.status(200).json(JSON.parse(newTodoList));
  }
  // 파일이 있다면 try 절에서 파일 값을 object로 파싱해서 넘긴다.
  // 파일이 없다면 생성한 뒤 빈 배열을 넘긴다.
}

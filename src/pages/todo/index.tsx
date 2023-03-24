import { useEffect } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";

import { OpacityComponent } from "@/components";

import { GetStaticProps, GetStaticPropsContext } from "next";
import { SERVER_URL } from "@/env";
import { CommonBtn } from "@/styles/commonStyled";

// 정적 페이지를 생성하는 next.js의 api.
// 페이지를 이동할 때 미리 getStaticProps에서 선언된 동작을 선 수행한 뒤 Client component에 props를 전달한다.

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const res = await fetch(`${SERVER_URL}/todo`, { method: "GET" });
  const todoList = await res.json();
  return {
    props: {
      todoList,
    },
  };
};

export interface ITodoList {
  id: number;
  title: string;
  content: string;
}
export default function Todo({ todoList }: { todoList: ITodoList[] }) {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.page && todoList.length > 0) {
      router.push(`?page=0`);
    }
  }, [router, todoList]);

  const handleTodoIdx = ({ type }: { type: "L" | "R" }) => {
    router.push(
      `/todo?page=${
        type === "L"
          ? Number(router.query.page) - 1
          : Number(router.query.page) + 1
      }`
    );
  };

  const viewTodo = ({ id }: { id: number }) => {
    router.push(`/todo/${id}`);
  };

  return (
    <TodoContainer>
      {todoList.length === 0 ? (
        <OpacityComponent
          content={[
            "등록된 메모가 없습니다.",
            "등록버튼을 눌러 메모를 등록해주세요!",
          ]}
          forwardInfo={{
            label: "등록",
            value: "/todo/register",
          }}
          backInfo={{
            label: "돌아가기",
            value: "/",
          }}
        />
      ) : (
        <>
          <TodoTableContainer>
            <TodoTable todoIdx={Number(router.query.page)}>
              {todoList.map((i, idx) => (
                <Todos key={i.id} onClick={() => viewTodo({ id: i.id })}>
                  {i.title}
                </Todos>
              ))}
            </TodoTable>
          </TodoTableContainer>
          <TodoIdxBar>
            <TodoIdxArrow
              isDisabled={Number(router.query.page) === 0}
              onClick={() => handleTodoIdx({ type: "L" })}
            >
              {"<"}
            </TodoIdxArrow>
            {Number(router.query.page) + 1}번 메모
            <TodoIdxArrow
              isDisabled={Number(router.query.page) + 1 === todoList.length}
              onClick={() => handleTodoIdx({ type: "R" })}
            >
              {">"}
            </TodoIdxArrow>
          </TodoIdxBar>

          <TodoBtnBar>
            <CommonBtn
              btnColor="#37a9d4"
              onClick={() => router.push("/todo/register")}
            >
              등록
            </CommonBtn>
            <CommonBtn btnColor="#d76363" onClick={() => router.push("/")}>
              홈으로 가기
            </CommonBtn>
          </TodoBtnBar>
        </>
      )}
    </TodoContainer>
  );
}

const TodoContainer = styled.div`
  padding-top: 5%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoTableContainer = styled.div`
  width: 300px;
  flex-basis: 55%;
  overflow: hidden;
  text-align: center;
`;

const TodoTable = styled.div<{ todoIdx: number }>`
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 25px;
  gap: 50px;
  transform: translateX(-${(props) => props.todoIdx * 300}px);
  transition: transform ease 0.5s;
`;

const TodoIdxBar = styled.div`
  width: 250px;
  flex-basis: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoIdxArrow = styled.div<{ isDisabled: boolean }>`
  background: ${(props) => props.theme.reverseBgColor};
  color: ${(props) => props.theme.reverseTextColor};
  padding: 10px;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "initial")};
  border-radius: 10%;
  visibility: ${(props) => (props.isDisabled ? "hidden" : "visible")};
  opacity: ${(props) => (props.isDisabled ? 0 : 1)};
  transition: opacity ease 0.5s, visibility ease 0.5s;
`;

const TodoBtnBar = styled.div`
  align-self: end;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Todos = styled.div`
  width: 250px;
  height: 80%;
  background: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 15px 4px ${(props) => props.theme.shadowColor};
  cursor: pointer;
`;

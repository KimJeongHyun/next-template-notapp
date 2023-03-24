import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useGetTodoRegisterForm } from "@/hooks/todo/";

import styled from "styled-components";

import TodoSrc from "@/assets/images/todo.png";

import { GetStaticProps, GetStaticPropsContext } from "next";
import { SERVER_URL } from "@/env";
import { ITodoList } from "..";
import { CommonBtn } from "@/styles/commonStyled";

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

export default function TodoRegister({ todoList }: { todoList: ITodoList[] }) {
  const router = useRouter();

  const { control } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { title, content } = useGetTodoRegisterForm({ control });

  const onSave = () => {
    if (title.value === "") {
      alert("제목을 채워주세요.");
      return;
    }

    if (content.value === "") {
      alert("내용을 채워주세요.");
      return;
    }
    // const cloneList = todoList;

    // cloneList.push({
    //   id:
    //     todoList.length === 0
    //       ? 1
    //       : Math.max.apply(
    //           null,
    //           todoList.map((i) => i.id)
    //         ) + 1,
    //   title: title.value,
    //   content: content.value,
    // });

    const concatData = {
      id:
        todoList.length === 0
          ? 1
          : Math.max.apply(
              null,
              todoList.map((i) => i.id)
            ) + 1,
      title: title.value,
      content: content.value,
    };

    fetch(`${SERVER_URL}/todo`, {
      method: "POST",
      body: JSON.stringify({
        data: concatData,
        type: "REG",
      }),
    }).then((res) => {
      if (res.status === 200) {
        alert("저장되었습니다!");
        router.push("/todo");
      }
    });
  };

  return (
    <TodoRegisterContainer>
      <TodoRegisterWriteBox>
        <TodoRegisterTitle placeholder="제목을 입력해주세요" {...title} />
        <TodoRegisterContent placeholder="내용을 채워주세요" {...content} />
        <TodoRegisterBar>
          <CommonBtn btnColor="#37a9d4" onClick={() => onSave()}>
            저장
          </CommonBtn>
          <CommonBtn btnColor="#d76363" onClick={() => router.back()}>
            취소
          </CommonBtn>
        </TodoRegisterBar>
      </TodoRegisterWriteBox>
    </TodoRegisterContainer>
  );
}

const TodoRegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${TodoSrc.src});
  background-repeat: no-repeat;
  background-position-x: 50%;
  display: flex;
  justify-content: center;
`;

const TodoRegisterWriteBox = styled.div`
  width: 383px;
  height: 460px;
  padding: 60px 25px 0 25px;
  transform: translateY(13%);
  display: flex;
  flex-direction: column;
`;

const TodoRegisterTitle = styled.input`
  flex-basis: 10%;
  background: transparent;
  border-bottom: 1px solid #777;
`;

const TodoRegisterContent = styled.textarea`
  padding-top: 8px;
  flex-basis: 70%;
  background: transparent;
  border-bottom: 1px solid #777;
  resize: none;
  color: #000;
`;

const TodoRegisterBar = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

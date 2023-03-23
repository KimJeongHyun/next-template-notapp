import { useState, useRef } from "react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useGetTodoRegisterForm } from "@/hooks/todo/";

import styled from "styled-components";

import TodoSrc from "@/assets/images/todo.png";

import { SERVER_URL } from "@/env";
import { ITodoList } from ".";
import { CommonBtn } from "@/styles/commonStyled";

const getEachTodo = ({ id }: { id: number }) => {
  return fetch(`${SERVER_URL}/todo`, {
    method: "POST",
    body: JSON.stringify({ data: { id }, type: "EACH" }),
  });
};

export const getStaticPaths = async () => {
  const res = await fetch(`${SERVER_URL}/todo`);
  const allTodoList: ITodoList[] = await res.json();

  const paths = allTodoList.map((i) => ({
    params: {
      id: i.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const res = await getEachTodo({ id: params.id });

  const todoData = await res.json();

  return {
    props: {
      todoData,
    },
  };
};

export default function TodoView({ todoData }: { todoData: ITodoList }) {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  const {
    control,
    setFocus,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      title: todoData.title,
      content: todoData.content,
    },
  });

  const { title, content } = useGetTodoRegisterForm({ control });

  const refetch = () => {
    getEachTodo({ id: Number(router.query.id) }).then(async (res) => {
      const result = await res.json();
      reset({
        title: result.title,
        content: result.content,
      });
      setEditMode(false);
    });
  };

  const editClick = () => {
    setEditMode(true);
    setFocus("title");
  };

  const onEdit = () => {
    if (isDirty) {
      fetch(`${SERVER_URL}/todo`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            id: router.query.id,
            title: title.value,
            content: content.value,
          },
          type: "EDIT",
        }),
      }).then(() => {
        alert("저장되었습니다.");
        refetch();
      });
    } else {
      alert("변경사항이 없습니다.");
    }
  };

  const onRemove = () => {
    fetch(`${SERVER_URL}/todo`, {
      method: "POST",
      body: JSON.stringify({ data: { id: router.query.id }, type: "DEL" }),
    }).then(() => {
      alert("삭제되었습니다!");
      router.push("/todo");
    });
  };

  const cancelClick = () => {
    if (editMode) {
      setEditMode(false);
      return;
    }

    router.back();
  };

  return (
    <TodoRegisterContainer>
      <TodoRegisterWriteBox>
        <TodoRegisterTitle
          placeholder="제목을 입력해주세요"
          {...title}
          readOnly={!editMode}
        />
        <TodoRegisterContent
          placeholder="내용을 채워주세요"
          {...content}
          readOnly={!editMode}
        />
        <TodoRegisterBar>
          <CommonBtn
            btnColor="#37a9d4"
            onClick={() => {
              editMode ? onEdit() : editClick();
            }}
          >
            {editMode ? "저장" : "수정"}
          </CommonBtn>
          <CommonBtn btnColor="#AAA" onClick={() => cancelClick()}>
            {editMode ? "취소" : "뒤로 가기"}
          </CommonBtn>
          <CommonBtn btnColor="#D76363" onClick={() => onRemove()}>
            삭제
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
  color: #000;
  padding-top: 8px;
  flex-basis: 70%;
  background: transparent;
  border-bottom: 1px solid #777;
  resize: none;
`;

const TodoRegisterBar = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

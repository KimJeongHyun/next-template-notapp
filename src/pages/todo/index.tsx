import Link from "next/link";

import { GetStaticProps, GetStaticPropsContext } from "next";
import { SERVER_URL } from "@/env";

export default function Todo({ todo }: any) {
  const onSave = () => {
    fetch(`${SERVER_URL}/todo`, {
      method: "POST",
      body: JSON.stringify({
        test: "hi",
      }),
    });
  };

  return (
    <>
      <Link href={"/"}> back to home</Link>
      <button onClick={() => onSave()}>저장!</button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const res = await fetch(`${SERVER_URL}/todo`, { method: "GET" });
  const todo = await res.json();
  return {
    props: {
      todo,
    },
  };
};

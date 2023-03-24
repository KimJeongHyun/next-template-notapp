import { RecoilRoot } from "recoil";

import "@/styles/reset.css";

import { AppLayout } from "@/components";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* 다크모드를 위해 리코일을 사용한다. */}
      <AppLayout>
        {/* AppLayout은 전체 컴포넌트의 컨테이너 역할을 하며, 공통적으로 적용되어야하는 요소들을 입힌다.  */}
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  );
}

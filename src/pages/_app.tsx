import { RecoilRoot } from "recoil";

import "@/styles/reset.css";

import { AppLayout } from "@/components";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  );
}

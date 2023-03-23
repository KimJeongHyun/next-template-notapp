import React from "react";
import { useRecoilState } from "recoil";

import styled, { ThemeProvider } from "styled-components";

import { Header } from ".";

import { darkTheme, lightTheme } from "@/styles/theme";
import GlobalStyle from "@/styles/GlobalStyle";

import { isLightThemeState } from "@/globalStore";

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  const [isLightTheme] = useRecoilState(isLightThemeState);

  return (
    <div>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Header />
        <Contents>{children}</Contents>
      </ThemeProvider>
    </div>
  );
}

export default AppLayout;

const Contents = styled.div`
  position: relative;
  height: calc(100vh - 60px);
  padding: 30px 0 0 15px;
  overflow-y: auto;
  background: ${(props) => props.theme.contentBg};
  color: ${(props) => props.theme.textColor};

  transition: background ease 0.3s;
`;

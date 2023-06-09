import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
html, body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Noto Sans KR', sans-serif;
  background-color:'white';
}
a {
  text-decoration: none;
}
ol,
ul {
  list-style: none;
}
button {
  background-color: transparent;
  outline: none;
  border: 0;
  &:hover {
    cursor: pointer;
  }
}
`;

export default GlobalStyle;

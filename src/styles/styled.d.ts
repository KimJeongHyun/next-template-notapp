import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    contentBg: string;
    menuColor: string;
    textColor: string;
    shadowColor: string;
    name: string;
  }
}

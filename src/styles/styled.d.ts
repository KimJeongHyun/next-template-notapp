import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    reverseBgColor: string;
    contentBg: string;
    menuColor: string;
    textColor: string;
    reverseTextColor: string;
    shadowColor: string;
    name: string;
  }
}

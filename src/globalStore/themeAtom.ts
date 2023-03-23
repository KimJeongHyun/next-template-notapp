import { atom } from "recoil";
import { v1 } from "uuid";

export const isLightThemeState = atom({
  key: `isLightThemeState/${v1()}`,
  default: true,
});

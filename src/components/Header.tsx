import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";

import { BsFillSunFill, BsMoonStars } from "react-icons/bs";

import { isLightThemeState } from "@/globalStore";

export default function Header() {
  const [isLightTheme, setIsLightTheme] = useRecoilState(isLightThemeState);

  return (
    <StickyHeader onClick={() => setIsLightTheme(!isLightTheme)}>
      <ColorIconLabel>{`${isLightTheme ? "LIGHT" : "DARK"}`}</ColorIconLabel>
      <ChangeThemeButton>
        {isLightTheme ? <ColorIconLight /> : <ColorIconMoon />}
      </ChangeThemeButton>
    </StickyHeader>
  );
}

const StickyHeader = styled.div`
  height: 60px;

  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-bottom: 1px solid ${(props) => props.theme.shadowColor};
  cursor: pointer;
`;

const RotateScale = css`
  animation: rotate-and-scale-up 0.5s ease;
  @keyframes rotate-and-scale-up {
    from {
      transform: rotate(0deg) scale(0);
    }
    to {
      transform: rotate(360deg) scale(1);
    }
  }
`;

const ChangeThemeButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  transition: all ease 0.5s;
`;

const ColorIconLabel = styled.div`
  padding-top: 4px;
`;

const ColorIconLight = styled(BsFillSunFill)`
  ${RotateScale}
`;

const ColorIconMoon = styled(BsMoonStars)`
  ${RotateScale}
`;

import { CommonLink, HoverLink } from "@/styles/commonStyled";
import styled, { keyframes } from "styled-components";

interface OpacityComponentProps {
  content: string[];
  forwardInfo: {
    label: string;
    value: string;
  };
  backInfo: {
    label: string;
    value: string;
  };
}

export default function OpacityComponent({
  content,
  forwardInfo,
  backInfo,
}: OpacityComponentProps) {
  const { label: forwardLabel, value: forwardUrl } = forwardInfo;
  const { label: backLabel, value: backUrl } = backInfo;

  return (
    <OpacityContainer>
      {content.map((i, idx) => (
        <span key={idx}>{i}</span>
      ))}
      <BtnBar>
        <HoverLink href={forwardUrl}>{forwardLabel}</HoverLink>
        <CommonLink href={backUrl}>{backLabel}</CommonLink>
      </BtnBar>
    </OpacityContainer>
  );
}

const opacityAnimation = keyframes`
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
`;

const OpacityContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  gap: 16px;
  animation: ${opacityAnimation} 0.5s;
`;

const BtnBar = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

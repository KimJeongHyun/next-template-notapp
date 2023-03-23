import styled from "styled-components";

import Link from "next/link";

export const CommonLink = styled(Link)`
  color: ${(props) => props.theme.textColor};
`;

export const HoverLink = styled(CommonLink)`
  &:hover {
    color: red;
  }

  transition: color ease 0.3s;
`;

export const CommonBtn = styled.div<{ btnColor: string }>`
  padding: 7.5px 13px;
  color: #fff;
  background: ${(props) => props.btnColor};
  border-radius: 2px;
  cursor: pointer;
`;

import styled from "@emotion/styled";
import {css} from "@emotion/react";

interface MainCategoryProps {
    active?: boolean
}

export const MainCategory = styled.div<MainCategoryProps>`
  font-size: 17px;
  color: #606060;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 20px;
  &:hover {
    color: #000;
    background: #f4f4f4;
  }
  ${({active}) => 
    active && 
    css`
      color: #000;
      background: #f4f4f4;
    `
    }
`
import styled from "@emotion/styled";
import {css} from "@emotion/react";

interface InternalCategoryProps {
    active?: boolean
}

export const InternalCategory = styled.div<InternalCategoryProps>`
  font-size: 17px;
  color: #000;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    opacity: .8;
  }
  ${({active}) => 
    active &&
          css`
            font-weight: 700;
          `
}
  
`
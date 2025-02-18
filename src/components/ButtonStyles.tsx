import styled from "styled-components";


export const StyledButton = styled.button`
  background-color: transparent;
  border: 2px solid #0056b3;
  border-radius:12px;
  width:91px;
  align-text:center;
  height:48px;
  color:#0056b3;
  font-weight:bold;
  font-size:16px;

  &:hover{
      background: linear-gradient(135deg,rgb(176, 204, 234), #0056b3);
      border: 2px solid transparent;
      color:#fff;
      transition: all 1s;
  }
`


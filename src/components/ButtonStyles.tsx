import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyles = css`
  background-color: transparent;
  border: 2px solid #0056b3;
  border-radius: 12px;
  width: 120px;
  height: 48px;
  color: #0056b3;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, rgb(176, 204, 234), #0056b3);
    border: 2px solid transparent;
    color: #fff;
  }
`;

export const BaseButton = styled.button`
  ${buttonStyles}
`;

export const StyledLink = styled(Link)`
  ${buttonStyles}
`;

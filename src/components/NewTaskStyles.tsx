import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 1rem;
  border-radius: 8px;
  border: 1px solid #0056b3;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;

  input, textarea, select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    //resize:none;
  }

  button {
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
    border: 2px solid #0056b3;
    transition: all 0.5s ease-in-out;
    color: #fff;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
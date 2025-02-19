import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 500px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.h2`
  margin-top: 0;
  text-align: center;
  color: #333;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  min-height: 80px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export const SaveButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #0056b3;
  border-radius: 12px;

  &:hover{
    background: linear-gradient(135deg, rgb(176, 204, 234), #0056b3);
    border: 2px solid #0056b3;
    transition: all 0.5s ease-in-out;
    color: #fff;
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #ff0019;
  border-radius: 12px;

  &:hover{
    background: linear-gradient(135deg, rgb(210, 147, 155),rgb(198, 37, 29));
    border: 2px solid #ff0019;
    transition: all 0.5s ease-in-out;
    color: #fff;
  }
`;
import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;  
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #0056b3;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #333;
`;

export const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid  #0056b3;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

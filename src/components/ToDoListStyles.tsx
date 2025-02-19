import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const TaskTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 0.75rem;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom:24px;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;

export const AddTaskButton = styled.a`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: 2px solid #0056b3;
  border-radius: 12px;
  color: #0056b3;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration:none;

   &:hover {
    background: linear-gradient(135deg, rgb(176, 204, 234), #0056b3);
    border: 2px solid #0056b3;
    transition: all 0.5s ease-in-out;
    color: #fff;
    }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  svg {
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1976d2;
    }
  }
`;
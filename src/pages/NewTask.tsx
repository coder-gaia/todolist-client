import React, { useState } from 'react';
import { Container } from '../components/ToDoListStyles';
import { ButtonGroup, Form } from '../components/NewTaskStyles';
import { useNavigate } from 'react-router-dom';
import { StyledInput } from '../components/InputStyles';
import axios from 'axios';

interface NewTaskProps {}

const NewTask: React.FC<NewTaskProps> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    //along with the task required fields im also sending the jwt token
    try {
      const response = await axios.post(
        'http://localhost:3000/api/tasks',
        { title, description, completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Response from creating task:', response);

      if (response.status === 201) {
        setTitle('');
        setDescription('');
        setCompleted(false);

        navigate('/todolist');
      } else {
        console.error('Error creating task:', response.data);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Container>
      <h2>New Task</h2>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <StyledInput
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={completed ? 'true' : 'false'} onChange={(e) => setCompleted(e.target.value === 'true')}>
          <option value="false">Pending</option>
        </select>
        <ButtonGroup>
          <button type="submit">Add Task</button>
          <button type="button" onClick={() => navigate('/todolist')}>Back to list</button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default NewTask;

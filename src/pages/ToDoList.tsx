import { useEffect, useState } from 'react';
import { AddTaskButton, Container, SearchInput, TaskTable } from '../components/ToDoListStyles';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const params: any = {};
  
      if (search) {
        if (search.toLowerCase() === 'done') params.completed = true;
        else if (search.toLowerCase() === 'pending') params.completed = false;
        else params.title = search;
      }
  
      const response = await axios.get('http://localhost:3000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
  
      console.log('Fetched tasks:', response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error while getting task(s):', error);
    }
  };
  

  const toggleCompleted = async (taskId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const taskToUpdate = tasks.find((task) => task._id === taskId);
  
      if (!taskToUpdate) return;
  
      const updatedTask = {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        completed: !currentStatus,
      };
  
      console.log('Payload sent:', updatedTask);
  
      const response = await axios.put(
        `http://localhost:3000/api/tasks/${taskId}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Updated task:', response.data);
      fetchTasks();
    } catch (error: any) {
      console.error('Error while updating task status:', error.response?.data || error.message);
    }
  };
  

  const deleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Task ${taskId} deleted`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error while deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.completed ? 'done' : 'pending').includes(search.toLowerCase())
  );

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search by title or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AddTaskButton as={Link} to="/newTask">
        Add new task
      </AddTaskButton>

      <TaskTable>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task._id, task.completed)}
                  />
                </td>
                <td>
                  <FiEdit style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <FiTrash2
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteTask(task._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </TaskTable>
    </Container>
  );
};

export default ToDoList;

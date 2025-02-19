import { useEffect, useState } from 'react';
import { AddTaskButton, Container, SearchInput, TaskTable, FilterContainer } from '../components/ToDoListStyles';
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
  const [showDone, setShowDone] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
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

      await axios.put(
        `http://localhost:3000/api/tasks/${taskId}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error while deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesDone = showDone ? task.completed : true;
    const matchesPending = showPending ? !task.completed : true;
    return matchesTitle && matchesDone && matchesPending;
  });

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FilterContainer>
        <label>
          <input
            type="checkbox"
            checked={showDone}
            onChange={() => setShowDone(!showDone)}
          />{' '}
          Show Done
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPending}
            onChange={() => setShowPending(!showPending)}
          />{' '}
          Show Pending
        </label>
      </FilterContainer>

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

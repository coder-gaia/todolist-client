import { useEffect, useState } from 'react';
import { AddTaskButton, Container, SearchInput, TaskTable, FilterContainer } from '../components/ToDoListStyles';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditForm from '../components/EditForm';
import { URL } from './Login';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task|null>(null);

  //this functions retrieves all the user's tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${URL}api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error while getting task(s):', error);
    }
  };

  //this is a toggle for the checkbox: done & pending
  const toggleCompleted = async (taskId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      if (!taskToUpdate) return;

      //i had to send the whole object because my update model requires all the fields
      const updatedTask = {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        completed: !currentStatus,
      };

      await axios.put(
        `${URL}api/tasks/${taskId}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error: any) {
      console.error('Error while updating task status:', error.response?.data || error.message);
    }
  };

  //by the task's id, I perform the delete action
  const deleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${URL}api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error while deleting task:', error);
    }
  };

  // function to open the edit modal
  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  // closing the modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  // saving all the changes made in the edit modal
  const handleSaveEdit = async (updatedTask: Task) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${URL}api/tasks/${updatedTask._id}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleCloseEditModal();
      fetchTasks();
    } catch (error: any) {
      console.error('Error while updating task:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  //im filtering the tasks by their title and by the checkboxes
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
          />
          Show Done
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPending}
            onChange={() => setShowPending(!showPending)}
          />
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
                  <FiEdit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEditClick(task)} />
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
      {showEditModal && taskToEdit && (
        <EditForm
          task={taskToEdit}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </Container>
  );
};

export default ToDoList;

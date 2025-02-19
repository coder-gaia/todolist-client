import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import ToDoList from '../pages/ToDoList'
import NewTask from '../pages/NewTask'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/todolist' element={<ToDoList/>}/>
        <Route path='/newTask' element={<NewTask/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
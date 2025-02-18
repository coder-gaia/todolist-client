import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
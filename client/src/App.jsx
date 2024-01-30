import {Routes, Route} from 'react-router-dom'
import './index.css'
import Login from './screens/Login'
import Register from './screens/Register'
import ToDo from './screens/ToDo'
function App() {

  return (
    <>
       <Routes>
        <Route path="/register"  element={<Register />} />
        <Route path="/"  element={<Login />} />
        <Route path='/todo' element={<ToDo/>} />
       </Routes>
    </>
  )
}


export default App

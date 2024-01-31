import React from 'react'
import { CiUser } from "react-icons/ci";
const Navbar = () => {
    function logout(){
        localStorage.removeItem('currUser')
        window.location.href = '/' 
    }
    const user = JSON.parse(localStorage.getItem('currUser'));
  return (
    <div className='flex justify-between bg-blue-400'>
        <h1 className=" font-bold text-2xl">Todo</h1>
        <div className='flex'>

        <a className="font-bold text-3xl"><CiUser size="1.5em"/></a>
        <h1 className="     ">{user.user.username}</h1>
        <button onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import { NavLink } from 'react-router-dom'

const UserActionBox = () => {
  return (
    <div className=' absolute h-20 w-20 hidden group-hover:flex flex-col items-center justify-center bg-white border right-2 rounded-md overflow-hidden'>
        <NavLink to={"/login"} className="hover:bg-blue-700 hover:text-white grid place-content-center w-full h-1/2"  >
            Log In
        </NavLink>
        <NavLink to={"/signUp"} className="hover:bg-blue-700 hover:text-white grid place-content-center w-full h-1/2">
            Sign Up
        </NavLink>
    </div>
  )
}

export default UserActionBox
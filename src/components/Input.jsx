import React from 'react'

const Input = ({ type, className, ...props }) => {
  return (
    <input
    type={type}
    className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
  )
}

export default Input
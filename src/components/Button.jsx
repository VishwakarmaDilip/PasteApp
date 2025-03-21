import React from 'react'

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
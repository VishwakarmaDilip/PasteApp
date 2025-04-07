import React from "react";

const Button = ({ children, className, disabled, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      }  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

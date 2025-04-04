import React from "react";

const Input = React.forwardRef(({ type, className, ...props }, ref) => {
  return (
    <input
      ref={ref} // Forwarding the ref properly
      type={type}
      className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});

export default Input;
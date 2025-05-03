import React from "react";

const Input = React.forwardRef(({ type, className, value, onChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      value={type === "file" ? undefined : value}
      onChange={onChange}
      className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});

export default Input;
import React from "react";

const Input = React.forwardRef(({ type, className, ...props }, ref) => {  
  return (
    <input
      ref={ref} // Forwarding the ref properly
      type={type}
      value={props.value} // Ensure value is passed correctly
      onChange={props.onChange} // Ensure onChange is passed correctly
      className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});

export default Input;
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-80 p-6 bg-white rounded-2xl shadow-lg border">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <NavLink to="/signUp" className="text-blue-600 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LogIn;

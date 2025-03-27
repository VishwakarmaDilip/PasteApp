import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    // console.log("Signup Data:", data);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/register`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
      })

      console.log(response);

      if (response.status < 299) {
        toast.success("User Registered Succsessfully")

        setTimeout(() => {
          toast.success("Login With Email Or Username" ,{duration: 4000})
        }, 2000);
      } else if(response.status === 401) {
        toast.error("User With Email id or Username already Exist")
      }

      reset()
      
    } catch (error) {
      console.log("Register:", error);
      
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-80 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              type="text"
              {...register("fullName", { required: "Name is required" })}
              className="w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <Input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

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

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                <FeatherIcon
                  icon={showPassword ? "eye" : "eye-off"}
                  size={20}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <NavLink to="/logIn" className="text-blue-600 hover:underline">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

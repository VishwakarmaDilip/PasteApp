import React from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="px-4 pt-2">
      <h1 className=" font-bold text-blue-600">Profile</h1>
      <div className=" px-6 py-1 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Welcome, Dilip Vishwakarma</h2>
        <div className="relative flex items-center gap-3">
          <div className="h-24 w-24 rounded-full bg-white outline outline-1 flex items-center justify-center overflow-hidden">
            <img
              src="../public/userIcon.png"
              alt="User Image"
              className="h-full"
            />
          </div>
            <Button className={"absolute -bottom-1 text-xs left-[1.32rem] py-[0.3rem] px-[0.5rem] "}>
              Change
            </Button>
          <div>
            <h3 className="font-semibold text-2xl">dilipkumar_fn</h3>
            <p className="text-sm text-gray-600">2106dilip@gmail.com</p>
          </div>
        </div>
        <form className="flex flex-col gap-16">
          <div className="grid grid-cols-2 gap-4 gap-y-20 mt-4">
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              <Input
                type="text"
                className="bg-gray-200 h-12 ml-2"
                {...register("fullName", {
                  required: "Full Name is required",
                })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Gender</label>
              <Input type="text" className="bg-gray-200 h-12 ml-2" {...register("gender")} />
            </div>
            <div className="flex flex-col gap-2">
              <label>Age</label>
              <Input type="number" className="bg-gray-200 h-12 ml-2" {...register("age")} />
            </div>
            <div className="flex flex-col gap-2">
              <label>Mobile</label>
              <Input type="number" className="bg-gray-200 h-12 ml-2" {...register("mobile")} />
            </div>
          </div>
          <div className="place-self-end flex gap-5">
            <Button>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import FeatherIcon from "feather-icons-react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch(
        `https://paste-app-backend-production.up.railway.app/api/v1/users/changePassword`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status < 299) {
        reset();
        toast.success("Password Changed Successfully");
        navigate("/login");
      } else {
        toast.error("Invalid User Credentials");
      }
    } catch (error) {
      toast.error("Server is Down Please try Later");
      console.log("Change Password:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  return (
    <div className="px-4 pt-2">
      <h1 className="font-bold text-blue-600">Change Password</h1>

      <div className="flex justify-center mt-32 h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label className="block text-sm font-medium">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Password is required",
                  })}
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
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium">New Password</label>
              <div className="relative">
                <Input
                  type={showPassword2 ? "text" : "password"}
                  {...register("newPassword", {
                    required: "Password is required",
                  })}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility2}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  <FeatherIcon
                    icon={showPassword2 ? "eye" : "eye-off"}
                    size={20}
                  />
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white h-12 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            {submitting ? "Changing Password" : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

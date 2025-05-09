import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";
import toast from "react-hot-toast";
import EditEmailAndImage from "./EditEmailAndImage";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [editMode2, setEdit2Mode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      gender: "NA",
      age: 0,
      mobile: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://paste-app-backend-production.up.railway.app/api/v1/users/currentUser`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.status < 299) {
          setUserData(data.data);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [submitting, editMode2]);

  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.fullName || "",
        gender: userData.gender || "NA",
        age: userData.age || 0,
        mobile: userData.mobile || "",
      });
    }
  }, [userData, reset]);

  const avatarUrl = userData?.avatar || "/userIcon.png";

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch(
        `https://paste-app-backend-production.up.railway.app/api/v1/users/updateAccount`,
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
        toast.success("Profile Updated Successfully");
        setEditMode(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      toast.error("Failed to update profile:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setEditMode(false);
    reset({
      fullName: userData?.fullName || "",
      gender: userData?.gender || "NA",
      age: userData?.age || 0,
      mobile: userData?.mobile || "",
    });
  };

  if (!userData) return <p className="p-4">Loading profile...</p>;

  return (
    <div>
      {/* Overlay for EditEmailAndImage modal */}
      <div
        className={`${
          editMode2 ? "block" : "hidden"
        } absolute top-0 opacity-60 w-screen h-screen bg-black z-20`}
      ></div>

      <div className="px-4 pt-2">
        <EditEmailAndImage
          editMode={editMode2}
          click={() => setEdit2Mode(false)}
          email={userData?.email}
          setEditMode={()=>setEditMode()}
          setEdit2Mode={()=>setEdit2Mode()}
          avatarUrl={avatarUrl}
        />

        <h1 className="font-bold text-blue-600">Profile</h1>
        <div className="px-6 py-1 flex flex-col gap-4">
          <h2 className="text-xl md:text-3xl font-bold">Welcome, {userData?.fullName}</h2>

          <div
            className={`relative -z-50 flex items-center px-1 py-4 gap-3  w-fit ${
              editMode ? "outline outline-1 rounded-lg" : ""
            }`}
          >
            <div className="h-24 w-24 rounded-full bg-white outline outline-1 flex items-center justify-center overflow-hidden">
              <img src={avatarUrl} alt="User" className="h-full" />
            </div>
            <Button
              onClick={() => setEdit2Mode(!editMode2)}
              className={`w-16 absolute bottom-[0.2rem] text-xs right-[0.2rem] py-[0.3rem] px-[0.5rem] ${
                editMode ? "block" : "hidden"
              }`}
            >
              Edit
            </Button>
            <div>
              <h3 className="font-semibold text-2xl">{userData?.username}</h3>
              <p className="text-sm text-gray-600">{userData?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16">
            <div className="grid grid-cols-2 gap-4 gap-y-20 mt-4">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label>Full Name</label>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Full Name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      className={`h-12 ml-2 ${editMode ? "bg-white" : "bg-gray-200"}`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-2">
                <label>Gender</label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      className={`h-12 ml-2 ${editMode ? "bg-white" : "bg-gray-200"}`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Age */}
              <div className="flex flex-col gap-2">
                <label>Age</label>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      className={`h-12 ml-2 ${editMode ? "bg-white" : "bg-gray-200"}`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-2">
                <label>Mobile</label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="tel"
                      className={`h-12 ml-2 ${editMode ? "bg-white" : "bg-gray-200"}`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="place-self-end flex gap-5">
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="hover:text-white hover:bg-blue-600 outline outline-1 py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </>
              ) : (
                <Button type="button" className="w-48" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

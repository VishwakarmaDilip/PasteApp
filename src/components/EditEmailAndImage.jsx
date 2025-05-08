import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";

const EditEmailAndImage = ({ editMode, click, email, setEditMode, setEdit2Mode, avatarUrl}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email || "",
      avatar: null,
    },
  });

  const [avatar, setAvatar] = React.useState(null);
  const[submitting, setSubmitting] = React.useState(false);

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("avatar", avatar)
    

    try {
      setSubmitting(true);
      const response = await fetch("https://paste-app-backend-production.up.railway.app/api/v1/users/updateAvatarAndEmail",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      )
      setSubmitting(false);

      setEditMode(false)
      setEdit2Mode(false)

      if (response.status < 299) {
        toast.success("User Updated Successfully")
      }
    } catch (error) {
      console.log("Error:", error);
      setSubmitting(false);
    }
    finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`${
        editMode ? "block" : "hidden"
      } absolute top-16 left-[2.5rem] md:left-[9.5rem] w-4/5 h-fit bg-white border boreder-black z-30 rounded-lg p-2 `}
    >
      <h1 className="md:text-lg font-bold text-blue-500 mb-5">
        Edit Email and Image
      </h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center gap-8"
      >
        <div className="flex flex-col gap-2 w-3/4">
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input
                type="text"
                className={`h-12 w-full ml-2`}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className=" w-60 h-60 outline outline-1 rounded-full flex justify-center overflow-hidden">
            <img
              src={avatar ? URL.createObjectURL(avatar) : avatarUrl}
              className=" object-contain"
            />
          </div>
          <label
            className=" bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            htmlFor="avatar"
          >
            Change
          </label>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <Input
                type="file"
                id="avatar"
                accept="image/png, image/jpeg, image/jpg"
                className={`h-12 w-full ml-2 hidden`}
                {...field}
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  field.onChange(e);
                }}
              />
            )}
          />
        </div>
        <div className="flex gap-4 place-self-end mt-5">
          <button
            type="button"
            onClick={click}
            className={`bg-white text-black py-2 px-4 rounded-lg transition border border-black hover:bg-blue-600 hover:text-white`}
          >
            Cancel
          </button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmailAndImage;

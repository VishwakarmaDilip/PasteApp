import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

const EditEmailAndImage = ({ editMode, click }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = React.useState(null);

  return (
    <div
      className={`${
        editMode ? "block" : "hidden"
      } absolute top-16 left-[9.5rem] w-4/5 h-fit bg-white border boreder-black z-30 rounded-lg p-2 `}
    >
      <h1 className="text-lg font-bold text-blue-500 mb-5">
        Edit Email and Image
      </h1>
      <form
        action="https://paste-app-backend-production.up.railway.app/api/v1/users/updateAvatarAndEmail"
        method="patch"
        encType="multipart/form-data"
        className="flex flex-col items-center gap-8"
      >
        <div className="flex flex-col gap-2 w-3/4">
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            defaultValue="2106dilip@gmail.com"
            render={({ field }) => (
              <Input
                type="text"
                className={`h-12 w-full ml-2`}
                {...field}
                onChange={(e) => {
                  //   setFullName(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className=" w-60 h-60 outline outline-1 rounded-full flex justify-center overflow-hidden">
            <img
              src={avatar ? URL.createObjectURL(avatar) : `../userIcon.png`}
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmailAndImage;

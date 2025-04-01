import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import FeatherIcon from "feather-icons-react";
import toast from "react-hot-toast";

const Home = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const pastes = useSelector((state) => state.paste.pastes);
  const allPaste = loggedIn ? [] : pastes;

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  // ✅ FIXED: useEffect should be always at top-level
  useEffect(() => {
    if (!loggedIn && pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, loggedIn, allPaste]);

  let createPaste;

  createPaste = async () => {
    if (!loggedIn) {
      let date = new Date();
      const creationDate = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        day: "numeric",
        month: "long",
      }).format(date);

      const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt: creationDate,
      };

      if (pasteId) {
        dispatch(updateToPastes(paste));
      } else {
        dispatch(addToPastes(paste));
      }

      if (!pasteId) {
        setTitle("");
        setValue("");
        setSearchParams({});
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/notes/addNote`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              content: value,
            }),
          }
        );

        if (response.status < 299) {
          toast.success("Note Created Successfully");
        }

        switch (response.status) {
          case 409:
            toast.error("Note Already Exist");
            break;

          case 406:
            toast.error("Please Enter Detail");
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(("Note :", response));
      }
    }
  };

  return (
    <div className=" w-full flex justify-center">
      <div className=" flex flex-col items-center mt-6 w-[80%]">
        <div className=" flex gap-4 w-full">
          <input
            className=" border pl-4 rounded-2xl mt-2 w-[85%] "
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className=" p-2 px-4 rounded-2xl mt-2 bg-blue-700 text-white md:w-[15%]  "
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>
        </div>

        <div className=" w-full flex flex-col justify-center mt-8 rounded-2xl border">
          <div className=" flex justify-between items-center px-4 py-2 border-b">
            <div className=" flex gap-2">
              <div className=" h-3 w-3 bg-red-600 rounded-full"></div>
              <div className=" h-3 w-3 bg-yellow-300 rounded-full"></div>
              <div className=" h-3 w-3 bg-green-600 rounded-full"></div>
            </div>
            <button
              className=" border p-1 px-2 rounded-md "
              onClick={() => {
                if (title !== "" && value !== "") {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied To Clipboard");
                } else {
                  toast.error("No Data to Copy");
                }
              }}
            >
              <FeatherIcon icon="copy" />
            </button>
          </div>
          <textarea
            className=" w-full p-4 resize-none border rounded-b-lgg"
            value={value}
            placeholder="Write Your Content Here..."
            onChange={(e) => setValue(e.target.value)}
            rows={18}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;

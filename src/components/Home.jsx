import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import FeatherIcon from "feather-icons-react";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  const createPaste = () => {
    let date = new Date()
    const creationDate = new Intl.DateTimeFormat("en-IN",{
      year: "numeric",
      day: "numeric",
      month : "long",
    }).format(date)

    const patse = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: creationDate,
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(patse));
    } else {
      //create
      dispatch(addToPastes(patse));
    }

    //after creation or updation

    if (!pasteId) {
      setTitle("");
      setValue("");
      setSearchParams({});
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
                navigator.clipboard.writeText(value);
                toast.success("Copied To Clipboard");
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

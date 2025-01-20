import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  const allPaste = useSelector((state) => state.paste.pastes);
  // console.log(allPaste);

  const paste = allPaste.filter((p) => p._id === id);

  return (
    <div className="w-full flex justify-center">
      <div className=" flex flex-col items-center mt-6 w-[80%] ">
        <div className=" flex gap-4 w-full justify-between">
          <input
            type="text"
            placeholder="Enter Title Here"
            value={paste[0].title}
            disabled
            className=" pl-2 p-1 rounded-2xl mt-2 w-[80%] "
          />

          <NavLink to={`/?pasteId=${id}`} className="w-[20%]">
            <button className=" bg-blue-700 text-white p-2 px-4 rounded-2xl mt-2 w-full ">
              Edit
            </button>
          </NavLink>
        </div>

        <div className=" mt-5 w-full border rounded-lg">
          <div className=" flex justify-between items-center px-4 py-2 border-b">
            <div className=" flex gap-2">
              <div className=" h-3 w-3 bg-red-600 rounded-full"></div>
              <div className=" h-3 w-3 bg-yellow-300 rounded-full"></div>
              <div className=" h-3 w-3 bg-green-600 rounded-full"></div>
            </div>
            <button
              className=" border p-1 px-2 rounded-md "
              onClick={() => {
                navigator.clipboard.writeText(paste[0].content);
                toast.success("Copied To Clipboard");
              }}
            >
              <FeatherIcon icon="copy" />
            </button>
          </div>
          <textarea
            className=" min-w-[500px] p-4 rounded-b-2xl cursor-not-allowed w-full bg-white resize-none"
            value={paste[0].content}
            placeholder="Enter Content Here"
            rows={18}
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;

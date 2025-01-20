import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pastId) => {
    dispatch(removeFromPastes(pastId));
  };

  return (
    <div className=" w-full flex justify-center">
      <div className=" w-[80%] flex flex-col gap-3">
        <input
          className=" border p-2 rounded-lg min-w-[600px] mt-5"
          type="search"
          placeholder="Search Paste Here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className=" border rounded-lg">
          <div className=" border h-14 px-3 py-2">
            <h1 className=" text-2xl md:text-3xl font-bold">All Pastes</h1>
          </div>
          <div className=" flex flex-col gap-5 p-3">
            {filteredData.length > 0 ? (
              filteredData.map((paste) => {
                return (
                  <div
                    className=" gap-8 flex justify-between border p-1 h-24"
                    key={paste?._id}
                  >
                    <div className=" w-40">
                      <h2 className=" text-xl md:text-2xl font-semibold">{paste.title}</h2>
                      <p className="text-xs md:text-m">{paste.content}</p>
                    </div>
                    <div className="flex flex-col md:gap-2">
                      <ul className=" justify-center flex-wrap flex gap-1 md:gap-4">
                        <li>
                          <button className=" border p-1 ">
                            <i data-feather="arrow-right"></i>
                            <NavLink to={`/?pasteId=${paste._id}`}>
                              <FeatherIcon
                                icon="edit-3"
                                className=" hover:text-blue-600 h-4 md:h-6"
                              />
                            </NavLink>
                          </button>
                        </li>
                        <li>
                          <button
                            className=" border p-1 hover:text-red-600  "
                            onClick={() => handleDelete(paste._id)}
                          >
                            <FeatherIcon icon="trash-2" className="h-4 md:h-6" />
                          </button>
                        </li>
                        <li>
                          <button className=" border p-1 ">
                            <FeatherIcon
                              icon="share"
                              className=" hover:text-orange-600 h-4 md:h-6"
                            />
                          </button>
                        </li>
                        <li>
                          <button className=" border p-1 ">
                            <NavLink to={`/pastes/${paste._id}`}>
                              <FeatherIcon
                                icon="eye"
                                className=" hover:text-purple-700 h-4 md:h-6"
                              />
                            </NavLink>
                          </button>
                        </li>
                        <li>
                          <button
                            className=" border p-1 hover:text-green-500  "
                            onClick={() => {
                              navigator.clipboard.writeText(paste.content);
                              toast.success("Copied To Clipboard");
                            }}
                          >
                            <FeatherIcon icon="copy" className="h-4 md:h-6" />
                          </button>
                        </li>
                      </ul>
                      <div className="flex justify-between">
                        <FeatherIcon icon="calendar" />
                        {paste.createdAt}
                      </div>
                      <div></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500">No pastes found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;

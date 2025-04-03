import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const UserNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pastes, setPastes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/getUserNotes",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        setPastes(data.data);
      } catch (error) {
        setError(true);
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formateDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });

  const handleDelete = (pastId) => {};

  return (
    <div className=" w-full flex justify-center">
      <div className=" w-[80%] flex flex-col gap-3">
        <input
          className=" border p-2 rounded-lg sm:min-w-[600px] mt-5"
          type="search"
          placeholder="Search Paste Here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className=" border rounded-lg">
          <div className=" border h-14 px-3 py-2">
            <h1 className=" text-2xl sm:text-3xl font-bold">All Pastes</h1>
          </div>
          {error ? (
            <div className=" h-28 grid place-content-center">
                <h3 className=" text-red-500 font-bold">Something Went Wrong Please Try Again...!</h3>
            </div>
          ) : (
            <div className=" flex flex-col gap-5 p-3">
              {filteredData.length > 0 ? (
                filteredData.map((paste) => {
                  return (
                    <div
                      className=" gap-8 flex justify-between border p-1  "
                      key={paste?._id}
                    >
                      <div className=" w-52">
                        <h2 className=" text-xl sm:text-2xl font-semibold">
                          {paste.title}
                        </h2>
                        <p className="text-xs sm:text-m">{paste.content}</p>
                      </div>
                      <div className="flex flex-col gap-3 h-fit">
                        <ul className=" justify-center flex-wrap flex gap-1 sm:gap-4">
                          <li>
                            <button className=" border p-1 ">
                              <i data-feather="arrow-right"></i>
                              <NavLink to={`/?noteId=${paste._id}`}>
                                <FeatherIcon
                                  icon="edit-3"
                                  className=" hover:text-blue-600 h-4 sm:h-6"
                                />
                              </NavLink>
                            </button>
                          </li>
                          <li>
                            <button
                              className=" border p-1 hover:text-red-600  "
                              onClick={() => handleDelete(paste._id)}
                            >
                              <FeatherIcon
                                icon="trash-2"
                                className="h-4 sm:h-6"
                              />
                            </button>
                          </li>
                          <li>
                            <button className=" border p-1 ">
                              <FeatherIcon
                                icon="share"
                                className=" hover:text-orange-600 h-4 sm:h-6"
                              />
                            </button>
                          </li>
                          <li>
                            <button className=" border p-1 ">
                              <NavLink to={`/pastes/${paste._id}`}>
                                <FeatherIcon
                                  icon="eye"
                                  className=" hover:text-purple-700 h-4 sm:h-6"
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
                              <FeatherIcon icon="copy" className="h-4 sm:h-6" />
                            </button>
                          </li>
                        </ul>
                        <div className="flex justify-center sm:justify-end items-center gap-2 text-xs sm:text-base w-32 sm:w-full">
                          <FeatherIcon icon="calendar" className="h-4 sm:h-6" />
                          {formateDate.format(new Date(paste.createdAt))}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500">
                  No pastes found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNotes;

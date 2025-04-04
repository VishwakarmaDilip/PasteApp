import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useParams } from "react-router-dom";

const ViewUserPaste = () => {
  const { id } = useParams();
  const [note, setNote] = useState("")

  useEffect(()=> {
   try {
     const fetchData = async () => {
         const response = await fetch(`https://paste-app-backend-production.up.railway.app/api/v1/notes/getNote/${id}`,
             {
                 method:"GET",
                 credentials:"include"
             }
         )
         const rowData = await response.json()
         const data = rowData.data
         setNote(data)
     }
 
     fetchData()
   } catch (error) {
    console.log(error);
    
   }
  },[id])

  return (
    <div className="w-full flex justify-center">
      <div className=" flex flex-col items-center mt-6 w-[80%] ">
        <div className=" flex gap-4 w-full justify-between">
          <input
            type="text"
            placeholder="Enter Title Here"
            value={note?.title || ""}
            disabled
            className=" pl-2 p-1 rounded-2xl mt-2 w-[80%] "
          />

          <NavLink to={`/?noteId=${id}`} className="w-[20%]">
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
                navigator.clipboard.writeText(note.content);
                toast.success("Copied To Clipboard");
              }}
            >
              <FeatherIcon icon="copy" />
            </button>
          </div>
          <textarea
            className=" sm:min-w-[500px] p-4 rounded-b-2xl cursor-not-allowed w-full bg-white resize-none"
            value={note?.content || ""}
            placeholder="Enter Content Here"
            rows={18}
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewUserPaste;

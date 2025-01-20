import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      const condition = state.pastes.findIndex(
        (item) => item.content === paste.content
      );

      if (!paste.title == "" && !paste.content == "") {
        if (condition < 0) {
          state.pastes.push(paste);
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Paste Created Successfully");
        } else {
          toast.error("Already Have");
        }
      } else {
        toast.error("Please Enter Detail");
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;

      if (!paste.title == "" && !paste.content == "") {
        const index = state.pastes.findIndex((item) => item._id === paste._id);

        if (index >= 0) {
          state.pastes[index] = paste;

          localStorage.setItem("pastes", JSON.stringify(state.pastes));

          toast.success("Paste updated");
        }
      } else {
        toast.error("Please Enter Detail")
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }

      toast.success("Paste Deleted");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;

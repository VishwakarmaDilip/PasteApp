import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { logIn, logout } = authSlice.actions;

export default authSlice.reducer;

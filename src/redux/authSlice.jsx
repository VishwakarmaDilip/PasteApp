import { createSlice } from "@reduxjs/toolkit";

let timeoutId = null

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

      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    },
  },
});

export const setTime = () => (dispatch) => {
  if (timeoutId) {
    clearTimeout(timeoutId); 
  }

  timeoutId = setTimeout(() => {
    dispatch(logout())
    timeoutId = null
  }, 86400);
}
export const clearTime = () => () => {
  if (timeoutId) {
    clearTime(timeoutId)
    timeoutId = null
  }
}


export const { logIn, logout } = authSlice.actions;

export default authSlice.reducer;

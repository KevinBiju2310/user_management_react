import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("authToken"),
  },
  reducers: {
    signUp: (state, action) => {
      state.user = { ...action.payload };
      state.isAuthenticated = true;
    },
    signIn: (state, action) => {
      console.log("user state : ", action.payload);
      state.user = { ...action.payload };
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { signIn, signUp, logOut, updateUser } = authSlice.actions;
export default authSlice.reducer;

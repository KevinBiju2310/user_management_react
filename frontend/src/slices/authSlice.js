import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    signUp: (state, action) => {
      state.user = { ...action.payload };
      state.isAuthenticated = true;
    },
    signIn: (state, action) => {
      console.log("user state : ",action.payload);
      state.user = { ...action.payload };
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signUp, logOut } = authSlice.actions;
export default authSlice.reducer;

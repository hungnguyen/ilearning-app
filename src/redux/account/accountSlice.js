import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  islogged: false,
  loading: false,
  error: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      if (
        action.payload.username === "admin" &&
        action.payload.password === "H@noi12345"
      ) {
        state.islogged = true;
        state.error = "";
      } else {
        state.error = "Sai username / password";
      }
    },
    logout: (state) => {
      state.islogged = false;
    },
  },
});

export const { login, logout } = accountSlice.actions;

export const accountSelector = (state) => state.account;

export default accountSlice.reducer;

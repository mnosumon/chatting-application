import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("user")),
};

export const signAuthSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    signInAuth: (state, actions) => {
      state.value = actions.payload;
    },
    logoutAuth: (state) => {},
  },
});

export const { signInAuth, logoutAuth } = signAuthSlice.actions;

export default signAuthSlice.reducer;

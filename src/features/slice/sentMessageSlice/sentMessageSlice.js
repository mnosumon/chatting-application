import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("friend")) || null,
};

export const sentMessageSlice = createSlice({
  name: "singleFriend",
  initialState,
  reducers: {
    friendAction: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { friendAction } = sentMessageSlice.actions;
export default sentMessageSlice.reducer;

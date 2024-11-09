import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/loginSlice/signInAuthSlice";
import sentMessageSlice from "../slice/sentMessageSlice/sentMessageSlice";

export const store = configureStore({
  reducer: {
    user: authSlice,
    firend: sentMessageSlice,
  },
});

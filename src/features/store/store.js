import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/loginSlice/signInAuthSlice";

export const store = configureStore({
  reducer: {
    user: authSlice,
  },
});

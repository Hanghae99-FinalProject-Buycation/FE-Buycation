import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";

const store = configureStore({
  reducer: { postSignup },
});

export default store;

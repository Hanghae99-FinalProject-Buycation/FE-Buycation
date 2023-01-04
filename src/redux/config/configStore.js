import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";

const store = configureStore({
  reducer: { postSignup, postSignin },
});

export default store;

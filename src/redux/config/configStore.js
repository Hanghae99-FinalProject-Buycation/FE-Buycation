import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";
import postPosting from "../modules/postingSlice";

const store = configureStore({
  reducer: { postSignup, postSignin, postPosting },
});

export default store;

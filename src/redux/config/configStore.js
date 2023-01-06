import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";
import postcodeModal from "../modules/postcodeModalSlice";
import postcode from "../modules/postcodeSlice";

const store = configureStore({
  reducer: { postSignup, postSignin, postcodeModal, postcode },
});

export default store;

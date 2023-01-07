import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";
import postcodeModal from "../modules/postcodeModalSlice";
import postcode from "../modules/postcodeSlice";
import getPostingList from "../modules/postingListSlice";
import postPosting from "../modules/postingSlice";

const store = configureStore({
  reducer: {
    postSignup,
    postSignin,
    postcodeModal,
    postcode,
    getPostingList,
    postPosting,
  },
});

export default store;

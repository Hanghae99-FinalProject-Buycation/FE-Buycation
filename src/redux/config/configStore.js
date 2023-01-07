import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";
import postcodeModal from "../modules/postcodeModalSlice";
import postcode from "../modules/postcodeSlice";
import getPostingList from "../modules/postingListSlice";
import postPosting from "../modules/postingSlice";
import getDetail from "../modules/detailSlice";

const store = configureStore({
  reducer: {
    postSignup,
    postSignin,
    postcodeModal,
    postcode,
    getPostingList,
    postPosting,
    getDetail,
  },
});

export default store;

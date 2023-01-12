import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";
import postcodeModal from "../modules/postcode/postcodeModalSlice";
import postcode from "../modules/postcode/postcodeSlice";
import getPostingList from "../modules/main/postingListSlice";
import postPosting from "../modules/posting/postingSlice";
import getDetail from "../modules/details/detailSlice";

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

import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";
import postcodeModal from "../modules/postcode/postcodeModalSlice";
import postcode from "../modules/postcode/postcodeSlice";
import getPostingList from "../modules/main/postingListSlice";
import postPosting from "../modules/posting/postingSlice";
import getDetail from "../modules/details/detailSlice";
import profile from "../modules/profile/profileSlice";
import myList from "../modules/profile/myListSlice";
import reviews from "../modules/profile/reviewsSlice";
import applicate from "../modules/application/applicationSlice";

const store = configureStore({
  reducer: {
    postSignup,
    postSignin,
    postcodeModal,
    postcode,
    getPostingList,
    postPosting,
    getDetail,
    profile,
    myList,
    reviews,
    applicate,
  },
});

export default store;

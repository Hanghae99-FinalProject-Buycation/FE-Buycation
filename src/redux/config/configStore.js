import { configureStore } from "@reduxjs/toolkit";
import postSignup from "../modules/login/signupSlice";
import postSignin from "../modules/login/signinSlice";
import postcodeModal from "../modules/postcode/postcodeModalSlice";
import postcode from "../modules/postcode/postcodeSlice";
import getPostingList from "../modules/main/postingListSlice";
import postPosting from "../modules/posting/postingSlice";
import getDetail from "../modules/details/detailSlice";
import comments from "../modules/details/commentSlice";
import profile from "../modules/profile/profileSlice";
import myList from "../modules/profile/myListSlice";
import reviews from "../modules/profile/reviewsSlice";
import applicate from "../modules/application/applicationSlice";
import generalModal from "../modules/modal/modalSlice";
import alarm from "../modules/alarm/alarmSlice";
import chat from "../modules/chat/chatSlice";

const store = configureStore({
  reducer: {
    postSignup,
    postSignin,
    postcodeModal,
    postcode,
    getPostingList,
    postPosting,
    getDetail,
    comments,
    profile,
    myList,
    reviews,
    applicate,
    generalModal,
    alarm,
    chat,
  },
});

export default store;

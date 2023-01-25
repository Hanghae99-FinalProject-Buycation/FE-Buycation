import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import OauthPage from "../pages/OauthPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/Register";
import MainPage from "../pages/MainPage";
import PostingPage from "../pages/PostingPage";
import DetailsPage from "../pages/DetailsPage";
import ModifyPage from "../pages/ModifyPage";
import ProfilePage from "../pages/ProfilePage";
import MyProfilePage from "../pages/MyProfilePage";
import Chatroom from "../components/chat/Chatroom";
import ChatroomMod from "../components/chat/ChatroomMod";
import ChatroomModMod from "../components/chat/ChatroomModMod";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/api/kakaomember" element={<OauthPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/posting" element={<PostingPage />} />
          <Route path="/details/:postingId" element={<DetailsPage />} />
          <Route path="/modify/:postingId" element={<ModifyPage />} />
          <Route path="/profile/:memberId" element={<ProfilePage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/chat" element={<Chatroom />} />
          <Route path="/chat2" element={<ChatroomMod />} />
          <Route path="/chat3" element={<ChatroomModMod />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

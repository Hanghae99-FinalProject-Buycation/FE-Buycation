import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import OauthPage from "../pages/OauthPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/Register";
import MainPage from "../pages/MainPage";
import PostingPage from "../pages/PostingPage";
import DetailsPage from "../pages/DetailsPage";
import ProfilePage from "../pages/ProfilePage";
import ModifyPage from "../pages/ModifyPage";

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
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

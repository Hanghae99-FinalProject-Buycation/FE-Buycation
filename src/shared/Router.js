import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/Register";
import MainPage from "../pages/MainPage";
import PostingPage from "../pages/PostingPage";
import DatailsPage from "../pages/DatailsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/posting" element={<PostingPage />} />
          <Route path="/details" element={<DatailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

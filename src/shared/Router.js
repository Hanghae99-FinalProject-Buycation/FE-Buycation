import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "../pages/Signup"
import Main from "../pages/Main"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Details from "../pages/Details"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Details" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

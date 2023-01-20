import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../core/axios";
import { setCookies } from "../../../core/cookie";
import { Spinners } from "../../../shared/layout/Spinners";

const Oauth2RedirectHandler = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const kakao = async () => {
    await baseURL
      .get(`members/login/kakao?code=${code}`)
      .then((res) => {
        setCookies("id", res.headers.authorization, {
          path: "/",
          maxAge: 1750,
        });
        navigate("/");
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  kakao();

  return <Spinners />;
};

export default Oauth2RedirectHandler;

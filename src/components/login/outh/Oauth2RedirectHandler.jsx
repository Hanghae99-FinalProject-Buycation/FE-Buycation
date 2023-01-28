import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../core/axios";
import { setCookies } from "../../../core/cookie";
import { Spinners } from "../../../shared/layout/Spinners";
import Swal from "sweetalert2";

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
        Swal.fire({
          text: "다시 로그인 해 주세요.",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF5A5F",
        });
      });
  };
  kakao();

  return <Spinners />;
};

export default Oauth2RedirectHandler;

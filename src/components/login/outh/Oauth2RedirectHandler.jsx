import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../core/axios";

const Oauth2RedirectHandler = () => {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  const kakao = async () => {
    await baseURL
      .get(`members/login/kakao?code=${code}`)
      .then((res) => {
        console.log(res);
        localStorage.setItem("id", res.headers.authorization);
        localStorage.setItem("memberId", res.data.data.memberId);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  kakao();

  // return <div>스피너 만들자!</div>;
};

export default Oauth2RedirectHandler;

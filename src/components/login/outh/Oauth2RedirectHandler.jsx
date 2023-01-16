import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../core/axios";

const Oauth2RedirectHandler = () => {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code"); //searchParams 파라미터 값 확인
  //console.log("인가 코드 :", code);

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

  return <div>Oauth2RedirectHandler</div>;
};

export default Oauth2RedirectHandler;

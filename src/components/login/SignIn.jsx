import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  // const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({
    email: "",
    pw: "",
  });

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginValue({ ...loginValue, [name]: value });
  };
  console.log("onChange :", loginValue);

  const onSubmitLoginValueHandler = (event) => {
    event.preventDefault();
    if (loginValue.email === "") {
      setLoginValue({ ...loginValue, isValidEmail: false });
    } else if (loginValue.pw === "") {
      setLoginValue({ ...loginValue, isValidPW: false });
    } else {
      const newLoginValue = {
        email: loginValue.email,
        password: loginValue.pw,
      };
      console.log("확인");
    }
  };

  return (
    <section>
      <p>환영합니다! 바이케이션을 시작하고 저렴하고 풍족한 삶을 누리세요.</p>

      <form onSubmit={onSubmitLoginValueHandler}>
        <div>
          <input
            name="email"
            type="text"
            placeholder="아이디 (이메일)"
            value={loginValue.email}
            onChange={onChangeInputHandler}
          />
          <input
            name="pw"
            type="password"
            placeholder="비밀번호"
            value={loginValue.pw}
            onChange={onChangeInputHandler}
          />
        </div>

        <div type="button">
          <Link to="/signup">회원가입</Link>
        </div>

        <button>로그인</button>
      </form>
    </section>
  );
};

export default SignIn;

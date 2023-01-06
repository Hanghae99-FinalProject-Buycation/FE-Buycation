import { useEffect, useState } from "react";

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return windowSize;

  // const 변수명 = useWindowResize() 로 호출 후
  // 변수명.innerWidth 또는 .innerHeight 형태로 사용
  // 단위는 픽셀
  // 예: {size.innerWidth > 375 ? <textarea /> : <input />}
};

export default useWindowResize;

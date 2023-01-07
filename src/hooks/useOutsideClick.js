import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
  // 해당 훅을 실행할 컴포넌트에서 훅을 import한 후  const ref = useOutsideClick(밖을 클릭했을 때 실행할 기능) 선언
  // 예: const ref = useOutsideClick(dispatch(isOpenModal(false)))
  // 부모 컴포넌트 안 기준 요소(컴포넌트 아님. 요소)에 ref={ref} 설정
};

export default useOutsideClick;

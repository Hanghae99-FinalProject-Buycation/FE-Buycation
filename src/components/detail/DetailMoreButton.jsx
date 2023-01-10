import styled from "@emotion/styled";
import React from "react";
import { RiMore2Line } from "react-icons/ri";

const DetailMoreButton = ({ onClick }) => {
  return (
    <ElBtn type="button" onClick={onClick}>
      <RiMore2Line
        size="1.875rem"
        alt="더보기 버튼, 수정삭제 모달 / 글쓴이 발자국 수"
      />
    </ElBtn>
  );
};

export default DetailMoreButton;

const ElBtn = styled.button`
  background: none;
  cursor: pointer;
`;

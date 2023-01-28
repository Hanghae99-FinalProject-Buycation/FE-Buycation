import React from "react";
import styled from "@emotion/styled";
import { FaTimes } from "react-icons/fa";

const GuideModal = (props) => {
  return (
    <Backdrop onClick={props.onClose}>
      <UserGuide>
        <Header>
          <span>가이드 북</span>
          <CloseBtn onClick={props.onClose}>
            <FaTimes size="1.2rem" />
          </CloseBtn>
        </Header>
        {/* 이미지 넣으면 됌 */}
        {props.onInnerWidth > 768 ? <img alt="guide" /> : <img alt="guide" />}
      </UserGuide>
    </Backdrop>
  );
};

export default GuideModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.75);
`;

const UserGuide = styled.div`
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 10%;
  width: 42rem;
  z-index: 10;
  background: white;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const Header = styled.header`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayStrong};
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: flex;
    align-items: center;
    margin: auto;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
  }
  button {
    padding: 0;
  }
  @media screen and (max-width: 768px) {
    padding: 0.6rem;
    & > span {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;

const CloseBtn = styled.button`
  background: none;
  cursor: pointer;
`;

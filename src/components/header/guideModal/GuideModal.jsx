import React from "react";
import styled from "@emotion/styled";
import ModalClose from "../../../assets/headerIcon/modalClose.svg";
//import { Spinners } from "../../../shared/layout/Spinners";

const GuideModal = (props) => {
  return (
    <Backdrop onClick={props.onClose}>
      <UserGuide>
        <Header>
          <span>가이드 북</span>
          <CloseBtn onClick={props.onClose}>
            <img alt="modalClose" src={ModalClose} />
          </CloseBtn>
        </Header>
        {props.onInnerWidth > 768 ? (
          <GuidePage>
            <img
              alt="guidePcVersion1"
              src="https://buycation-image.s3.ap-northeast-2.amazonaws.com/guidePcVersion1.svg"
            />
            <img
              alt="guidePcVersion2"
              src="https://buycation-image.s3.ap-northeast-2.amazonaws.com/guidePcVersion2.svg"
            />
          </GuidePage>
        ) : (
          <GuidePage>
            <img
              alt="guideMobileVersion1"
              src="https://buycation-image.s3.ap-northeast-2.amazonaws.com/guideMovileVersion1.svg"
            />
            <img
              alt="guideMobileVersion2"
              src="https://buycation-image.s3.ap-northeast-2.amazonaws.com/guideMobileVersion2.svg"
            />
          </GuidePage>
        )}
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
  width: 920px;
  height: 590;
  z-index: 10;
  background: white;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 300px;
    height: 540px;
  }
`;

const Header = styled.header`
  padding: 1rem;
  height: 52px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayStrong};
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: flex;
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

const GuidePage = styled.div`
  overflow: auto;
  width: 100%;
  height: 530px;
  img {
    width: 100%;
    //content-visibility: auto; //화면 밖 콘텐츠의 렌더링을 생략함으로써 초기 로드 시간을 개선
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 480px;
  }
`;

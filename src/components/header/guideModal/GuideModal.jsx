import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaTimes } from "react-icons/fa";
import guidepagePc from "../../../assets/useGuide/guidepagePc.svg";
import guidepageMobile from "../../../assets/useGuide/guidepageMobile.svg";
import { Spinners } from "../../../shared/layout/Spinners";

const GuideModal = (props) => {
  const [loaded, setLoaded] = useState(false);
  console.log(loaded);

  return (
    <Backdrop onClick={props.onClose}>
      <UserGuide>
        <Header>
          <span>가이드 북</span>
          <CloseBtn onClick={props.onClose}>
            <FaTimes size="1.2rem" />
          </CloseBtn>
        </Header>
        {props.onInnerWidth > 768 ? (
          <GuidePage>
            {loaded ? (
              <Spinners />
            ) : (
              <img
                alt="guidepagePc"
                src={guidepagePc}
                onLoad={() => setLoaded(true)}
              />
            )}
          </GuidePage>
        ) : (
          <GuidePage>
            {loaded ? (
              <Spinners />
            ) : (
              <img
                alt="guidepageMobile"
                src={guidepageMobile}
                onLoad={() => setLoaded(true)}
              />
            )}
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
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayStrong};
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

const GuidePage = styled.div`
  overflow: auto;
  width: 100%;
  height: 530px;
  img {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 480px;
  }
`;

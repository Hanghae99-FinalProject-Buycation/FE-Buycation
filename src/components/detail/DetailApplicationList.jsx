import styled from "@emotion/styled";
import React, { Fragment, useEffect, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { RxCross1 } from "react-icons/rx";
import { FaShoePrints } from "react-icons/fa";
import ButtonBasic from "../elements/ButtonBasic";
import applicationList from "../../db/detailApplicationDB.json";
import { useDispatch, useSelector } from "react-redux";
import { __getApplication } from "../../redux/modules/details/detailSlice";

const DetailApplicationList = ({ postingId }) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const onClickCloseHandler = () => {
    setHide(!hide);
  };
  // 더블클릭 해야 다시 버튼 등장함...
  const ref = useOutsideClick(onClickCloseHandler);
  // const data = applicationList.data;
  const data = useSelector((state) => state.getDetail.getApplication);
  useEffect(() => {
    // dispatch(__getApplication(postingId));
    dispatch(__getApplication(postingId));
  }, [dispatch]);
  return (
    !hide && (
      <StApplicationList ref={ref}>
        <div>
          <span>신청자 리스트</span>
          <span>
            <RxCross1 onClick={onClickCloseHandler} />
          </span>
        </div>
        {data &&
          data?.map((item) => (
            <div key={"frag" + item.applicationId} className="wrap">
              <img src={item.profileImage} alt="" />
              <span>{item.nickname}</span>
              <span className="btnWrap">
                <FaShoePrints />
                {item.userScore}
                발자국
              </span>
              <ButtonBasic>거절</ButtonBasic>
              <ButtonBasic>수락</ButtonBasic>
            </div>
          ))}
      </StApplicationList>
    )
  );
};

export default DetailApplicationList;

const StApplicationList = styled.div`
  width: 20rem;
  height: 14rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10%;
  bottom: 4rem;
  z-index: 5;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1px 2px ${({ theme }) => theme.colors.grayList};
  background: #fff;

  div:first-of-type {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayList};
    span {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }

  .wrap {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayList};
    font-size: ${({ theme }) => theme.fontSize.sm};

    img {
      width: 2rem;
      height: 2rem;
      object-fit: cover;
      border-radius: 5rem;
    }

    span {
      display: inline-block;
      padding: 0 0.5rem;
    }
  }

  .btnWrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.grayWeak};
  }
  button {
    width: 2.5rem;
    height: 1.5rem;
    background: #fff;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 100;
  }
  button:first-of-type {
    border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
    color: ${({ theme }) => theme.colors.grayWeak};
    margin-right: 0.2rem;
  }
  button:last-of-type {
    border: 0.1rem solid ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
  }
`;

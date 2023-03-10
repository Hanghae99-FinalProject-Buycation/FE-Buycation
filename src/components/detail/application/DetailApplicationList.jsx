import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { HiOutlineX } from "@react-icons/all-files/hi/HiOutlineX";
import ButtonBasic from "../../elements/ButtonBasic";
import DetailSpan from "../elements/DetailSpan";
import {
  __allowApplication,
  __denyApplication,
  __getApplication,
  __isSuccess,
} from "../../../redux/modules/application/applicationSlice";
import profileDefault from "../../../assets/profileImg/profile_default.svg";
import footIcon from "../../../assets/reviewIcon/reviewFootIcon.svg";
import useOutsideClick from "../../../hooks/useOutsideClick";

const DetailApplicationList = ({ postingId, onClickMoveProfileHandler }) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const onClickCloseHandler = () => {
    setHide(!hide);
  };
  // 더블클릭 해야 다시 버튼 등장함...
  const ref = useOutsideClick(onClickCloseHandler);
  // const applicateStatus = applicationList.data;
  const applicateStatus = useSelector(
    (state) => state.applicate.getApplication
  );
  const isSuccess = useSelector((state) => state.applicate.isSuccess);
  const onClickAllowApplicationHandler = (item) => {
    dispatch(
      __allowApplication({
        applicationId: item.applicationId,
        postingId: postingId,
      })
    ).then((res) => {
      Swal.fire({
        text: res.payload,
        confirmButtonColor: "#ff5f5a",
        confirmButtonText: "확인",
      });
      if (isSuccess) {
        dispatch(__isSuccess(false));
      }
    });
  };
  const onClickDenyApplicationHandler = (item) => {
    dispatch(
      __denyApplication({
        applicationId: item.applicationId,
        postingId: postingId,
      })
    ).then((res) => {
      if (isSuccess) {
        dispatch(__isSuccess(false));
      }
    });
  };
  useEffect(() => {
    dispatch(__getApplication(postingId));
  }, [dispatch, postingId, isSuccess]);
  return (
    !hide && (
      <StApplicationList ref={ref}>
        <ElTitle>
          <span>신청자 리스트</span>
          <span>
            <HiOutlineX onClick={onClickCloseHandler} />
          </span>
        </ElTitle>
        {applicateStatus &&
          applicateStatus?.map((item) => (
            <StNameWrap key={"frag" + item.applicationId}>
              {item?.profileImage ? (
                <ElImg
                  src={item.profileImage}
                  alt=""
                  onClick={() => {
                    onClickMoveProfileHandler(item?.memberId);
                  }}
                />
              ) : (
                <ElImg
                  src={profileDefault}
                  alt=""
                  onClick={() => {
                    onClickMoveProfileHandler(item?.memberId);
                  }}
                />
              )}
              <DetailSpan
                titleText={item.nickname}
                bodyText={
                  <>
                    <img className="btnWrap" src={footIcon} alt="" />
                    {item.userScore}
                    발자국
                  </>
                }
                margin="0"
                color="#a6a6a6"
                fontSize="0.6rem"
                _onClick={() => onClickMoveProfileHandler(item?.memberId)}
              />
              <ButtonBasic
                _onClick={() => {
                  onClickDenyApplicationHandler(item);
                }}
              >
                거절
              </ButtonBasic>
              <ButtonBasic
                _onClick={() => {
                  onClickAllowApplicationHandler(item);
                }}
              >
                수락
              </ButtonBasic>
            </StNameWrap>
          ))}
      </StApplicationList>
    )
  );
};

export default DetailApplicationList;

const StApplicationList = styled.div`
  width: 20.25rem;
  height: 14rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 1rem;
  bottom: 4rem;
  z-index: 5;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.1rem 0.125rem ${({ theme }) => theme.colors.grayList};
  background: #fff;

  .btnWrap {
    width: 1rem;
    height: 1rem;
    margin: 0;
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

  @media screen and (max-width: 48rem) {
    width: 100%;
    max-width: 20.25rem;
    right: 0;
  }
`;

const ElTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayList};
  span {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
  }
`;

const StNameWrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  grid-template-rows: 3.5rem;
  align-items: center;
  width: 100%;
  padding: 0 0.75rem 0;
  height: fit-content;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayList};
  font-size: ${({ theme }) => theme.fontSize.sm};

  div {
    display: flex;
    justify-content: center;
  }

  span {
    display: inline-block;
    cursor: pointer;
  }

  @media screen and (max-width: 48rem) {
    width: 100%;
    max-width: 20.25rem;
    grid-template-columns: auto 1fr auto auto auto;
  }
`;

const ElImg = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border-radius: 5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  cursor: pointer;
`;
